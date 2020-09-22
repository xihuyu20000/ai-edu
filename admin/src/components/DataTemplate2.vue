<template>
  <el-row :gutter="10">
    <el-col :span="6"
      ><common-tree :config="config" ref="dataTree"></common-tree
    ></el-col>
    <el-col :span="18"
      ><common-table
        :config="config"
        :queryFields="queryFields"
        :tableFields="tableFields"
        ref="dataTable"
      >
        <template v-slot:header>
          <el-button>员工</el-button><el-button>学生</el-button>
        </template>
      </common-table></el-col
    >
  </el-row>
</template>

<script>
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
      // console.log("元数据", newVal);
      this.config = newVal.data.config;
      this.formFields = newVal.data.formFields;
      this.queryFields = newVal.data.queryFields;
      this.tableFields = newVal.data.tableFields;
      this.$refs.dataTree.loadData(this.config.url);
      this.$refs.dataTable.handleQueryForm(this.config.url);
    },
  },
  methods: {},
  created() {},
};
</script>

<style lang="scss" scoped></style>
