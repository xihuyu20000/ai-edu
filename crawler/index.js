const log = console.log;

const express = require("express");
const app = express();
app.use(require("cors")());
app.use(express.json());

const BURL = "http://localhost:55555";

const downloader = require("./downloader");
// 普通get
app.get("/get", (req, res) => {
  downloader.html(BURL);
  res.send("get ok");
});

// 返回json
app.get("/getjson", (req, res) => {
  downloader.json(BURL);
  res.send("getjson ok");
});

// 保存内容
app.get("/save", (req, res) => {
  downloader.save("http://www.nun.edu.cn/dt.gif", "a.gif");
  res.send("ok");
});

const PORT = 44444;
app.listen(44444, () => log(`the server is running on ${PORT}.....`));
