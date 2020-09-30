module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const h = require("../api-helper");


  /**
   * @swagger
   * /api/rule 规则列表:
   *  get:
   *    tags:
   *      - sys/rule
   */
  router.get("/", async (req, res) => {
    let params = "";
    if (req.query && Object.keys(req.query).length) {
      params.label = {
        like: req.query.label,
      };
    }
    const all = await h.find(h.vars.T_RULE, "*", params);
    h.ok(res, { data: all });
  });

  /**
   * @swagger
   * /api/rule/:id 查找:
   *  get:
   *    tags:
   *      - sys/rule
   */
  router.get("/:id", async (req, res) => {
    const resource = await h.findOne(h.vars.T_RULE, "*", { id: req.params.id });
    h.ok(res, { data: resource });
  });

  /**
   * @swagger
   * /api/rule/:id  修改:
   *  put:
   *    tags:
   *       - sys/rule
   */
  router.put("/:id", async (req, res) => {
    let params = {
      label: req.body.label,
      code: req.body.code,
      remark: req.body.remark,
      content: req.body.content,
      status: req.body.status,
    };
    const id = await h.update(h.vars.T_RULE, params, { id: req.params.id });
    h.ok(res, { data: id });
  });

  /**
   * @swagger
   * /api/rule/ 创建:
   *  post:
   *    tags:
   *      - sys/rule
   */
  router.post("/", async (req, res) => {
    if (await h.findOne(h.vars.T_RULE, "*", { code: req.body.code })) {
      return h.fail(res, { msg: "编码已经存在" });
    }
    let params = {
      label: req.body.label,
      code: req.body.code,
      remark: req.body.remark,
      content: req.body.content,
      status: req.body.status,
    };
    const id = await h.create(h.vars.T_RULE, params);
    h.ok(res, { data: id });
  });

  /**
   * @swagger
   * /api/rule/ 创建或修改:
   *  patch:
   *    tags:
   *      - sys/rule
   */
  router.patch("/", async (req, res) => {
    let params = {
      label: req.body.label,
      code: req.body.code,
      remark: req.body.remark,
      content: req.body.content,
      status: req.body.status,
    };
    if (req.body.hasOwnProperty("id")) {
      params.id = req.body.id;
    }
    const id = await h.replace(h.vars.T_RULE, params);
    h.ok(res, { data: id });
  });

  /**
   * @swagger
   * /api/rule/:id  删除:
   *  delete:
   *    tags:
   *      - sys/rule
   */
  router.delete("/:id", async (req, res) => {
    const id = await h.remove(h.vars.T_RULE, { id: req.params.id });
    h.ok(res, { data: id });
  });

  app.use("/api/rule", router);
};
