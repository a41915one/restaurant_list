const Restaurant = require('../restaurant')
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')



//連線成功情況，事件監聽
db.once('open', () => {
  console.log('running restaurant seed')

  Restaurant.create(restaurantList)
    .then(() => {
      console.log('restaurantSeeder done!')
      db.close()
    })
    .catch(err => console.log('error'))

})