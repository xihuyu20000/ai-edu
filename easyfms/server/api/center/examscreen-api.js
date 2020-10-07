module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const h = require("../api-helper");

  //列表
  router.get("/", async (req, res) => {
    // const all = await h.find(h.vars.T_MENU, "*",);
    const data = [];
    h.ok(res, { data: data });
  });
  // 获取
  router.get("/:id", async (req, res) => {
    const template = await h.find(h.vars.T_EXAM_TOPIC, "*", {
      exam_id: req.params.id,
    });
    h.ok(res, { data: template });
  });

  //创建
  router.post("/", async (req, res) => {
    // const id = await h.create(h.vars.T_USER, req.body);
    h.ok(res, { data: {} });
  });

  //记录事件
  router.post("/event", async (req, res) => {
    console.log("事件", req.body);
    h.ok(res, { data: [] });
  });

  app.use("/api/examscreen", router);
};
