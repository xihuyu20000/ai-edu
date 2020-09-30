module.exports = {
  config: {
    url: "/dict",
    createTitle: "添加控件字典",
    editTitle: "修改控件字典",
    pagable: false,
  },
  queryFields: [],
  tableFields: [
    {
      label: "名称",
      field: "label",
      width: "200px",
      style: "text",
      sortable: true,
    },
    {
      label: "编码",
      field: "code",
      style: "text",
      width: "100px",
    },
    {
      label: "描述",
      field: "remark",
      style: "text",
      width: "200px",
    },
    {
      label: "类型",
      field: "style",
      style: "text",
      width: "100px",
    },
    {
      label: "SQL语句",
      field: "query_sql",
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
      label: "名称",
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
      style: "textarea",
      label: "描述",
      field: "remark",
      width: "120px",
    },
    {
      style: "selectlist",
      label: "类型",
      field: "style",
      width: "120px",
      rule: [{ required: true, message: "请输入类型", trigger: "blur" }],
      options: {
        style: "value",
        values: ["列表", "树", "表格"],
      },
      tip:
        "选择列表时，sql语句必须有id和label；选择树时，sql语句必须有id、pid和label",
    },
    {
      style: "textarea",
      label: "SQL语句",
      field: "query_sql",
      width: "120px",
      rule: [{ required: true, message: "请输入SQL语句", trigger: "blur" }],
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
