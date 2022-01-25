<template>
      <el-card class="box-card">
           <el-container>
            <el-aside width="300px">
                <div class="avatar" >
                <img src="../assets/img/fat.png" alt="">
                </div>
            </el-aside>
            <el-main>
                <div class="introduce">
                    <span>姓名: {{user_name}}</span>
                    <el-divider></el-divider>
                    <span>学院：{{user_major}}</span>
                    <el-divider></el-divider>
                    <span>专业班级：{{user_college}}{{user_class}}</span>
                    <el-divider></el-divider>
                    <span>方向：{{user_direction}}</span>
                    <el-divider></el-divider>
                    <span>学号：{{user_studentId}}</span>
                    <el-divider></el-divider>
                    <span>手机号：{{user_phoneNumber}}</span>
                    <el-divider></el-divider>
                    <span>自我介绍：</span>
                    <div class="person_introduce">{{user_selfIntroduction}}</div>
                </div>
            </el-main>
            </el-container>
        <!-- <template #header>
        <div class="card-header">
            <span>Card name</span>
            <el-button class="button" type="text">Operation button</el-button>
        </div>
        </template> -->
        <!-- <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div> -->
    </el-card>
    
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
    .avatar{
        margin-top: 50px;
        img{
            width: 150px;
            height: 150px;
        }
    }
    .introduce{
        text-align: left;
        font-size: 18px;
        // width: 500px;
        span{
            position: relative;
            top: 10px;
        }
        .person_introduce{
            position: relative;
            top: -15px;
            left: 90px;
            width: 550px;
            height: 250px;
            line-height: 30px;
            // white-space: wrap;
        }
    }
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .box-card {
        margin: 0 auto;
        width: 1200px;
        height: 550px;
    }
    .el-divider{
        margin: 20px 0 10px 0;
    }
</style>