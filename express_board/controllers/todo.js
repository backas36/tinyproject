const todoModel = require('../models/todos')

const todoController = {
  getAll: (req, res)=> {
    todoModel.getAll((error, result) => {
      if(error) console.log(error)
      res.render('todos', {
        todos:result
      })
    })
    
  },
  get: (req, res) => {
    const id = req.params.todoId

    todoModel.get(id,
      (error, result) => {
        if(error) console.log(error)
        res.render('todo', {
          todo:result[0]
        })
      }
    )
  },
  addTodo: (req,res) => {
    res.render('addTodo')
  },
  newTodo: (req,res) => {
    const content = req.body.content
    todoModel.add(content, (error, result) => {
      if(error) console.log(error)
      res.redirect('/todos')
    })
  }
}
module.exports = todoController