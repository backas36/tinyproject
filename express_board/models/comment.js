const db = require('../db')


const commentModel = {
  add:(username, content, cb) => {
    db.query(
      'INSERT INTO comments (username, content) VALUES(?, ?)', 
      [username, content],
      (error, result) => {
        if(error) return cb(error)
        cb(null, result)
      }
    )
  },
  getAll: cb => {
    db.query(
      `SELECT U.nickname, C.content, C.id, C.username
       FROM comments as C
       LEFT JOIN users as U on U.username = C.username
       ORDER BY C.id DESC
      `,
      (error, result) => {
        if(error) return cb(error)
        cb(null, result)
      }
    )
  },
  get:(id, cb) => {
     db.query(
      `SELECT U.nickname, C.content, C.id, C.username
       FROM comments as C
       LEFT JOIN users as U on U.username = C.username
       WHERE C.id = ?
      `,
      [id],
      (error, result) => {
        if(error) return cb(error)
        cb(null, result[0] || {})
      }
    )
  },
  delete:(username, id, cb)=> {
       db.query(
        `DELETE FROM comments WHERE id = ? AND username= ?`,
        [id, username],
        (error, result) => {
          if(error) return cb(error)
          cb(null, result)
        }
      )
  },
  update:(username, id, content, cb)=> {
       db.query(
        `UPDATE comments SET content = ? WHERE id = ? AND username = ?`,
        [content, id, username],
        (error, result) => {
          if(error) return cb(error)
          cb(null, result)
        }
      )
  }
}

module.exports = commentModel