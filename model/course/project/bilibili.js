module.exports = {
   name: '课程管理-bilibili',
   desc: '课程管理-bilibili',
   homePage: '/todo?project_key=bilibili&menu_key=video',
   menu: [{
         key: 'video',
         name: '视频课程-bilibili',
      }, {
         key: 'class-resource',
         name: '课程资料',
         menuType: 'module',
         moduleType: 'sider',
         siderConfig: {
            menu: [{
               key: 'pdf',
               name: 'PDF',
               menuType: 'module',
               moduleType: 'custom',
               customConfig: {
                  path: '/todo'
               }
            }, {
               key: 'ppt',
               name: 'PPT',
               menuType: 'module',
               moduleType: 'custom',
               customConfig: {
                  path: '/todo'
               }
            }, {
               key: 'excel',
               name: 'EXCEL',
               menuType: 'module',
               moduleType: 'custom',
               customConfig: {
                  path: '/todo'
               }
            }]
         }
   }]
}