<template>
   <div class="container">
      <sider-container>
         <template #menu-content>
            <el-menu
               :default-active="activeKey"
               @select="onMenuSelect"
               class="el-menu-vertical-demo"
            >
               <template v-for="menuItem in menu">
                  <sub-menu
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
         <template #main-content>
            <router-view></router-view>
         </template>
      </sider-container>
   </div>
</template>
<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import SiderContainer from '$widgets/sider-container/sider-container.vue';
import SubMenu from './complex-view/sub-menu/sub-menu.vue';
import useMenuStore from '$store/menu'
import { useRoute, useRouter } from 'vue-router';

const activeKey = ref('')
const menu = ref([])
const menuStore = useMenuStore()
const router = useRouter()
const route = useRoute()
const menu_key = ref(route.query.menu_key)
const sider_menu_key = ref(route.query.sider_menu_key)

// 1.我没需要 siderMenu 来作为我们view 页面的 menu
// 2.url表达：siderMenu --> sub_menu_key 。 headerMenu-->menu_key

// 判断 menu 是否准备好。
const menuAlready = computed(() => {
   return Array.isArray(menu.value) && menu.value.length > 0
})
// 特殊 情况。 刷新页面重新请求。
// 页面已 mounted。 请求才返回。所以我们监听 menuList 变化. 再进行初始化
watch(() => menuStore.menuList, () => {
   init()
}, { deep: true })

// 初始化 menu
onMounted(() => {
   init()
})

// 用 menuKey 获取真实 menu。
function getRealMenuByKey(keyValue) {
   const menuItem = menuStore.findMenuItem({
      key: 'key',
      value: keyValue
   })

   return menuItem
}

// 初始化function。 第一。初始化subMenu。 第二。打开对应的 menu 的 页面
function init() {
   // 初始化 menu
   setMenu();

   if(!menuAlready.value) return
   // 此时 menu 已存在。
   // 1. url 有 sider_menu_key
   if(sider_menu_key.value) {
      const menuItem = getRealMenuByKey(sider_menu_key.value)
      // sider_menu_key 错误 --> 兜底
      if(!menuItem) {
         redirectFirstMenuItem()
         return
      }
      onMenuSelect(sider_menu_key.value)
   } else {
      // 2. url 无 sider_menu_key --> 兜底
      redirectFirstMenuItem()
   }
}

// 这个作为兜底 menu 选项。都选用第一个 menu
function redirectFirstMenuItem () {
   const firstMenuItem = menuStore.findFirstMenuItem(menu.value)
   onMenuSelect(firstMenuItem.key)
}

// 初始化 menu
function setMenu() {
   // 获取真实 menu。这里初始化我们的 sider 类型 Menu。
   // 所以用到 menu_key
   const menuItem = getRealMenuByKey(menu_key.value)

   // 存在menu 设置menu
   if(menuItem?.siderConfig && menuItem?.siderConfig?.menu) {
      menu.value = menuItem.siderConfig.menu
   }
}

// siderMenu 点击事件。
function onMenuSelect(key) {
   handleMenuSelect(key)
}

// 处理 Menu 选择事件
function handleMenuSelect(menuKey) {
   // 1.获取真实 Menu
   const menuItem = getRealMenuByKey(menuKey)
   // 设置 activeKey
   activeKey.value = menuItem.key
   // menu存在。 router push 对应页面。
   const { moduleType, key, customConfig, subMenu } = menuItem
   const menuPathMap = {
      iframe: '/iframe',
      schema: '/schema',
      custom: customConfig?.path,
   }

   router.push({
      path: `/sider${menuPathMap[moduleType]}`,
      query: {
         project_key: route.query.project_key,
         menu_key: route.query.menu_key,
         sider_menu_key: key,
      }
   })
}

</script>
<style lang="less" scoped>
.container {
   width: 100%;
   height: 100%;
   display: flex;

   .sider {
      width: 300px;
   }

   .content {
      flex: 1;
   }
}
</style>