//处理博客相关的路由
const path = require("path");
const url = require("url");
const { SuccessModel, ErrorModel } = require("../model/responseModel");
const {
  getList,
  getDetail,
  createNewBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.js");

const handleBlogRoute = (req, res) => {
  //定义处理路由的逻辑
  const id = req.query.id;
  const blogData = req.body;

  const { pathname, query } = url.parse(req.url);
  if (req.method === "GET" && pathname === "/api/blog/list") {
    const author = req.query.author || "";
    const keyword = req.query.keyword || "";
    const listDataPromise = getList(author, keyword);
    return listDataPromise.then((listData) => {
      return new SuccessModel(listData);
    });
  }
  if (req.method === "GET" && pathname === "/api/blog/detail") {
    const detailDataPromise = getDetail(id);
    return detailDataPromise.then((detailData) => {
      return new SuccessModel(detailData);
    });
  }
  if (req.method === "POST" && pathname === "/api/blog/new") {
    req.body.author = "zhangsan1";
    const newBlogDataPromise = createNewBlog(blogData);
    return newBlogDataPromise.then((newBlogData) => {
      return new SuccessModel(newBlogData);
    });
  }
  if (req.method === "POST" && pathname === "/api/blog/update") {
    const updateBlogData = updateBlog(id, blogData);
    if (updateBlogData) {
      return new SuccessModel("更新成功!");
    } else {
      return new ErrorModel("更新失败!");
    }
  }
  if (req.method === "POST" && pathname === "/api/blog/delete") {
    const deleteBlogData = deleteBlog(id);
    if (deleteBlogData) {
      return new SuccessModel("删除成功!");
    } else {
      return new ErrorModel("删除失败!");
    }
  }
};

module.exports = handleBlogRoute;
