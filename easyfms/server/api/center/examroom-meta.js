module.exports = {
  globalConfig: {
    url: "/examroom",
    label: "考场",
    pagable: false,
  },
  queryConfig: [],
  tableConfig: [
    {
      label: "考试名称",
      field: "label",

      style: "text",
      sortable: true,
    },
    {
      label: "所属班级",
      field: "class_name",
      width: "250px",
      style: "text",
      sortable: true,
    },
    {
      label: "开始时间",
      field: "start_time",
      width: "160px",
      style: "text",
      sortable: true,
    },
    {
      label: "距今时间",
      field: "until_time",
      width: "120px",
      style: "text",
      sortable: true,
    },
  ],
  formConfig: [],
};
