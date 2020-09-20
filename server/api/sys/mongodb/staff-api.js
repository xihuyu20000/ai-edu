module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const h = require("../../api-helper");
  const { User } = require("../../../models/sys/user-model");

  /**
   * @swagger
   * /api/staff 员工列表:
   *  get:
   *    tags:
   *      - sys/staff
   */
  router.get("/", async (req, res) => {
    let params = { style: "staff" };
    if (req.query) {
      let regexp = new RegExp(req.query.label, "i");
      params = {
        $or: [{ label: { $regex: regexp } }],
      };
    }
    const all = await User.find(params);
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
    const user = await User.findById(req.params.id);
    h.ok(res, { data: user });
  });

  /**
   * @swagger
   * /api/staff/:id  修改:
   *  put:
   *    tags:
   *       - sys/staff
   */
  router.put("/:id", async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    h.ok(res, { data: user });
  });

  /**
   * @swagger
   * /api/staff/ 创建:
   *  post:
   *    tags:
   *      - sys/staff
   */
  router.post("/", async (req, res) => {
    if (await User.findOne({ username: req.body.username })) {
      return h.fail(res, { msg: "名称已经存在" });
    }
    const user = await User.create(req.body);
    h.ok(res, { data: user });
  });

  /**
   * @swagger
   * /api/staff/:id  删除:
   *  delete:
   *    tags:
   *      - sys/staff
   */
  router.delete("/:id", async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    h.ok(res, { msg: user != null });
  });

  app.use("/api/staff", router);
};
