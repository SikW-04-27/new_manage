<template>
      <el-table :data="filterTableData" style="width: 100%" max-height="455">
            <el-table-column prop="registerTime" label="报名日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="direction" label="方向" width="120"></el-table-column>
            <!-- <el-table-column prop="studentId" label="学号" width="120"></el-table-column> -->
            <el-table-column prop="major" label="学院" width="200"></el-table-column>
            <el-table-column prop="college" label="专业" width="200"></el-table-column>
            <el-table-column
                prop="status"
                label="状态"
                width="100"
                sortable
                >
                <template #default="scope">
                    <el-tag
                    :type="scope.row.status === '淘汰' ? 'danger' : 'success'"
                    disable-transitions
                    >{{ scope.row.status === '淘汰' ? '已淘汰' : '考核中' }}</el-tag
                    >
                </template>
            </el-table-column>
            <!-- <el-table-column prop="phoneNumber" label="联系方式" width="200"></el-table-column> -->
            <el-table-column align="right">
            <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search" />
            </template>
            <template #default="scope">
                <el-button size="small" @click="opendetial(scope.$index, scope.row)"
                >详情</el-button
                >
                  
                <!-- <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >Delete</el-button
                > -->
            </template>
            </el-table-column>
        </el-table>
        <el-dialog
            v-model="detialDialog"
            title="详情"
            width="30%"
            fullscreen
        >
            <Predetial/>
            <!-- <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogVisible = false"
                >Confirm</el-button
                >
            </span>
            </template> -->
        </el-dialog>
</template>

<script>
import {enrolllist} from '../request/api'
import { ref, computed, onMounted, reactive, getCurrentInstance, provide } from 'vue'
import Predetial from '../components/Predetial.vue'
import {ElLoading} from 'element-plus'
export default {
    name: 'registered',
    components:{
        Predetial
    },
    setup(){
        const { proxy } = getCurrentInstance();
        let detialDialog = ref(false)
        const search = ref('')
        const tableData = reactive([])
        const filterTableData = computed(() =>
            tableData.filter(
                (data) =>
                !search.value ||
                data.name.toLowerCase().includes(search.value.toLowerCase())
            )
        )
        const opendetial = (index, row) => {
            detialDialog.value = true
            proxy.$X.updata('registeruser', row)
            console.log(proxy.$X.state.registeruser);
            console.log(JSON.parse(JSON.stringify(proxy.$X.state.registeruser)));
            // provide('user', JSON.parse(JSON.stringify(proxy.$X.state.registeruser)))
        }
        const handleDelete = (index, row) => {
            console.log(index, row)
        }

        const clearregisteruser = () => {
            // proxy.$X.updata('registeruser', {})
            console.log(11121);
        }


        // 挂载页面获取数据
        onMounted(()=>{
            const loadingInstance = ElLoading.service({ fullscreen: true })
            enrolllist().then(res => {
                // hide.value = true;
                tableData.push(...res.data)
                loadingInstance.close()
            }).catch(err => {
            // hide.value = true;
            // console.log(err);
            loadingInstance.close()
            proxy.$X.showmes('error', '加载错误，请刷新')
            })
        })

        return {
            search,
            filterTableData,
            detialDialog,
            opendetial,
            handleDelete,
            clearregisteruser,
            tableData
        }
    }
}


</script>

<style>

</style>