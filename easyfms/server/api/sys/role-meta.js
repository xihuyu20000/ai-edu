module.exports = {
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

      width: "120px",
      rule: [{ required: true, message: "请输入岗位名称", trigger: "blur" }],
    },
  ],
};
