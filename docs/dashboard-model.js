{
   mode: 'dashboard', // 模版类型。不同类型对应不一样的模版数据结构
   name: '',//名称
   des: '', // 描述
   icon: '', //
   homePage: '',
   // 头部菜单
   menu: [{
      key: '', //菜单唯一描述
      name: '', // 菜单名称
      menuType: '', // 枚举值： group / module
      // menueType == gruop 可用subMenu
      subMenu: [{
         // 可递归 Item
      }],
      // 当我们 moduleType == module 时。 可填
      moduleType: '', // 枚举值： iframe/custom/schema/sider
      // 当 moduleType === iframe
      ifameConfig: {
         path: '',// iframe路径
      },
      // 当 moduleType === custom
      customConfig: {
         path: '', // 自定义路由
      },
      // 当 moduleType === schema
      schemaConfig: {
         api: '/api/user', // 数据API
         schema: {
            // 板块数据结构
            type: object,
            properties: {
               key: {
                  ...schema, // 标准schema 配置、
                  type: '', // 字段类型
                  label: '', // 字段的中文名
                  // 该字段在 table 中的相关配置
                  tableOptions:  {
                     ...elTbaleColumnConfig, // 标准ElTableColumn
                     toFixed: 2, // 保留小数后 功能配置
                     visible: true/false, // 默认 true 用于展示 表单中是否展示。
                  },
                  searchBarOptions: {},
                  formOptions: {}
               }
            },
         },
         // table config
         tableConfig: {
            headerButtons: [{
               label: '', //中文名
               eventKey: 'remove', //事件名称, 假设为 remove
               eventOptions: {
                  // 当 eventKey === ‘remove’
                  /*
                     key1: 表示接口传参的Key。 key2：表示对应dto内的取值Key
                     params : {
                        key1: 'schema::key2'
                     }
                  */
                  params: {
                     // paramsKey 为参数 Key。
                     // rowValueKey = 参数值 当格式为 schema::tableKey 的时候。到 table 中找相应的字段
                     paramKey: rowValueKey,
                     user_id: schema::userId
                  }
               }, //按钮具体配置
               ...elButtonConfig //标准ELbutton配置。
            }, ...],
            // 这是 table 行内 Options
            rowButtons: [{
               label: '', //中文名
               eventKey: '', //事件名称,
               eventOptions: {}, //按钮具体配置
               ...elButtonConfig //标准ELbutton配置。
            }, ...],
         },
         searchConfig: {}, //search-bar config
         components: {}, //模块组件
      },
      // 当 moduleType === sider
      siderConfig: {
         menu: [{
            // 可递归 menuItem
         }]
      }
   }]
}