<template>
    <div class="appointment">
        <div class="floatwindow">
            <FloatWindow 
                @listen="appointmentlist"
            />
            
            
              <el-popconfirm
                    confirm-button-text="确认"
                    cancel-button-text="返回"
                    :icon="InfoFilled"
                    icon-color="red"
                    :title="confirmtitle"
                    @confirm="btnclick()"
                >
                    <template #reference>
                            <el-button 
                                :type="btncolor" 
                                :icon="BellFilled" 
                                circle
                                @click="funconfirmtitle"
                                style="margin-left:10px"
                            ></el-button>
                    
                    </template>
                </el-popconfirm>
            
        </div>
        
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="beginTime" label="开始时间" width="250" />
            <el-table-column prop="endTime" label="结束时间" width="250" />
            <el-table-column prop="count" label="剩余可预约人数" />
            <el-table-column prop="capacity" label="设置人数" />
            <el-table-column label="Operations">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                >详情</el-button
                >
                
                <el-popconfirm 
                confirm-button-text="确认"
                cancel-button-text="返回"
                :icon="InfoFilled"
                icon-color="red"
                title="注意：此操作不可撤回"
                @confirm="handleDelete(scope.$index, scope.row)">
                <template #reference>
                    <el-button
                        size="small"
                        type="danger"
                    >删除</el-button>
                </template>
            </el-popconfirm>
            </template>

            
            </el-table-column>
        </el-table>
        <el-dialog
            v-model="dialogVisible"
            title="预约详情"
            fullscreen
        >
            <DetialAppointment
                :id='rowid'
            />
        </el-dialog>
    </div>
    
</template>

<script>
import { InfoFilled, BellFilled } from '@element-plus/icons-vue'
import DetialAppointment from '../components/DetialAppointment.vue'
import FloatWindow from '../components/FloatWindow.vue'
import { reactive, getCurrentInstance, onBeforeMount, ref } from 'vue'
import { ElLoading } from "element-plus";
import {listAppointment,deleteAppointmentInfo, appointmentstart, pushToAll, appointmentclose, appointmentcheck} from '../request/api'
export default {
    components: {
        DetialAppointment,
        FloatWindow
    },
    setup(){
        const { proxy } = getCurrentInstance();
        let tableData = reactive([]);
        let dialogVisible = ref(false)
        let rowid = ref();
        let btncolor = ref('success')
        let confirmtitle = ref('');

        // 获取所有预约时间段
        let appointmentlist = () => {
            console.log("我又被调用了");
            let loadingInstance = ElLoading.service({fullscreen: true});
            listAppointment({}).then(res => {
                if(res.code === 1502){
                    loadingInstance.close()
                    proxy.$X.showmes('error', res.message)
                }else{
                    loadingInstance.close()
                    tableData.splice(0, tableData.length)
                    tableData.push( ...res.data)
                    // console.log(...res.data);
                    // proxy.$X.updata('allappointment', [...res.data])
                    // console.log(...JSON.parse(JSON.stringify(proxy.$X.state.allappointment)));
                    // tableData.push(...JSON.parse(JSON.stringify(proxy.$X.state.allappointment)))
                }
            }).catch(err=>{
                loadingInstance.close()
                proxy.$X.showmes('error', '加载错误,请重试')
            })
        }

        // 查看某一时间段预约详情
        let handleEdit = (index, row) => {
            console.log(row);
            dialogVisible.value = true
            rowid.value = row.id
        }

        // 删除时间段
        let handleDelete = (index, row) => {
            let loadingInstance = ElLoading.service({fullscreen: true});
            deleteAppointmentInfo({
                id:parseInt(row.id)
            }).then(res=>{
                loadingInstance.close();
                if(res.code === 1202){
                    tableData.splice(0, tableData.length)
                    appointmentlist();
                }else if(res.code === 1516){
                    proxy.$X.showmes('error', res.message)
                }
            })
        }

        // 开启预约
        let appointment_start = function(){
            appointmentstart().then(res=>{
                if(res.code === 1512){
                    proxy.$X.showmes('warning',res.message)
                }else if(res.code === 1524){
                    proxy.$X.showmes('warning',res.message)
                }else{
                    // pushToAll({
                    //     content: '预约已经开放，你可以预约啦'
                    // }).then(res=>{
                    //     proxy.$X.showmes('success',res.message)
                    //     btncolor.value = 'success';
                    // })
                        btncolor.value = 'success';
                }
            })
            
        }

        // 关闭预约
        let appointment_close = function(){
            appointmentclose().then(res => {
                if(res.code === 1513){
                    proxy.$X.showmes('warning',res.message)
                }else{
                    btncolor.value = 'info';
                    proxy.$X.showmes('success',res.message)
                }
            })
                
        }

        

        let btnclick = () => {
            if(btncolor.value === 'success'){
                appointment_close();
            }else{
                appointment_start();
            }
            
        }

        let funconfirmtitle = () => {
            if(btncolor.value === 'success'){
                confirmtitle.value = '确认关闭预约？'
            }else{
                confirmtitle.value = '确认开启预约？'
            }
        }


        onBeforeMount(()=>{
            appointmentlist();
            appointmentcheck().then(res=>{
                if(res.message === '预约未开放'){
                    btncolor.value = 'info'
                }else{
                    btncolor.value = 'success'
                }
            })
        })

        return {
            InfoFilled,
            BellFilled,
            tableData,
            dialogVisible,
            rowid,
            btncolor,
            confirmtitle,
            appointmentlist,
            handleEdit,
            handleDelete,
            btnclick,
            funconfirmtitle
        }
    }
}
</script>

<style lang='scss' scoped>
    .appointment{
        position: relative;
        .floatwindow{
            position: absolute;
            top: -20px;
            right: 0;
            z-index: 11;
        }
    }
    
</style>