const userModel = require('../models/user')

const userController = {
  get: (req, res) => {

  },
  login:(req, res) => {
    res.render('login')
  },
  handleLogin: (req,res) => {
    if(req.body.password === 'abc') {
      req.session.isLogin = true
      res.redirect('/')
    } else {
      req.flash('errorMessage', 'Please input the correct password.')
      res.redirect('/login')
    }
  },
  logout:(req, res)=>{
    req.session.isLogin = false
    res.redirect('/')
  }
}
module.exports = userController