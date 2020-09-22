module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const h = require("../../api-helper");

  const T_USER = "sys_user";
  const T_AUTH = "sys_role_user";

  router.get("/", async (req, res) => {
    h.ok(res, {});
  });
  /**
   * @swagger
   * /api/auth/user/:roleId  用户列表:
   *  get:
   *    tags:
   *      - sys/auth
   */
  router.get("/user/:roleId", async (req, res) => {
    let roleId = -1;
    if (req.query.roleId) {
      roleId = req.query.roleId;
    }

    const all = await h.query(
      `SELECT * FROM sys_user WHERE id IN (SELECT user_id FROM sys_role_user WHERE role_id=?)`,
      req.params.roleId
    );
    h.ok(res, { data: all });
  });

  /**
   * @swagger
   * /api/auth/tree  角色树数据:
   *  get:
   *    tags:
   *      - sys/auth
   */
  router.get("/tree", async (req, res) => {
    const all = await h.query(
      `select id,pid,label, '机构' as style from sys_org union SELECT id, org_id AS pid , label, '角色' as style FROM sys_role`
    );
    const tree = h.tree(all, 0);
    console.log("授权树", tree);
    h.ok(res, { data: tree });
  });

  /**
   * @swagger
   * /api/auth/:id  查找:
   *  get:
   *   tags:
   *     - sys/auth
   */
  router.get("/:id", async (req, res) => {
    const auth = await h.findOne(T_AUTH, "*", { id: req.params.id });
    h.ok(res, { data: auth });
  });

  /**
   * @swagger
   * /api/auth/:id  修改:
   *  put:
   *   tags:
   *     - sys/auth
   */
  router.put("/:id", async (req, res) => {
    let data = {
      pid: req.body.pid,
      label: req.body.label,
      manager: req.body.manager,
      contact: req.body.contact,
      showOrder: req.body.showOrder,
    };
    const auth = await h.update(T_AUTH, data, { id: req.params.id });
    h.ok(res, { data: auth });
  });

  /**
   * @swagger
   * /api/auth/  创建:
   *  post:
   *    tags:
   *      - sys/auth
   */
  router.post("/", async (req, res) => {
    if (await h.findOne(T_AUTH, "*", { label: req.body.label })) {
      return h.fail(res, { msg: "名称已经存在" });
    }
    let data = {
      pid: req.body.pid,
      label: req.body.label,
      manager: req.body.manager,
      contact: req.body.contact,
      showOrder: req.body.showOrder,
    };
    const id = await h.create(T_AUTH, data);
    h.ok(res, { data: id });
  });

  /**
   * @swagger
   * /api/auth/:id  删除:
   *  delete:
   *     tags:
   *      - sys/auth
   */
  router.delete("/:id", async (req, res) => {
    const id = await h.remove(T_AUTH, { id: req.params.id });
    h.ok(res, { data: id });
  });
  app.use("/api/auth", router);
};
