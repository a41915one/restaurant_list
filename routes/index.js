const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')

// 將網址結構符合'/'字串的 request 導向 home模組
router.use('/restaurants', authenticator, restaurants)
router.use('/users', users)
router.use('/auth', auth)
router.use('/', authenticator, home)
module.exports = router