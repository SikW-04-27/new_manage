<template>
    
    <el-tooltip
        class="box-item"
        content="推送消息给全部用户"
        placement="left-start"
      >
        <el-button type="primary" :icon="Message" circle @click="dialogVisible = true"></el-button>
      </el-tooltip>
    
      <el-dialog
        v-model="dialogVisible"
        title="推送信息给全体同学"
        width="30%"
    >
        <el-input 
            type="textarea" 
            autosize     
            placeholder="请输入要发送的内容" 
            v-model="message"
        ></el-input>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
              <el-popconfirm 
                confirm-button-text="确认"
                cancel-button-text="返回"
                title="注意：此操作不可撤回" 
                icon-color="red"
                :icon="InfoFilled"
                @confirm="send_message()">
                    <template #reference>
                        <el-button type="primary">发送</el-button>
                    </template>
                </el-popconfirm>
        </span>
        </template>
    </el-dialog>
</template>

<script>
import {Message, InfoFilled} from '@element-plus/icons-vue'
import { ElLoading } from "element-plus";
import { ref, getCurrentInstance } from 'vue-demi'
import {pushToAll} from '../request/api'
export default {
    setup(){
        const { proxy } = getCurrentInstance();
        let dialogVisible = ref(false)
        let message = ref('')

        let send_message = function(){
            let loadingInstance = ElLoading.service({fullscreen: true,background: "rgba(55, 55, 55, 0.699)",});
            pushToAll({
                content: message.value
            }).then(res => {
                if(res.code === 1905){
                    loadingInstance.close()
                    proxy.$X.showmes('warning', res.messag)
                }else{
                    loadingInstance.close()
                    message.value = ''
                    proxy.$X.showmes('success', '推送成功')
                    dialogVisible.value = false
                }
                
            }).catch(err=>{
                loadingInstance.close()
                proxy.$X.showmes('error', '推送失败')
            })
            
        }

        return {
            Message,
            InfoFilled,
            dialogVisible,
            message,
            send_message
        }
    }
}
</script>

<style>

</style>