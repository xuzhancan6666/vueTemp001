import { ref, watch, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import useMenuStore from '$store/menu.js'

const useSchema = () => {
   const route = useRoute()
   const menuStore = useMenuStore();

   const api = ref('')
   const tableSchema = ref({});
   const tableConfig = ref({});

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
      // 不污染源数据。
      const configSchema = JSON.parse(JSON.stringify(schemaConfig.schema))

      tableSchema.value = {};
      tableConfig.value = undefined;
      api.value = schemaConfig.api ?? ''

      nextTick(() => {
         tableSchema.value = buidlDtoSchema(configSchema, 'table');
         tableConfig.value = schemaConfig.tableConfig
      })
   }

   // 通用构建 schema 方法.
   // 取目标 schema 信息字段。消除噪音
   const buidlDtoSchema = (_schema, comName) => {
      if(!_schema?.properties) return {};

      const dotSchema = {
         type: 'object',
         properties: {}
      }

      // 提取目标 schema 信息字段。目的：(消除噪音!!!!!)
      for( const key in _schema.properties) {
         const props = _schema.properties[key];
         // 配置规范 => tableOptions searchBarOption formOption
         if(props[`${comName}Options`]) {
            let dtoProps = {};
            // 提取props中非 Options 的部分。存放到 dtoProps 中
            for(const pKey in props) {
               if(pKey.indexOf('Options') < 0) {
                  dtoProps[pKey] = props[pKey]
               }
            }

            // 处理 comName Options
            dtoProps = Object.assign({}, dtoProps, { options: props[`${comName}Options`]})
            dotSchema.properties[key] = dtoProps
         }
      }

      return dotSchema
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
      api,
      tableSchema,
      tableConfig
   }
}

export default useSchema