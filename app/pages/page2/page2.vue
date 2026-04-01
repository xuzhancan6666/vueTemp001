<template>
   <h1>page2</h1>
   <input v-model="content">
   <span>{{ content }}</span>
</template>
<script setup>
   import {ref} from 'vue'
   import util from '$common/utils';

   const content = ref('page2')
   console.log('page2....',  content.value)
   util()
</script>
<style lang="less" scoped>
h1 {
   color: red;
}
</style>
