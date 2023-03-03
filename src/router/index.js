import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import BlogDetail from '../views/BlogDetail.vue'
import BlogEdit from '../views/BlogEdit.vue'
import { createRouter, createWebHistory } from 'vue-router'
// import { createApp } from 'vue'
// 从一个单文件组件中导入根组件
// import App from './App.vue'
// Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: { name: 'Blogs' }
  },
  {
    path: '/login',
    name: 'Login',
    // component: Login
    component: () => import('../views/Login.vue')
  },
  {
    path: '/blogs',
    name: 'Blogs',
    // 懒加载
    component: () => import('../views/Blogs.vue')
  },
  {
    path: '/blog/add', // 注意放在 path: '/blog/:blogId'之前
    name: 'BlogAdd',
    meta: {
      requireAuth: true
    },
    component: BlogEdit
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    meta: {
      requireAuth: true
    },
    component: BlogEdit
  }
];
// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })
// 改为4.x版本
const router = createRouter({
  history: createWebHistory(),
  routes:routes,
})
// 5. 创建并挂载根实例，在main.js中
// const app = Vue.createApp({})
//确保 _use_ 路由实例使
//整个应用支持路由。
// app.use(router)

// app.mount('#app')

// 现在，应用已经启动了！


export default router;