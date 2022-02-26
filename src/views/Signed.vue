<template>
<div class="float-signed">
 <switch-signed></switch-signed>
</div>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="未面试" name="first">
      <el-table :data="signWaitList" style="width: 100%">
        <el-table-column label="姓名" prop="name" />
        <el-table-column label="方向" prop="direction" />
        <el-table-column label="排位" prop="num" />
        <el-table-column label="专业" prop="major" />
        <el-table-column align="right">
          <template #header>
            <el-input
              v-model="search"
              size="small"
              placeholder="Type to search"
            />
          </template>
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-popconfirm
              title="确定通知该同学过来面试吗?"
              confirm-button-text="确认"
              cancel-button-text="返回"
              @confirm="handleDelete(scope.$index, scope.row)"
            >
              <template #reference>
                <el-button size="small" type="danger">发送面试消息</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="已面试" name="second">
      <el-table :data="signPassedList" style="width: 100%">
        <el-table-column label="姓名" prop="name" />
        <el-table-column label="方向" prop="direction" />
        <el-table-column label="排位" prop="num" />
        <el-table-column label="专业" prop="major" />
        <!-- <el-table-column align="right">
          <template #header>
            <el-input
              v-model="search"
              size="small"
              placeholder="Type to search"
            />
          </template>
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >

            <el-popconfirm
              title="Are you sure to delete this?"
              confirm-button-text="确认"
              cancel-button-text="返回"
               @confirm="handleDelete(scope.$index, scope.row)"
            >
              <template #reference>
                <el-button
                  size="small"
                  type="danger"
                  
                  >发送面试消息</el-button
                >
              </template>
            </el-popconfirm>
          </template>
        </el-table-column> -->
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { getSignList, sendSignedMsg, checkIsSigned } from "../request/api";

import { onMounted, reactive, computed, ref} from "vue";

import switchSigned from "../components/switchSigned.vue";

import { ElMessage } from "element-plus";

let signWaitList = reactive([]);
let signPassedList = reactive([]);
let canSigned = ref('1111')
const activeName = ref("first");

onMounted(() => {
  checkIsSigned().then((res) => {
    console.log(res);
    canSigned.value = res.message
  })
  getSignList().then(({ data }) => {
    console.log(data);
    signWaitList.push(...data.waitingList);
    signPassedList.push(...data.passedList);
  });
});

const handleEdit = (index, row) => {
  console.log(index, row);
};

const handleDelete = (index, row) => {
  console.log(row.token);
  sendSignedMsg({
    token: row.token,
    thing2: "学习哦哦哦哦哦",
    thing6: "教室",
    date5: "2022年2月13日",
  }).then((res) => {
    console.log(res);
    if (res.code == "10086") {
      // 发送成功
       ElMessage({
        message: '发送成功',
        type: "success",
      })    
      signWaitList.shift();
    } else {
      // 发送失败
      ElMessage.error(res.message);
    }
  });
  //   console.log(Proxy.token);
};

computed(() => {});
</script>

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  background-color: #f4f5f7;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.float-signed {
  /* position: absolute; */
  width: 100%;
  top: 65px;
  right: 45px;
  z-index: 11;
  /* background-color: red !important; */
}
</style>