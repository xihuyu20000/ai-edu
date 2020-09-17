module.exports = app=>{
  const { Role } = require("../../models/sys/role-model");
  const express = require("express");
  const router = express.Router();

  /**
   * @swagger
   * /api/role/ 列表:
   *  get:
   *    tags:
   *      - sys/role
   */
  router.get("/", async (req, res) => {
    const all = await Role.find();
    res.json(all);
  });

  /**
   * @swagger
   * /api/role/:id  查找:
   *  get:
   *    tags:
   *      - sys/role
   */
  router.get("/:id", async (req, res) => {
    const role = await Role.findById(req.params.id);
    res.json(role);
  });

  /**
   * @swagger
   * /api/role/:id  修改:
   *  put:
   *    tags:
   *      - sys/role
   */
  router.put("/:id", async (req, res) => {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body);
    res.json(role);
  });

  /**
   * @swagger
   * /api/role/  创建:
   *  post:
   *    tags:
   *      - sys/role
   */
  router.post("/", async (req, res) => {
    if (await Role.findOne({ label: req.body.label })) {
      return res.status(422).json({ msg: "名称已经存在" });
    }
    const role = await Role.create(req.body);
    res.json(role);
  });

  /**
   * @swagger
   * /api/role/:id  删除:
   *  delete:
   *    tags:
   *      - sys/role
   */
  router.delete("/:id", async (req, res) => {
    const role = await Role.findByIdAndRemove(req.params.id);
    res.json(role != null);
  });

  app.use("/api/role", router);
}