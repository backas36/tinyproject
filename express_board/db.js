var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'ashi',
  password : '1234',
  database : 'app'
});
 


module.exports = connection

