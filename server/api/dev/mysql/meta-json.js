/**
 * todo  生成表单实体的配置参数，后期用数据库替代
 * 配置参数说明
 * config 表示实体的配置信息
 * queryFields 表示查询参数的配置
 * tableFields 表示表格信息的配置
 * formFields  表示表单信息的配置
 */
const auth = {
  config: {
    url: "/auth",
    createTitle: "添加权限",
    editTitle: "修改权限信息",
    pagable: false,
  },
  queryFields: [],
  tableFields: [
    {
      label: "真实姓名",
      field: "realname",
      width: "200px",
      style: "text",
      sortable: true,
    },
    {
      label: "用户名",
      field: "username",
      style: "text",
      width: "100px",
    },
    {
      label: "类型",
      field: "style",
      style: "text",
      width: "100px",
    },
    {
      label: "状态",
      field: "status",
      style: "text",
      width: "100px",
    },
  ],
  formFields: [
    {
      style: "textline",
      label: "真实姓名",
      field: "realname",
      default: "",
      tip: "真实姓名",
      width: "120px",
      rule: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
    },
    {
      style: "textline",
      label: "用户名",
      field: "username",
      default: "",
      tip: "用户名",
      width: "120px",
      rule: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    },
    {
      style: "radio",
      label: "状态",
      field: "status",
      default: "正常",
      tip: "状态",
      width: "120px",
      rule: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      options: {
        style: "value",
        values: ["正常", "离开"],
      },
    },
    {
      style: "radio",
      label: "类型",
      field: "style",
      default: "",
      tip: "类型",
      width: "120px",
      rule: [{ required: true, message: "请选择类型", trigger: "blur" }],
      options: {
        style: "value",
        values: ["学生", "员工"],
      },
    },
    {
      style: "selectlist",
      label: "角色",
      field: "pid",
      default: "",
      tip: "角色",
      width: "120px",
      rule: [{ required: true, message: "请选择角色", trigger: "blur" }],
      options: {
        style: "sql",
        sql: "SELECT id, label FROM sys_res ",
        values: [],
      },
      multiple: true,
    },
  ],
};
const user = {
  config: {
    url: "/user",
    createTitle: "添加用户",
    editTitle: "修改用户信息",
    pagable: false,
  },
  queryFields: [
    {
      style: "textline",
      label: "真实姓名",
      field: "realname",
      tip: "真实姓名",
    },
    {
      style: "textline",
      label: "用户名",
      field: "username",
      tip: "用户名",
    },
  ],
  tableFields: [
    {
      label: "真实姓名",
      field: "realname",
      width: "200px",
      style: "text",
      sortable: true,
    },
    {
      label: "用户名",
      field: "username",
      style: "text",
      width: "100px",
    },
    {
      label: "类型",
      field: "style",
      style: "text",
      width: "100px",
    },
    {
      label: "状态",
      field: "status",
      style: "text",
      width: "100px",
    },
  ],
  formFields: [
    {
      style: "textline",
      label: "真实姓名",
      field: "realname",
      default: "",
      tip: "真实姓名",
      width: "120px",
      rule: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
    },
    {
      style: "textline",
      label: "用户名",
      field: "username",
      default: "",
      tip: "用户名",
      width: "120px",
      rule: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    },
    {
      style: "radio",
      label: "状态",
      field: "status",
      default: "正常",
      tip: "状态",
      width: "120px",
      rule: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      options: {
        style: "value",
        values: ["正常", "离开"],
      },
    },
    {
      style: "radio",
      label: "类型",
      field: "style",
      default: "",
      tip: "类型",
      width: "120px",
      rule: [{ required: true, message: "请选择类型", trigger: "blur" }],
      options: {
        style: "value",
        values: ["学生", "员工"],
      },
    },
    {
      style: "selectlist",
      label: "角色",
      field: "pid",
      default: "",
      tip: "角色",
      width: "120px",
      rule: [{ required: true, message: "请选择角色", trigger: "blur" }],
      options: {
        style: "sql",
        sql: "SELECT id, label FROM sys_res ",
        values: [],
      },
      multiple: true,
    },
  ],
};

const org = {
  config: {
    url: "/org",
    createTitle: "创建机构",
    editTitle: "修改机构",
    pagable: false,
  },
  queryFields: [
    {
      style: "textline",
      label: "机构名称",
      field: "label",
      tip: "机构名称",
    },
  ],
  tableFields: [
    {
      label: "机构名称",
      field: "label",
      width: "200px",
      style: "text",
      sortable: true,
    },
    {
      label: "负责人",
      field: "manager",
      style: "text",
      width: "100px",
    },
    {
      label: "联系方式",
      field: "contact",
      style: "text",
      width: "300px",
    },
  ],
  formFields: [
    {
      style: "selecttree",
      label: "上级机构",
      field: "pid",
      default: "",
      tip: "上级机构",
      width: "120px",
      rule: [{ required: true, message: "请选择上级机构", trigger: "blur" }],
      options: {
        style: "sql",
        sql:
          "select 0 as id, -1 as pid, '==顶级=='as label  UNION SELECT id, pid, label FROM sys_org ",
        values: [],
      },
    },
    {
      style: "textline",
      label: "机构名称",
      field: "label",
      default: "",
      tip: "机构名称",
      width: "120px",
      rule: [{ required: true, message: "请输入机构名称", trigger: "blur" }],
    },
    {
      style: "textline",
      label: "负责人",
      field: "manager",
      default: "",
      tip: "负责人",
      width: "120px",
      rule: [{ required: true, message: "请输入负责人", trigger: "blur" }],
    },
    {
      style: "textarea",
      label: "联系方式",
      field: "contact",
      default: "",
      tip: "联系方式",
      width: "200px",
    },
  ],
};

const res = {
  config: {
    url: "/res",
    createTitle: "创建资源",
    editTitle: "修改资源",
    pagable: false,
  },
  queryFields: [
    {
      style: "textline",
      label: "资源名称",
      field: "label",
      tip: "资源名称",
    },
  ],
  tableFields: [
    {
      label: "资源名称",
      field: "label",
      width: "200px",
      style: "text",
      sortable: true,
    },
    {
      label: "图标",
      field: "icon",
      width: "100px",
      style: "icon",
    },
    {
      label: "打开方式",
      field: "openStyle",
      width: "100px",
      style: "text",
    },
    {
      label: "资源类型",
      field: "resStyle",
      width: "100px",
      style: "text",
    },
    {
      label: "访问路径",
      field: "path",
      width: "200px",
      style: "text",
    },
  ],
  formFields: [
    {
      style: "selecttree",
      label: "上级资源",
      field: "pid",
      default: "",
      tip: "上级资源",
      width: "120px",
      rule: [{ required: true, message: "请选择上级资源", trigger: "blur" }],
      options: {
        style: "sql",
        sql:
          "select 0 as id, -1 as pid, '==顶级=='as label union SELECT id, pid, label FROM sys_res ",
        values: [],
      },
    },
    {
      style: "textline",
      label: "资源名称",
      field: "label",
      default: "",
      tip: "资源名称",
      width: "120px",
      rule: [{ required: true, message: "请输入资源名称", trigger: "blur" }],
    },
    {
      style: "textline",
      label: "图标",
      field: "icon",
      default: "",
      tip: "图标",
      width: "120px",
      rule: [{ required: true, message: "请输入图标", trigger: "blur" }],
    },
    {
      style: "radio",
      label: "打开方式",
      field: "openStyle",
      default: "当前窗口",
      tip: "打开方式",
      width: "120px",
      rule: [{ required: true, message: "请输入打开方式", trigger: "blur" }],
      options: {
        style: "value",
        values: ["当前窗口", "弹出窗口"],
      },
    },
    {
      style: "radio",
      label: "资源类型",
      field: "resStyle",
      default: "",
      tip: "资源类型",
      width: "120px",
      rule: [{ required: true, message: "请输入资源类型", trigger: "blur" }],
      options: {
        style: "value",
        values: ["菜单", "按钮"],
      },
    },
  ],
};

const role = {
  config: {
    url: "/role",
    createTitle: "创建角色",
    editTitle: "修改角色",
    pagable: false,
  },
  queryFields: [],
  tableFields: [
    {
      label: "机构名称",
      field: "rog_name",
      width: "120px",
      style: "text",
      sortable: true,
    },
    {
      label: "岗位名称",
      field: "label",
      width: "120px",
      style: "text",
      sortable: true,
    },
  ],
  formFields: [
    {
      style: "selecttree",
      label: "所属机构",
      field: "org_id",
      default: "",
      tip: "所属机构",
      width: "120px",
      rule: [{ required: true, message: "请选择所属机构", trigger: "blur" }],
      options: {
        style: "sql",
        sql:
          "select 0 as id, -1 as pid, '==顶级=='as label  UNION SELECT id, pid, label FROM sys_org ",
        values: [],
      },
    },
    {
      style: "textline",
      label: "岗位名称",
      field: "label",
      default: "",
      tip: "岗位名称",
      width: "120px",
      rule: [{ required: true, message: "请输入岗位名称", trigger: "blur" }],
    },
  ],
};

module.exports = {
  600: auth,
  700: user,
  800: org,
  900: res,
  1000: role,
};
