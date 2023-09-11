const handleBlogRoute = require("./src/routes/blog.js");
const qs = require("querystring");

//处理POST数据
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== "POST") {
      resolve({});
      return;
    }
    if (req.headers["content-type"] !== "application/json") {
      resolve({});
      return;
    }
    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk.toString();
    });
    req.on("end", () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
  });

  return promise;
};
const serveHandler = (req, res) => {
  res.setHeader("Content-Type", "application/json");

  //获取path
  const url = req.url;
  req.path = url.split("?")[0];
  //解析query
  req.query = qs.parse(url.split("?")[1]);
  //处理POST数据
  getPostData(req).then((postData) => {
    req.body = postData;

    const blogDataPromise = handleBlogRoute(req, res);
    if (blogDataPromise) {
      blogDataPromise.then((blogData) => {
        res.end(JSON.stringify(blogData));
      });

      return;
    }
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 not found");
    res.end();
  });
  //
};
module.exports = serveHandler;
