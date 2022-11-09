<template>
  <div>
    <AreaSelect v-model="area"></AreaSelect>
    <p>result：{{ area }}</p>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { AreaSelect, AreaSelectResultDto } from "@luohc92/vue3-area-select";
import "@luohc92/vue3-area-select/dist/style.css";
const area = ref<AreaSelectResultDto>();
</script>
