const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const User = require('../user')
const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const RestaurantList = require('../../restaurant.json').results

const SEED_USER = [
  {
    name: 'USER1',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'USER2',
    email: 'user2@example.com',
    password: '12345678'
  }
]

db.once('open', () => {
  // 使用map => seedUsers
  return Promise.all(Array.from(SEED_USER, (seedUser, index) => {
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(seedUser.password, salt))
      .then(hash => User.create({
        name: seedUser.name,
        email: seedUser.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        return Promise.all(Array.from(
          { length: 3 },
          (_, i) => Restaurant.create({ ...RestaurantList[index * 3 + i], userId })
        ))
      })
  }))
    .then(() => {
      console.log('done.')
      process.exit()
    })
})
// const Restaurant = require('../restaurant')
// const restaurantList = require('../../restaurant.json').results
// const User = require('../user')
// const bcrypt = require('bcryptjs')
// const db = require('../../config/mongoose')
// //const user = require('../user')
// const SEED_USER_01 = {
//   email: 'user1@example.com',
//   password: '12345678',
//   restaurantOwns: [1, 2, 3],
// }
// const SEED_USER_02 = {
//   email: 'user2@example.com',
//   password: '12345678',
//   restaurantOwns: [4, 5, 6],
// }



// //連線成功情況，事件監聽
// db.once('open', () => {
//   //連線成功時，Terminal印出相關訊息
//   console.log('running restaurant seed')
//   //雜湊，然後創造User給他雜湊後的密碼
//   bcrypt
//     .genSalt(10)
//     .then(salt => bcrypt.hash(SEED_USER_01.password, salt))
//     .then(hash =>
//       User.create({
//         email: SEED_USER_01.email,
//         password: hash,
//       })
//     )
//     .then(user => {
//       const userId = user._id;
//       console.log('SEED_USER_01 user created', user.email);
//       console.log('restaurantList:', restaurantList);
//       console.log('SEED_USER_01.restaurantOwns:', SEED_USER_01.restaurantOwns);
//       return Promise.all(Array.from(
//         { length: SEED_USER_01.restaurantOwns.length }, (_, i) =>
//         Restaurant.create({
//           ...restaurantList[SEED_USER_01.restaurantOwns[i] - 1], userId
//         })
//       ))
//     })
//     .then(() => {
//       console.log('SEED_USER_01 is done!')
//     })

//     .catch(err => console.error('SEED_USER_01 err'))

//   bcrypt
//     .genSalt(10)
//     .then(salt => bcrypt.hash(SEED_USER_02.password, salt))
//     .then(hash =>
//       User.create({
//         email: SEED_USER_02.email,
//         password: hash,
//       })
//     )
//     .then(user => {
//       const userId = user._id
//       return Promise.all(Array.from({ length: SEED_USER_02.restaurantOwns.length }, (_, i) => {
//         Restaurant.create({
//           ...restaurantList[SEED_USER_02.restaurantOwns[i] - 1], userId
//         })
//       }))
//     })
//     .then(() => {
//       console.log('SEED_USER_02 is done!')
//       process.exit()
//     })

//     .catch(err => console.error('SEED_USER_02 err'))

// })