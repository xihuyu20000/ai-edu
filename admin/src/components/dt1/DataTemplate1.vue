<template>
  <div>
    <common-table
      :config="config"
      :queryFields="queryFields"
      :tableFields="tableFields"
      ref="dataTable"
      v-slot="scope"
    >
      <el-button>{{ scope.row }}</el-button>
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
import CommonTable from "@/components/dt1/CommonTable.vue";
import CreateForm from "@/components/dt1/CreateForm.vue";
import EditForm from "@/components/dt1/EditForm.vue";
export default {
  props: {
    data: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      config: {},
      formFields: [],
      queryFields: [],
      tableFields: [],
      editData: {},
    };
  },
  watch: {
    data: function(newVal) {
      console.log("元数据", newVal);
      this.config = newVal.data.config;
      this.formFields = newVal.data.formFields;
      this.queryFields = newVal.data.queryFields;
      this.tableFields = newVal.data.tableFields;
      this.$refs.dataTable.handleQueryForm(this.config.url);
    },
  },
  methods: {},
  created() {},
  components: { CreateForm, EditForm, CommonTable },
};
</script>

<style lang="scss" scoped></style>
