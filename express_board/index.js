const express = require('express')
const app = express()
const port = 8000
const todoController = require('./controllers/todo')
const userController = require('./controllers/user')

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
  res.locals.isLogin = req.session.isLogin
  res.locals.errorMessage = req.flash('errorMessage')
  next()
})

app.post('/todos', todoController.newTodo)
app.get('/todos', todoController.getAll)
app.get('/todos/:todoId', todoController.get)
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/login', userController.login)
app.post('/login', userController.handleLogin)
app.get('/logout', userController.logout)



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