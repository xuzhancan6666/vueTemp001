module.exports = (app) => {
   return class PorjectController {
      async getList(ctx) {
         const {project: projectService} = app.service
         const res = projectService.getList()
         ctx.status = 200
         ctx.body = {
            sucess: true,
            data: res,
            metadata: {}
         }
      }
   }
}