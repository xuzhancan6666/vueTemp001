module.exports = (app) => {
   const BaseService = require('./base-service')(app)

   return class SocialAppService extends BaseService{
      getList() {
         return [{
            name: '阿祖',
            id: 'az',
            fansNum: '1000',
            money: '1000',
         }, {
            name: '则玄',
            id: 'zx',
            fansNum: '12233',
            money: '1222',
         }, {
            name: '弥渡',
            id: 'asdd',
            fansNum: '3231',
            money: '112',
         }]
      }
   }
}