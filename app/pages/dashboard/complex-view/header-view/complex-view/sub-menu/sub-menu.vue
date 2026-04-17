<template>
   <el-sub-menu :index="menuItem.key">
      <template #title>{{ menuItem.name }}</template>
      <template v-for="item in menuItem.subMenu" :key="item.key">
         <SubMenu
            v-if="Array.isArray(item.subMenu) && item.subMenu.length > 0"
            :menuItem="item"/>
         <el-menu-item
            v-else
            :index="item.key">
            {{ item.name }}
         </el-menu-item>
      </template>
   </el-sub-menu>
</template>
<script setup>
import SubMenu from './sub-menu'
const { menuItem } = defineProps(['menuItem'])
</script>
<style lang="less" scoped>

</style>