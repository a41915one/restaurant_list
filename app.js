const express = require('express')
const methodOverride = require("method-override")
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
//const restaurantList = require('./restaurant.json')
const Restaurant = require('./models/restaurant')
const mongoose = require('mongoose')
//const restaurant = require('./models/restaurant')
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
app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride("_method"));

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

app.get('/search', (req, res) => {
  if (!req.query.keywords) {
    return res.redirect('/')
  }
  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim().toLowerCase()

  return Restaurant.find({})
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
})

app.get('/restaurants/new', (req, res) => {
  res.render('new')
})


app.get('/restaurants/:restaurantId', (req, res) => {
  const { restaurantId } = req.params
  return Restaurant.findById(restaurantId)
    .lean()
    .then((restaurantData) => res.render('show', { restaurantData }))
    .catch(error => console.log(error))
})

app.post('/restaurants', (req, res) => {
  const { name, name_en, category, location, image, rating, phone, google_map, description } = req.body;

  if (!name || !name_en || !category || !location || !image || !rating || !phone || !google_map || !description) {
    return res.send('<script>alert("請填寫每一個欄位"); window.history.back();</script>');
  }

  return Restaurant.create({ name, name_en, category, location, image, rating, phone, google_map, description })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
});

// app.post('/restaurants', (req, res) => {
//   const name = req.body.name
//   const name_en = req.body.name_en
//   const category = req.body.category
//   const location = req.body.location
//   const image = req.body.image
//   const rating = req.body.rating
//   const phone = req.body.phone
//   const google_map = req.body.google_map
//   const description = req.body.description
//   //console.log('Received category:', category)
//   return Restaurant.create({ name, name_en, category, location, image, rating, phone, google_map, description })
//     .then(() => res.redirect('/'))
//     .catch(err => console.log(err))
// })


app.get('/restaurants/:restaurantId/edit', (req, res) => {
  const { restaurantId } = req.params
  return Restaurant.findById(restaurantId)
    .lean()
    .then(restaurantData => res.render('edit', { restaurantData }))
    .catch(err => console.log(err))
})

app.put('/restaurants/:restaurantId/', (req, res) => {
  const { restaurantId } = req.params
  return Restaurant.findByIdAndUpdate(restaurantId, req.body, { new: true })
    .then(restaurantData => res.redirect(`/restaurants/${restaurantId}`))
    .catch(err => console.log(err))
})

app.delete('/restaurants/:restaurantId', (req, res) => {
  const restaurantId = req.params.restaurantId;
  return Restaurant.findByIdAndDelete(restaurantId)
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})






app.listen(port, () => {
  console.log(`Express is listening on localhost:${port} `)
})