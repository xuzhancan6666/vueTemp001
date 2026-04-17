import { defineStore } from "pinia";
import { ref, computed } from 'vue'

const useDslStore = defineStore('dsl-store', () => {
   const dsl = ref([])
   const modelKey = ref('')
   const projectKey = ref('')

   function setDsl(val) {
      dsl.value = val;
   }

   const modelProjectList = computed(() => {
      const res = dsl.value.reduce((c, p) => {
         if(p?.model?.key === modelKey.value) {
            const project = p.project || {}
            c = Object.keys(project).map(key => project[key])
         }

         return c
      }, [])

      return res
   })

   const project = computed(() => {
      const res = modelProjectList.value.find(obj => obj.key === projectKey.value) || {}

      return res
   })

   return {
      dsl,
      setDsl,
      modelKey,
      modelProjectList,
      project,
   }
})

export default useDslStore