<template>
    <div class="mark">
        <div class="floatmessage">
            <FloatMesssage/><br/><br/>
            <FloatResult/>
        </div>
        <el-table :data="filterTableData" style="width: 100%">
            <!-- <el-table-column type="selection" class-name="play"></el-table-column> -->
            <el-table-column prop="name" label="姓名" width="160"> </el-table-column>
            <el-table-column prop="examAvg" sortable label="笔试" width="160">
            </el-table-column>
            <el-table-column prop="firstInterviewAvg" sortable label="面试" width="160">
            </el-table-column>
            <el-table-column prop="firstReviewAvg" sortable label="一轮考核" width="160">
            </el-table-column>
            <el-table-column prop="secondReviewAvg" sortable label="二轮考核" width="160">
            </el-table-column>
            <el-table-column prop="totalAvg" sortable label="平均分" width="160">
            </el-table-column>
            
            <el-table-column
                prop="status"
                label="状态"
                width="100"
                sortable
                >
                <template #default="scope">
                    <el-tag
                    :type="scope.row.userStatus === '通过' ? 'success' :(scope.row.userStatus===  '淘汰'? 'danger' : (scope.row.userStatus==='等待结果' ? 'warning' : 'info'))"
                    disable-transitions
                    >{{ scope.row.userStatus}}</el-tag
                    >
                </template>
            </el-table-column>
            <el-table-column align="left" width="230">
            <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search" />
            </template>
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
                    @confirm="confirmEvent(scope.$index, scope.row)">
                    <template #reference>
                        <el-button
                        size="small"
                        type="danger"
                        :disabled = "(scope.row.userStatus==='通过'||scope.row.userStatus==='淘汰')"
                        >淘汰</el-button
                        >
                    </template>
                </el-popconfirm>

                <el-popconfirm 
                    confirm-button-text="确认"
                    cancel-button-text="返回"
                    :icon="InfoFilled"
                    icon-color="red"
                    title="注意：此操作不可撤回"
                    @confirm="confirmEvent2(scope.$index, scope.row)">
                    <template #reference>
                        <el-button
                        size="small"
                        type="success"
                        :disabled = "(scope.row.userStatus==='通过'||scope.row.userStatus==='淘汰'||scope.row.userStatus==='未预约')"
                        >通过</el-button
                        >
                    </template>
                </el-popconfirm>

            </template>
            </el-table-column>
        </el-table>
    </div>
  
    <el-dialog
        v-model="detialDialog"
        :title='proxy.$X.state.personmark.direction+proxy.$X.state.personmark.name'
        fullscreen
    >
        <Detialmark
            v-bind:data="JSON.parse(JSON.stringify(proxy.$X.state.personmark))"
        ></Detialmark>
    </el-dialog>
</template>

<script>
import { InfoFilled } from '@element-plus/icons-vue'
import {listAllUser, batcheliminate, pass} from '../request/api'
import {ref, computed, reactive, onMounted, getCurrentInstance} from 'vue'
import {ElLoading} from 'element-plus'
import Detialmark from '../components/Detialmark.vue'
import FloatMesssage from '../components/FloatMesssage.vue'
import FloatResult from '../components/FloatResult.vue'
export default {
    name: 'Mark',
    components:{
        Detialmark,
        FloatMesssage,
        FloatResult
    },
    props:{
        data:{},
    },
    setup(){
        const { proxy } = getCurrentInstance();
        const search = ref('')
        let detialDialog = ref(false)
        const filterTableData = computed(() =>
            tableData.filter(
                (data) =>
                !search.value ||
                data.name.toLowerCase().includes(search.value.toLowerCase())
            )
        )
        let tableData = reactive([]);
        const handleEdit = (index, row) => {
            console.log(index);
            proxy.$X.updata('personmark', JSON.parse(JSON.stringify(row)));
            detialDialog.value = true
        }
        const handleDelete = (index, row) => {
            console.log(JSON.parse(JSON.stringify(row)));
            
        }

        // 淘汰
        const confirmEvent = (index,row) => {
            let loadingInstance1 = ElLoading.service({fullscreen: true});
            batcheliminate({
                ids: [JSON.parse(JSON.stringify(row)).uuid]
            }).then(res => {
                loadingInstance1.close()
                location.reload();
                console.log(res);
            }).catch(err => {
                loadingInstance1.close()
                proxy.$X.showmes('error', err.data)
            })
        }
        // 通过
        const confirmEvent2 = (index,row) => {
            let loadingInstance1 = ElLoading.service({fullscreen: true});
            pass({
                ids: [JSON.parse(JSON.stringify(row)).uuid]
            }).then(res => {
                loadingInstance1.close()
                location.reload();
                console.log(res);
            }).catch(err => {
                loadingInstance1.close()
                proxy.$X.showmes('error', err.data)
            })
        }
        const cancelEvent = () => {
            console.log('cancel!')
        }

        let loadlist = function(){
            let loadingInstance = ElLoading.service({fullscreen: true});
            listAllUser()
                .then((res) => {
                if(res.code === 1406){
                    loadingInstance.close();
                    // tableData.splice(0,deletenum)
                }else{
                    // if(deletenum){
                    //     tableData.splice(0,res.data.length+deletenum)
                    // }
                    tableData.push(...res.data);
                    loadingInstance.close();
                    // canceleliminate();
                }
                
                })
                .catch((err) => {
                    loadingInstance.close();
                    proxy.$X.showmes('error', '加载错误，请刷新')
                });
        }

        onMounted(() => {
            loadlist();
        })

        return {
            InfoFilled,
            proxy,
            search,
            tableData,
            filterTableData,
            detialDialog,
            handleEdit,
            handleDelete,
            confirmEvent,
            cancelEvent,
            confirmEvent2
        }
    }
}
</script>

<style lang='scss' scoped>
    .mark{
        position: relative;
        .floatmessage{
            position: absolute;
            top: -20px;
            right: 0;
            z-index: 11;
        }
    }
</style>