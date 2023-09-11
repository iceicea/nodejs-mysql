const mysql = require("mysql");

//创建连接对象

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "aa17762907044",
  port: 3306,
  database: "myblog",
});

//开始连接
connection.connect();
const sql = `select * from blogs`;
connection.query(sql, (error, result) => {
  if (error) {
    console.error("error", error);
    return;
  }
  console.log("result", result);
});

//关闭连接
connection.end();
