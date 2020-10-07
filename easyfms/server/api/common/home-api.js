// 首页的所有操作
module.exports = (app) => {
  const bcrypt = require("bcrypt");
  const jwt = require("jsonwebtoken");
  const h = require("../api-helper");
  const express = require("express");
  const router = express.Router();

  // 验证token中间件
  const auth = (req, res, next) => {
    const token = req.headers.authorization;
    jwt.verify(token, h.vars.TOKEN_KEY, (err, payload) => {
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
   *- sys/default
   */
  router.get("/", async (req, res) => {
    h.ok(res, { msg: "测试ok" });
  });

  /**
   * @swagger
   * /api/users 用户列表:
   *  get:
   *    tags:
   *- sys/default
   */
  router.get("/users", async (req, res) => {
    const all = await h.find("sys_user");
    h.ok(res, { data: all });
  });

  /**
   * @swagger
   * /api/register 注册:
   *  post:
   *    tags:
   *- sys/default
   */
  router.post("/register", async (req, res) => {
    if (await h.findOne(h.vars.T_USER, "*", { username: req.body.username })) {
      return h.fail(res, { msg: "用户名已经存在" });
    }
    req.body.password = require("bcrypt").hashSync(req.body.password, 10);
    const user = await h.create("sys_user", req.body);
    h.ok(res, { data: user });
  });

  /**
   * @swagger
   * /api/login  登录:
   * post:
   *    tags:
   *- sys/default
   */
  router.post("/login", async (req, res) => {
    // 1 查询用户
    const user = await h.findOne(h.vars.T_USER, "*", {
      username: req.body.username,
    });
    // 2 判断用户是否存在
    if (!user) {
      return h.fail(res, { msg: "用户名不正确" });
    }
    // 3 验证密码是否正确
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return h.fail(res, { msg: "密码不正确" });
    }
    // 4 生成token
    const token = jwt.sign({ id: user.id }, h.vars.TOKEN_KEY, {
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
   *- sys/default
   */
  router.get("/token", auth, async (req, res) => {
    // 1 从请求头获取token
    let token = req.headers.authorization;
    // 2 解析token
    const raw = jwt.verify(token, h.vars.TOKEN_KEY);
    console.log("取token中的值", raw);
    // 3 从数据库查询用户
    const user = h.findOne("sys_user", "*", { id: raw.id });
    if (!user) {
      return res.status(422).json({ msg: "伪造token" });
    }
    // 4 生成新的token
    const token1 = jwt.sign({ id: user._id }, h.vars.TOKEN_KEY, {
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
   *- sys/default
   */
  router.get("/navs", auth, async (req, res) => {
    const all = await h.find(h.vars.T_MENU, "*");
    const tree = h.tree(all);
    h.ok(res, { data: tree });
  });

  /**
   * @swagger
   * /api/init 初始化数据:
   * put:
   *  tags:
   *    - sys/default
   */
  router.put("/init", async (req, res) => {
    const sqls = {};
    // 1 初始化资源
    sqls.sys_res_sql = [
      "truncate table sys_res",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('1','0','业务管理','el-icon-menu','当前窗口','菜单',NULL,'1');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('20','1','教务设置','el-icon-s-ticket','当前窗口','菜单',NULL,'2');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('200','20','班级管理','el-icon-menu','当前窗口','菜单',NULL,'1');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('201','20','学籍管理','el-icon-menu','当前窗口','菜单',NULL,'2');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('202','20','访谈管理','el-icon-menu','当前窗口','菜单',NULL,'3');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('203','20','奖惩管理','el-icon-menu','当前窗口','菜单',NULL,'4');",

      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('30','1','教学设置','el-icon-s-order','当前窗口','菜单',NULL,'3');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('300','30','课程管理','el-icon-menu','当前窗口','菜单',NULL,'5');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('301','30','教案管理','el-icon-menu','当前窗口','菜单',NULL,'1');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('302','30','教学管理','el-icon-menu','当前窗口','菜单',NULL,'2');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('303','30','排课管理','el-icon-menu','当前窗口','菜单',NULL,'3');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('304','30','题库管理','el-icon-menu','当前窗口','菜单',NULL,'4');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('305','30','考试管理','el-icon-menu','当前窗口','菜单',NULL,'5');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('306','30','监考管理','el-icon-menu','当前窗口','菜单',NULL,'6');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('307','30','阅卷管理','el-icon-menu','当前窗口','菜单',NULL,'7');",

      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('40','1','学习设置','el-icon-s-flag','当前窗口','菜单',NULL,'4');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('400','40','直播管理','el-icon-menu','当前窗口','菜单',NULL,'1');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('401','40','视频管理','el-icon-menu','当前窗口','菜单',NULL,'2');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('402','40','笔记管理','el-icon-menu','当前窗口','菜单',NULL,'3');",

      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('50','1','报表设置','el-icon-s-marketing','当前窗口','菜单',NULL,'5');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('500','50','教育概况','el-icon-menu','当前窗口','菜单',NULL,'1');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('501','50','就业概况','el-icon-menu','当前窗口','菜单',NULL,'2');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('502','50','授课进度','el-icon-menu','当前窗口','菜单',NULL,'3');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('503','50','学生成绩','el-icon-menu','当前窗口','菜单',NULL,'4');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('504','50','学生足迹','el-icon-menu','当前窗口','菜单',NULL,'5');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('505','50','学生画像','el-icon-menu','当前窗口','菜单',NULL,'6');",

      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('60','1','监控设置','el-icon-s-shop','当前窗口','菜单',NULL,'6');",

      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('2','0','系统配置','el-icon-menu','当前窗口','菜单',NULL,'1');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('10','2','基础设置','el-icon-setting','当前窗口','菜单',NULL,'1');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('101','10','菜单列表','el-icon-menu','当前窗口','菜单','/sys/res/list','1');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('102','10','角色列表','el-icon-menu','当前窗口','菜单','/sys/role/list','1');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('103','10','部门列表','el-icon-menu','当前窗口','菜单','/sys/org/list','1');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('104','10','系统公告','el-icon-menu','当前窗口','菜单',NULL,'6');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('105','10','用户管理','el-icon-menu','当前窗口','菜单','/sys/user/list','1');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('106','10','权限管理','el-icon-menu','当前窗口','菜单',NULL,'5');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('107','10','控件字典','el-icon-menu','当前窗口','菜单','/sys/dict/list','1');",

      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('3','0','应用开发','el-icon-menu','当前窗口','菜单',NULL,'1');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('31','3','表单管理','el-icon-s-data','当前窗口','菜单',NULL,'1');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('310','31','制作表单','el-icon-menu','当前窗口','菜单','/dev/form/design','1');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('311','31','表单模板','el-icon-menu','当前窗口','菜单',NULL,'1');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('312','31','校验规则','el-icon-menu','当前窗口','菜单','/common/loader/1','1');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('32','3','设计表格','el-icon-s-grid','当前窗口','菜单',NULL,'1');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('320','32','制作表格','el-icon-menu','当前窗口','菜单',NULL,'1');",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `openStyle`, `resStyle`, `path`, `showOrder`) values('321','32','表单模板','el-icon-menu','当前窗口','菜单',NULL,'1');",
    ];

    // 2 初始化用户
    sqls.sys_user_staff = [
      "truncate table sys_user",
      "insert into `sys_user` (`id`, `realname`, `username`, `password`, `style`, `canlogin`, `status`) values('1','管理员','root','$2b$10$T8sMqOL1smHDoazINRANbuU3W1jMATFKWxVt1khlBfskRoiHp9FfC','staff','0','在职')",
    ];

    // 3 初始化组织机构
    sqls.sys_org_sql = [
      "truncate table sys_org",
      "insert into `sys_org` (`id`, `pid`, `label`, `manager`, `contact`, `showOrder`) values('1','0','集团公司',NULL,NULL,'1');   ",
      "insert into `sys_org` (`id`, `pid`, `label`, `manager`, `contact`, `showOrder`) values('2','1','北京教育科技发展公司',NULL,NULL,'1');   ",
      "insert into `sys_org` (`id`, `pid`, `label`, `manager`, `contact`, `showOrder`) values('3','1','北京软件开发公司',NULL,NULL,'2'); ",
      "insert into `sys_org` (`id`, `pid`, `label`, `manager`, `contact`, `showOrder`) values('4','1','河南分公司',NULL,NULL,'3'); ",
      "insert into `sys_org` (`id`, `pid`, `label`, `manager`, `contact`, `showOrder`) values('5','2','开发部',NULL,NULL,'1');",
      "insert into `sys_org` (`id`, `pid`, `label`, `manager`, `contact`, `showOrder`) values('6','2','市场部',NULL,NULL,'2');",
      "insert into `sys_org` (`id`, `pid`, `label`, `manager`, `contact`, `showOrder`) values('7','2','财务部',NULL,NULL,'3');",
    ];

    // 4 初始化角色
    sqls.sys_role_sql = [
      "truncate table sys_role",
      "insert into `sys_role` (`id`, `label`) values('100000','开发人员');",
      "insert into `sys_role` (`id`, `label`) values('100002','讲师');  ",
      "insert into `sys_role` (`id`, `label`) values('100003,'财务-出纳');   ",
      "insert into `sys_role` (`id`, `label`) values('100004','财务-会计');   ",
    ];

    for (let key in sqls) {
      h.exec(sqls[key]);
    }
    h.exec("SHOW tables");
    h.ok(res, { msg: "初始化所有数据" });
  });

  /**
   * @swagger
   * /api/metatable/:id  数据表格元数据:
   *  get:
   *    tags:
   *- sys/default
   */
  router.get("/metatable/:id", async (req, res) => {
    const result = {
      queryUrl: "/role/",
      formConfig: [
        {
          style: "textline",
          label: "名称",
          field: "label",
          tip: "角色名称",
          match: "like",
        },
      ],
      tableConfig: [{ prop: "label", label: "名称", width: 140 }],
    };
    h.ok(res, { data: result });
  });
  app.use("/api", router);
};
