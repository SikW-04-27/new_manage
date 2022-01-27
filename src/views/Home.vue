<template>
    <div class="common-layout">
    <el-container>
        <el-header>
            <Nav 
                @listen="jump"
                v-if="proxy.$router.currentRoute.value.fullPath !== '/login'"
                v-bind:routejump="proxy.$router.currentRoute.value.fullPath"
            ></Nav>
            <!-- <Userinfo></Userinfo> -->
        </el-header>
        <el-main
            
        >
            <router-view
              ref="router"
            ></router-view>
            
        </el-main>
    </el-container>
    </div>
</template>

<script>

            //   @routerChange="openTab"
import {getCurrentInstance, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import Nav from '../components/Nav.vue'
import Userinfo from '../components/Userinfo.vue'
import {attain, complete} from '../request/api'
export default {
    name: 'Home',
    components: {
        Nav,
        Userinfo
    },
    props:{
        routejump:''
    },
    setup(props) {
        let router = useRouter();
        const {proxy} = getCurrentInstance();
        let jump = (data) => {
            router.push({
                path: `/${data}`
            })
        }  

        // 登录没有将用户信息存到vuex
        onMounted(()=>{
            attain().then(res=>{
                console.log(res);
                proxy.$X.updata('manageinfo', res.data)
            })
        })

        return{
            jump,
            proxy,
            router
        }
    }
}
</script>

<style>

</style>