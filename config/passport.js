const passport = require('passport')
const User = require('../models/user')
//const { use } = require('../routes')
const LocalStrategy = require('passport-local').Strategy

module.exports = app => {
  //初始化Passport模組
  app.use(passport.initialize())
  app.use(passport.session())
  //設定本地登入策略
  passport.use(new LocalStrategy(
    { usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, { message: 'This email is not registered, yet!' })
          }
          if (user.password !== password) {
            return done(null, false, { message: 'Email or Password incorrect.' })
          }
          return done(null, user)
        })
        .catch(err => done(err, false))
    }))
  //設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(error => done(err, null))
  })

}