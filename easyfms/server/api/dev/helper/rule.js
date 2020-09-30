module.exports = {
  config: {
    url: "/rule",
    createTitle: "添加规则",
    editTitle: "修改规则",
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
      label: "规则",
      field: "content",
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
      style: "textarea",
      label: "规则",
      field: "content",
      width: "120px",
      rule: [{ required: true, message: "请输入规则", trigger: "blur" }],
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
