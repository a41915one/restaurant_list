const express = require('express')
const session = require('express-session')
const usePassport = require('./config/passport')
const methodOverride = require("method-override")
const routes = require('./routes')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
//const restaurantList = require('./restaurant.json')
//const Restaurant = require('./models/restaurant')
//const mongoose = require('mongoose')
require('./config/mongoose')
//const restaurant = require('./models/restaurant')
//假設非Production正式機情況下才載入dotenv環境變數
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config()
// }
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

// //取得資料庫連線狀態
// const db = mongoose.connection
// //連線異常情況，事件監聽
// db.on('error', () => {
//   console.log('mongodb error!')
// })
// //連線成功情況，事件監聽
// db.once('open', () => {
//   console.log('mongodb connected!')
// })

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride("_method"));
usePassport(app)
app.use(routes)



app.listen(port, () => {
  console.log(`Express is listening on localhost:${port} `)
})