module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const h = require("../../api-helper");
  const { Role } = require("../../../models/sys/role-model");

  /**
   * @swagger
   * /api/role/meta 元数据:
   *  get:
   *    tags:
   *     - sys/role
   */
  router.get("/meta", async (req, res) => {
    h.ok(res, {
      data: {
        baseUrl: "",
        queryFields: [],
        tableFields: [],
      },
    });
  });

  /**
   * @swagger
   * /api/role/ 列表:
   *  get:
   *    tags:
   *      - sys/role
   */
  router.get("/", async (req, res) => {
    let params = {};
    if (req.query) {
      let regexp = new RegExp(req.query.label, "i");
      params = {
        $or: [{ label: { $regex: regexp } }],
      };
    }

    const all = await Role.find(params);
    h.ok(res, { data: all });
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
    h.ok(res, { data: role });
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
    h.ok(res, { data: role });
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
      return h.fail(res, { msg: "名称已经存在" });
    }
    const role = await Role.create(req.body);
    h.ok(res, { data: role });
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
    h.ok(res, { msg: role != null });
  });

  app.use("/api/role", router);
};
