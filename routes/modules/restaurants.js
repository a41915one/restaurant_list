const express = require('express')
const router = express.Router()
// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
  res.render('new')
})


router.get('/:restaurantId', (req, res) => {
  const userId = req.user._id
  //改用 findOne 之後，Mongoose 就不會自動幫我們轉換 id 和 _id，所以這裡要寫和資料庫一樣的屬性名稱，也就是 _id。
  //const { restaurantId } = req.params
  const _id = req.params.restaurantId
  return Restaurant.findOne({ _id, userId})
    .lean()
    .then((restaurantData) => res.render('show', { restaurantData }))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const { name, name_en, category, location, image, rating, phone, google_map, description } = req.body;

  if (!name || !name_en || !category || !location || !image || !rating || !phone || !google_map || !description) {
    return res.send('<script>alert("請填寫每一個欄位"); window.history.back();</script>');
  }

  return Restaurant.create({ name, name_en, category, location, image, rating, phone, google_map, description, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
});


router.get('/:restaurantId/edit', (req, res) => {
  const userId = req.user._id
  //改用 findOne 之後，Mongoose 就不會自動幫我們轉換 id 和 _id，所以這裡要寫和資料庫一樣的屬性名稱，也就是 _id。
  //const { restaurantId } = req.params
  const _id = req.params.restaurantId
  //const { restaurantId } = req.params
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurantData => res.render('edit', { restaurantData }))
    .catch(err => console.log(err))
})

router.put('/:restaurantId', (req, res) => {
  const userId = req.user._id
  //改用 findOne 之後，Mongoose 就不會自動幫我們轉換 id 和 _id，所以這裡要寫和資料庫一樣的屬性名稱，也就是 _id。
  //const { restaurantId } = req.params
  const _id = req.params.restaurantId
  //const { restaurantId } = req.params
  return Restaurant.findOneAndUpdate({ _id, userId }, req.body, { new: true })
    .then(restaurantData => res.redirect(`/restaurants/${restaurantId}`))
    .catch(err => console.log(err))
})

router.delete('/:restaurantId', (req, res) => {
  const userId = req.user._id
  //改用 findOne 之後，Mongoose 就不會自動幫我們轉換 id 和 _id，所以這裡要寫和資料庫一樣的屬性名稱，也就是 _id。
  //const { restaurantId } = req.params
  const _id = req.params.restaurantId
  //const restaurantId = req.params.restaurantId;
  return Restaurant.findOneAndDelete({ _id, userId})
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})


module.exports = router