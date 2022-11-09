<template>
  <div class="m-b-10">
    <el-radio-group v-model="areaSelectProps.level">
      <el-radio :label="1">省</el-radio>
      <el-radio :label="2">市</el-radio>
      <el-radio :label="3">区县</el-radio>
      <el-radio :label="0">不限</el-radio>
    </el-radio-group>
    <el-checkbox v-model="areaSelectProps.showAllLevels" class="m-l-30">
      显示完整路径
    </el-checkbox>
  </div>
  <AreaSelect
    @change="change"
    @open="open"
    @close="close"
    :props="areaSelectProps"
    v-model="area"
  >
  </AreaSelect>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AreaSelect from "../../packages/areaSelect.vue";
// import {
//   AreaSelect,
//   AreaSelectPropsDto,
//   AreaSelectResultDto,
// } from "@luohc92/vue3-area-select";
import "@luohc92/vue3-area-select/dist/style.css";
import { AreaSelectPropsDto, AreaSelectResultDto } from "../../packages/types";
const areaSelectProps = ref<AreaSelectPropsDto>({
  level: 1,
  showAllLevels: true,
});
const area = ref<AreaSelectResultDto>();
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
