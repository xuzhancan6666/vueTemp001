<template>
   <header-container :title="projectName">
      <template #header-menu-content>
         <!--这里是 menuStore 解构出来 -->
         <el-menu
            :default-active="activeKey"
            :ellipsis="false"
            class="el-menu-demo"
            mode="horizontal"
            @select="onMenuSelect"
         >
            <template v-for="menuItem in menuList">
               <SubMenu
                  v-if="Array.isArray(menuItem.subMenu) && menuItem.subMenu.length > 0"
                  :menuItem="menuItem"/>
               <el-menu-item
                  v-else
                  :index="menuItem.key">
                  {{ menuItem.name }}
               </el-menu-item>
            </template>
         </el-menu>
      </template>
      <template #header-setting-content>
         <!-- 这里是从projectStore 解构出来-->
         <el-dropdown class="setting-dropdwon" @command="handleCommand">
            <span>
               {{ projectName }}
               <el-icon class="el-icon--right"
                  v-if="Array.isArray(projectList) && projectList.length > 0">
                  <arrow-down />
               </el-icon>
            </span>
            <template #dropdown>
               <el-dropdown-menu v-if="Array.isArray(projectList) && projectList.length > 0">
                  <el-dropdown-item
                     v-for="model in projectList"
                     :command="model.key"
                     :key="model.key">
                     {{ model.desc }}
                  </el-dropdown-item>
               </el-dropdown-menu>
            </template>
         </el-dropdown>
      </template>
      <template #main-content>
         <slot name="main-content"></slot>
      </template>
   </header-container>
</template>
<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import HeaderContainer from '$widgets/header-container/header-container.vue'
import useMenuStore from '$store/menu.js'
import useProjectStore from '$store/project.js'
import SubMenu from './complex-view/sub-menu/sub-menu.vue';
import { ArrowDown } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'

const props = defineProps({
   projectName: String,
})
const menuStore = useMenuStore()
const projectStore = useProjectStore()
const route = useRoute()
const emits = defineEmits(['menu-select'])
const activeKey = ref('')

const menuList = computed(() => {
   return menuStore.menuList
})
const projectList = computed(() => {
   return projectStore.projectList
})

watch(() => route.query.menu_key, () => {
   setActiveKey()
})

watch(() => menuStore.menuList, (val) => {
   setActiveKey()
})

function setActiveKey () {
   const menuItem = menuStore.findMenuItem({
      key: 'key',
      value: route.query.menu_key
   })

   activeKey.value = menuItem?.key
}

function onMenuSelect(menuKey) {
   const menuItem = menuStore.findMenuItem({
      key: 'key',
      value: menuKey
   })

   emits('menu-select', menuItem)
}

function handleCommand(command) {
   const menu = projectList.value.find(pro => pro.key === command)
   const homePage = menu.homePage;
   const { origin, pathname } = window.location

   window.location.replace(`${origin}${pathname}#${homePage}`)
   window.location.reload()
}

onMounted(() => {
   setActiveKey()
})
</script>
<style lang="less" scoped>
.el-menu{
   :deep(.el-menu-item ) {
      box-sizing: content-box;
      border-bottom: 1px solid #e8e8e8
   }

   :deep(.is-active) {
      box-sizing: content-box;
      border-bottom: 1px solid #0000 !important
   }

   .el-sub-menu {
      box-sizing: content-box;
      border-bottom: 1px solid #e8e8e8;

      :deep(.el-sub-menu__title) {
         box-sizing: content-box;
         border-bottom: 1px solid #0000 !important
      }
   }
}
.setting-dropdwon {
   margin-right: 14px;
}
</style>