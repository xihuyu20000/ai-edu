module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const h = require("../api-helper");

  const T_ROLE = "sys_role";

  /**
   * @swagger
   * /api/role/ 列表:
   *  get:
   *    tags:
   *      - sys/role
   */
  router.get("/", async (req, res) => {
    const all = await h.query(
      `select r.id, r.org_id,  o.label AS rog_name, r.label  from sys_role as r left join sys_org as o on r.org_id=o.id`
    );
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
    let data = {
      org_id: req.body.org_id,
      label: req.body.label,
    };
    const id = await h.update(T_ROLE, data, { id: req.params.id });
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
    let data = {
      org_id: req.body.org_id,
      label: req.body.label,
    };
    const id = await h.create(T_ROLE, data);
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
