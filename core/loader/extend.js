const path = require('path')
const glob = require('glob')
const { sep } = path
/**
 *
 * @param {koa} app Koa的实例
 * 加载extend下的所有文件。 实现 app.extend.${目录}.${文件}.js
 * 规定为单层结构。
 * app/extend/customer-extend
 *  => app.extend.customerExtend
 * @returns
 */
module.exports = (app) => {
   // 读取 app/extend/xxx/xxx.js
   const filePath = path.resolve(app.businessPath, 'extend')
   console.log('🔍 正在扫描extend目录:', filePath)
   // 检查目录是否存在
   if (!require('fs').existsSync(filePath)) {
     console.log('📁 extend目录不存在:', filePath)
     app.extend = {}
     return
   }

   // 解析出来的为 ['/app/extend/A.js', '/app/extend/B.js']
   const fileList = glob.sync(path.join(filePath, '**', '*.js'))
   console.log('📋 找到的extend文件:', fileList)

   // 遍历文件夹所有js。内容加载到 app.middelware 上
   const extend = {}
   fileList.forEach(file => {
      // 获取文件全路径
      let name = path.resolve(file)
      // 截取 extend 以下的 xxx/xxx.js
      // /app/extend/xxx/A.js' => xxx/A.js'
      name = name.substring(name.lastIndexOf(`${sep}extend`) + `${sep}extend`.length, name.length)
      // 把 xxx-xxx 改驼峰。a-a/aaa.js => aA.aaa.js
      name = name.replace(/[_-][a-z]/ig, (s) => s.substring(1).toUpperCase()).replace('.js', '')

      for(let key in app) {
         if(key === name) {
            console.log(`[extend load error] name: ${name} is already in app`)
         }
      }

      app.name = require(path.resolve(file))(app)

      console.log('tempExtend....', tempExtend)
   });

   app.extend = extend
   console.log('✅ extend加载完成:', Object.keys(app.extend))
}