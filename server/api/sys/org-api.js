module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const { Org } = require("../../models/sys/org-model");
  const h = require("./api-helper");

  /**
   * @swagger
   * /api/org/  列表:
   *  get:
   *    tags:
   *      - sys/org
   */
  router.get("/", async (req, res) => {
    const all = await Org.find();
    const tree = h.resTree(all);
    h.ok(res, {data:tree})
  });

  /**
   * @swagger
   * /api/org/:id  查找:
   *  get:
   *   tags:
   *     - sys/org
   */
  router.get("/:id", async (req, res) => {
    const org = await Org.findById(req.params.id);
    h.ok(res, {data:org})
  });

  /**
   * @swagger
   * /api/org/:id  修改:
   *  put:
   *   tags:
   *     - sys/org
   */
  router.put("/:id", async (req, res) => {
    const org = await Org.findByIdAndUpdate(req.params.id, req.body);
    h.ok(res, { data: org });
  });

  /**
   * @swagger
   * /api/org/  创建:
   *  post:
   *    tags:
   *      - sys/org
   */
  router.post("/", async (req, res) => {
    if (await Org.findOne({ label: req.body.label })) {
      return h.fail(res, { msg: "名称已经存在"})
    }
    const org = await Org.create(req.body);
    h.ok(res, { data: org });
  });

  /**
   * @swagger
   * /api/org/:id  删除:
   *  delete:
   *     tags:
   *      - sys/org
   */
  router.delete("/:id", async (req, res) => {
    const org = await Org.findByIdAndDelete(req.params.id);
    if(org != null)return h.ok(res, {msg:'删除成功'})
    h.fail(res, {msg:'删除失败'})
  });
  app.use("/api/org", router);
};
