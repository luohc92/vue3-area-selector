```
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
  <AreaSelector
    @change="change"
    @open="open"
    @close="close"
    :props="areaSelectProps"
    v-model="area"
  >
  </AreaSelector>
  <p>result：{{ area }}</p>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  AreaSelector,
  AreaSelectorPropsDto,
  AreaSelectorResultDto,
} from "@luohc92/vue3-area-selector";
import "@luohc92/vue3-area-selector/dist/style.css";
const areaSelectProps = ref<AreaSelectorPropsDto>({
  level: 1,
  showAllLevels: true,
});
const area = ref<AreaSelectorResultDto>();
const change = (data: AreaSelectorResultDto) => {
  console.log(data);
};
const open = () => {
  console.log("open");
};
const close = (data: AreaSelectorResultDto) => {
  console.log("close", data);
};
</script>


```
