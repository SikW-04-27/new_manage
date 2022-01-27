// npm install vue-router@next -S      vue3安装路由
// 创建路由器
import { createRouter, createWebHistory } from 'vue-router'
// 懒加载
const _import = (path) => () => import(`../views/${path}.vue`);


const router = createRouter({
    history: createWebHistory(),
    routes:[
        // 主页面
        {
            path: '/home',
            name: 'home',
            component: _import('home')
        },
        // 登录页面
        {
            path: '/login',
            name: 'login',
            component: _import('login')
        },
        // 已报名名单
        {
            path: '/registered',
            name: 'registered',
            component: _import('registered')
        },
        //分数详情
        {
            path: '/Mark',
            name: 'Mark',
            component: _import('Mark')
        },
        // 预约管理
        {
            path: '/Appointment',
            name: 'Appointment',
            component: _import('Appointment')
        },
        // 叫号
        {
            path: '/Queue',
            name: 'Queue',
            component: _import('Queue')
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