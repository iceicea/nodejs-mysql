const { execSQL } = require("../db/mysql");
const getList = (author, keyword) => {
  let sql = `select * from blogs where`;
  if (author) {
    sql += ` author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%'`;
  }
  console.log("sql", sql);

  return execSQL(sql);
};
const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}'`;
  return execSQL(sql).then((rows) => {
    return rows[0];
  });
};
const createNewBlog = (blogData) => {
  const title = blogData.title;
  const content = blogData.content;
  const author = blogData.author;
  const createAt = Date.now();
  const sql = `insert into blogs (title,content,author,createAt) values ('${title}','${content}','${author}',${createAt})`;
  return execSQL(sql).then((result) => {
    console.log("insertResult", result);
    return {
      id: result.insertId,
    };
  });
};
const updateBlog = (id, blogData = {}) => {
  console.log("id", id);
  console.log("blogData", blogData);
  return true;
};
const deleteBlog = (id) => {
  console.log("id", id);
  return true;
};
module.exports = {
  getList,
  getDetail,
  createNewBlog,
  updateBlog,
  deleteBlog,
};
