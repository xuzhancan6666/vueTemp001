const path = require('path')
const glob = require('glob')
const { sep } = path

module.exports = (app) => {
   // 读取 app/middleware/xxx/xxx.js
   const filePath = path.resolve(app.businessPath, 'middleware')
   console.log('🔍 正在扫描中间件目录:', filePath)


   // 解析出来的为 ['/app/middleware/xxx/A.js', '/app/middleware/xxx/B.js']
   const fileList = glob.sync(path.resolve(filePath, `.${sep}**${sep}**.js`))
   console.log('📋 找到的中间件文件:', fileList)

   // 遍历文件夹所有js。内容加载到 app.middelware 上
   const middleware = {}
   fileList.forEach(file => {
      // 获取文件全路径
      let name = path.resolve(file)
      // 截取 middleware 以下的 xxx/xxx.js
      // /app/middleware/xxx/A.js' => xxx/A.js'
      name = name.substring(name.lastIndexOf(`${sep}middleware`) + `${sep}middleware`.length, name.length)
      // 把 xxx-xxx 改驼峰。a-a/aaa.js => aA.aaa.js
      name = name.replace(/[_-][a-z]/ig, (s) => s.substring(1).toUpperCase()).replace('.js', '')

      let tempMiddleware = middleware
      const names = name.split(sep);
      for(let i = 0; i < names.length; i++) {
         // 如果最后一位。就是文件名。
         // A/B/C/D.js
         // 3.A[B][C][D] => 4.A.B.C.D = reuqire(A/B/C/D.js)
         if(i === names.length - 1) {
            tempMiddleware[names[i]] = require(path.resolve(file))(app)
         } else {
            // 如果不是最后一位。
            // 1. A[B] = {} =>  2.A[B][C]
            if(!tempMiddleware[names[i]]) {
               tempMiddleware[names[i]] = {}
            }

            tempMiddleware = tempMiddleware[names[i]]
         }
      }
      console.log('tempMiddleware....', tempMiddleware)
   });

   app.$middleware = middleware
   console.log('✅ 中间件加载完成:', Object.keys(app.middleware))
}