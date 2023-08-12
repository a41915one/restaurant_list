const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()
// 引用 Restaurant model
const Restaurant = require('../../models/restaurant')
// 引用 User model
const User = require('../../models/user')
const { authenticator } = require('../../middleware/auth')

router.get('/login', (req, res) => {
  res.render('login', { warning_msg: req.flash('warning_msg') });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))


router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  //取得註冊參數
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message: 'email, Password, Confirm Password欄位為必填！' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  // 下方重要，假如errors內有資料，代表有錯誤，需要render
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  //檢查使用者是否已經註冊
  User.findOne({ email })
    //得到一筆Data叫user
    .then(user => {
      if (user) {
        errors.push({ message: '此 Email 已經註冊過了！' })
        console.log('User already exists.')
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        //只要是請資料庫幫忙做的事情，因為是兩台不同伺服器，一定要等資料庫回傳結果，用.then等資料庫處理完再往下進行
        .then(() => res.redirect('/'))
        .catch(err => console.error('Create user into Data error!'))
    })
  //如果已經註冊，退回原本畫面
  //如果還沒註冊，寫入資料庫
})
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '已成功登出！')
  res.redirect('/users/login')
})
module.exports = router

