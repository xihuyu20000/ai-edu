module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const h = require("../api-helper");

  const T_DICT = "sys_dict";

  /**
   * @swagger
   * /api/dict 控件字典列表:
   *  get:
   *    tags:
   *      - sys/dict
   */
  router.get("/", async (req, res) => {
    let params = "";
    if (req.query && Object.keys(req.query).length) {
      params.label = {
        like: req.query.label,
      };
    }
    const all = await h.find(T_DICT, "*", params);
    h.ok(res, { data: all });
  });

  router.get("/sql/:sql", async (req, res) => {
    const all = await h.query(req.params.sql);
    h.ok(res, { data: all });
  });

  /**
   * @swagger
   * /api/dict/:id 查找:
   *  get:
   *    tags:
   *      - sys/dict
   */
  router.get("/:id", async (req, res) => {
    const resource = await h.findOne(T_DICT, "*", { id: req.params.id });
    h.ok(res, { data: resource });
  });

  /**
   * @swagger
   * /api/dict/:id  修改:
   *  put:
   *    tags:
   *       - sys/dict
   */
  router.put("/:id", async (req, res) => {
    let params = {
      label: req.body.label,
      code: req.body.code,
      style: req.body.style,
      remark: req.body.remark,
      query_sql: req.body.query_sql,
      status: req.body.status,
    };
    const id = await h.update(T_DICT, params, { id: req.params.id });
    h.ok(res, { data: id });
  });

  /**
   * @swagger
   * /api/dict/ 创建:
   *  post:
   *    tags:
   *      - sys/dict
   */
  router.post("/", async (req, res) => {
    if (await h.findOne(T_DICT, "*", { code: req.body.code })) {
      return h.fail(res, { msg: "编码已经存在" });
    }
    let params = {
      label: req.body.label,
      code: req.body.code,
      style: req.body.style,
      remark: req.body.remark,
      query_sql: req.body.query_sql,
      status: req.body.status,
    };
    const id = await h.create(T_DICT, params);
    h.ok(res, { data: id });
  });

  /**
   * @swagger
   * /api/dict/ 创建或修改:
   *  patch:
   *    tags:
   *      - sys/dict
   */
  router.patch("/", async (req, res) => {
    let params = {
      label: req.body.label,
      code: req.body.code,
      style: req.body.style,
      remark: req.body.remark,
      query_sql: req.body.query_sql,
      status: req.body.status,
    };
    if (req.body.hasOwnProperty("id")) {
      params.id = req.body.id;
    }
    const id = await h.replace(T_DICT, params);
    h.ok(res, { data: id });
  });

  /**
   * @swagger
   * /api/dict/:id  删除:
   *  delete:
   *    tags:
   *      - sys/dict
   */
  router.delete("/:id", async (req, res) => {
    const id = await h.remove(T_DICT, { id: req.params.id });
    h.ok(res, { data: id });
  });

  app.use("/api/dict", router);
};
