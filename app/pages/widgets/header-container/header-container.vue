<template>
   <el-container class="header-container">
      <el-header class="header">
         <el-row type="flex" align="middle" class="header-row">
            <!-- 系统标题LOGO-->
            <el-row type="flex" align="middle" class="title-panel">
               <img class="logo" src="./asset/logo/monkey.png">
               <el-row class="text">{{ title }}</el-row>
            </el-row>

            <!-- 头部 插槽菜单内容 -->
            <slot name="header-menu-content"></slot>

            <!-- 插槽 设置区域-->
            <el-row type="flex" align="middle" justify="end" class="setting-panel">
               <slot name="header-setting-content"></slot>
               <img src="./asset/logo/face.png" class="user-logo">
               <el-dropdown @command="handleUserCommand">
                  <span class="userName">
                     {{userName}}<i class="el-icon-arrow-right"></i>
                  </span>
                  <template #dropdown>
                     <el-dropdown-item command="logout">退出登陆</el-dropdown-item>
                  </template>
               </el-dropdown>
            </el-row>
         </el-row>
      </el-header>
      <el-main class="main-container">
         <!-- 内容区域 -->
         <slot name="main-content"></slot>
      </el-main>
   </el-container>
</template>
<script setup>
import {ref} from 'vue'

defineProps({
   title: {
      type: String,
      default: '标题'
   }
})
const userName = ref('不讲不讲');
const handleUserCommand = (command) => {
   if(command === 'logout') {
      console.log('退出登录');
   }
}
</script>
<style lang="less" scoped>
.header-container {
   height: 100%;
   min-width: 1000px;
   overflow: hidden;

   .header {
      max-height: 120px;
      border-bottom: 1px solid #e8e8e8;

      .header-row {
         height: 100%;
         padding: 0 20px;

         .title-panel {
            width: auto;
            min-width: 180px;

            .logo{
               margin-right: 10px;
               height: 40px;
               width: 40px;
               border-radius: 8px;
            }

            .text {
               font-size: 18px;
               font-weight: 500;
            }
         }

         .setting-panel {
            margin-left: auto;
            min-width: 180px;
            padding: 0 20px;

            .user-logo {
               width: 32px;
               height: 32px;
               border-radius: 50%;
               margin-right: 10px;
            }

            .userName {
               font-size: 14px;
            }

         }
      }

   }

   .main-container {}
}

:deep(.el-header) {
   padding: 0;
}
</style>