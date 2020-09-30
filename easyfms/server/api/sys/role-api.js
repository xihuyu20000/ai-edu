module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const h = require("../api-helper");

  //元数据
  router.get("/meta", async (req, res) => {
    const metaTable = require("./role-meta");
    const meta = await h.meta(metaTable);
    h.ok(res, { data: meta });
  });

  //列表
  router.get("/", async (req, res) => {
    const all = await h.query(
      `select r.id, r.org_id,  o.label AS rog_name, r.label  from sys_role as r left join sys_org as o on r.org_id=o.id`
    );
    h.ok(res, { data: all });
  });

  //显示
  router.get("/:id", async (req, res) => {
    const role = await h.findOne(h.vars.T_ROLE, "*", { id: req.params.id });
    h.ok(res, { data: role });
  });

  //修改
  router.put("/:id", async (req, res) => {
    let data = {
      org_id: req.body.org_id,
      label: req.body.label,
    };
    const id = await h.update(h.vars.T_ROLE, data, { id: req.params.id });
    h.ok(res, { data: id });
  });

  //创建
  router.post("/", async (req, res) => {
    if (await h.findOne(h.vars.T_ROLE, "*", { label: req.body.label })) {
      return h.fail(res, { msg: "名称已经存在" });
    }
    let data = {
      org_id: req.body.org_id,
      label: req.body.label,
    };
    const id = await h.create(h.vars.T_ROLE, data);
    h.ok(res, { data: id });
  });

  //删除
  router.delete("/:id", async (req, res) => {
    const id = await h.remove(h.vars.T_ROLE, { id: req.params.id });
    h.ok(res, { data: id });
  });

  app.use("/api/role", router);
};
