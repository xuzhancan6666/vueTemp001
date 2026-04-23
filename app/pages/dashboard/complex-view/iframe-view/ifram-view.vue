<template>
   <iframe :src="path" class="iframe"></iframe>
</template>
<script setup>
import {onMounted, ref, watch} from 'vue'
import { useRoute } from 'vue-router';
import useMenuStore from '$store/menu.js';

const menuStore = useMenuStore()
const route = useRoute()
const menuKey = ref(route.query.menu_key)
const siderMenuKey = ref(route.query.sider_menu_key)
const path = ref('')

function initPath() {
   const menuItem = menuStore.findMenuItem({
      key: 'key',
      value: siderMenuKey.value ?? menuKey.value
   })

   path.value = menuItem?.iframeConfig?.path ?? ''
}

watch([
   () => menuStore.menuList,
   () => route.query.menu_key,
   () => route.query.sider_menu_key
], () => {
   initPath()
}, { deep: true })

onMounted(() => {
   initPath()
})
</script>
<style lang="less" scoped>
.iframe {
   border: 0;
   width: 100%;
   height: 100%;
}
</style>