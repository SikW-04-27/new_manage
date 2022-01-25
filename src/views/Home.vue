<template>
    <div class="common-layout">
    <el-container>
        <el-header>
            <Nav 
                @listen="jump"
                v-if="proxy.$router.currentRoute.value.fullPath === '/login' ? false : true"
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
import {getCurrentInstance} from 'vue'
import {useRouter} from 'vue-router'
import Nav from '../components/Nav.vue'
import Userinfo from '../components/Userinfo.vue'
export default {
    name: 'Home',
    components: {
        Nav,
        Userinfo
    },
    setup(props) {
        let router = useRouter();
        const {proxy} = getCurrentInstance();
        let jump = (data) => {
            router.push({
                path: `/${data}`
            })
        }  

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