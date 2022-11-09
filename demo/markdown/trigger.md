```
<template>
  <div>
    <AreaSelector v-model="area">
      <el-button type="primary" size="default">按钮触发</el-button>
    </AreaSelector>
    <p>result：{{ area }}</p>
    <AreaSelector v-model="area2">
      <el-link>文本触发</el-link>
    </AreaSelector>
    <p>result：{{ area2 }}</p>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import {
  AreaSelector,
  AreaSelectorResultDto,
} from "@luohc92/vue3-area-selector";
import "@luohc92/vue3-area-selector/dist/style.css";
const area = ref<AreaSelectorResultDto>();
const area2 = ref<AreaSelectorResultDto>();
</script>
```
