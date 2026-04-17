import { defineStore } from "pinia";
import { ref } from 'vue'

// 这是菜单（heade）
const useMenuStore = defineStore('menu-store', () => {
   const menuList = ref([])

   const setMenuList = (menu) => {
      menuList.value = menu || []
   }

   /*
      找出 值 对应 菜单
      key： 搜索字段 (menuType, moduleType)
      value： 搜索值
      mlist： 菜单。
   */
   const findMenuItem = ({ key, value }, mList = menuList.value) => {
      for(let i = 0; i < mList.length; ++i) {
         const menu = mList[i]

         const { menuType, moduleType } = menu

         if(menu[key] === value) {
            return menu
         }

         if(menuType === 'group' && Array.isArray(menu.subMenu) && menu.subMenu.length > 0) {
            const mItem = findMenuItem({key, value}, menu.subMenu);
            console.log('group.....', mItem)
            if(mItem) {return mItem}
         }

         if(moduleType === 'sider' && menu.siderConfig && menu.siderConfig.menu) {
            const mItem = findMenuItem({key, value}, menu.siderConfig.menu);
            if(mItem) {return mItem}
         }
      }
   }

   return {
      menuList,
      setMenuList,
      findMenuItem
   }
})

export default useMenuStore