module.exports = (app) => {
  const bcrypt = require("bcrypt");
  const jwt = require("jsonwebtoken");
  const { User } = require("../../models/sys/user-model");
  const { Res } = require("../../models/sys/res-model");
  const { Org } = require("../../models/sys/org-model");
  const { Role } = require("../../models/sys/role-model");
  const h = require("./api-helper");
  const express = require("express");
  const router = express.Router();

  // token密钥
  const TOKEN_KEY = "2f.-Alkl3w20LKLS)A09S()(*";

  // 验证token中间件
  const auth = (req, res, next) => {
    const token = req.headers.authorization;
    jwt.verify(token, TOKEN_KEY, (err, payload) => {
      if (err) return h.fail(res, { msg: "token不正确" });
      // 没问题的话，直接放行
      next();
    });
  };

  /**
   * @swagger
   * /api/ 首页:
   *  get:
   *    tags:
   *      - sys/default
   */
  router.get("/", async (req, res) => {
    h.ok(res, {msg:'测试ok'})
  });

  /**
   * @swagger
   * /api/users 用户列表:
   *  get:
   *    tags:
   *      - sys/default
   */
  router.get("/users", async (req, res) => {
    const all = await User.find()
    h.ok(res, {data: all});
  });

  /**
   * @swagger
   * /api/register 注册:
   *  post:
   *    tags:
   *      - sys/default
   */
  router.post("/register", async (req, res) => {
    const user = await User.create(req.body);
    h.ok(res, { data: user });
  });

  /**
   * @swagger
   * /api/login  登录:
   * post:
   *    tags:
   *      - sys/default
   */
  router.post("/login", async (req, res) => {
    // 1 查询用户
    const user = await User.findOne({ username: req.body.username });
    // 2 判断用户是否存在
    if (!user) {
      return res.status(400).json({ msg: "用户名不正确" });
    }
    // 3 验证密码是否正确
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(400).json({ msg: "密码不正确" });
    }
    // 4 生成token
    const token = jwt.sign({ id: user._id }, TOKEN_KEY, {
      expiresIn: "1h",
    });
    // 5 发送客户端
    h.ok(res, { msg: "登录成功", data: user, token: token });
  });

  /**
   * @swagger
   * /api/token 刷新token:
   *  get:
   *    tags:
   *      - sys/default
   */
  router.get("/token", auth, async (req, res) => {
    // 1 从请求头获取token
    let token = req.headers.authorization;
    // 2 解析token
    const raw = jwt.verify(token, TOKEN_KEY);
    console.log("取token中的值", raw);
    // 3 从数据库查询用户
    const user = User.findById(raw.id);
    if (!user) {
      return res.status(422).json({ msg: "伪造token" });
    }
    // 4 生成新的token
    const token1 = jwt.sign({ id: user._id }, TOKEN_KEY, {
      expiresIn: "1h",
    });
    // 5 发送到客户端
    h.ok(res, { msg: "刷新成功", token: token1 });
  });

  /**
   * @swagger
   * /api/navs  导航菜单:
   *  get:
   *    tags:
   *      - sys/default
   */
  router.get("/navs", auth, async (req, res) => {
    const all = await Res.find();
    const tree = h.resTree(all);
    h.ok(res, { data: tree });
  });

  /**
   * /api/init 初始化数据:
   * put:
   *  tags:
   *    - sys/default
   */
  router.put("/init", async (req, res) => {
    // 1 初始化资源
    await Res.remove({});
    console.log("清除所有Res数据");
    const menus = [
      {
        label: "基础设置",
        icon: "el-icon-menu",
        openStyle: "当前窗口",
        resStyle: "菜单",
        showOrder: 1,
        children: [
          {
            label: "资源管理",
            icon: "el-icon-menu",
            openStyle: "当前窗口",
            resStyle: "菜单",
            showOrder: 1,
            children: [
              {
                label: "功能点列表",
                icon: "el-icon-menu",
                openStyle: "当前窗口",
                resStyle: "菜单",
                path: "/basic/funcpoint/list",
                showOrder: 1,
              },
              {
                label: "添加功能点",
                icon: "el-icon-menu",
                openStyle: "当前窗口",
                resStyle: "菜单",
                path: "/basic/funcpoint/create",
                showOrder: 1,
              },
            ],
          },
          {
            label: "组织管理",
            icon: "el-icon-menu",
            openStyle: "当前窗口",
            resStyle: "菜单",
            showOrder: 2,
          },
          {
            label: "岗位管理",
            icon: "el-icon-menu",
            openStyle: "当前窗口",
            resStyle: "菜单",
            showOrder: 3,
          },
          {
            label: "人员管理",
            icon: "el-icon-menu",
            openStyle: "当前窗口",
            resStyle: "菜单",
            showOrder: 4,
          },
          {
            label: "权限管理",
            icon: "el-icon-menu",
            openStyle: "当前窗口",
            resStyle: "菜单",
            showOrder: 5,
          },
        ],
      },
      {
        label: "教务设置",
        icon: "el-icon-menu",
        openStyle: "当前窗口",
        resStyle: "菜单",
        showOrder: 2,
      },
      {
        label: "教学设置",
        icon: "el-icon-menu",
        openStyle: "当前窗口",
        resStyle: "菜单",
        showOrder: 3,
      },
      {
        label: "学习设置",
        icon: "el-icon-menu",
        openStyle: "当前窗口",
        resStyle: "菜单",
        showOrder: 4,
      },
      {
        label: "报表设置",
        icon: "el-icon-menu",
        openStyle: "当前窗口",
        resStyle: "菜单",
        showOrder: 5,
      },
      {
        label: "监控设置",
        icon: "el-icon-menu",
        openStyle: "当前窗口",
        resStyle: "菜单",
        showOrder: 6,
      },
    ];

    for (const item1 of menus) {
      const menu1 = await Res.create(item1);
      if (item1.hasOwnProperty("children")) {
        for (const item2 of item1.children) {
          item2.pid = menu1._id;
          const menu2 = await Res.create(item2);
          if (item2.hasOwnProperty("children")) {
            for (const item3 of item2.children) {
              item3.pid = menu2._id;
              const menu3 = await Res.create(item3);
            }
          }
        }
      }
    }

    // 2 初始化用户
    User.create({
      realname: "管理员",
      username: "root",
      password: "admin",
      style: "staff",
    });
    User.create({
      realname: "学生",
      username: "stu1",
      password: "stu1",
      style: "student",
    });

    // 3 初始化组织机构
    let topOrg = [
      {
        label: "集团公司",
        children: [
          {
            label: "北京分公司",
            children: [
              { label: "开发部" },
              { label: "市场部" },
              { label: "教学部" },
            ],
          },
          { label: "河南分公司" },
        ],
      },
    ];
    for (const item1 of topOrg) {
      const org1 = await Org.create(item1);
      if (item1.hasOwnProperty("children")) {
        for (const item2 of item1.children) {
          item2.pid = org1._id;
          const org2 = await Org.create(item2);
          if (item2.hasOwnProperty("children")) {
            for (const item3 of item2.children) {
              item3.pid = org2._id;
              const org3 = await Org.create(item3);
              if (item3.hasOwnProperty("children")) {
                for (const item4 of item3.children) {
                  item4.pid = org3._id;
                  await Org.create(item4);
                }
              }
            }
          }
        }
      }
    }

    // 4 初始化角色
    let adminRole = { label: "系统管理员" };
    Role.create(adminRole);

    h.ok(res, { msg: "初始化所有数据" });
  });

  app.use("/api", router);
};
