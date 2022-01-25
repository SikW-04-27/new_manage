<template>
    <div class="common-layout">
        <el-container>
            <el-header class="font">
                <div>C.A.T管理端登录</div>
            </el-header>
            <el-main>
                 <el-input
                    v-model="username"
                    class="w-50 m-2"
                    placeholder="请输入账号"
                    :prefix-icon="User"
                ></el-input>
                <br/>
                <el-input
                    v-model="password"
                    type="password"
                    placeholder="请输入密码"
                    show-password
                    :prefix-icon="Lock"
                />
                <br/>
                <el-input
                    v-model="key"
                    type="password"
                    placeholder="请输入管理员密钥"
                    show-password
                    :prefix-icon="Key"
                />
                <br/>
                <el-button type="primary" @click="login">登录</el-button>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { User, Lock, Key } from '@element-plus/icons-vue'
import { ref, getCurrentInstance} from 'vue'
import {userLogin} from '../request/api'
import {useRouter} from 'vue-router'
export default {
    name: 'Login',
    setup(props) {
        const { proxy } = getCurrentInstance();
        let username = ref()
        let password = ref()
        let key = ref()
        
        const router = useRouter();
    
        function login(){
            userLogin({
                keyWord: username.value,
                password: password.value,
            }).then(result=>{
                sessionStorage.setItem('USER', '123')
                console.log(111);
                router.replace({path: '/registered'})
                proxy.$X.showmes('success', '成功')
            })
        }


        return {
            username,
            password,
            key,
            login,
            User,
            Lock,
            Key
        }
    }
}
</script>

<style lang='scss' scoped>
    .common-layout{
        .font{
            font-size: 1.875rem;
            line-height: 2.25rem;
            font-weight: 700;
            color: #1890ff;
            margin-top: 50px;
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        }
        .el-input{
            width: 300px;
            margin-bottom: 30px;
            :deep(.el-input__inner){
                height: 40px !important;
            }
        }
        .el-button{
            width: 300px;
            height: 40px;
        }
    }
    
</style>