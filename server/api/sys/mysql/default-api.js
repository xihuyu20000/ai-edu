module.exports = (app) => {
  const bcrypt = require("bcrypt");
  const jwt = require("jsonwebtoken");
  const h = require("../../api-helper");
  const express = require("express");
  const router = express.Router();

  // token密钥
  const TOKEN_KEY = "2f.-Alkl3w20LKLS)A09S()(*";

  const T_USER = "sys_user";

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
    h.ok(res, { msg: "测试ok" });
  });

  /**
   * @swagger
   * /api/users 用户列表:
   *  get:
   *    tags:
   *      - sys/default
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
   *      - sys/default
   */
  router.post("/register", async (req, res) => {
    if (await h.findOne(T_USER, "*", { username: req.body.username })) {
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
   *      - sys/default
   */
  router.post("/login", async (req, res) => {
    // 1 查询用户
    const user = await h.findOne("sys_user", "*", {
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
    const token = jwt.sign({ id: user.id }, TOKEN_KEY, {
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
    const user = h.findOne("sys_user", "*", { id: raw.id });
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
    const all = await h.find("sys_res", "*");
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
    // 1 初始化资源
    h.exec("truncate table sys_res");
    const sys_res_sql = [
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('1','0','基础设置','el-icon-menu','1','当前窗口','菜单',NULL,'1');                      ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('2','0','教务设置','el-icon-menu','1','当前窗口','菜单',NULL,'2');                      ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('3','0','教学设置','el-icon-menu','1','当前窗口','菜单',NULL,'3');                      ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('4','0','学习设置','el-icon-menu','1','当前窗口','菜单',NULL,'4');                      ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('5','0','报表设置','el-icon-menu','1','当前窗口','菜单',NULL,'5');                      ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('6','0','监控设置','el-icon-menu','1','当前窗口','菜单',NULL,'6');                      ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('100','1','功能管理','el-icon-menu','2','当前窗口','菜单',NULL,'1');                    ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('101','1','组织管理','el-icon-menu','2','当前窗口','菜单',NULL,'2');                    ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('102','1','角色管理','el-icon-menu','2','当前窗口','菜单',NULL,'3');                    ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('103','1','人员管理','el-icon-menu','2','当前窗口','菜单',NULL,'4');                    ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('104','1','权限管理','el-icon-menu','2','当前窗口','菜单',NULL,'5');                    ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('105','1','其他管理','el-icon-menu','2','当前窗口','菜单',NULL,'6');                    ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('200','2','班级管理','el-icon-menu','2','当前窗口','菜单',NULL,'1');                    ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('201','2','学籍管理','el-icon-menu','2','当前窗口','菜单',NULL,'2');                    ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('202','2','访谈管理','el-icon-menu','2','当前窗口','菜单',NULL,'3');                    ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('203','2','奖惩管理','el-icon-menu','2','当前窗口','菜单',NULL,'4');                    ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('300','3','课程管理','el-icon-menu','2','当前窗口','菜单',NULL,'5');                    ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('301','3','教案管理','el-icon-menu','2','当前窗口','菜单',NULL,'1');                    ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('302','3','教学管理','el-icon-menu','2','当前窗口','菜单',NULL,'2');                    ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('303','3','排课管理','el-icon-menu','2','当前窗口','菜单',NULL,'3');                    ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('304','3','题库管理','el-icon-menu','2','当前窗口','菜单',NULL,'4');                    ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('305','3','考试管理','el-icon-menu','2','当前窗口','菜单',NULL,'5');                    ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('306','3','监考管理','el-icon-menu','2','当前窗口','菜单',NULL,'6');                    ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('307','3','阅卷管理','el-icon-menu','2','当前窗口','菜单',NULL,'7');                    ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('400','4','直播管理','el-icon-menu','2','当前窗口','菜单',NULL,'1');                    ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('401','4','视频管理','el-icon-menu','2','当前窗口','菜单',NULL,'2');                    ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('402','4','笔记管理','el-icon-menu','2','当前窗口','菜单',NULL,'3');                    ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('500','5','教育概况','el-icon-menu','2','当前窗口','菜单',NULL,'1');                    ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('501','5','就业概况','el-icon-menu','2','当前窗口','菜单',NULL,'2');                    ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('502','5','授课进度','el-icon-menu','2','当前窗口','菜单',NULL,'3');                    ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('503','5','学生成绩','el-icon-menu','2','当前窗口','菜单',NULL,'4');                    ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('504','5','学生足迹','el-icon-menu','2','当前窗口','菜单',NULL,'5');                    ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('505','5','学生画像','el-icon-menu','2','当前窗口','菜单',NULL,'6');                    ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('1001','100','资源列表','el-icon-menu','3','当前窗口','菜单','/sys/res/list','1');      ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('1011','101','组织列表','el-icon-menu','3','当前窗口','菜单','/sys/org/list','1');      ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('1021','102','岗位列表','el-icon-menu','3','当前窗口','菜单','/sys/role/list','1');     ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('1031','103','员工列表','el-icon-menu','3','当前窗口','菜单','/sys/staff/list','1');    ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('1041','104','权限列表','el-icon-menu','3','当前窗口','菜单',NULL,'1');                 ",
      "insert into `sys_res` (`id`, `pid`, `label`, `icon`, `level`, `openStyle`, `resStyle`, `path`, `showOrder`) values('1032','103','学生列表','el-icon-menu','3','当前窗口','菜单','/sys/student/list','2');  ",
    ];
    h.exec(sys_res_sql);

    // 2 初始化用户
    h.exec("truncate table sys_user");
    const sys_user_staff = [
      "insert into `sys_user` (`id`, `realname`, `username`, `password`, `style`, `canlogin`, `status`) values('1','管理员','root','admin','staff','0','在职')",
    ];
    h.exec(sys_user_staff);

    // 3 初始化组织机构
    h.exec("truncate table sys_org");
    const sys_org_sql = [
      "insert into `sys_org` (`id`, `pid`, `label`, `manager`, `contact`, `showOrder`) values('1','0','集团公司',NULL,NULL,'1');               ",
      "insert into `sys_org` (`id`, `pid`, `label`, `manager`, `contact`, `showOrder`) values('2','1','北京教育科技发展公司',NULL,NULL,'1');   ",
      "insert into `sys_org` (`id`, `pid`, `label`, `manager`, `contact`, `showOrder`) values('3','1','北京软件开发公司',NULL,NULL,'2');       ",
      "insert into `sys_org` (`id`, `pid`, `label`, `manager`, `contact`, `showOrder`) values('4','1','河南分公司',NULL,NULL,'3');             ",
      "insert into `sys_org` (`id`, `pid`, `label`, `manager`, `contact`, `showOrder`) values('5','2','开发部',NULL,NULL,'1');                 ",
      "insert into `sys_org` (`id`, `pid`, `label`, `manager`, `contact`, `showOrder`) values('6','2','市场部',NULL,NULL,'2');                 ",
      "insert into `sys_org` (`id`, `pid`, `label`, `manager`, `contact`, `showOrder`) values('7','2','财务部',NULL,NULL,'3');                 ",
    ];
    h.exec(sys_org_sql);

    // 4 初始化角色
    h.exec("truncate table sys_role");
    const sys_role_sql = [
      "insert into `sys_role` (`id`, `label`) values('1','管理员');      ",
      "insert into `sys_role` (`id`, `label`) values('2','讲师');        ",
      "insert into `sys_role` (`id`, `label`) values('3','财务-出纳');   ",
      "insert into `sys_role` (`id`, `label`) values('4','财务-会计');   ",
    ];
    h.exec(sys_role_sql);
    h.ok(res, { msg: "初始化所有数据" });
  });

  /**
   * @swagger
   * /api/metatable/:id  数据表格元数据:
   *  get:
   *    tags:
   *     - sys/default
   */
  router.get("/metatable/:id", async (req, res) => {
    const result = {
      queryUrl: "/role/",
      formFields: [
        {
          style: "textline",
          label: "名称",
          field: "label",
          tip: "角色名称",
          match: "like",
        },
      ],
      tableFields: [{ prop: "label", label: "名称", width: 140 }],
    };
    h.ok(res, { data: result });
  });
  app.use("/api", router);
};
