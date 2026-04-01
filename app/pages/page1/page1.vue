<template>
   <h1>Page1</h1>
   <input v-model="content">
   <span>{{ content }}</span>
</template>
<script setup>
   import { ref } from 'vue'
   import util from '$common/utils';
   const content = ref('')
   console.log('page1....', content.value)
   util()
</script>
<style lang="less" scoped>
h1 {
   color: red;
}
</style>
