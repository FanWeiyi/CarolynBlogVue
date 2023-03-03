import router from './router'
import store from './store'

//element-ui-plus 适配vue3.x
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

// 全局注册
// import with ES6
// import { createApp } from 'vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

const app = createApp(App)

import { ElMessage } from 'element-plus';
// import 'element-plus/lib/theme-chalk/index.css';

app.config.globalProperties.$message = ElMessage;

app.use(router)
app.use(ElementPlus)
app.use(mavonEditor)
app.mount('#app')

//axios
import axios from 'axios'
app.config.globalProperties.$axios=axios

import './axios.js' // 请求拦截
