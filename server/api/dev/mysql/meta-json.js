const res = {
  config: {
    url: "/res",
    createTitle: "创建资源",
    editTitle: "修改资源",
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
      width: "120px",
      sortable: true,
    },
    {
      label: "图标",
      field: "icon",
      width: "100px",
    },
    {
      label: "打开方式",
      field: "openStyle",
      width: "100px",
    },
    {
      label: "资源类型",
      field: "resStyle",
      width: "100px",
    },
    {
      label: "访问路径",
      field: "path",
      width: "200px",
    },
  ],
  formFields: [
    {
      style: "selectlist",
      label: "上级资源",
      field: "pid",
      value: "",
      tip: "上级资源",
      width: "120px",
      rule: [{ required: true, message: "请选择上级资源", trigger: "blur" }],
      options: {
        style: "sql",
        sql:
          "SELECT 0 AS id, '顶级机构' AS label UNION SELECT id, label FROM sys_res ",
        values: new Array(),
      },
    },
    {
      style: "textline",
      label: "资源名称",
      field: "label",
      value: "",
      tip: "资源名称",
      width: "120px",
      rule: [{ required: true, message: "请输入资源名称", trigger: "blur" }],
    },
    {
      style: "textline",
      label: "图标",
      field: "icon",
      value: "",
      tip: "图标",
      width: "120px",
      rule: [{ required: true, message: "请输入图标", trigger: "blur" }],
    },
    {
      style: "radio",
      label: "打开方式",
      field: "openStyle",
      value: "当前窗口",
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
      value: "",
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
  },
  queryFields: [
    {
      style: "textline",
      label: "岗位名称",
      field: "label",
      tip: "岗位名称",
    },
  ],
  tableFields: [
    {
      label: "岗位名称",
      field: "label",
      width: "120px",
      sortable: true,
    },
  ],
  formFields: [
    {
      style: "textline",
      label: "岗位名称",
      field: "label",
      tip: "岗位名称",
      width: "120px",
      rule: [{ required: true, message: "请输入岗位名称", trigger: "blur" }],
    },
  ],
};
module.exports = { 900: res, 1000: role };
