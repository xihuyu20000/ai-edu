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
    const all = await h.find(h.vars.T_EXAM, "*");
    h.ok(res, { data: all });
  });

  app.use("/api/examroom", router);
};
