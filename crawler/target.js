const express = require("express");
const app = express();
const PORT = 55555;
app.use(require("cors")());
app.use(express.json());

// 普通get
app.get("/get", (req, res) => {
  res.send("get ok");
});

// 返回json
app.get("/getjson", (req, res) => {
  res.json({ status: 200, msg: "ok" });
});

// 普通post
app.post("/post", (req, res) => {
  res.send("post ok");
});

// post带参数
app.post("/postjson", (req, res) => {
  res.send(req.body);
});

// 检查头部user-agent
app.get("/checkUserAgent", (req, res) => {
  res.send(req.headers["user-agent"]);
});

// 检查头部授权

app.listen(PORT, () =>
  console.log(`the target server is running on ${PORT} ......`)
);
