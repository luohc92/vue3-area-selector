```
<template>
  <div>
    <h5>方式一：传入自定义四级地址库</h5>
    <AreaSelector v-model="area" :props="areaSelectProps"></AreaSelector>
    <p>result：{{ area }}</p>
    <p>* 数据需要符合国家行政区域编码规则</p>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import {
  AreaSelector,
  AreaSelectorPropsDto,
  AreaSelectorResultDto,
} from "@luohc92/vue3-area-selector";
import "@luohc92/vue3-area-selector/dist/style.css";
const area = ref<AreaSelectorResultDto>();
const areaSelectProps = ref<AreaSelectorPropsDto>({
  areaData: [
    {
      code: "13",
      name: "河北省",
      children: [
        {
          code: "1301",
          name: "石家庄市",
          children: [
            {
              code: "130102",
              name: "长安区",
              children: [{ code: "130102001", name: "建北街道" }],
            },
          ],
        },
      ],
    },
  ],
});
</script>

```
