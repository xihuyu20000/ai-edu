<template>
  <div>
    <common-table
      :config="config"
      :queryFields="queryFields"
      :tableFields="tableFields"
      ref="dataTable"
    >
    </common-table>
    <create-form
      :config="config"
      :formFields="formFields"
      :formData="editData"
      ref="createDialog"
    ></create-form>
    <edit-form
      :config="config"
      :formFields="formFields"
      ref="editDialog"
    ></edit-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        type: Object,
        require: true,
      },
      config: {},
      formFields: [],
      queryFields: [],
      tableFields: [],
      editData: {},
    };
  },
  watch: {
    data: function(newVal) {
      // console.log("元数据", newVal);
      this.config = newVal.data.config;
      this.formFields = newVal.data.formFields;
      this.queryFields = newVal.data.queryFields;
      this.tableFields = newVal.data.tableFields;
      this.$refs.dataTable.handleQueryForm(this.config.url);
    },
  },
  methods: {
    async fetch() {
      const { data: resp } = await this.$http.get("/meta/table/1000");
      this.data = resp;
    },
    relateRes: function(row) {
      console.log("关联用户", row);
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss" scoped></style>
