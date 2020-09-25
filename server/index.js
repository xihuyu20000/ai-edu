// require("git c./db/mongodb");
// 加载数据库配置
const mysql = require("./db/mysql");

const express = require("express");
const app = express();
app.use(require("cors")());
app.use(express.json());
// 加载所有api文件
require("./api/index")(app);

const PORT = 33333;
app.listen(PORT, () => console.log(`the server is running on ${PORT} .....`));
