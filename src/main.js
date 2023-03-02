import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
Vue.use(Element)

import axios from 'axios'
Vue.prototype.$axios = axios //

createApp(App).use(store).use(router).mount('#app')
