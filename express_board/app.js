const express = require('express')
const app = express()
const port = 8000
const todoController = require('./controllers/todo')
const userController = require('./controllers/user')
const commentController = require('./controllers/comment')


const db = require('./db')
const session = require('express-session')
const flash = require('connect-flash')

app.set('view engine', 'ejs')

// session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))
app.use(express.urlencoded({ extended: false }))

app.use(express.json())
app.use(flash())

app.use((req, res, next) => {
  res.locals.username = req.session.username
  res.locals.errorMessage = req.flash('errorMessage')
  next()
})
const redirectBack = (req, res) => {
  res.redirect('back')
}

app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)

app.get('/', commentController.index)

app.post('/todos', todoController.newTodo)
app.get('/todos', todoController.getAll)
app.get('/todos/:todoId', todoController.get)



app.get('/logout', userController.logout)

app.get('/register', userController.register)
app.post('/register', userController.handleRegister, redirectBack)

app.post('/comments', commentController.addComment,redirectBack)

app.get('/delete_comments/:id', commentController.delete)
app.get('/update_comments/:id', commentController.update)
app.post('/update_comments/:id', commentController.handleUpdate)



app.listen(port, ()=> {
  db.connect((err) => {
    if(err) {
      console.error('error connencting: ' + err.stack)
      return
    }
    console.log('connected as id' + db.threadId)
  })
  console.log(`server running in ${port} now....`)
})