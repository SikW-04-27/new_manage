// npm install vue-router@next -S      vue3安装路由
// 创建路由器
import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'
// 懒加载
// const Home = (path) => {return defineAsyncComponent(() => import('../views/Home.vue'))};
// const registered = (path) => {return defineAsyncComponent(() => import('../views/registered.vue'))};
// const Login = (path) => {return defineAsyncComponent(() => import('../views/Login.vue'))};
// const Mark = (path) => {return defineAsyncComponent(() => import('../views/Mark.vue'))};
// const Appointment = (path) => {return defineAsyncComponent(() => import('../views/Appointment.vue'))};
// const Queue = (path) => {return defineAsyncComponent(() => import('../views/Queue.vue'))};
const Home = (path) => import('../views/Home.vue');
const registered = (path) => import('../views/registered.vue');
const Login = (path) => import('../views/Login.vue');
const Mark = (path) => import('../views/Mark.vue');
const Appointment = (path) => import('../views/Appointment.vue');
const Queue = (path) => import('../views/Queue.vue');
const Signed = (path) => import('../views/Signed.vue')


const router = createRouter({
    history: createWebHistory(),
    routes:[
        // 主页面
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        // 登录页面
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        // 已报名名单
        {
            path: '/registered',
            name: 'registered',
            component: registered
        },
        //分数详情
        {
            path: '/Mark',
            name: 'Mark',
            component: Mark
        },
        // 预约管理
        {
            path: '/Appointment',
            name: 'Appointment',
            component: Appointment
        },
        // 叫号
        {
            path: '/Queue',
            name: 'Queue',
            component: Queue
        },
        // 签到管理
        {
            path: '/Signed',
            name: 'Signed',
            component: Signed
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.fullPath === '/login') {
        next()
    } else {
        console.log(to.fullPath);
        // proxy.$X.updata('activeName', to.fullPath)
        if (sessionStorage.getItem('USER')) {
            next()
        } else {
            next('/login')
        }
    }
})

export default router