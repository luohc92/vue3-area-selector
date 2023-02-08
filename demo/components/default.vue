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
} from "../../packages/index";
const area = ref<AreaSelectorResultDto>();
</script>
