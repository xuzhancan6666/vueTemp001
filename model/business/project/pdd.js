module.exports = {
   name: 'pdd',
   desc: 'pdd电商系统',
   homePage: '/todo?project_key=pdd&menu_key=product',
   menu: [{
      key: 'product',
      name: '商品管理-pdd',
      moduleType: 'custom',
      customConfig: {
         path: '/todo'
      }
   },{
      key: 'order',
      name: '订单管理-pdd',
      moduleType: 'schema',
   },{
      key: 'data',
      name: '数据分析',
      menuType: 'module',
      moduleType: 'sider',
      siderConfig: {
         menu: [{
            key: 'analysis',
            name: '电商罗盘',
            menuType: 'module',
            moduleType: 'custom',
            customConfig: {
               path: '/todo'
            }
         }]
      }
   }]
}