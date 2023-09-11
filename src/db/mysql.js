const mysql = require("mysql");
const { MYSQL_CONFIG } = require("../config/db");

//创建连接对象

const connection = mysql.createConnection(MYSQL_CONFIG);

//开始连接
connection.connect();
// const sql = `select * from blogs`;
// connection.query(sql, (error, result) => {
//   if (error) {
//     console.error("error", error);
//     return;
//   }
//   console.log("result", result);
// });

//执行sql语句
// function execSQL(sql, callback) {
//   connection.query(sql, callback);
// }
function execSQL(sql) {
  const promise = new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
  return promise;
}

module.exports = {
  execSQL,
};
