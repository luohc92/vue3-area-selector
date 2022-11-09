<template>
  <div>
    <AreaSelect v-model="area" :props="areaSelectProps"></AreaSelect>
    <p>result：{{ area }}</p>
    <p>* 数据需要符合国家行政区域编码规则</p>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { AreaSelect, AreaSelectPropsDto, AreaSelectResultDto } from "@luohc92/vue3-area-select";
import "@luohc92/vue3-area-select/dist/style.css";
const area = ref<AreaSelectResultDto>();
const areaSelectProps = ref<AreaSelectPropsDto>({
  areaData: [
    {
      code: "11",
      name: "北京市",
      children: [
        {
          code: "1101",
          name: "市辖区",
          children: [
            { code: "110101", name: "东城区" },
            { code: "110102", name: "西城区" },
          ],
        },
      ],
    },
    {
      code: "12",
      name: "天津市",
      children: [
        {
          code: "1201",
          name: "市辖区",
          children: [
            { code: "120101", name: "和平区" },
            { code: "120102", name: "河东区" },
          ],
        },
      ],
    },
  ],
});
</script>
<style scoped>
p {
  color: #666666;
  font-size: 13px;
}
</style>
