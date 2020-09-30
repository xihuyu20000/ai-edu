module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const h = require("../api-helper");
  const mh = require("./helper/meta-helper");
  /**
   * @swagger
   * /api/meta 获取表格模板的元数据配置:
   *  get:
   *    tags:
   *     - dev/meta
   */
  router.get("/table/:id", async (req, res) => {
    let data = await mh.getMetaTable(req.params.id);
    data
      ? h.ok(res, { data: data })
      : h.fail(res, { msg: `没有${req.params.id}模板`, data: data });
  });

  app.use("/api/meta", router);
};
