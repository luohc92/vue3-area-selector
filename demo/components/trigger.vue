<template>
  <div>
    <AreaSelect v-model="area">
      <el-button type="primary" size="default">按钮触发</el-button>
    </AreaSelect>
    <p>result：{{ area }}</p>
    <AreaSelect v-model="area2">
      <el-link>文本触发</el-link>
    </AreaSelect>
    <p>result：{{ area2 }}</p>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { AreaSelect, AreaSelectResultDto } from "@luohc92/vue3-area-select";
import "@luohc92/vue3-area-select/dist/style.css";
const area = ref<AreaSelectResultDto>();
const area2 = ref<AreaSelectResultDto>();
</script>
