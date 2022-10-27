<template>
  <span class="area-select" @click="trigger" ref="areaSelectRef">
    <slot v-if="$slots.default" />
    <input
      v-else
      class="area-select-input"
      :class="{ active: showPanel }"
      v-model="valueString"
    />
    <Teleport to="body">
      <transition :name="transition">
        <div
          :class="['area-select-panel', props.props.popperClass]"
          :placement="placement"
          ref="areaSelectPanelRef"
          v-if="showPanel"
          :style="panelstyle"
        >
          <span class="area-select__arrow" :style="arrowStyle"></span>
          <div class="area-select-panel-content">
            <ul
              class="area-select-list"
              v-for="(item, index) in datas"
              ref="areaSelectListRef"
            >
              <li
                v-for="a in item"
                :key="a.code"
                class="area-select-list-item"
                :class="{
                  active: a.code === active[index],
                  disabled: isDisabled(a.code),
                }"
                @click="clickItem(a, index)"
              >
                <span>{{ a.name }}</span>
                <loading
                  class="loading-icon"
                  v-if="
                    townLazyLoading && a.code === active[index] && index === 2
                  "
                ></loading>
                <arrow class="arrow-icon" v-else></arrow>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </Teleport>
  </span>
</template>

<script setup lang="ts">
import arrow from "./icons/arrow.vue";
import loading from "./icons/loading.vue";
import {
  computed,
  nextTick,
  PropType,
  reactive,
  ref,
  toRefs,
  watch,
} from "vue";
import {
  AreaDataDto,
  AreaSelectPropsDto,
  DomPropsDto,
  AreaSelectResultDto,
} from "./types";
const props = defineProps({
  props: {
    type: Object as PropType<AreaSelectPropsDto>,
    default: {
      level: 0,
      showAllLevels: false,
      townLazy: false,
      popperClass: "",
      areaData: [],
    },
  },
  modelValue: {
    type: Object as PropType<AreaSelectResultDto>,
    default: () => {},
  },
});
const state = reactive({
  townLazyLoading: false,
  datas: [] as AreaDataDto[][],
  result: {} as AreaSelectResultDto,
  active: [] as string[],
  showPanel: false,
  transition: "area-zoom-in-top",
  domProps: {} as DomPropsDto,
  placement: "bottom",
  panelWidth: 0,
});
const areaSelectRef = ref();
const areaSelectPanelRef = ref();
const areaSelectListRef = ref();
const valueString = computed(() => {
  if (props.modelValue && props.modelValue.code) {
    let result = "";
    if (props.modelValue.province) {
      if (!props.props.showAllLevels) {
        result = props.modelValue.province;
      } else {
        result += props.modelValue.province;
      }
    }
    if (props.modelValue.city) {
      if (!props.props.showAllLevels) {
        result = props.modelValue.city;
      } else {
        result += " / " + props.modelValue.city;
      }
    }
    if (props.modelValue.district) {
      if (!props.props.showAllLevels) {
        result = props.modelValue.district;
      } else {
        result += " / " + props.modelValue.district;
      }
    }
    if (props.modelValue.town) {
      if (!props.props.showAllLevels) {
        result = props.modelValue.town;
      } else {
        result += " / " + props.modelValue.town;
      }
    }
    return result;
  }
  return "";
});
const panelstyle = computed(() => {
  let style: any = {};
  if (state.placement === "top") {
    style.top = state.domProps.top - 220 - 2 - 10 + "px";
    style.left = state.domProps.left + "px";
  } else {
    style.top = state.domProps.top + state.domProps.height + 10 + "px";
    style.left = state.domProps.left + "px";
  }
  if (state.panelWidth > 0) {
    let panelRight = state.domProps.left + state.panelWidth;
    if (panelRight - window.innerWidth > 0) {
      style.left =
        state.domProps.left - (panelRight - window.innerWidth) - 40 + "px";
    }
  }
  return style;
});
const arrowStyle = computed(() => {
  let style: any = {};
  if (state.domProps.width > 80) {
    style.left = "40px";
  } else {
    style.left = state.domProps.width * 0.5 - 5 + "px";
  }
  if (state.placement === "top") {
    style.bottom = "-5px";
  } else {
    style.top = "-5px";
  }
  return style;
});
watch(
  () => state.datas.length,
  () => {
    nextTick(() => {
      if (areaSelectPanelRef.value) {
        state.panelWidth = areaSelectPanelRef.value.clientWidth;
      }
    });
  }
);
watch(
  () => props.modelValue,
  () => {
    state.result = JSON.parse(JSON.stringify(props.modelValue));
  },
  { immediate: true }
);
const isDisabled = (code: string) => {
  if (props.props.disabled) {
    const idx = props.props.disabled.findIndex((e) => e === code);
    return idx >= 0;
  }
  return false;
};
const emits = defineEmits(["update:modelValue", "change", "open", "close"]);
const open = () => {
  // 初始化
  state.active = [];
  state.datas = [];
  state.datas.push(props.props.areaData);
  cmdInit();
  emits("open");
  nextTick(() => {
    scrollToActive();
  });
};
const scrollToActive = () => {
  if (areaSelectListRef.value && areaSelectListRef.value.length) {
    areaSelectListRef.value.forEach((e: any) => {
      const active = e.querySelectorAll("li.active");
      if (!active || !active[0]) {
        return;
      }
      if (e.offsetHeight < active[0].offsetTop + 60) {
        e.scrollTop = active[0].offsetTop - e.offsetHeight + 60;
      }
    });
  }
};
const cmdInit = async () => {
  // 绑定初始值
  if (props.modelValue && props.modelValue.code) {
    // 处理省
    if (props.modelValue.code.length >= 2) {
      const provinceCode = props.modelValue.code.slice(0, 2);
      const provinces = state.datas[0];
      const province = provinces.find(
        (e: AreaDataDto) => e.code === provinceCode
      );
      if (!province) return;
      state.active.push(provinceCode);
      if (props.props.level === 1) return;
      if (province.children && province.children.length > 0) {
        state.datas.push(province.children);
      } else {
        return;
      }
      // 处理市
      if (props.modelValue.code.length >= 4) {
        const cityCode = props.modelValue.code.slice(0, 4);
        const citys = province.children;
        const city = citys.find((e: AreaDataDto) => e.code === cityCode);
        if (!city) return;
        state.active.push(cityCode);
        if (props.props.level === 2) return;
        if (city.children && city.children.length > 0) {
          state.datas.push(city.children);
        } else {
          return;
        }
        // 处理区县
        if (props.modelValue.code.length >= 6) {
          const districtCode = props.modelValue.code.slice(0, 6);
          const districts = city.children;
          const district = districts.find(
            (e: AreaDataDto) => e.code === districtCode
          );
          if (!district) return;
          state.active.push(districtCode);
          if (props.props.level === 3) return;
          if (district.children && district.children.length > 0) {
            state.datas.push(district.children);
          } else {
            return;
          }
          // 处理乡镇
          if (props.modelValue.code.length > 6) {
            const townCode = props.modelValue.code;
            const towns = district.children;
            const town = towns.find((e: AreaDataDto) => e.code === townCode);
            if (!town) return;
            state.active.push(townCode);
          }
        }
      }
    }
  }
};
const close = () => {
  emits("close", state.result);
};
const onChange = () => {
  emits("update:modelValue", state.result);
  emits("change", state.result);
};
const clickItem = async (data: AreaDataDto, index: number) => {
  if (isDisabled(data.code)) {
    return;
  }
  if (index > 3) {
    return;
  }
  clearResult(index);
  if (index === 0) {
    state.result.province = data.name;
  }
  if (index === 1) {
    state.result.city = data.name;
  }
  if (index === 2) {
    state.result.district = data.name;
  }
  if (index === 3) {
    state.result.town = data.name;
  }
  state.result.code = data.code;
  state.datas = state.datas.slice(0, index + 1);
  state.active = state.active.slice(0, index);
  state.active.push(data.code);
  if (props.props.level === index + 1) {
    onChange();
    closePanel();
    return;
  }
  if (props.props.level === 0) {
    onChange();
  }
  if (props.props.townLazy && props.props.lazyLoad && index === 2) {
    if (data.children && data.children.length) {
      state.datas.push(data.children);
    } else {
      state.townLazyLoading = true;
      props.props.lazyLoad(data, resolveTowns);
    }
  } else {
    if (data.children && data.children.length) {
      state.datas.push(data.children);
    } else {
      closePanel();
    }
  }
};
const resolveTowns = async (towns: any) => {
  if (towns && towns.length) {
    let data = state.datas[2].find((e) => e.code === state.active[2]);
    if (data) {
      data.children = towns;
    }
    state.datas.push(towns);
  } else {
    closePanel();
  }
  state.townLazyLoading = false;
};
const clearResult = (index: number) => {
  if (index < 1) {
    state.result.city = "";
  }
  if (index < 2) {
    state.result.district = "";
  }
  if (index < 3) {
    state.result.town = "";
  }
};
const trigger = (_event: Event) => {
  if (!state.showPanel) {
    const dom = areaSelectRef?.value;
    if (!dom || !dom.children[0]) return;
    const triggerDom = dom.children[0];
    const rect = dom.children[0].getBoundingClientRect();
    state.domProps = {
      top: triggerDom.offsetTop,
      left: triggerDom.offsetLeft,
      height: triggerDom.clientHeight,
      width: triggerDom.clientWidth,
      bottom: triggerDom.offsetTop + triggerDom.clientHeight,
      right: triggerDom.offsetLeft + triggerDom.clientWidth,
    };
    if (window.innerHeight - rect.bottom < 200) {
      state.placement = "top";
      state.transition = "area-zoom-in-bottom";
    } else {
      state.placement = "bottom";
      state.transition = "area-zoom-in-top";
    }
    document.addEventListener("click", closePanelListener);
    state.showPanel = true;
    open();
  } else {
    document.removeEventListener("click", closePanelListener);
    state.showPanel = false;
  }
};
const closePanel = () => {
  state.showPanel = false;
  close();
};
const closePanelListener = (e: Event) => {
  const dom = areaSelectRef?.value;
  const panel = areaSelectPanelRef?.value;
  if (!dom || !panel) return;
  if (!dom.contains(e.target) && !panel.contains(e.target)) {
    if (state.showPanel === true) {
      closePanel();
    }
  }
};
const { datas, active, showPanel, transition, placement, townLazyLoading } =
  toRefs(state);
</script>

<style>
.area-select-panel {
  position: absolute;
}
.area-select-panel-content {
  overflow: hidden;
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  display: flex;
  font-size: 14px;
}
.area-select-list {
  min-width: 180px;
  box-sizing: border-box;
  color: #606266;
  border-right: 1px solid #e4e7ed;
  position: relative;
  min-height: 100%;
  margin: 0;
  padding: 6px 0;
  list-style: none;
  box-sizing: border-box;
  height: 220px;
  overflow: auto;
  max-width: 210px;
  position: relative;
  z-index: 1;
}
.area-select-list::-webkit-scrollbar {
  width: 8px;
}

.area-select-list::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: transparent;
  border: 2px solid #ffffff;
  transition: background 0.12s ease-out;
}
.area-select-list:hover::-webkit-scrollbar-thumb {
  background: rgba(144, 147, 153, 0.3);
}
.area-select-list::-webkit-scrollbar-track {
  border-radius: 10px;
  background: transparent;
}
.area-select-list:last-child {
  border-right: none;
}
.area-select-list-item {
  display: flex;
  align-items: center;
  height: 32px;
  line-height: 32px;
  overflow: hidden;
  padding: 0 10px;
  cursor: pointer;
}
.area-select-list-item:hover {
  background-color: #f5f5f5;
}
.area-select-list-item.active {
  color: #409eff;
  font-weight: 700;
}
.area-select-list-item.active .arrow-icon {
  fill: #409eff;
}
.area-select-list-item.disabled .arrow-icon {
  fill: #aaaaaa;
}
.area-select-list-item.disabled {
  color: #aaaaaa;
  cursor: not-allowed;
}
.area-select-list-item span {
  flex: 1;
  flex-wrap: nowrap;
  height: 32px;
  line-height: 32px;
  overflow: hidden;
  margin-right: 10px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.loading-icon {
  width: 14px;
  height: 14px;
  fill: #606266;
}
.arrow-icon {
  width: 14px;
  height: 14px;
  fill: #606266;
}

.area-zoom-in-top-enter-active,
.area-zoom-in-top-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
    opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  transform-origin: center top;
}
.area-zoom-in-top-enter-active[data-popper-placement^="top"],
.area-zoom-in-top-leave-active[data-popper-placement^="top"] {
  transform-origin: center bottom;
}
.area-zoom-in-top-enter-from,
.area-zoom-in-top-leave-active {
  opacity: 0;
  transform: scaleY(0);
}

.area-zoom-in-bottom-enter-active,
.area-zoom-in-bottom-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
    opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  transform-origin: center bottom;
}
.area-zoom-in-bottom-enter-from,
.area-zoom-in-bottom-leave-active {
  opacity: 0;
  transform: scaleY(0);
}
.area-select__arrow {
  position: absolute;
  width: 10px;
  height: 10px;
  z-index: 1;
  left: 0px;
}
.area-select-panel[placement^="bottom"] .area-select__arrow:before {
  border-bottom-color: transparent !important;
  border-right-color: transparent !important;
}
.area-select-panel[placement^="top"] .area-select__arrow:before {
  border-top-color: transparent !important;
  border-left-color: transparent !important;
}
.area-select__arrow:before {
  position: absolute;
  width: 10px;
  height: 10px;
  z-index: -1;
  content: " ";
  transform: rotate(45deg);
  border: 1px solid #e4e7ed;
  background: #ffffff;
  box-sizing: border-box;
}
.area-select-input {
  position: relative;
  display: inline-flex;
  width: 100%;
  height: 32px;
  box-sizing: border-box;
  vertical-align: middle;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  outline: none;
  transition: border 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  color: #606266;
  padding: 1px 11px;
}
.area-select-input.active,
.area-select-input:active,
.area-select-input:focus {
  border-color: #409eff;
}
</style>
