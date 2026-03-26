const path = require('path')
const glob = require('glob')
const {sep} = path
/**
 *
 * @param {koa} app Koa的实例
 * 加载controller下的所有文件。 实现 app.controller.${目录}.${文件}.js
 * app/controller/customer-module/customer-controller
 *  => app.controller/customerModule.customerController
 * @returns
 */
module.exports = (app) => {
   // 读取 app/controller/xxx/xxx.js
   const filePath = path.resolve(app.businessPath, 'controller')
   console.log('🔍 正在扫描controller目录:', filePath)
   // 检查目录是否存在
   if (!require('fs').existsSync(filePath)) {
     console.log('📁 controller目录不存在:', filePath)
     app.controller = {}
     return
   }

   // 解析出来的为 ['/app/controller/xxx/A.js', '/app/controller/xxx/B.js']
   const fileList = glob.sync(path.join(filePath, '**', '*.js'))
   console.log('📋 找到的controller文件:', fileList)

   // 遍历文件夹所有js。内容加载到 app.middelware 上
   const controller = {}
   fileList.forEach(file => {
      // 获取文件全路径
      let name = path.resolve(file)
      // 截取 controller 以下的 xxx/xxx.js
      // xxx/xxx//app/controller/xxx/A.js' => xxx/A.js'
      name = name.split(`controller${sep}`)[1].replace('.js', '')

      // 把 xxx-xxx 改驼峰。a-a/aaa.js => aA.aaa.js
      name = name.replace(/[_-][a-z]/ig, (s) => s.substring(1).toUpperCase())

      let tempController = controller
      const names = name.split(sep);
      for(let i = 0; i < names.length; i++) {
         // 如果最后一位。就是文件名。
         // A/B/C/D.js
         // 3.A[B][C][D] => 4.A.B.C.D = reuqire(A/B/C/D.js)
         if(i === names.length - 1) {
             const ControllerModule = require(path.resolve(file))(app)
             tempController[names[i]] = new ControllerModule()
         } else {
            // 如果不是最后一位。
            // 1. A[B] = {} =>  2.A[B][C]
            console.log('names[i]\n\n', names, names[i])
            if(!tempController[names[i]]) {
               tempController[names[i]] = {}
            }

            tempController = tempController[names[i]]
         }
      }
   });

   app.controller = controller
   console.log('✅ controller加载完成:', Object.keys(app.controller))
}