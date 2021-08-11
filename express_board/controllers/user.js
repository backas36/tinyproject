const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const saltRounds = 10;


const userController = {
  get: (req, res) => {

  },
  login:(req, res) => {
    res.render('login')
  },
  handleLogin: (req,res, next) => {
    const {username, password} = req.body
    if( !username || !password){
      req.flash('errorMessage', '該填的沒填唷！')
      return next()
    }

    userModel.get(username, (error, user) => {
      if(error) {       
        req.flash('errorMessage', error.toString())
        return next()
        
      }
      if(!user){
        req.flash('errorMessage', '帳號不存在')
        return next()
        
      }
      bcrypt.compare(password, user.password, function(error, result) {
        if(error || !result) {        
          req.flash('errorMessage', '密碼錯誤')
          return next()
        }
        req.session.username = user.username
        res.redirect('/')
      });
    })
  },
  logout:(req, res)=>{
    req.session.username = false
    res.redirect('/')
  },
  register: (req, res) => {
    res.render('user/register')

  },
  handleRegister:(req, res, next) => {
    const {username, password, nickname} = req.body
    if(!username || !password || !nickname){
      req.flash('errorMessage', 'You should fill in all input field')
      return next()
    }


    bcrypt.hash(password, saltRounds, function(error, hash) {
      if(error){
        req.flash('errorMessage',error.toString() )
        return next()
        
      }

      userModel.add({
        username,
        nickname,
        password: hash
      }, (error, result) => {
        if(error) {
          req.flash('errorMessage',error.toString() )
          return next()
          
        }
        req.session.username = username
        res.redirect('/')
      })
    });
  },
  
}
module.exports = userController