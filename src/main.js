import { createApp } from 'vue'

// 引入全部组件库
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import * as ElIconModules from '@element-plus/icons'

import router from './router/index'
import App from './App.vue'
import './index.css'

// import Vuex from 'vuex'
import X from './utils/common'



const app = createApp(App)

// 在原型上挂载对象
app.config.globalProperties.$X = X;
app.use(ElementPlus)
app.use(router)
// app.use($store)
app.mount('#app')
