```
<template>
  <AreaSelector :props="areaSelectProps" v-model="area"> </AreaSelector>
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

```
