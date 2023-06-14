const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
//const restaurantList = require('./restaurant.json')
const Restaurant = require('./models/restaurant')
const mongoose = require('mongoose')
const restaurant = require('./models/restaurant')
//假設非Production正式機情況下才載入dotenv環境變數
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

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

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurantData => res.render('index', { restaurantData }))
    .catch(error => console.log(error))
})

//app.get('/', (req, res) => {
//  res.render('index', { restaurants: restaurantList.results })
//})

//app.get('/restaurants/:restaurant_id', (req, res) => {
//  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
//  res.render('show', { restaurant: restaurant })
//})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})


app.get('/search', (req, res) => {
    if (!req.query.keywords){
      res.redirect('/')
    }
  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim().toLowerCase()

  Restaurant.find({})
    .lean()
    .then(restaurantData => {
      const filterRestaurantsData = restaurantData.filter(
        data =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      )
      res.render('index', { restaurantData: filterRestaurantsData, keywords })
    })
    .catch(err => console.log(err))
  //const restaurant = restaurantList.results.filter(restaurant => {
  //  return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  //})
  //res.render('index', { restaurants: restaurant })
})

app.get('/restaurants/new', (req, res) =>{
  res.render('new')
})



app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port} `)
})