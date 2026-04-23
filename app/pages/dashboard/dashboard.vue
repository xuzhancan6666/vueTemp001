<template>
   <el-config-provider :locale="zhCn">
      <header-view
         :project-name="projectName"
         @menu-select="menuSelect"
      >
         <template #main-content>
            <router-view></router-view>
         </template>
      </header-view>
   </el-config-provider>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import HeaderView from './complex-view/header-view/header-view.vue'
import curl from '$common/curl.js'
import useMenuStore from '$store/menu.js'
import useProjectStore from '$store/project.js'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const menuStore = useMenuStore()
const projectStore = useProjectStore()
const projectName = ref('')

async function getProjectList() {
   try {
      const data = { projectKey: route.query.project_key }
      const res = await curl({url: '/api/dsl/getDslProjectList', method: 'post', data})

      projectStore.setProjectList(res.data)
   } catch (error) {

   }
}

async function getProject() {
   try {
      const data = { projectKey: route.query.project_key }
      const res = await curl({url: '/api/dsl/getDslProject', method: 'post', data})

      projectName.value = res.data.desc
      console.log('res.data.menu....', res.data.menu)
      menuStore.setMenuList(res.data.menu)
   } catch (error) {

   }
}

function menuSelect (menuItem) {
   const { moduleType, key, customConfig, subMenu } = menuItem

   if(key === route.query.menu_key) return;

   const menuPathMap = {
      sider: '/sider',
      iframe: '/iframe',
      schema: '/schema',
      custom: customConfig?.path,
   }
   router.push({
      path: menuPathMap[moduleType],
      query: {
         project_key: route.query.project_key,
         menu_key: key,
      }
   })
}

onMounted(() => {
   getProjectList()
   getProject()
})

</script>
<style lang="less" scoped>
:deep(.el-main) {
   padding: 0;
}
</style>