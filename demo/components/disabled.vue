<template>
  <AreaSelector :props="areaSelectProps" v-model="area"> </AreaSelector>
  <p>result：{{ area }}</p>
  <MdEditor v-model="DisabledMd" previewOnly />
</template>

<script setup lang="ts">
import DisabledMd from "../markdown/disabled.md?raw";
import { ref } from "vue";
import {
  AreaSelector,
  AreaSelectorPropsDto,
  AreaSelectorResultDto,
} from "@luohc92/vue3-area-selector";
const areaSelectProps = ref<AreaSelectorPropsDto>({
  disabled: ["1301", "1302"],
});
const area = ref<AreaSelectorResultDto>({
  city: "",
  district: "",
  town: "",
  province: "河北省",
  code: "13",
});
</script>
