const express = require('express')
const router = express.Router()
const passport = require('passport')

//向Facebook發出請求，帶入參數是我們向facebook要求的資料
router.get('/facebook', passport.authenticate('facebook', { 
  scope: ['email', 'public_profile']
}))

//是Facebook把資料發回來的地方，
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

module.exports = router