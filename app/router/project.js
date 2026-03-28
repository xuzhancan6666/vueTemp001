module.exports = (app, router) => {
   const { project: projectConfroller } = app.controller
   // 用户输入 http://ip:port/view/xxx 渲染出对应的页面
   router.get('/api/project/list', projectConfroller.getList.bind(projectConfroller))
}