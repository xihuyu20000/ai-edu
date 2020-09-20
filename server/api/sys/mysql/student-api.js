module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const h = require("../../api-helper");

  const T_USER = "sys_user";

  /**
   * @swagger
   * /api/student 学生列表:
   *  get:
   *    tags:
   *      - sys/student
   */
  router.get("/", async (req, res) => {
    let params = { style: { "=": "student" } };
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
   * /api/student/:id 查找:
   *  get:
   *    tags:
   *      - sys/student
   */
  router.get("/:id", async (req, res) => {
    const resource = await h.findOne(T_USER, "*", { id: req.params.id });
    h.ok(res, { data: resource });
  });

  /**
   * @swagger
   * /api/student/:id  修改:
   *  put:
   *    tags:
   *       - sys/student
   */
  router.put("/:id", async (req, res) => {
    const id = await h.update(T_USER, req.body, { id: req.params.id });
    h.ok(res, { data: id });
  });

  /**
   * @swagger
   * /api/student/ 创建:
   *  post:
   *    tags:
   *      - sys/student
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
   * /api/student/:id  删除:
   *  delete:
   *    tags:
   *      - sys/student
   */
  router.delete("/:id", async (req, res) => {
    const id = await h.remove(T_USER, { id: req.params.id });
    h.ok(res, { data: id });
  });

  app.use("/api/student", router);
};
