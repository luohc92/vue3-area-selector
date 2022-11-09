<template>
  <div>
    <h5>方式一：传入自定义四级地址库</h5>
    <AreaSelect v-model="area" :props="areaSelectProps"></AreaSelect>
    <p>result：{{ area }}</p>
    <p>* 数据需要符合国家行政区域编码规则</p>
    <h5>方式二：动态载入四级地址</h5>
    <AreaSelect v-model="area2" :props="area2SelectProps"></AreaSelect>
    <p>result：{{ area2 }}</p>
    <p>* 数据需要符合国家行政区域编码规则</p>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import AreaSelect from "../../packages/areaSelect.vue";
import {
  AreaDataDto,
  AreaSelectPropsDto,
  AreaSelectResultDto,
  Resolve,
} from "@luohc92/vue3-area-select";
import "@luohc92/vue3-area-select/dist/style.css";
const area = ref<AreaSelectResultDto>();
const area2 = ref<AreaSelectResultDto>({
  city: "市辖区",
  district: "朝阳区",
  town: "",
  province: "北京市",
  code: "110105001",
});
const areaSelectProps = ref<AreaSelectPropsDto>({
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
const area2SelectProps = ref<AreaSelectPropsDto>({
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
