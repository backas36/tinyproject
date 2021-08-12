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
  add:(user, cb) => {
    db.query(
      'INSERT INTO users (username, password, nickname) VALUES(?, ?, ?)', 
      [user.username, user.password, user.nickname],
      (error, result) => {
        if(error) return cb(error)
        cb(null, result)
      }
    )
  }
}

module.exports = userModel