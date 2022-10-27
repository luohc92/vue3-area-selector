<template>
  <div class="app">
    <div class="html">
      <div class="a"></div>
      <AreaSelect
        @change="change"
        @open="open"
        :props="areaSelectProps"
        v-model="area1"
      >
      </AreaSelect>
      <div class="h2"></div>
      <AreaSelect
        :props="areaSelectProps"
        @change="change2"
        @close="close2"
        v-model="area2"
      >
        <el-button type="primary" size="default">22</el-button>
      </AreaSelect>
      <div class="h2"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import areaData from "./assets/data.json";
import { AreaSelect, AreaSelectPropsDto, AreaSelectResultDto } from "@luohc92/vue3-area-select";
import "@luohc92/vue3-area-select/dist/style.css";
const areaSelectProps = reactive<AreaSelectPropsDto>({
  level: 3,
  showAllLevels: true,
  popperClass: "abcd",
  areaData: areaData,
  townLazy: true,
  disabled: ["1101", "110101001"],
  lazyLoad: (node: any, resolve: any) => {
    setTimeout(() => {
      resolve([{ code: "110101001", name: "东华门街道" }]);
    }, 2000);
  },
});
const area1 = ref<AreaSelectResultDto>({
  town: "平坦镇",
  district: "郊区",
  code: "140311103",
  city: "阳泉市",
  province: "山西省",
});
const areaData2 = ref([{ code: "11", name: "北京市" }]);
const area2 = ref({
  town: "平坦镇",
  district: "郊区",
  code: "140311103",
  city: "阳泉市",
  province: "山西省",
});
const change = (e: any) => {
  console.log(e);
};
const open = () => {
  console.log("open");
};
const close = (e: any) => {
  console.log("close", e);
};
const change2 = (e: any) => {
  console.log(e);
};
const open2 = () => {
  console.log("open");
};
const close2 = (e: any) => {
  console.log("close", e);
};
</script>

<style scoped>
.html {
  padding: 50px;
}
.a {
  height: 25px;
}
.h2 {
  height: 600px;
}
.app {
  padding-top: 150px;
  padding-left: 90px;
}
</style>
