<template>
   <HeaderContainer :title="项目列表">
      <template #main-content>
         <el-row type="flex" di v-for="dsl in dslList" :key="dsl?.model?.key">
            <div class="dsl-panel">
               <span class="title">{{ dsl?.model?.name }}</span>
            </div>
            <el-row type="flex" class="card-row" shadow="hover">
               <el-card v-for="project in dsl?.project" class="project-card">
                  <template #header>
                     <span class="card-title">{{ project.name }}</span>
                  </template>
                  <div class="card-content">
                     <span>
                        {{ project.desc }}
                     </span>
                  </div>
                  <template #footer>
                     <div class="card-footer">
                        <el-link @click.prevent="projectGo(project)">进入系统</el-link>
                     </div>
                  </template>
               </el-card>
            </el-row>
         </el-row>
      </template>
   </HeaderContainer>
</template>
<script setup>
import {ref, onMounted} from 'vue'
import curl from '$common/curl'
import HeaderContainer from '$widgets/header-container/header-container.vue'
import useDslStore from '$store/dsl.js'
const dslStore = useDslStore()
const dslList = ref([]);
const modelKey = ref('');
const projectKey = ref('');

const getDsl = async () => {
   try {
      const res = await curl({
         url: '/api/dsl',
         method: 'get',
      })

      dslList.value = res.data || [];
      dslStore.setDsl(dslList.value)
   } catch (error) {
   }
}

const projectGo = async (project) => {
   const { origin}  = window.location
   window.open(`${origin}/view/dashboard#${project.homePage}`)
}

onMounted(() => {
   getDsl();
})

</script>
<style lang="less" scoped>

.dsl-panel {
   width: 200px;
   display:inline-flexbox;
   margin: 10px 20px;
   border-bottom: 1px solid #ccc;

   .title {
      font-size: 14px;
      line-height: 32px;
      margin-top: 8px;
   }
}
.card-row {
   width: 100%;

   .project-card {
      width: 300px;
      margin: 0 20px;

      .card-header {
         font-size: 16px;
      }

      .card-footer {
         width: 100%;
         text-align: right;
         font-size: 12px;
      }
   }
}


</style>