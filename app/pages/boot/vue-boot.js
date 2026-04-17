import { createApp } from "vue";
// ElmentUI
import ElmentUI from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css'
import pinia from "$store/index.js";
import { createRouter, createWebHashHistory } from 'vue-router'
import '$pages/assets/custom.css'
import message from '$common/message.js'
/*
   pageComponent: 入口组件
   :route 路由配置
   :libs: 第三方包
*/

export default (pageComponents, { routes, libs } = {}) => {
   const app = createApp(pageComponents);
   // 应用 element
   app.use(ElmentUI)

   // pinia
   app.use(pinia)

   // 第三方包
   if(libs && libs.length > 0) {
      libs.forEach(lib => {
         app.use(lib)
      })
   }
   console.log('routes....', routes)
   // 路由-vue
   const router = createRouter({
      history: createWebHashHistory(), // hash 模式
      routes: routes || []
   })

   app.use(router)
   app.config.globalProperties.$message = message

   router.isReady().then(() => {
      app.mount('#root')
   })
}