module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const h = require("../api-helper");

  //   元数据
  router.get("/meta", async (req, res) => {
    const metaTable = require("./grade-meta");
    const meta = await h.meta(metaTable);
    h.ok(res, { data: meta });
  });

  //列表
  router.get("/", async (req, res) => {
    let params = "";
    if (req.query && Object.keys(req.query).length) {
      params.label = {
        like: req.query.label,
      };
    }
    const all = await h.find(h.vars.T_GRADE, "*", params);
    h.ok(res, { data: all });
  });

  //查找
  router.get("/:id", async (req, res) => {
    const material = await h.findOne(h.vars.T_GRADE, "*", {
      id: req.params.id,
    });
    h.ok(res, { data: material });
  });

  //修改
  router.put("/:id", async (req, res) => {
    const params = {
      label: req.body.label,
    };
    const id = await h.update(h.vars.T_GRADE, params, { id: req.params.id });
    h.ok(res, { data: id });
  });

  //创建
  router.post("/", async (req, res) => {
    const params = {
      label: req.body.label,
    };
    const id = await h.create(h.vars.T_GRADE, params);
    h.ok(res, { data: id });
  });

  //删除
  router.delete("/:id", async (req, res) => {
    const id = await h.remove(h.vars.T_GRADE, { id: req.params.id });
    h.ok(res, { data: id });
  });

  app.use("/api/grade", router);
};
