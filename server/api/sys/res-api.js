module.exports = (app) => {
  const h = require("../api-helper");
  const { Res } = require("../../models/sys/res-model");
  const express = require("express");
  const router = express.Router();

  /**
   * @swagger
   * /api/res/  列表:
   *  get:
   *    tags:
   *      - sys/res
   */
  router.get("/", async (req, res) => {
    let params = {};
    if (req.query) {
      let regexp = new RegExp(req.query.label, "i");
      params = {
        $or: [{ label: { $regex: regexp } }],
      };
    }

    const all = await Res.find(params);
    const tree = h.resTree(all);
    h.ok(res, { data: tree });
  });

  /**
   * @swagger
   * /api/res/:id  显示:
   *  get:
   *    tags:
   *      - sys/res
   */
  router.get("/:id", async (req, res) => {
    console.log("显示参数", req.params);
    const resource = await Res.findById(req.params.id);
    h.ok(res, { data: resource });
  });

  /**
   * @swagger
   * /api/res/:id  修改:
   *  put:
   *    tags:
   *       - sys/res
   */
  router.put("/:id", async (req, res) => {
    console.log("修改参数", req.body);
    const resource = await Res.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    h.ok(res, { data: resource });
  });

  /**
   * @swagger
   * /api/res/  新建:
   *  post:
   *    tags:
   *      - sys/res
   */
  router.post("/", async (req, res) => {
    console.log("新增参数", req.body);
    const resource = await Res.create(req.body);
    h.ok(res, { data: resource });
  });

  /**
   * @swagger
   * /api/res/:id  删除:
   *  delete:
   *    tags:
   *      - sys/res
   */
  router.delete("/:id", async (req, res) => {
    console.log("删除参数", req.params.id);
    const resource = await Res.findByIdAndDelete(req.params.id);
    h.ok(res, { msg: resource != null });
  });

  app.use("/api/res", router);
};
