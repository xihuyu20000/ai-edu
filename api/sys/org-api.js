module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const { Org } = require("../../models/sys/org-model");
  const helper = require("./api-helper");

  /**
   * @swagger
   * /api/org/  列表:
   *  get:
   *    tags:
   *      - sys/org
   */
  router.get("/", async (req, res) => {
    const all = await Org.find();
    const tree = helper.resTree(all);
    res.json(tree);
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
    res.json(org);
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
    res.json(org);
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
      return res.status(422).json({ msg: "名称已经存在" });
    }
    const org = await Org.create(req.body);
    res.json(org);
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
    res.json(org != null);
  });
  app.use("/api/org", router);
};
