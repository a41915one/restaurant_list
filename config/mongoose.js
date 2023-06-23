const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

//取得資料庫連線狀態
const db = mongoose.connection
//連線異常情況，事件監聽
db.on('error', () => {
  console.log('mongodb error!')
})
//連線成功情況，事件監聽
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db