const path = require('path')
const koaStatic = require('koa-static')

module.exports = (app) => {
   // 配置静态文件目录
   app.use(koaStatic(path.resolve(process.cwd(), './app/public')))

   // 使用nunjuck模版渲染
   const koaNunjucks = require('koa-nunjucks-2')
   app.use(koaNunjucks({
      ext: 'html',
      path: path.resolve(process.cwd(), './app/public'),
      nunjucksConfig: {
         noCache: true,
         trimBlocks: true
      }
   }))
}