<template>
  <div>
    <AreaSelector v-model="area"></AreaSelector>
    <p>result：{{ area }}</p>
    <MdEditor v-model="DefaultMd" previewOnly />
  </div>
</template>
<script setup lang="ts">
import DefaultMd from "../markdown/default.md?raw";
import { ref } from "vue";
import {
  AreaSelector,
  AreaSelectorResultDto,
} from "@luohc92/vue3-area-selector";
import "@luohc92/vue3-area-selector/dist/style.css";
const area = ref<AreaSelectorResultDto>();
</script>
