<template>
      <el-table :data="filterTableData" style="width: 100%" max-height="455">
            <el-table-column prop="registerTime" label="报名日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="direction" label="方向" width="120"></el-table-column>
            <!-- <el-table-column prop="studentId" label="学号" width="120"></el-table-column> -->
            <el-table-column prop="major" label="学院" width="200"></el-table-column>
            <el-table-column prop="college" label="专业" width="200"></el-table-column>
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
            :before-close="handleClose"
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
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
</template>

<script>
import { ref, computed } from 'vue'
import Predetial from '../components/Predetial.vue'
export default {
    name: 'Registered',
    components:{
        Predetial
    },
    setup(){
        let detialDialog = ref(false)
        const search = ref('')
        const filterTableData = computed(() =>
            tableData.filter(
                (data) =>
                !search.value ||
                data.name.toLowerCase().includes(search.value.toLowerCase())
            )
        )
        const opendetial = (index, row) => {
            detialDialog.value = true
        }
        const handleDelete = (index, row) => {
        console.log(index, row)
        }

        const tableData = [
        {
            registerTime: '2016-05-03',
            name: 'Tom',
            direction: '前端',
            studentId: 3120003903,
            major: '计算机学院',
            college: '软件工程',
            phoneNumber: 13413422538
        },
        {
            date: '2016-05-02',
            name: 'John',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-02',
            name: 'John',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-02',
            name: 'John',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-02',
            name: 'John',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-02',
            name: 'John',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-02',
            name: 'John',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-02',
            name: 'John',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-04',
            name: 'Morgan',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-01',
            name: 'Jessy',
            address: 'No. 189, Grove St, Los Angeles',
        },
        ]

        return {
            search,
            filterTableData,
            detialDialog,
            opendetial,
            handleDelete,
            tableData
        }
    }
}


</script>

<style>

</style>