const db = require('../db')


const todoModel = {
  getAll: (todosCb) => {
    db.query('SELECT * FROM todos', (error, result) => {
      if(error) return todosCb(error)
      todosCb(null, result)
    })
  },
  get: (id, todoCb) => {
    db.query(
      'SELECT * FROM todos WHERE id = ?', [id], 
      (error, result) => {
        if(error) return todoCb(error)
        todoCb(null, result)
      }
    )
  },
  add:(content, addTodoCb) => {
    db.query(
      'INSERT INTO todos (content) VALUES(?)', [content],
      (error, result) => {
        if(error) return addTodoCb(error)
        addTodoCb(null, result)
      }
    )
  }
}

module.exports = todoModel