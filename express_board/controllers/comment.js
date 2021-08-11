const commentModel = require('../models/comment')



const commentController = {
  addComment: (req, res, next) => {
    const {username} = req.session
    const {content} = req.body
    if(!username || !content) {
      req.flash('errorMessage', '帳號或內容空白')
      return next()
    }
    commentModel.add(username, content, (error, result) => {
      return res.redirect('/')
    })
  },
  index: (req, res) => {
    commentModel.getAll((error,result) => {
      if(error) {
        console.log(error)
      }
      res.render('index', {
        comments:result
      })
    })
  },
  delete:(req, res) => {
    commentModel.delete(req.session.username, req.params.id, error => {
      res.redirect('/')
    })
  },
  update:(req, res) => {
    commentModel.get(req.params.id, (error, result) => {
      res.render('update', {
        comment:result
      })
    })
  },
  handleUpdate: (req,res) => {
    commentModel.update(req.session.username, req.params.id, req.body.content, (err, result) => {
      res.redirect('/')
    })
  }
}
module.exports = commentController