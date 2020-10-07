module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const h = require("../api-helper");

  //元数据
  router.get("/meta", async (req, res) => {
    const metaTable = require("./examroom-meta");
    const meta = await h.meta(metaTable);
    h.ok(res, { data: meta });
  });
  //列表
  router.get("/", async (req, res) => {
    // const all = await h.find(h.vars.T_MENU, "*",);
    const data = [
      {
        id: 1,
        label: "第一次考试",
        class_name: "我的班级",
        start_time: "2020-12-12 12:00:00",
        until_time: "35分钟",
      },
    ];
    h.ok(res, { data: data });
  });
  app.use("/api/examroom", router);
};
