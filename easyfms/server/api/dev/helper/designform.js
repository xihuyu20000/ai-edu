module.exports = {
  globalConfig: {
    url: "/dict",
    createTitle: "添加控件字典",
    editTitle: "修改控件字典",
    pagable: false,
  },
  formConfig: [
    {
      style: "textline",
      label: "表单名称",
      field: "label",
      width: "120px",
      rule: [{ required: true, message: "请输入名称", trigger: "blur" }],
    },
    {
      style: "textline",
      label: "编码",
      field: "code",
      width: "120px",
      rule: [{ required: true, message: "请输入编码", trigger: "blur" }],
    },
    {
      style: "textline",
      label: "表名称",
      field: "table_name",
      width: "120px",
      tip: "数据库表名称",
      rule: [{ required: true, message: "请输入表名称", trigger: "blur" }],
    },
    {
      style: "textarea",
      label: "描述",
      field: "remark",
      width: "120px",
      rule: [{ required: true, message: "请输入描述", trigger: "blur" }],
    },
    {
      style: "selectlist",
      label: "表单样式",
      field: "style",
      width: "120px",
      rule: [{ required: true, message: "请输入表单样式", trigger: "blur" }],
      options: {
        style: "value",
        values: ["一列", "二列", "三列", "四列"],
      },
    },
    {
      style: "selectlist",
      label: "状态",
      field: "status",
      width: "120px",
      rule: [{ required: true, message: "请输入状态", trigger: "blur" }],
      options: {
        style: "value",
        values: ["正常", "停用"],
      },
    },
  ],
};
