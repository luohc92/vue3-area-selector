```
<template>
  <div>
    <h5>方式二：动态载入四级地址</h5>
    <p>* 请选择北京市 市辖区 东城区/西城区</p>
    <AreaSelector v-model="area" :props="areaSelectProps"></AreaSelector>
    <p>result：{{ area }}</p>
    <p>* 数据需要符合国家行政区域编码规则</p>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import {
  AreaSelector,
  AreaDataDto,
  AreaSelectorPropsDto,
  AreaSelectorResultDto,
  Resolve,
} from "@luohc92/vue3-area-selector";
import "@luohc92/vue3-area-selector/dist/style.css";
const area = ref<AreaSelectorResultDto>();
const areaSelectProps = ref<AreaSelectorPropsDto>({
  townLazy: true,
  lazyLoad: (node: AreaDataDto, resolve: Resolve) => {
    return setTimeout(() => {
      if (node.code === "110101") {
        const data: AreaDataDto[] = [{ code: "110101001", name: "东华门街道" }];
        resolve(data);
      } else if (node.code === "110102") {
        const data: AreaDataDto[] = [{ code: "110101002", name: "西华门街道" }];
        resolve(data);
      } else {
        resolve();
      }
    }, 2000);
  },
});
</script>

```
