module.exports = (app) => {
   return class projectService {
      getList() {
         return [{
            name: 'projectA',
         }, {
            name: 'projectB'
         }]
      }
   }
}