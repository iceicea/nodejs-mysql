//创建服务器
const http = require("http");
const qs = require("querystring");
const url = require("url");

const serveHandler = require("../app.js");

const PORT = 5000;

const server = http.createServer(serveHandler).listen(PORT, () => {
  console.log("start the project!");
});
