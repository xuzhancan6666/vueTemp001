module.exports = (app, router) => {
   const { socialAppClient } = app.controller

   router.get('/api/redbook/client/list', socialAppClient.getListByApp.bind(socialAppClient))
}