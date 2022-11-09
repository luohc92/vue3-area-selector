<template>
  <AreaSelect :props="areaSelectProps" v-model="area"> </AreaSelect>
  <p>result：{{ area }}</p>
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
  disabled: ["1301", "1302"],
});
const area = ref<AreaSelectResultDto>({
  city: "",
  district: "",
  town: "",
  province: "河北省",
  code: "13",
});
</script>
