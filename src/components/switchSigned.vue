<template>
  <el-popconfirm title="确定开启签到吗？" @confirm="handleStartSigned">
    <template #reference>
      <el-button class="btn1" type="success" :icon="Check" circle></el-button>
    </template>
  </el-popconfirm>

  <el-popconfirm title="确定关闭签到吗?" @confirm="handleCloseSigned">
    <template #reference>
      <el-button class="btn2" type="danger" :icon="Delete" circle></el-button>
    </template>
  </el-popconfirm>
  <div class="signTip" style="width:100%;">{{ canSigned }}</div>
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

import { startSigned, closeSigned, checkIsSigned } from "../request/api";

import { onMounted, ref } from "vue";

let canSigned = ref("1111");

onMounted(() => {
  checkIsSigned().then((res) => {
    // console.log(res);
    canSigned.value = res.message;
  });
});

function handleStartSigned() {
  startSigned().then((res) => {
    console.log(res);
    if (res.code == 1100) {
      ElMessage({
        message: res.message,
        type: "success",
      });
      checkIsSigned().then((res) => {
        // console.log(res);
        canSigned.value = res.message;
      });
      // setTimeout(() => {
      //   location.reload();
      // }, 500);
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
      checkIsSigned().then((res) => {
        // console.log(res);
        canSigned.value = res.message;
      });
      // setTimeout(() => {
      //   location.reload();
      // }, 500);
    } else {
      ElMessage.error(res.message);
    }
  });
}
</script>

<style>

.btn1, 
.btn2 {
  position: absolute;
}

.btn1 {
  right: 70px
}

.btn2 {
  right: 30px;
}

/* .signTip {
  position: absolute;
  top: 0;
  left: 0;
} */
</style>