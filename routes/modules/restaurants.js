const express = require('express')
const router = express.Router()
// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
  res.render('new')
})


router.get('/:restaurantId', (req, res) => {
  const { restaurantId } = req.params
  return Restaurant.findById(restaurantId)
    .lean()
    .then((restaurantData) => res.render('show', { restaurantData }))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const { name, name_en, category, location, image, rating, phone, google_map, description } = req.body;

  if (!name || !name_en || !category || !location || !image || !rating || !phone || !google_map || !description) {
    return res.send('<script>alert("請填寫每一個欄位"); window.history.back();</script>');
  }

  return Restaurant.create({ name, name_en, category, location, image, rating, phone, google_map, description })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
});


router.get('/:restaurantId/edit', (req, res) => {
  const { restaurantId } = req.params
  return Restaurant.findById(restaurantId)
    .lean()
    .then(restaurantData => res.render('edit', { restaurantData }))
    .catch(err => console.log(err))
})

router.put('/:restaurantId', (req, res) => {
  const { restaurantId } = req.params
  return Restaurant.findByIdAndUpdate(restaurantId, req.body, { new: true })
    .then(restaurantData => res.redirect(`/restaurants/${restaurantId}`))
    .catch(err => console.log(err))
})

router.delete('/:restaurantId', (req, res) => {
  const restaurantId = req.params.restaurantId;
  return Restaurant.findByIdAndDelete(restaurantId)
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})


module.exports = router