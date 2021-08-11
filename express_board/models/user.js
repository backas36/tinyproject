const db = require('../db')


const userModel = {
  get: (username, todoCb) => {
    db.query(
      'SELECT * FROM users WHERE username = ?', [username], 
      (error, result) => {
        if(error) return todoCb(error)
        todoCb(null, result[0])
      }
    )
  },
  add:(user, addTodoCb) => {
    db.query(
      'INSERT INTO users (username, password, nickname) VALUES(?, ?, ?)', 
      [user.username, user.password, user.nickname],
      (error, result) => {
        if(error) return addTodoCb(error)
        addTodoCb(null, result)
      }
    )
  }
}

module.exports = userModel