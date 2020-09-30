module.exports = {
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
      width: "120px",
      rule: [{ required: true, message: "请输入资源名称", trigger: "blur" }],
    },
    {
      style: "textline",
      label: "图标",
      field: "icon",
      width: "120px",
      rule: [{ required: true, message: "请输入图标", trigger: "blur" }],
    },
    {
      style: "radio",
      label: "打开方式",
      field: "openStyle",
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
      width: "120px",
      rule: [{ required: true, message: "请输入资源类型", trigger: "blur" }],
      options: {
        style: "value",
        values: ["菜单", "按钮"],
      },
    },
  ],
};
