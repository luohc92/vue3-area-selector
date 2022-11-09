<template>
  <span class="area-selector" @click="trigger" ref="areaSelectRef">
    <slot v-if="$slots.default" />
    <input
      v-else
      autocomplete="off"
      class="area-selector-input"
      :class="{ active: showPanel }"
      v-model="valueString"
    />
    <Teleport to="body">
      <transition :name="transition">
        <div
          :class="['area-selector-panel', state.props.popperClass]"
          :placement="placement"
          ref="areaSelectPanelRef"
          v-if="showPanel"
          :style="panelstyle"
        >
          <span class="area-selector__arrow" :style="arrowStyle"></span>
          <div class="area-selector-panel-content">
            <ul
              class="area-selector-list"
              v-if="
                provinces &&
                provinces.length > 0 &&
                state.props.level != undefined &&
                (state.props.level === 0 || state.props.level > 0)
              "
              ref="provinceSelectListRef"
            >
              <li
                v-for="a in provinces"
                :key="a.code"
                class="area-selector-list-item"
                :class="{
                  active: a.code === provinceCode,
                  disabled: isDisabled(a.code),
                }"
                @click="clickItem(a, 0)"
              >
                <span>{{ a.name }}</span>
                <arrow
                  class="arrow-icon"
                  v-if="
                    state.props.level != undefined &&
                    (state.props.level === 0 || state.props.level > 1)
                  "
                ></arrow>
              </li>
            </ul>
            <ul
              class="area-selector-list"
              v-if="
                cities &&
                cities.length > 0 &&
                state.props.level != undefined &&
                (state.props.level === 0 || state.props.level > 1)
              "
              ref="citySelectListRef"
            >
              <li
                v-for="a in cities"
                :key="a.code"
                class="area-selector-list-item"
                :class="{
                  active: a.code === cityCode,
                  disabled: isDisabled(a.code),
                }"
                @click="clickItem(a, 1)"
              >
                <span>{{ a.name }}</span>
                <arrow
                  class="arrow-icon"
                  v-if="
                    state.props.level != undefined &&
                    (state.props.level === 0 || state.props.level > 2)
                  "
                ></arrow>
              </li>
            </ul>
            <ul
              class="area-selector-list"
              v-if="
                districts &&
                districts.length > 0 &&
                state.props.level != undefined &&
                (state.props.level === 0 || state.props.level > 2)
              "
              ref="districtSelectListRef"
            >
              <li
                v-for="a in districts"
                :key="a.code"
                class="area-selector-list-item"
                :class="{
                  active: a.code === districtCode,
                  disabled: isDisabled(a.code),
                }"
                @click="clickItem(a, 2)"
              >
                <span>{{ a.name }}</span>
                <loading
                  class="loading-icon"
                  v-if="townLazyLoading && a.code === districtCode"
                ></loading>
                <template v-else>
                  <arrow
                    class="arrow-icon"
                    v-if="
                      state.props.level != undefined &&
                      (state.props.level === 0 || state.props.level > 3) &&
                      state.props.townLazy &&
                      state.props.lazyLoad
                    "
                  ></arrow>
                </template>
              </li>
            </ul>
            <ul
              class="area-selector-list"
              v-if="
                towns &&
                towns.length > 0 &&
                state.props.level != undefined &&
                (state.props.level === 0 || state.props.level > 3)
              "
              ref="townSelectListRef"
            >
              <li
                v-for="a in towns"
                :key="a.code"
                class="area-selector-list-item"
                :class="{
                  active: a.code === townCode,
                  disabled: isDisabled(a.code),
                }"
                @click="clickItem(a, 3)"
              >
                <span>{{ a.name }}</span>
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
import { areaDataJson } from "./data";
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
  AreaSelectorPropsDto,
  DomPropsDto,
  AreaSelectorResultDto,
} from "./types";
const props = defineProps({
  props: {
    type: Object as PropType<AreaSelectorPropsDto>,
    default: {},
  },
  modelValue: {
    type: Object as PropType<AreaSelectorResultDto>,
    default: () => {},
  },
});
const state = reactive({
  initProps: {
    level: 0,
    showAllLevels: true,
    townLazy: false,
  },
  props: {} as AreaSelectorPropsDto,
  townLazyLoading: false,
  provinces: [] as AreaDataDto[],
  provinceCode: "",
  cities: [] as AreaDataDto[],
  cityCode: "",
  districts: [] as AreaDataDto[],
  districtCode: "",
  towns: [] as AreaDataDto[],
  townCode: "",
  result: {} as AreaSelectorResultDto,
  active: [] as string[],
  showPanel: false,
  transition: "area-zoom-in-top",
  domProps: {} as DomPropsDto,
  placement: "bottom",
  panelWidth: 0,
  callBack: null as unknown as (
    data: AreaDataDto,
    towns?: AreaDataDto[]
  ) => void,
  initCallBack: null as unknown as (
    data: AreaDataDto,
    towns?: AreaDataDto[]
  ) => void,
});
state.props = { ...state.initProps, ...props.props };
const areaSelectRef = ref();
const areaSelectPanelRef = ref();
const provinceSelectListRef = ref();
const citySelectListRef = ref();
const districtSelectListRef = ref();
const townSelectListRef = ref();
const valueString = computed(() => {
  if (props.modelValue && props.modelValue.code) {
    let result = "";
    if (props.modelValue.province) {
      if (!state.props.showAllLevels) {
        result = props.modelValue.province;
      } else {
        result += props.modelValue.province;
      }
    }
    if (props.modelValue.city) {
      if (!state.props.showAllLevels) {
        result = props.modelValue.city;
      } else {
        result += " / " + props.modelValue.city;
      }
    }
    if (props.modelValue.district) {
      if (!state.props.showAllLevels) {
        result = props.modelValue.district;
      } else {
        result += " / " + props.modelValue.district;
      }
    }
    if (props.modelValue.town) {
      if (!state.props.showAllLevels) {
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
  [
    () => state.cities.length,
    () => state.districts.length,
    () => state.towns.length,
  ],
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
    if (props.modelValue) {
      state.result = JSON.parse(JSON.stringify(props.modelValue));
    } else {
      state.result = {} as AreaSelectorResultDto;
    }
  },
  { immediate: true }
);
const isDisabled = (code: string) => {
  if (state.props.disabled) {
    const idx = state.props.disabled.findIndex((e: string) => e === code);
    return idx >= 0;
  }
  return false;
};
const emits = defineEmits(["update:modelValue", "change", "open", "close"]);
const open = () => {
  // 初始化
  state.active = [];
  state.provinces = [];
  state.props = { ...state.initProps, ...props.props };
  if (state.props.areaData) {
    state.provinces = state.props.areaData;
  } else {
    state.provinces = areaDataJson;
  }
  cmdInit();
  emits("open");
  nextTick(() => {
    if (provinceSelectListRef.value) {
      scrollToActive(provinceSelectListRef.value);
    }
    if (citySelectListRef.value) {
      scrollToActive(citySelectListRef.value);
    }
    if (districtSelectListRef.value) {
      scrollToActive(districtSelectListRef.value);
    }
    if (townSelectListRef.value) {
      scrollToActive(townSelectListRef.value);
    }
  });
};
const scrollToActive = (e: any) => {
  if (e) {
    const active = e.querySelectorAll("li.active");
    if (!active || !active[0]) {
      return;
    }
    if (e.offsetHeight < active[0].offsetTop + 60) {
      e.scrollTop = active[0].offsetTop - e.offsetHeight + 60;
    }
  }
};
const cmdInit = async () => {
  // 绑定初始值
  if (props.modelValue && props.modelValue.code) {
    // 处理省
    if (props.modelValue.code.length >= 2) {
      const provinceCode = props.modelValue.code.slice(0, 2);
      const province = state.provinces.find(
        (e: AreaDataDto) => e.code === provinceCode
      );
      if (!province) return;
      state.provinceCode = provinceCode;
      if (state.props.level === 1) return;
      if (province.children && province.children.length > 0) {
        state.cities = province.children;
      } else {
        state.cities = [];
        return;
      }
      // 处理市
      if (props.modelValue.code.length >= 4) {
        const cityCode = props.modelValue.code.slice(0, 4);
        const city = state.cities.find((e: AreaDataDto) => e.code === cityCode);
        if (!city) return;
        state.cityCode = cityCode;
        if (state.props.level === 2) return;
        if (city.children && city.children.length > 0) {
          state.districts = city.children;
        } else {
          state.districts = [];
          return;
        }
        // 处理区县
        if (props.modelValue.code.length >= 6) {
          const districtCode = props.modelValue.code.slice(0, 6);
          const district = state.districts.find(
            (e: AreaDataDto) => e.code === districtCode
          );
          if (!district) return;
          state.districtCode = districtCode;
          if (state.props.level === 3) return;
          if (district.children && district.children.length > 0) {
            state.towns = district.children;
          } else {
            state.towns = [];
            if (!state.props.townLazy || !state.props.lazyLoad) {
              return;
            }
          }
          // 处理乡镇
          if (props.modelValue.code.length > 6) {
            const townCode = props.modelValue.code;
            let towns = state.towns;
            if (state.props.townLazy && state.props.lazyLoad) {
              state.initCallBack = initTownLazyLoadCallBack;
              state.towns = [];
              state.townLazyLoading = true;
              state.props.lazyLoad(district, (datas?: AreaDataDto[]) => {
                if (state.initCallBack) {
                  state.initCallBack(district, datas);
                }
              });
            } else {
              const town = towns?.find((e: AreaDataDto) => e.code === townCode);
              if (!town) return;
              state.townCode = townCode;
            }
          }
        }
      }
    }
  }
};
const initTownLazyLoadCallBack = (
  district: AreaDataDto,
  datas?: AreaDataDto[]
) => {
  const townCode = props.modelValue.code;
  let towns = state.towns;
  state.towns = [];
  if (state.showPanel && state.districtCode === district.code) {
    towns = datas || [];
    if (towns.length > 0) {
      state.towns = towns;
      district.children = towns;
    }
    state.townLazyLoading = false;
  }
  const town = towns?.find((e: AreaDataDto) => e.code === townCode);
  if (!town) return;
  state.townCode = townCode;
};
const close = () => {
  const result: AreaSelectorResultDto = state.result;
  emits("close", result);
};
const onChange = () => {
  const result: AreaSelectorResultDto = state.result;
  emits("update:modelValue", result);
  emits("change", result);
};
const clickItem = async (data: AreaDataDto, index: number) => {
  if (isDisabled(data.code)) {
    return;
  }
  clearResult(index);
  if (index === 0) {
    state.result.province = data.name;
    state.provinceCode = data.code;
    if (
      data.children &&
      state.props.level != undefined &&
      (state.props.level > index + 1 || state.props.level === 0)
    ) {
      state.cities = data.children;
    } else {
      state.cities = [];
    }
  }
  if (index === 1) {
    state.result.city = data.name;
    state.cityCode = data.code;
    if (
      data.children &&
      state.props.level != undefined &&
      (state.props.level > index + 1 || state.props.level === 0)
    ) {
      state.districts = data.children;
    } else {
      state.districts = [];
    }
  }
  if (index === 2) {
    state.result.district = data.name;
    state.districtCode = data.code;
    if (
      data.children &&
      state.props.level != undefined &&
      (state.props.level > index + 1 || state.props.level === 0)
    ) {
      state.towns = data.children;
    } else {
      state.towns = [];
    }
  }
  if (index === 3) {
    state.result.town = data.name;
    state.townCode = data.code;
  }
  state.result.code = data.code;
  if (state.props.level === index + 1) {
    onChange();
    closePanel();
    return;
  }
  if (state.props.level === 0) {
    onChange();
  }
  if (index >= 0 && index < 2) {
    return;
  }
  if (state.props.townLazy && state.props.lazyLoad && index === 2) {
    if (data.children && data.children.length) {
      state.towns = data.children;
      state.townLazyLoading = false;
    } else {
      state.townLazyLoading = true;
      state.towns = [];
      state.callBack = layzLoadCallBack;
      state.props.lazyLoad(data, (towns?: AreaDataDto[]) => {
        if (state.callBack) {
          state.callBack(data, towns);
        }
      });
    }
  } else {
    if (data.children && data.children.length && index === 2) {
      state.towns = data.children;
    } else {
      state.towns = [];
      closePanel();
      if (state.props.level === 4) {
        onChange();
      }
    }
  }
};
const layzLoadCallBack = (data: AreaDataDto, towns?: AreaDataDto[]) => {
  if (state.showPanel && state.districtCode === data.code) {
    let data = state.districts.find((e) => e.code === state.districtCode);
    if (data) {
      if (towns && towns.length) {
        data.children = towns;
        state.towns = towns;
      } else {
        data.children = [];
        closePanel();
      }
    }
    state.townLazyLoading = false;
  }
};
const clearResult = (index: number) => {
  if (index < 1) {
    state.result.city = "";
    state.cities = [];
    state.cityCode = "";
  }
  if (index < 2) {
    state.result.district = "";
    state.districts = [];
    state.districtCode = "";
  }
  if (index < 3) {
    state.result.town = "";
    state.towns = [];
    state.townCode = "";
  }
};
const _resizeHandler = () => {
  if (state.showPanel) {
    const dom = areaSelectRef?.value;
    if (!dom || !dom.children[0]) return;
    const rect = dom.children[0].getBoundingClientRect();
    state.domProps = {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      height: rect.height,
      width: rect.width,
      bottom: rect.top + window.scrollY + rect.height,
      right: rect.left + window.scrollX + rect.width,
    };
  }
};
const trigger = (_event: Event) => {
  if (!state.showPanel) {
    window.addEventListener("resize", _resizeHandler);
    const dom = areaSelectRef?.value;
    if (!dom || !dom.children[0]) return;
    const rect = dom.children[0].getBoundingClientRect();
    state.domProps = {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      height: rect.height,
      width: rect.width,
      bottom: rect.top + window.scrollY + rect.height,
      right: rect.left + window.scrollX + rect.width,
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
    closePanel();
  }
};
const closePanel = () => {
  state.showPanel = false;
  state.townLazyLoading = false;
  state.callBack = null as unknown as (
    data: AreaDataDto,
    towns?: AreaDataDto[]
  ) => void;
  state.initCallBack = null as unknown as (
    data: AreaDataDto,
    towns?: AreaDataDto[]
  ) => void;
  window.removeEventListener("resize", _resizeHandler);
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
const {
  showPanel,
  transition,
  placement,
  townLazyLoading,
  provinces,
  provinceCode,
  cities,
  cityCode,
  districts,
  districtCode,
  towns,
  townCode,
} = toRefs(state);
</script>

<style>
.area-selector-panel {
  position: absolute;
  z-index: 1001;
}
.area-selector-panel-content {
  overflow: hidden;
  background: #fff;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  display: flex;
  font-size: 14px;
}
.area-selector-list {
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
.area-selector-list::-webkit-scrollbar {
  width: 8px;
}

.area-selector-list::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: transparent;
  border: 2px solid #ffffff;
  transition: background 0.12s ease-out;
}
.area-selector-list:hover::-webkit-scrollbar-thumb {
  background: rgba(144, 147, 153, 0.3);
}
.area-selector-list::-webkit-scrollbar-track {
  border-radius: 10px;
  background: transparent;
}
.area-selector-list:last-child {
  border-right: none;
}
.area-selector-list-item {
  display: flex;
  align-items: center;
  height: 32px;
  line-height: 32px;
  overflow: hidden;
  padding: 0 10px;
  cursor: pointer;
}
.area-selector-list-item:hover {
  background-color: #f5f5f5;
}
.area-selector-list-item.active {
  color: #409eff;
  font-weight: 700;
}
.area-selector-list-item.active .arrow-icon {
  fill: #409eff;
}
.area-selector-list-item.disabled .arrow-icon {
  fill: #aaaaaa;
}
.area-selector-list-item.disabled {
  color: #aaaaaa;
  cursor: not-allowed;
}
.area-selector-list-item span {
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
.area-selector__arrow {
  position: absolute;
  width: 10px;
  height: 10px;
  z-index: 1;
  left: 0px;
}
.area-selector-panel[placement^="bottom"] .area-selector__arrow:before {
  border-bottom-color: transparent !important;
  border-right-color: transparent !important;
}
.area-selector-panel[placement^="top"] .area-selector__arrow:before {
  border-top-color: transparent !important;
  border-left-color: transparent !important;
}
.area-selector__arrow:before {
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
.area-selector-input {
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
.area-selector-input.active,
.area-selector-input:active,
.area-selector-input:focus {
  border-color: #409eff;
}
</style>
