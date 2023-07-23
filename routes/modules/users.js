const express = require('express')
const passport = require('passport')
const router = express.Router()
// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')
// 引用 User model
const User = require('../../models/user')
//const { use } = require('./home')

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.post('/register', (req, res) => {
  //取得註冊參數
  const { name, email, password, confirmPassword } = req.body
  //檢查使用者是否已經註冊
  User.findOne({ email })
    //得到一筆Data叫user
    .then(user => {
      if (user) {
        console.log('User already exists.')
        res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        return User.create({
          name,
          email,
          password
        })
          //只要是請資料庫幫忙做的事情，因為是兩台不同伺服器，一定要等資料庫回傳結果，用.then等資料庫處理完再往下進行
          .then(() => res.redirect('/'))
          .catch(err => console.error('Create user into Data error!'))
      }
    })
  //如果已經註冊，退回原本畫面
  //如果還沒註冊，寫入資料庫
})
router.get('/logout', (req, res) => {
  req.logout() //為Passport.js提供的函式，會幫助清除Session
  res.redirect('/users/login')
})

module.exports = router

