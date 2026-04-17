module.exports = {
   model: 'dashboard',
   name: '电商',
   menu: [{
      key: 'product',
      name: '商品管理',
      menuType: 'module',
      moduleType: 'custom',
      customConfig: {
         path: '/todo'
      }
   },{
      key: 'order',
      name: '订单管理',
      menuType: 'module',
      moduleType: 'custom',
      customConfig: {
         path: '/todo'
      }
   },{
      key: 'client',
      name: '客户管理',
      menuType: 'module',
      moduleType: 'custom',
      customConfig: {
         path: '/todo'
      }
   },{
      key: 'insertIframe',
      name: '外部系统',
      menuType: 'module',
      moduleType: 'iframe',
      iframeConfig: {
         path: 'http://www.baidu.com'
      }
   }]
}