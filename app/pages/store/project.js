import { defineStore } from "pinia";
import { ref } from 'vue'

// 这是菜单（heade）
const useProjectStore = defineStore('project-store', () => {
   const projectList = ref([])

   const setProjectList = (project) => {
      projectList.value = project
   }

   return {
      projectList,
      setProjectList
   }
})

export default useProjectStore