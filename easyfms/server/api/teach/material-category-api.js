module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const h = require("../api-helper");

  //元数据
  // router.get("/meta", async (req, res) => {
  //   const metaTable = require("./material-meta");
  //   const meta = await h.meta(metaTable);
  //   h.ok(res, { data: meta });
  // });

  router.get("/", async (req, res) => {
    const all = await h.find(h.vars.T_MATERIAL_CATEGORY, "*");
    const tree = h.tree(all);
    h.ok(res, { data: tree });
  });

  //列表
  //   router.get("/", async (req, res) => {
  //     let params = "";
  //     if (req.query && Object.keys(req.query).length) {
  //       params.label = {
  //         like: req.query.label,
  //       };
  //     }
  //     const all = await h.find(h.vars.T_USER, "*", params);
  //     h.ok(res, { data: all });
  //   });

  //   //查找
  //   router.get("/:id", async (req, res) => {
  //     const resource = await h.findOne(h.vars.T_USER, "*", { id: req.params.id });
  //     h.ok(res, { data: resource });
  //   });

  //   //修改
  //   router.put("/:id", async (req, res) => {
  //     const id = await h.update(h.vars.T_USER, req.body, { id: req.params.id });
  //     h.ok(res, { data: id });
  //   });

  //   //创建
  //   router.post("/", async (req, res) => {
  //     req.body.password = require("bcrypt").hashSync(req.body.password, 10);
  //     if (await h.findOne(h.vars.T_USER, "*", { realname: req.body.realname })) {
  //       return h.fail(res, { msg: "用户名已经存在" });
  //     }
  //     const id = await h.create(h.vars.T_USER, req.body);
  //     h.ok(res, { data: id });
  //   });

  //   //删除
  //   router.delete("/:id", async (req, res) => {
  //     const id = await h.remove(h.vars.T_USER, { id: req.params.id });
  //     h.ok(res, { data: id });
  //   });

  app.use("/api/material_category", router);
};
