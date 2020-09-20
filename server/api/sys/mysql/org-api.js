module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const h = require("../../api-helper");

  const T_ORG = "sys_org";

  /**
   * @swagger
   * /api/org/  列表:
   *  get:
   *    tags:
   *      - sys/org
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

    const all = await h.find(T_ORG, "*", params);
    const tree = h.tree(all);
    console.log("机构树", tree);
    h.ok(res, { data: tree });
  });

  /**
   * @swagger
   * /api/org/:id  查找:
   *  get:
   *   tags:
   *     - sys/org
   */
  router.get("/:id", async (req, res) => {
    const org = await h.findOne(T_ORG, "*", { id: req.params.id });
    h.ok(res, { data: org });
  });

  /**
   * @swagger
   * /api/org/:id  修改:
   *  put:
   *   tags:
   *     - sys/org
   */
  router.put("/:id", async (req, res) => {
    const org = await h.update(T_ORG, req.body, { id: req.params.id });
    h.ok(res, { data: org });
  });

  /**
   * @swagger
   * /api/org/  创建:
   *  post:
   *    tags:
   *      - sys/org
   */
  router.post("/", async (req, res) => {
    if (await h.findOne(T_ORG, "*", { label: req.body.label })) {
      return h.fail(res, { msg: "名称已经存在" });
    }
    const id = await h.create(T_ORG, req.body);
    h.ok(res, { data: id });
  });

  /**
   * @swagger
   * /api/org/:id  删除:
   *  delete:
   *     tags:
   *      - sys/org
   */
  router.delete("/:id", async (req, res) => {
    const id = await h.remove(T_ORG, { id: req.params.id });
    h.ok(res, { data: id });
  });
  app.use("/api/org", router);
};
