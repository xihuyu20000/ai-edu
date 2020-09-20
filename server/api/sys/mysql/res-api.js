module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const h = require("../../api-helper");

  const T_RES = "sys_res";

  /**
   * @swagger
   * /api/res/  列表:
   *  get:
   *    tags:
   *      - sys/res
   */
  router.get("/", async (req, res) => {
    let params = "";
    if (req.query && Object.keys(req.query).length) {
      params = {
        label: {
          like: req.query.label,
        },
      };
    }

    const all = await h.find(T_RES, "*", params);
    const tree = h.tree(all);
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
    const resource = await h.findOne(T_RES, "*", { id: req.params.id });
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
    const id = await h.update(T_RES, req.body, { id: req.params.id });
    h.ok(res, { data: id });
  });

  /**
   * @swagger
   * /api/res/  新建:
   *  post:
   *    tags:
   *      - sys/res
   */
  router.post("/", async (req, res) => {
    if (await h.findOne(T_RES, "*", { label: req.body.label })) {
      return h.fail(res, { msg: "名称已经存在" });
    }
    const id = await h.create(T_RES, req.body);
    h.ok(res, { data: id });
  });

  /**
   * @swagger
   * /api/res/:id  删除:
   *  delete:
   *    tags:
   *      - sys/res
   */
  router.delete("/:id", async (req, res) => {
    const id = await h.remove(T_RES, { id: req.params.id });
    h.ok(res, { data: id });
  });

  app.use("/api/res", router);
};