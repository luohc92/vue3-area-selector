# @luohc92/vue3-area-selector

a area selector for vue3.x

一款 vue3.0 的地址选择器，默认支持三级地址选择，可动态添加四级地址选择，支持双向绑定

## Install 安装

```
npm install @luohc92/vue3-area-selector
```

## Usage 按需使用方法

```
import {
 AreaSelector,
} from "@luohc92/vue3-area-selector";
import "@luohc92/vue3-area-selector/dist/style.css";
```

## Usage 全局使用方法

```
在main.js中引入

import AreaSelector from "@luohc92/vue3-area-selector";
import "@luohc92/vue3-area-selector/dist/style.css";
const app = createApp(App);
app.use(AreaSelector);
```

## Example 示例

```
<template>
  <div class="app">
    <AreaSelector
      @change="change"
      @open="open"
      @close="close"
      :props="areaSelectProps"
      v-model="area"
    >
    </AreaSelector>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import {
  AreaSelector,
  AreaDataDto,
  AreaSelectorPropsDto,
  AreaSelectorResultDto,
  Resolve,
} from "@luohc92/vue3-area-selector";
import "@luohc92/vue3-area-selector/dist/style.css";
const areaSelectProps = reactive<AreaSelectorPropsDto>({
  popperClass: "my-area-popup",
  townLazy: true,
  level: 0,
  showAllLevels: true,
  disabled: [],
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
const area = ref<AreaSelectorResultDto>({
  town: "东华门街道",
  district: "东城区",
  code: "110101001",
  city: "市辖区",
  province: "北京市",
});

const change = (data: AreaSelectorResultDto) => {
  console.log(data);
};
const open = () => {
  console.log("open");
};
const close = (data: AreaSelectorResultDto) => {
  console.log("close", data);
};
</script>
```

### Attributes 属性

| Name    | Type       | Required | Description                                   | Default                       |
| ------- | ---------- | -------- | --------------------------------------------- | ----------------------------- |
| v-model | AreaSelectorResultDto  | true    | binding value 选中项绑定值                    |                               |
| clearable | Boolean | false    | 是否可以清空选项       |             false                  |
| disable | Boolean | false    | 是否禁用       |             false                  |
| placeholder | String | false    | 占位文字       |             '请选择'                  |
| props   | 具体见下表 | false    |                                               |                               |

### Props 属性

| Keyboard      | Type                    | Required | Description                                                                                                                                                                               | Default |
| ------------- | ----------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| level         | Number                  | false    | selection level 选择器级别： 1 省 / 2 市 / 3 区县 / 0 不限制                                                                                                                              | 0       |
| showAllLevels | Boolean                 | false    | display only the last level 显示路径 true 完整路径 / false 显示最后一级                                                                                                                   | true    |
| popperClass   | String                  | false    | popup class 自定义浮层类名                                                                                                                                                                |         |
| disabled      | Number[]                | false    | disabled array 禁用对象数组                                                                                                                                                               |         |
| townLazy      | Boolean                 | false    | dynamic load towns nodes 加载动态四级乡镇数据                                                                                                                                             | false   |
| lazyLoad      | Function(node, resolve) | false    | method for loading towns nodes data, only works when townLazy is true 加载动态四级乡镇的方法，仅在 townLazy 为 true 时有效，node 为当前点击的节点，resolve 为数据加载完成的回调(必须调用) |         |
| areaData      | AreaDataDto[]           | false    | 自定义区域数据，最多四 级               |         |

## Events
| Name    | Description                                   | Parameters                       |
| ------- | --------------------------------------------- | ----------------------------- |
| change  | change function callback 当选中节点变化时触发 | chang node value 选中节点的值 |
| open    | when popup open callback 当选择窗打开时触发   |                               |
| close   | when popup close callback 当选择窗关闭时触发  |                               |
| clearable   | when clear callback 当清空时触发  |                               |

## Slot 
| Name                    | Description                                   |
| -------------- |------------------------------------------------- | 
| — | HTML element that triggers area selector 触发地址选择器显示的 HTML 元素 | 