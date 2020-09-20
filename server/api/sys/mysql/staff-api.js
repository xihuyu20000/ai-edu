module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const h = require("../../api-helper");

  const T_USER = "sys_user";

  /**
   * @swagger
   * /api/staff 员工列表:
   *  get:
   *    tags:
   *      - sys/staff
   */
  router.get("/", async (req, res) => {
    let params = { style: { "=": "staff" } };
    if (req.query && Object.keys(req.query).length) {
      params.label = {
        like: req.query.label,
      };
    }
    const all = await h.find(T_USER, "*", params);
    h.ok(res, { data: all });
  });

  /**
   * @swagger
   * /api/staff/:id 查找:
   *  get:
   *    tags:
   *      - sys/staff
   */
  router.get("/:id", async (req, res) => {
    const resource = await h.findOne(T_USER, "*", { id: req.params.id });
    h.ok(res, { data: resource });
  });

  /**
   * @swagger
   * /api/staff/:id  修改:
   *  put:
   *    tags:
   *       - sys/staff
   */
  router.put("/:id", async (req, res) => {
    const id = await h.update(T_USER, req.body, { id: req.params.id });
    h.ok(res, { data: id });
  });

  /**
   * @swagger
   * /api/staff/ 创建:
   *  post:
   *    tags:
   *      - sys/staff
   */
  router.post("/", async (req, res) => {
    req.body.password = require("bcrypt").hashSync(req.body.password, 10);
    if (await h.findOne(T_USER, "*", { realname: req.body.realname })) {
      return h.fail(res, { msg: "用户名已经存在" });
    }
    const id = await h.create(T_USER, req.body);
    h.ok(res, { data: id });
  });

  /**
   * @swagger
   * /api/staff/:id  删除:
   *  delete:
   *    tags:
   *      - sys/staff
   */
  router.delete("/:id", async (req, res) => {
    const id = await h.remove(T_USER, { id: req.params.id });
    h.ok(res, { data: id });
  });

  app.use("/api/staff", router);
};
