module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const h = require("../../api-helper");

  /**
   * @swagger
   * /api/meta 元数据:
   *  get:
   *    tags:
   *     - dev/meta
   */
  router.get("/table/:id", async (req, res) => {
    let config = {};
    let queryFields = [];
    let tableFields = [];

    if (req.params.id == 100) {
      config = {
        url: "/role",
        createTitle: "创建角色",
        editTitle: "修改角色",
      };
      queryFields = [
        {
          style: "textline",
          label: "岗位名称",
          field: "label",
          tip: "岗位名称",
        },
      ];
      tableFields = [
        {
          label: "岗位名称",
          field: "label",
          width: "120px",
          sortable: true,
        },
      ];
      formFields = [
        {
          style: "textline",
          label: "岗位名称",
          field: "label",
          tip: "岗位名称",
          width: "120px",
          rule: [
            { required: true, message: "请输入岗位名称", trigger: "blur" },
          ],
        },
      ];
    }

    h.ok(res, {
      data: {
        config,
        queryFields,
        tableFields,
        formFields,
      },
    });
  });

  app.use("/api/meta", router);
};
