<template>
  <div>{{ allStatus[statusId] }}</div>
  <el-row style="justify-content: space-around">
    <el-col :sm="12" :lg="6">
      <el-result
        icon="success"
        title="注意！"
        sub-title="Please follow the instructions"
      >
        <template #extra>
          <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            title="确定切换下一状态吗?"
            @confirm="nextStatus"
          >
            <template #reference>
              <el-button type="primary">切换下一状态</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-result>
    </el-col>
    <el-col :sm="12" :lg="6">
      <el-result
        icon="warning"
        title="注意注意注意！"
        sub-title="该功能只用于测试"
      >
        <template #extra>
          <el-popconfirm
            title="确定返回上一状态吗？"
            confirm-button-text="Yes"
            cancel-button-text="No"
            @confirm="previousStatus"
          >
            <template #reference>
              <el-button type="primary">回退上一状态</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-result>
    </el-col>
  </el-row>
</template>

<script setup>
import {
  getCurrentStatus,
  updateStatus,
  toPreviousStatus,
  logout,
} from "../request/api";
import { ref, onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";

let status = ref("加载中");

let allStatus = reactive([
  "招新未开始",
  "招新报名开始",
  "笔试",
  "面试",
  "一轮考核",
  "二轮考核",
]);

let statusId = ref(null);

onMounted(() => {
  getCurrentStatus().then(({ data }) => {
    console.log(data);
    statusId.value = data.id - 1;
    status.value = data.status;
  });
});

function nextStatus() {
  updateStatus().then((res) => {
    // console.log(res);
    if (res.code == 1700) {
      ElMessage({
        message: res.message,
        type: "success",
      });
      statusId.value = statusId.value + 1;
    } else {
      ElMessage.error(res.message);
    }
  });
}

function previousStatus() {
  toPreviousStatus().then((res) => {
    console.log(res);
    if (res.code == 1701) {
      ElMessage({
        message: res.message,
        type: "success",
      });
      statusId.value = statusId.value - 1;
    } else {
      ElMessage.error(res.message);
    }
  });
}
</script>

<style>
</style>