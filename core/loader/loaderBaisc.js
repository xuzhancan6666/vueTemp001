// 这里整一个loadfile的基础类。
// @param
//    dir: 目标文件夹物理地址。

class loaderBaisic {
   constructor(dir, name) {
      this.dir = dir
      this.name = name
      this.filePath =  path.resolve(app.businessPath, dir)
   }

   loadFilesByFile(app) {
      if (!require('fs').existsSync(this.filePath)) {
        console.log(`📁 目标${this.name}Loader不存在:`, this.filePath)
        app[this.name] = {}
        return
      }

     // 解析出来的为 ['/app/loaderModule/xxx/A.js', '/app/loaderModule/xxx/B.js']
      const fileList = glob.sync(path.join(filePath, '**', '*.js'))
      console.log(`📁 找到${this.name}Loader存在:`, fileList)

      // 遍历文件夹所有js。内容加载到 app.middelware 上
      const loaderModule = {}
      fileList.forEach(file => {
         // 获取文件全路径
         let name = path.resolve(file)
         // 截取 loaderModule 以下的 xxx/xxx.js
         // /app/loaderModule/xxx/A.js' => xxx/A.js'
         name = name.substring(name.lastIndexOf(`${sep}${name}`) + `${sep}${name}`.length, name.length)
         // 把 xxx-xxx 改驼峰。a-a/aaa.js => aA.aaa.js
         name = name.replace(/[_-][a-z]/ig, (s) => s.substring(1).toUpperCase()).replace('.js', '')

         let temploaderModule = loaderModule
         const names = name.split(sep);
         for(let i = 0; i < names.length; i++) {
            // 如果最后一位。就是文件名。
            // A/B/C/D.js
            // 3.A[B][C][D] => 4.A.B.C.D = reuqire(A/B/C/D.js)
            if(i === names.length - 1) {
               temploaderModule[names[i]] = require(path.resolve(file))(app)
            } else {
               // 如果不是最后一位。
               // 1. A[B] = {} =>  2.A[B][C]
               if(!temploaderModule[names[i]]) {
                  temploaderModule[names[i]] = {}
               }

               temploaderModule = temploaderModule[names[i]]
            }
         }
         console.log('temploaderModule....', temploaderModule)
      });

      app[this.name] = loaderModule
   }
}