module.exports = (app) => {
   const BaseController = require('./base.js')(app)
   const { dslService } = app.service

   return class DslController extends BaseController {
      async getDsl(ctx) {
         const res = dslService.getDsl(ctx)

         this.success(ctx, res, {})
      }

      async getDslProjectList(ctx) {
         const { projectKey = '' } = ctx.request.body
         const res = dslService.getDslProjectList(projectKey)

         this.success(ctx, res, {})
      }

      async getDslProject(ctx) {
         const { projectKey = '' } = ctx.request.body
         const res = dslService.getDslProject(projectKey)

         this.success(ctx, res, {})
      }
   }
}