<template>
  <div class="app">
    <el-tabs v-model="active">
      <el-tab-pane label="基础使用" name="1">
        <Default />
      </el-tab-pane>
      <el-tab-pane label="限制省/市/区" name="2">
        <Level />
      </el-tab-pane>
      <el-tab-pane label="禁用选项" name="3">
        <Disabled />
      </el-tab-pane>
      <el-tab-pane label="自定义数据" name="4">
        <Customer />
      </el-tab-pane>
      <el-tab-pane label="四级地址选择" name="5">
        <Town />
      </el-tab-pane>
      <el-tab-pane label="自定义触发体" name="6">
        <Trigger  />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Default from "../components/default.vue";
import Level from "../components/level.vue";
import Disabled from "../components/disabled.vue";
import Customer from "../components/customer.vue";
import Town from "../components/town.vue";
import Trigger from "../components/trigger.vue";
const active = ref("1");
</script>
<style>
.app {
  padding: 30px;
  max-width: 800px;
  margin: 0 auto;
}
.m-l-30 {
  margin-left: 30px;
}
.m-b-10 {
  margin-bottom: 10px;
}
p {
  color: #666666;
  font-size: 13px;
}
h5 {
  color: #666666;
}
</style>
