<template>
  <div class="data-container">
    <div class="query-box">
      <el-form :inline="true" :model="queryForm" class="query-form-inline">
        <template v-for="(field, index) of formFields">
          <el-form-item v-if="field.style === 'textline'" :key="index">
            <el-input
              v-model="queryForm[field.field]"
              :placeholder="field.tip"
            ></el-input>
          </el-form-item>
        </template>
        <el-form-item>
          <el-button type="primary" @click="handleQueryForm">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="operate-bar"><el-button>新增</el-button></div>
    </div>
    <div class="data-box">
      <el-table :data="tableData">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          v-for="(field, index) of tableFields"
          :key="index"
          :prop="field.prop"
          :label="field.label"
          :width="field.width"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-popconfirm title="确定删除吗？">
              <el-button
                type="danger"
                slot="reference"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="data-pager">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryUrl: "",
      queryForm: {},
      formFields: [],
      tableFields: [],
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      total: 1000,
    };
  },
  methods: {
    async fetch() {
      const { data: resp } = await this.$http.get("/metatable/23");
      this.queryUrl = resp.data.queryUrl;
      this.formFields = resp.data.formFields;
      this.tableFields = resp.data.tableFields;
      console.log("表格配置", resp);

      this.handleQueryForm();
    },
    async handleQueryForm() {
      let params = {
        currentPage: this.currentPage, //页码
        pageSize: this.pageSize, //页大小
      };
      Object.assign(params, this.queryForm);
      const { data: resp } = await this.$http.get(this.queryUrl, {
        params,
      });
      console.log("查询结果", resp);
      this.tableData = resp.data;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style lang="scss" scoped>
.data-container {
  .query-box {
    display: flex;
    justify-content: space-between;
  }
  .data-box {
  }
  .data-pager {
    margin-top: 10px;
  }
}
</style>
