module.exports = {
  globalConfig: {
    url: "/grade",
    label: "班级",
    pagable: false,
  },
  queryConfig: [
    {
      style: "textline",
      label: "班级名称",
      field: "label",
    },
  ],
  tableConfig: [
    {
      label: "班级",
      field: "label",
      width: "200px",
      style: "text",
      sortable: true,
    },
    {
      label: "开始日期",
      field: "start_date",
      style: "text",
      sortable: true,
    },
    {
      label: "结束日期",
      field: "end_date",
      style: "text",
      sortable: true,
    },
  ],
  formConfig: [
    {
      style: "textline",
      label: "班级名称",
      field: "label",
      width: "120px",
      rule: [{ required: true, message: "请输入班级名称", trigger: "blur" }],
    },
    {
      style: "date",
      label: "开始日期",
      field: "start_date",
    },
    {
      style: "date",
      label: "结束日期",
      field: "end_date",
    },
  ],
};
