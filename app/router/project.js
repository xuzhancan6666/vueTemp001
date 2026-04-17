
module.exports = (app, router) => {
   const { project: projectController } = app.controller

   router.get('/api/project/list', projectController.getList.bind(projectController))
   router.post('/api/project/project', projectController.getProject.bind(projectController))
}