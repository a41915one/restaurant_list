module.exports = {
  authenticator: (req, res, next) => {
    // req.isAuthenticated是Passport.js提供的函式，根據登入狀態回傳true 或 false。
    if (req.isAuthenticated()){
      return next() //如果True，就會執行下個middleware
    }
    req.flash('warning_msg','請先登入才能使用')
    res.redirect('/users/login')
  }
}