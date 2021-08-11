const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const saltRounds = 10;


const userController = {
  get: (req, res) => {

  },
  login:(req, res) => {
    res.render('login')
  },
  handleLogin: (req,res) => {
    const {username, password} = req.body
    if( !username || !password){
      return req.flash('errorMessage', '該填的沒填唷！')
    }

    userModel.get(username, (error, user) => {
      if(error) {       
        return req.flash('errorMessage', error.toString())
      }

      bcrypt.compare(password, user.password, function(error, result) {
        if(error) {        
          return req.flash('errorMessage', '密碼錯誤')
        }
        req.session.username = user.username
        res.redirect('/')
      });
    })


    if(req.body.password === 'abc') {
      req.session.username = true
      res.redirect('/')
    } else {
      req.flash('errorMessage', 'Please input the correct password.')
      res.redirect('/login')
    }
  },
  logout:(req, res)=>{
    req.session.username = false
    res.redirect('/')
  },
  register: (req, res) => {
    res.render('user/register')

  },
  handleRegister:(req, res) => {
    const {username, password, nickname} = req.body
    if(!username || !password || !nickname){
      return req.flash('errorMessage', 'You should fill in all input field')
    }


    bcrypt.hash(password, saltRounds, function(error, hash) {
      if(error){
        return req.flash('errorMessage',error.toString() )
      }

      userModel.add({
        username,
        nickname,
        password: hash
      }, (error, result) => {
        if(error) {
          return req.flash('errorMessage',error.toString() )
        }
        req.session.username = username
        res.redirect('/')
      })
    });
  },
  
}
module.exports = userController