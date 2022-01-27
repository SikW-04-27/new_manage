<template>
    <div class="common-layout">
        <el-container>
        <el-aside width="200px">
            <el-tabs v-model="activeName" tab-position="left" @tab-click="aaa">
                <el-tab-pane label="笔试" name="Exam">User</el-tab-pane>
                <el-tab-pane label="面试" name="Interview">Config</el-tab-pane>
                <el-tab-pane label="一轮考核" name="FirstReview">Role</el-tab-pane>
                <el-tab-pane label="二轮考核" name="SecondReview">Task</el-tab-pane>
            </el-tabs>
        </el-aside>
        <el-main>
            <el-card class="box-card">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="adminName" label="管理员" width="180" />
                    <el-table-column prop="score" label="分数" width="180" />
                    <el-table-column prop="comment" label="评价" />
                </el-table>
            <el-button type="primary" class="motifymark" @click="motifymark">修改分数</el-button>
            <el-dialog
                v-model="innerVisible"
                width="40%"
                title="修改分数"
                append-to-body
                @open='open'
            >
            <div class="modifyinfo">
                分数：<el-input
                    type="number"
                    v-model="score"
                    placeholder="请输入分数"
                    max="100"
                    min="0"
                ></el-input
                ><br /><br />
                评价：<el-input
                    type="textarea"
                    placeholder="请输入评价"
                    v-model="desc"
                    resize="none"
                    :rows="4"
                ></el-input
                >
                <el-button class="back" @click="innerVisible = false">返回</el-button>
                <el-button type="primary" class="confirm" @click="confirm">确认修改</el-button>
            </div>
            
            </el-dialog>
            </el-card>
        </el-main>
        </el-container>
    </div>
    
</template>

<script>
import { addAppraise, getUserDetailInfo } from "../request/api";
import {ref, reactive, getCurrentInstance, computed, watch } from 'vue'
export default {
    props:{
        data: {
            type: Object,
            default: {}
        }
    },
    setup(props, context){
        const { proxy } = getCurrentInstance();
        let activeName = ref('Exam');
        let tableData = reactive([...props.data.userAppraiseExam])
        let innerVisible = ref(false)
        let recruitmentId = ref(2);
        let score = ref('');
        let desc = ref('')

        let motifymark = () => {
            innerVisible.value = true
        }

        // 打开弹窗
        let open = () => {
            score.value = 0;
            desc.value = ''
        }

        let aaa = function(x){
            console.log([...props.data.userAppraiseExam]);
            console.log(x.props.label);
            console.log(props.data);
            switch (x.props.label){
                case '笔试':
                    recruitmentId.value = 2;
                    tableData.splice(0, tableData.length)
                    tableData.push(...props.data.userAppraiseExam);
                    break
                case '面试':
                    recruitmentId.value = 3;
                    tableData.splice(0, tableData.length)
                    tableData.push(...props.data.userAppraiseFirstInterview);
                    break
                case '一轮考核':
                    recruitmentId.value = 5;
                    tableData.splice(0, tableData.length)
                    tableData.push(...props.data.userAppraiseFirstReview);
                    break
                case '二轮考核':
                    recruitmentId.value = 6;
                    tableData.splice(0, tableData.length)
                    tableData.push(...props.data.userAppraiseSecondReview);
                    break
            }
        }

        let confirm = () => {
            let manageinfo = proxy.$X.state.manageinfo;
            let userinfo = proxy.$X.state.personmark
            addAppraise({
                adminId: manageinfo.uuid,
                comment: desc.value,
                recruitmentId: recruitmentId.value,
                score: score.value,
                userId: userinfo.id,
            }).then(res=>{
                proxy.$X.showmes('success', '成功')
                location.reload()
                console.log(res);
            })
        }
        
        // 监听父组件传来的值
        watch(props, (newVal, oldVal) => {
            activeName.value = 'Exam'
            tableData.splice(0, tableData.length)
            tableData.push(...props.data.userAppraiseExam);
        })

        return {
            proxy,
            innerVisible,
            tableData,
            activeName,
            score,
            desc,
            aaa,
            open,
            motifymark,
            confirm
        }
    }
}
</script>

<style lang='scss' scoped>
    .el-tabs{
        :deep(.el-tabs__header){
            width: 200px;
        }
    }
    .box-card {
        position: relative;
        margin: -20px auto;
        width: 1000px;
        height: 450px;
        .motifymark{
            position: absolute;
            bottom: 30px;
            right: 40px;
            
        }
    }
    
    .modifyinfo{
        height: 200px;
        .el-input {
            width: 200px;
            :deep(.el-input__inner){
                height: 40px;
            }
        }
        .el-textarea {
            width: 400px;
            height: 15px;
        }
        .back{
            position: absolute;
            bottom: 20px;
            left: 30px;
        }
        .confirm{
            position: absolute;
            bottom: 20px;
            right: 30px;
        }
    }
</style>