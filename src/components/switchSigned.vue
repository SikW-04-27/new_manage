<template>
  <el-popconfirm title="确定开启签到吗？" @confirm="handleStartSigned">
    <template #reference>
      <el-button type="success" :icon="Check" circle></el-button>
    </template>
  </el-popconfirm>

  <el-popconfirm title="确定关闭签到吗?" @confirm="handleCloseSigned">
    <template #reference>
      <el-button type="danger" :icon="Delete" circle></el-button>
    </template>
  </el-popconfirm>
</template>

<script setup>
import {
  Search,
  Edit,
  Check,
  Message,
  Star,
  Delete,
} from "@element-plus/icons-vue";

import { ElMessage } from "element-plus";

import { startSigned, closeSigned } from "../request/api";

function handleStartSigned() {
  startSigned().then((res) => {
    console.log(res);
    if (res.code == 1100) {
      ElMessage({
        message: res.message,
        type: "success",
      });
      setTimeout(() => {
        location.reload();
      }, 500);
    } else {
      ElMessage.error(res.message);
    }
  });
}

function handleCloseSigned() {
  closeSigned().then((res) => {
    console.log(res);
    if (res.code == 1104) {
      ElMessage({
        message: res.message,
        type: "success",
      });
      setTimeout(() => {
        location.reload();
      }, 500);
    } else {
      ElMessage.error(res.message);
    }
  });
}
</script>

<style>
</style>