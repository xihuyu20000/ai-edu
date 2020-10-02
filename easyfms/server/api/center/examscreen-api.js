module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const h = require("../api-helper");

  //元数据
  router.get("/meta", async (req, res) => {
    const metaTable = require("./examscreen-meta");
    const meta = await h.meta(metaTable);
    h.ok(res, { data: meta });
  });
  //列表
  router.get("/", async (req, res) => {
    // const all = await h.find(h.vars.T_RES, "*",);
    const data = [];
    h.ok(res, { data: data });
  });

  //记录事件
  router.post("/event", async (req, res) => {
    console.log("事件", req.body);
    h.ok(res, { data: [] });
  });

  app.use("/api/examscreen", router);
};
