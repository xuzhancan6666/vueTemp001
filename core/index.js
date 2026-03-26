const Koa = require('koa')
const path = require('path')
const {sep} = path
const env = require('./env')

// 引入我们所写的所有基础loader
const middlewareLoader = require('./loader/middleware')
const routerSchemaLoader = require('./loader/router-schema')
const controllerLoader = require('./loader/controller')
const serviceLoader = require('./loader/service')
const configLoader = require('./loader/config')
const extendLoader = require('./loader/extend')
const routeLoader = require('./loader/router')
module.exports = {
   // 个人配置挂载到 options 上。 options给到我们app
   // options : {
         // name: 项目名称
         // homePage： ‘’
   // }
   start(options = {}) {
      try {
         const app = new Koa()

         app.options = options
         // 基础路径
         app.basicDir = process.cwd()
         // 业务路径。sep用于不同系统的转译 --> /
         app.businessPath = path.resolve(app.basicDir, `.${sep}app`)
         // 初始化当前环境
         app.env = env

         middlewareLoader(app)
         console.log('[start]...middleware loaded', app.$middleware)

         routerSchemaLoader(app)
         console.log('[start]...routerSchema loaded', app.routerSchema)

         controllerLoader(app)
         console.log('[start]...controller loaded', app.controller)

         serviceLoader(app)
         console.log('[start]...service loaded', app.service)

         configLoader(app)
         console.log('[start]...config loaded', app.config)

         extendLoader(app)
         console.log('[start]...extend loaded', app.extend)

         try {
            require(path.resolve(`${app.businessPath}${sep}middleware.js`))(app)
            console.log('-- [start]...globel middleware loaded --')
         } catch (error) {
            console.log('[exception]: there is no globle middleware...', error)
         }

         routeLoader(app)
         console.log('[start]...route loader', app.route)

         // 添加一个简单的路由处理
         app.use(async (ctx) => {
            ctx.body = 'Hello World! Koa server is running.'
         })

         const port = process.env.PORT || 3000
         const host = process.env.IP || 'localhost'

         app.listen(port, host, () => {
            console.log(`Server running at http://${host}:${port}`)
         })
      } catch (error) {
         console.error('Failed to start server:', error)
      }
   }
}

