/**
 * 路由加载器
 * 负责加载和注册所有路由
 * /router 文件夹下 所有 js 加载到 KoaRouter下面
 */

const path = require('path');
const glob = require('glob');
const KoaRouter = require('koa-router');
const {sep} = path
module.exports = (app) => {
   // 找路由文件
   const filePath = path.resolve(app.businessPath, `.${sep}router`)

   // 加载进 KoaRouter 中
   const router = new KoaRouter()
   const fileList = glob.sync(path.join(filePath, '**', '*.js'))

   fileList.forEach(file => {
      require(path.resolve(file))(app, router)
   });

   // 兜底路由
   router.get('*', async(ctx, next) => {
      ctx.status = 302 // 临时重定向
      ctx.redirect(`${app?.options?.homePage || '/'}`)
   })
   // 注册到 app 上

   app.use(router.routes())
   app.use(router.allowedMethods())
}