const path = require('path')
const glob = require('glob')
const {sep} = path
/**
 *
 * @param {koa} app Koa的实例
 * 加载service下的所有文件。 实现 app.service.${目录}.${文件}.js
 * app/service/customer-module/customer-service
 *  => app.service/customerModule.customerservice
 * @returns
 */
module.exports = (app) => {
   // 读取 app/service/xxx/xxx.js
   const filePath = path.resolve(app.businessPath, 'service')
   console.log('🔍 正在扫描service目录:', filePath)
   // 检查目录是否存在
   if (!require('fs').existsSync(filePath)) {
     console.log('📁 service目录不存在:', filePath)
     app.service = {}
     return
   }

   // 解析出来的为 ['/app/service/xxx/A.js', '/app/service/xxx/B.js']
   const fileList = glob.sync(path.join(filePath, '**', '*.js'))
   console.log('📋 找到的service文件:', fileList)

   // 遍历文件夹所有js。内容加载到 app.middelware 上
   const service = {}
   fileList.forEach(file => {
      // 获取文件全路径
      let name = path.resolve(file)
      // 截取 service 以下的 xxx/xxx.js
      // /app/service/xxx/A.js' => xxx/A.js
      console.log('name1...', name)

      name = name.split(`service${sep}`)[1].replace('.js', '')
      // 把 xxx-xxx 改驼峰。a-a/aaa.js => aA.aaa.js
      name = name.replace(/[_-][a-z]/ig, (s) => s.substring(1).toUpperCase())

      let tempService = service
      const names = name.split(sep);
            console.log('name2...', names)

      for(let i = 0; i < names.length; i++) {
         // 如果最后一位。就是文件名。
         // A/B/C/D.js
         // 3.A[B][C][D] => 4.A.B.C.D = reuqire(A/B/C/D.js)
         if(i === names.length - 1) {
             const serviceModule = require(path.resolve(file))(app)
             tempService[names[i]] = new serviceModule()
         } else {
            // 如果不是最后一位。
            // 1. A[B] = {} =>  2.A[B][C]
            if(!tempService[names[i]]) {
               tempService[names[i]] = {}
            }

            tempService = tempService[names[i]]
         }
      }
      console.log('tempService....', tempService)
   });

   app.service = service
   console.log('✅ service加载完成:', Object.keys(app.service))
}