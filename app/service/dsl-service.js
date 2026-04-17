module.exports = (app) => {
   const BaseService = require('./base-service')(app)
   const modelList = require('../../model/index.js')(app)

   return class DslService extends BaseService {
      getDsl() {
         return modelList
      }

      getDslProjectList(projectKey) {
         const res = modelList.reduce((c, p) => {
            const project = p.project || {}

            if(Object.keys(project).includes(projectKey)) {
               const project = p.project || {}
               c = c.concat(Object.keys(project).map(key => project[key]))
            }

            return c
         }, [])
         console.log('ress.......', res)
         return res || []
      }

      getDslProject (projectKey) {
         const res = modelList.reduce((c, p) => {
            const project = p.project || {}
            if(Object.keys(project).includes(projectKey)) {
               c = project[projectKey]
            }

            return c
         }, {})

         return res || {}
      }
   }
}