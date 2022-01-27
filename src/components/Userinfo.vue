<template>
  <!-- <el-button type="text" @click="dialogVisible = true"
    >click to open the Dialog</el-button
  > -->
  <el-icon :size="20" @click="dialogVisible = true">
      <Avatar/>
    </el-icon>
    <el-dialog
    v-model="dialogVisible"
    title="账号信息"
  >
    <span>姓名:</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="danger" @click="handleClose">退出登录</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, getCurrentInstance  } from 'vue'
import {useRouter} from 'vue-router'
import { ElMessageBox } from 'element-plus'
import {Avatar} from '@element-plus/icons-vue'
import store from '../store/index'
export default {
    name: 'Userinfo',
    components: {
        Avatar
    },
    setup(props) {
        // 获取在vue原型上挂载的对象
        const { proxy } = getCurrentInstance();
        const router = useRouter();
        const dialogVisible = ref(false)

        const handleClose = () => {
            console.log(store.state.count)
            console.log(proxy.$X.state.count);
            dialogVisible.value = false
            sessionStorage.clear();
            location.reload()
                  // router.go(-9999)
            // ElMessageBox.confirm(
            //   '确定退出登录？',
            //   '提醒',
            //   {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning',
            //   })
            //     .then(() => {
            //       // dialogVisible = false
            //       // sessionStorage.clear();
            //       // location.reload()
            //       // router.go(-9999)
            //       // done()
            //     })
            //     .catch(() => {
            //     // catch error
            //     })
            
            }
            

        return{
            dialogVisible,
            handleClose
        }
    }
}
</script>

<style>

</style>