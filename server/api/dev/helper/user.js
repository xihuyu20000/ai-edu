module.exports = {
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
    },
    {
      style: "textline",
      label: "用户名",
      field: "username",
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
      width: "120px",
      rule: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
    },
    {
      style: "textline",
      label: "用户名",
      field: "username",
      width: "120px",
      rule: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    },
    {
      style: "radio",
      label: "状态",
      field: "status",
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
