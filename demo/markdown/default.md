```
<template>
  <div>
    <AreaSelector v-model="area"></AreaSelector>
    <p>result：{{ area }}</p>
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
</script>

```
