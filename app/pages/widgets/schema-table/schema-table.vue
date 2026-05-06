<template>
   <div class="schema-table">
      <el-table
         class="table"
         v-if="schema && schema.properties"
         v-loading="loading"
         :data="tableData"
      >
         <template v-for="(item, key) in schema.properties">
            <el-table-column
               :prop="key"
               :label="item.label"
               v-bind="item.options"
            ></el-table-column>
         </template>
         <el-table-column
            v-if="buttons?.length > 0"
            label="操作"
            fixed="right"
            :width="operationWidth"
         >
            <template #default="scope">
               <el-button
                  v-for="btn in buttons"
                  link
                  v-bind="btn"
                  @click="opertaionHandler({btnConfig: btn, rowData: scope.row})">
                  {{ btn.label }}
               </el-button>
            </template>
         </el-table-column>
      </el-table>
      <el-row class="pagination" justify="end">
         <el-pagination
            :total="total"
            :current-page="currentPage"
            :page-size="pageSize"
            :page-sizes="[10, 20, 30, 50, 100]"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            layout="total, sizes, prev, pager, next, jumper">
         </el-pagination>
      </el-row>
   </div>
</template>
<script setup>
import { computed, nextTick, onMounted, toRefs, watch, ref } from 'vue';
import curl from '$common/curl.js'

const props = defineProps({
   /** schema 配置如下。
    * {
         // 板块数据结构
         type: object,
         properties: {
            key: {
               ...schema, // 标准schema 配置、
               type: '', // 字段类型
               label: '', // 字段的中文名
               // 该字段在 table 中的相关配置
               options:  {
                  ...elTbaleColumnConfig, // 标准ElTableColumn
                  visible: true/false, // 默认 true 用于展示 表单中是否展示。
               },}
            }
         },
      },
    */
   schema: Object,

   // 数据源API
   api: String,

   /**  操作按钮相关配置
      [{
         label: '', //中文名
         eventKey: '', //事件名称,
         eventOptions: {}, //按钮具体配置
         ...elButtonConfig //标准ELbutton配置。
      }, ...],
   */
   buttons: Array
})

const emits = defineEmits(['rowOperation'])
const {schema, api, buttons} = toRefs(props)

const loading = ref(false)
const tableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0)

const operationWidth = computed(() => {
   return buttons?.value?.length > 0 ? buttons.value.reduce((pre, cur) => {
      return pre += cur.label.length * 18
   }, 50) : 50;
})

// 请求tableData
const fetchTableData = async() => {
   if(!api.value) return

   loadingVisible(true)

   const res = await curl({
      method: 'get',
      url: `${api.value}/list`,
      query: {
         page: currentPage.value,
         size: pageSize.value
      }
   })

   if(!res || !res.success || !Array.isArray(res.data)) {
      tableData.value = [];
      total.value = 0;

      loadingVisible(false)

      return
   }

   tableData.value = buildTableData(res.data)
   total.value = res.metadata.total

   loadingVisible(false)
}

/*
加工我们原始 tableData
*/
const buildTableData = (listData) => {
   if(!schema.value?.properties) {
      return listData;
   }

   return listData.map(rowItem => {
      for(const dKey in rowItem) {
         const schemaItem = schema.value.properties[dKey];

         // 比如我们配置了toFixed
         if(schemaItem?.options?.toFixed) {
            rowItem[dKey] = rowItem[dKey].toFixed && rowItem[dKey].toFixed(schemaItem.option.toFixed)
         }
      }
      return rowItem
   })
}

// table行数据操作
const opertaionHandler = ({btnConfig, rowData}) => {
   emits('rowOperation', { btnConfig, rowData })
}

// pagination 翻页操作
const handleCurrentChange = async (value) => {
   currentPage.value = value
   await loadTableData()
}

const handleSizeChange = async(value) => {
   pageSize.value = value
   await loadTableData()
}

// loading控制
const loadingVisible = async(visible) => {
   loading.value = visible
}


// 初始化
const initData = () => {
   currentPage.value = 1;
   pageSize.value = 10;

   nextTick(async () => {
      await loadTableData();
   })
}

// 由于 watch。onmounted 都可能触发 initData。
// 可能触发重复请求 我们设置间隔
let timeOut = null;
const loadTableData = async() => {
   clearTimeout(timeOut)
   timeOut = setTimeout(async() => {
      await fetchTableData()
      timeOut = null
   }, 100)
}

watch([
   () => api, () => schema
], () => {
   initData()
   console.log('watch.,....')
}, {
   deep: true
})

onMounted(() => {
   initData()
   console.log('onMounted.,....')
})

defineExpose({
   initData,
   loadTableData,
   loadingVisible
})
</script>
<style lang="less" scoped>
.schema-table {
   flex: 1;
   display: flex;
   flex-direction: column;
   overflow: auto;

   .table {
      flex: 1
   }

   .pagination {
      margin: 8px;
      text-align: right;
   }
}
</style>