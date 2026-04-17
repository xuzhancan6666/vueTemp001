module.exports = (app, router) => {
   const {dsl: dslController} = app.controller

   router.get('/api/dsl', dslController.getDsl.bind(dslController))
   router.post('/api/dsl/getDslProjectList', dslController.getDslProjectList.bind(dslController))
   router.post('/api/dsl/getDslProject', dslController.getDslProject.bind(dslController))
}