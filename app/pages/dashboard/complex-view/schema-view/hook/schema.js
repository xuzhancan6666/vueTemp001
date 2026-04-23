import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import useMenuStore from '$store/menu.js'

const useSchema = () => {
   const route = useRoute()
   const menuStore = useMenuStore();

   const api = ref('')

   // 构建我们的SchemaConfig 配置
   // 提供给 schemaView 解析
   const buildData = () => {
      const { menu_key, sider_menu_key } = route.query
      const mItem = menuStore.findMenuItem(
         {
            key: 'key',
            value: sider_menu_key ?? menu_key,
         }
      )

      if(!mItem) return

      const { schemaConfig } = mItem
      api.value = schemaConfig.api ?? ''
   }

   watch([
      () => route.query.menu_key,
      () => route.query.sider_menu_key,
      () => menuStore.menuList
   ], () => {
      buildData()
   }, { deep: true })

   onMounted(() => {
      buildData()
   })

   return {
      api
   }
}

export default useSchema