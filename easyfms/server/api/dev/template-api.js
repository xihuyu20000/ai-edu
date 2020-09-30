module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const h = require("../api-helper");
  const mh = require("./helper/meta-helper");

  router.get("/:id", async (req, res) => {
    const template = await h.findOne(h.vars.T_TEMPLATE, "*", {
      id: req.params.id,
    });
    h.ok(res, { data: template });
  });

  app.use("/api/template", router);
};
