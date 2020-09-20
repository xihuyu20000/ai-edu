const mysql = require("mysql");
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  port: 3306,
  user: "root",
  password: "admin",
  database: "easyfms",
});

function exec(sql, params, callback) {
  pool.getConnection(function (err, conn) {
    if (err) throw err;
    conn.query(sql, params, function (error, results, fields) {
      if (error) throw error;
      callback(error, results, fields);
      conn.release();
    });
  });
}

module.exports = exec;
