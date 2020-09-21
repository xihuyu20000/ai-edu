module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const h = require("../../api-helper");
  const mh = require("./meta-helper");
  /**
   * @swagger
   * /api/meta 元数据:
   *  get:
   *    tags:
   *     - dev/meta
   */
  router.get("/table/:id", async (req, res) => {
    let data = await mh.getMetaTable(req.params.id);
    h.ok(res, { data: data });
  });

  app.use("/api/meta", router);
};
