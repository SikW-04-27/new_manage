<template>
    <el-tooltip
        class="box-item"
        content="推送结果"
        placement="left-start"
      >
        <el-button type="danger" :icon="Tickets" circle @click="dialogVisible = true"></el-button>
      </el-tooltip>
    
    <el-dialog
        v-model="dialogVisible"
        title="推送结果"
        width="30%"
    >
        <el-input 
            type="textarea" 
            autosize     
            placeholder="请输入通过消息" 
            v-model="win_message"
        ></el-input><br/><br/>
        <el-input 
            type="textarea" 
            autosize     
            placeholder="请输入淘汰消息" 
            v-model="lose_message"
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
                @confirm="push_message()">
                    <template #reference>
                        <el-button type="primary">发送</el-button>
                    </template>
                </el-popconfirm>
        </span>
        </template>
    </el-dialog>
</template>

<script>
import {ref, getCurrentInstance} from 'vue'
import {pushToAll,message_push,pass,listAllUser,closeQueue} from '../request/api'
import {Tickets, InfoFilled} from '@element-plus/icons-vue'
export default {
    setup(){
        const { proxy } = getCurrentInstance();
        let dialogVisible = ref(false)
        let win_message = ref('')
        let lose_message = ref('')

        let push_message = () => {
            
            if(win_message.value && lose_message.value){
                message_push({
                    passContent: win_message.value,
                    eliminateContent: lose_message.value,
                }).then(res=>{
                    if(res.code == 1800){
                        
                        closeQueue().then(res=>{
                            win_message.value = ''
                            lose_message.value = ''
                            location.reload()
                            proxy.$X.showmes('success', '推送成功')
                        })
                        
                    }else if(res.code == 1902){
                        proxy.$X.showmes('warning', res.message)
                    }
                    console.log(res);
                }).catch(err=>{
                    if(err.data.code ===1904){
                        proxy.$X.showmes('error', err.data.message)
                    }else{
                        proxy.$X.showmes('error', '推送失败')
                    }
                    
                })
            }else{
                proxy.$X.showmes('warning', '请完善相关信息')
            }
            
        }
        return {
            Tickets,
            InfoFilled,
            dialogVisible,
            win_message,
            lose_message,
            push_message,
        }
    }
}
</script>

<style>

</style>