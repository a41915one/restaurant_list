const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  id: {
    type: text,
    required: true,
  },
  name: {
    type: text,
    required: true,
  },
  name_en: {
    type: text,
    required: true,
  },
  category: {
    type: text,
    required: true,
  },
  image: {
    type: text,
    required: true,
  },
  location: {
    type: text,
    required: true,
  },
  phone: {
    type: text,
    required: true,
  },
  google_map: {
    type: text,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  description: {
    type: text,
    required: true,
  },

})

module.exports = mongoose.models('Restaurant', restaurantSchema)