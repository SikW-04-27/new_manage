<template>
    <el-table
        :data="tableData"
        height="527"
      >
        <el-table-column type="index" label=""> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="direction" label="方向"> </el-table-column>
        <el-table-column prop="studentId" label="学号"></el-table-column>
        <el-table-column prop="college" label="学院"></el-table-column>
        <el-table-column prop="major" label="专业"></el-table-column>
      </el-table>
</template>

<script>
import { ElLoading } from "element-plus";
import {onMounted, reactive, watch, getCurrentInstance} from 'vue'
import {appointment_listUser,deleteAppointmentInfo} from '../request/api'
export default {
    props:{
        id: {
            type: Number,
            default: 1
        }
    },
    setup(props, context){
        const { proxy } = getCurrentInstance();
        let tableData = reactive([])

        // 获取该时间段预约的同学
        let appointmentUser = (id) => {
            tableData.splice(0, tableData.length)
            let loadingInstance = ElLoading.service({fullscreen: true,background: "rgba(55, 55, 55, 0.699)",});
            appointment_listUser({
                id: parseInt(id)
            }).then(res => {
                if(res.code === 1515){
                    loadingInstance.close();
                    proxy.$X.showmes('error', res.message)
                }else{
                   loadingInstance.close();
                    tableData.push(...res.data) 
                }
                
            }).catch(err =>{
                proxy.$X.showmes('error', err.message)
                loadingInstance.close();
            })
        }

        //vue首次赋值不触发watch----------------------???
        watch(props, (newVal, oldVal) => {
            console.log(newVal.id);
            appointmentUser(newVal.id)
        })

        // 让页面第一次弹出就有数据
        onMounted(() => {
            appointmentUser(props.id)
        })

        return {
            tableData
        }
    }
}
</script>

<style>

</style>