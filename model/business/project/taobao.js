module.exports = {
   name: '淘宝',
   desc: '淘宝电商系统',
   homePage: '/todo?project_key=taobao&menu_key=product',
   menu: [
   {
      key: 'cupon',
      name: '优惠券',
      menuType: 'group',
      homePage: '',
      redirectKey: 'overCupen',
      subMenu: [{
         key: 'overCupen',
         name: '国补',
         menuType: 'module',
         moduleType: 'custom',
         customConfig: {
            path: '/todo'
         }
      }, {
         key: 'limit',
         name: '双11',
         menuType: 'module',
         moduleType: 'schema',
         schemaConfig: {
            api: '/api/redbook/client',
            schema: {}
         }
      }, {
         key: 'festival',
         name: '节日活动',
         menuType: 'module',
         moduleType: 'iframe',
         iframeConfig: {
            path: 'https://www.qianwen.com/'
         }
      }]
   }, {
      key: 'operation',
      name: '运营活动',
      menuType: 'module',
      moduleType: 'sider',
      siderConfig: {
         menu: [{
            key: 'operation1',
            name: '广告投放',
            menuType: 'group',
            subMenu: [{
               key: 'redbook',
               name: '小红书',
               menuType: 'module',
               moduleType: 'schema',
               schemaConfig: {
                  api: '/api/redbook/client',
                  schema: {
                     type: 'objcet',
                     properties: {
                        name: {
                           type: 'string',
                           label: '账号名称',
                           tableOptions: {}
                        },
                        id: {
                           type: 'string',
                           label: '账号ID',
                           tableOptions: {}
                        },
                        fansNum: {
                           type: 'number',
                           label: '粉丝数量',
                           tableOptions: {}
                        },
                        money: {
                           type: 'number',
                           label: '投流金额',
                           tableOptions: {}
                        }
                     },
                  },
                  tableConfig: {
                     headerButtons: [{
                        label: '新增商品',
                        eventKey: 'showComponent',
                        type: 'primary'
                     }],
                     rowButtons: [{
                        label: '修改',
                        eventKey: 'showComponent',
                        type: 'warning'
                     }, {
                        label: '删除',
                        eventKey: 'remove',
                        type: 'danger',
                        eventOptions: {
                           params: {
                              id: 'schema::id'
                           }
                        }
                     }]
                  },
               },
            }, {
               key: 'douyin',
               name: '抖音',
               menuType: 'module',
               moduleType: 'schema',
               schemaConfig: {
                  api: '/api/redbook/client',
                  schema: {}
               }
            }, {
               key: 'bilibili',
               name: 'bilibili',
               menuType: 'module',
               moduleType: 'iframe',
               iframeConfig: {
                  path: 'https://www.qianwen.com/'
               }
            }]
      }, {
            key: 'limit',
            name: '视频投放',
            menuType: 'module',
            moduleType: 'custom',
            customConfig: {
               path: '/todo'
            }
         }, {
            key: 'festival',
            name: '节日活动',
            menuType: 'module',
            moduleType: 'custom',
            customConfig: {
               path: '/todo'
            }
         }]
      }
   },]
}