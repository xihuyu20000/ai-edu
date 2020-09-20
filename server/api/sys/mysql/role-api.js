module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const h = require("../../api-helper");

  const T_ROLE = "sys_role";

  /**
   * @swagger
   * /api/role/ 列表:
   *  get:
   *    tags:
   *      - sys/role
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

    const all = await h.find(T_ROLE, "*", params);
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
    const role = await h.findOne(T_ROLE, "*", { id: req.params.id });
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
    const id = await h.update(T_ROLE, req.body, { id: req.params.id });
    h.ok(res, { data: id });
  });

  /**
   * @swagger
   * /api/role/  创建:
   *  post:
   *    tags:
   *      - sys/role
   */
  router.post("/", async (req, res) => {
    if (await h.findOne(T_ROLE, "*", { label: req.body.label })) {
      return h.fail(res, { msg: "名称已经存在" });
    }
    const id = await h.create(T_ROLE, {
      label: req.body.label,
    });
    h.ok(res, { data: id });
  });

  /**
   * @swagger
   * /api/role/:id  删除:
   *  delete:
   *    tags:
   *      - sys/role
   */
  router.delete("/:id", async (req, res) => {
    const id = await h.remove(T_ROLE, { id: req.params.id });
    h.ok(res, { data: id });
  });

  app.use("/api/role", router);
};
