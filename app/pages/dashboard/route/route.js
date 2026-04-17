const routes = [];

// 初始化 通用逻辑

// 1.头部菜单路由
// iframe 类型
routes.push({
   path: '/iframe',
   component: () => import('../complex-view/iframe-view/ifram-view.vue')
})

// schema 类型
routes.push({
   path: '/schema',
   component: () => import('../complex-view/schema-view/schema-view.vue')
})

// todo 类型
// 自定义路由 custom
routes.push({
   path: '/todo',
   component: () => import('../todo-view/todo.vue')
})


//2. 侧边栏菜单路由
routes.push({
   path: '/sider',
   component: () => import('../complex-view/sider-view/sider-view.vue'),
   children: [
      {
         path: 'iframe',
         component: () => import('../complex-view/iframe-view/ifram-view.vue')
      },
      {
         path: 'schema',
         component: () => import('../complex-view/schema-view/schema-view.vue')
      },
      // 自定义路由 custom
      {
         path: 'todo',
         component: () => import('../todo-view/todo.vue')
      }
   ]
})

// 侧边栏兜底
routes.push({
   path: '/sider/:chapters+',
   component: () => import('../complex-view/sider-view/sider-view.vue')
})


export default routes