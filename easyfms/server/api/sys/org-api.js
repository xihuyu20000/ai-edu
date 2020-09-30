module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const h = require("../api-helper");

  //元数据
  router.get("/meta", async (req, res) => {
    const metaTable = require("./org-meta");
    const meta = await h.meta(metaTable);
    h.ok(res, { data: meta });
  });

  //列表
  router.get("/", async (req, res) => {
    let params = "";
    if (req.query && Object.keys(req.query).length) {
      params = {
        label: {
          like: req.query.label,
        },
      };
    }

    const all = await h.find(h.vars.T_ORG, "*", params);
    const tree = h.tree(all);
    console.log("机构树", tree);
    h.ok(res, { data: tree });
  });

  //显示
  router.get("/:id", async (req, res) => {
    const org = await h.findOne(h.vars.T_ORG, "*", { id: req.params.id });
    h.ok(res, { data: org });
  });

  //修改
  router.put("/:id", async (req, res) => {
    let data = {
      pid: req.body.pid,
      label: req.body.label,
      manager: req.body.manager,
      contact: req.body.contact,
      showOrder: req.body.showOrder,
    };
    const org = await h.update(h.vars.T_ORG, data, { id: req.params.id });
    h.ok(res, { data: org });
  });

  //创建
  router.post("/", async (req, res) => {
    if (await h.findOne(h.vars.T_ORG, "*", { label: req.body.label })) {
      return h.fail(res, { msg: "名称已经存在" });
    }
    let data = {
      pid: req.body.pid,
      label: req.body.label,
      manager: req.body.manager,
      contact: req.body.contact,
      showOrder: req.body.showOrder,
    };
    const id = await h.create(h.vars.T_ORG, data);
    h.ok(res, { data: id });
  });

  //删除
  router.delete("/:id", async (req, res) => {
    const id = await h.remove(h.vars.T_ORG, { id: req.params.id });
    h.ok(res, { data: id });
  });
  app.use("/api/org", router);
};
