const {z} = require('zod')

module.exports = {
   '/api/dsl/getProjectList' : {
      post: {
         type: 'data',
         schema: {
            projectKey: z.string()
         }
      }
   },
   '/api/dsl/getDslProject' : {
      post: {
         type: 'data',
         schema: {
            projectKey: z.string()
         }
      }
   }
}