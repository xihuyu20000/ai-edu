module.exports = {
  globalConfig: {
    url: "/org",
    label: "教案",
    pagable: false,
  },
  queryConfig: [
    {
      style: "textline",
      label: "机构名称",
      field: "label",
    },
  ],
  tableConfig: [
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
  formConfig: [
    {
      style: "selecttree",
      label: "上级机构",
      field: "pid",
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
      width: "120px",
      rule: [{ required: true, message: "请输入机构名称", trigger: "blur" }],
    },
    {
      style: "textline",
      label: "负责人",
      field: "manager",
      width: "120px",
      rule: [{ required: true, message: "请输入负责人", trigger: "blur" }],
    },
    {
      style: "textarea",
      label: "联系方式",
      field: "contact",
      width: "200px",
    },
  ],
};
