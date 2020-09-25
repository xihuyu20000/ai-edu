const apiHelper = require("../api-helper");

module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const h = require("../api-helper");

  const T_META_FORM = "sys_meta_form";
  const T_META_FORM_FIELD = "sys_meta_form_field";
  /**
   * @swagger
   * /api/designform/  创建:
   *  post:
   *    tags:
   *      - sys/designform
   */
  router.post("/", async (req, res) => {
    if (await h.findOne(T_META_FORM, "*", { code: req.body.code })) {
      return h.fail(res, { msg: "编码已经存在" });
    }
    let data = {
      label: req.body.label,
      code: req.body.code,
      table_name: req.body.table_name,
      remark: req.body.remark,
      style: req.body.style,
      status: req.body.status,
    };
    const id = await h.create(T_META_FORM, data);
    for (let row of req.body.tableData) {
      let obj = {};
      obj.form_id = id;
      obj.field_name = row.field_name;
      obj.field_label = row.field_label;
      obj.control_style = row.control_style;
      obj.valid_rules = row.valid_rules;
      await h.create(T_META_FORM_FIELD, obj);
    }
    h.ok(res, { data: id });
  });

  app.use("/api/designform", router);
};
