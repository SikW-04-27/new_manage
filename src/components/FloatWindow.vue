<template>
    <el-tooltip
        class="box-item"
        content="添加预约时间段"
        placement="left-start"
      >
        <el-button type="primary" :icon="Plus" circle @click="dialogVisible = true"></el-button>
      </el-tooltip>
    
      <el-dialog
        v-model="dialogVisible"
        title="添加时间段"
        width="500px"
    >
        <div class="box_content">
            <span>起始时间：</span>
            <el-date-picker
                v-model="beginTime"
                type="datetime"
                placeholder="选择日期时间">
            </el-date-picker><br><br>
            <span>结束时间：</span>
            <el-date-picker
                v-model="endTime"
                type="datetime"
                placeholder="选择日期时间">
            </el-date-picker><br><br>
            <span>预约人数：</span>
            <el-input-number style="width: 220px;" v-model="count" :min="1" :max="10"/>
            <el-button @click="dialogVisible = false" class="back">返回</el-button>
            <el-button type="primary" @click="addappointment" class="plus">添加</el-button>
        </div>
        
    </el-dialog>
</template>

<script>
import {Plus} from '@element-plus/icons-vue'
import { ref, getCurrentInstance } from 'vue'
import {saveNewAppointmentInfo} from '../request/api'
import { ElLoading } from "element-plus";
import dayjs from 'dayjs'
export default {
    emits: ['listen'],
    setup(props, context){
        const { proxy } = getCurrentInstance();
        let dialogVisible = ref(false)
        let beginTime = ref('')
        let endTime = ref('')
        let count = ref(0)

        let addappointment = function(){
            let beginTime_value = dayjs(beginTime.value).format('YYYY-MM-DD HH:mm:ss')
            let endTime_value = dayjs(endTime.value).format('YYYY-MM-DD HH:mm:ss')
            let count_value = count.value
            let loadingInstance = ElLoading.service({fullscreen: false});
            saveNewAppointmentInfo({
                "beginTime":beginTime_value,
                "endTime":endTime_value,
                "count":count_value
            }).then(res => {
                // 判断是否设置成功
                console.log("成功了");
                if(res.code === 1200){
                    // 设置成功则重新加载列表
                    beginTime.value = '';
                    endTime.value = '';
                    count.value = 1
                    context.emit('listen', '')
                    loadingInstance.close()
                    dialogVisible.value = false
                }else{
                    loadingInstance.close()
                    proxy.$X.showmes('warning', res.message)
                }
            }).catch(err => {
                console.log(12313131);
                loadingInstance.close()
                proxy.$X.showmes('error', err.data.message)
            })
            
        }

        return {
            beginTime,
            endTime,
            count,
            dialogVisible,
            addappointment,
            Plus
        }
    }
}
</script>

<style lang='scss' scoped>
    .el-dialog{
        position: relative;
        .box_content{
            height: 170px;
            .back{
                width: 70px;
                left: 30px;
                position: absolute;
                bottom: 20px;
            }
            .plus{
                width: 70px;
                position: absolute;
                right: 30px;
                bottom: 20px;
            }
        }
        
    }
</style>