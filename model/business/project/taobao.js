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
                  api: '/api/client',
                  schema: {}
               }
            }, {
               key: 'douyin',
               name: '抖音',
               menuType: 'module',
               moduleType: 'schema',
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