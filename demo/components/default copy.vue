<template>
  <div class="app">
    <AreaSelect
      @change="change"
      @open="open"
      @close="close"
      :props="areaSelectProps"
      v-model="area"
    >
    </AreaSelect>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import {
  AreaSelect,
  AreaDataDto,
  AreaSelectPropsDto,
  AreaSelectResultDto,
  Resolve,
} from "@luohc92/vue3-area-select";
import "@luohc92/vue3-area-select/dist/style.css";
const areaSelectProps = reactive<AreaSelectPropsDto>({
  popperClass: "my-area-popup",
  townLazy: true,
  level: 0,
  showAllLevels: true,
  disabled: [],
  lazyLoad: (node: AreaDataDto, resolve: Resolve) => {
    return setTimeout(() => {
      if (node.code === "110101") {
        const data: AreaDataDto[] = [{ code: "110101001", name: "东华门街道" }];
        resolve(data);
      } else if (node.code === "110102") {
        const data: AreaDataDto[] = [{ code: "110101002", name: "西华门街道" }];
        resolve(data);
      } else {
        resolve();
      }
    }, 2000);
  },
});
const area = ref<AreaSelectResultDto>({
  town: "东华门街道",
  district: "东城区",
  code: "110101001",
  city: "市辖区",
  province: "北京市",
});

const change = (data: AreaSelectResultDto) => {
  console.log(data);
};
const open = () => {
  console.log("open");
};
const close = (data: AreaSelectResultDto) => {
  console.log("close", data);
};
</script>
