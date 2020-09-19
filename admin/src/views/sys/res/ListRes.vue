<template>
  <div class="data-container">
    <div class="query-box">
      <el-form :inline="true" :model="queryForm" class="query-form-inline">
        <el-form-item>
          <el-input v-model="queryForm.label" placeholder="资源名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQueryForm"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
      <div class="operate-bar"><el-button type="primary">新增</el-button></div>
    </div>
    <div class="data-box">
      <el-table :data="tableData" row-key="_id">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="名称" prop="label" width="120">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-popconfirm
              title="确定删除吗？"
              @onConfirm="handleDelete(scope.$index, scope.row)"
            >
              <el-button type="danger" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "/res",
      queryForm: {},
      tableData: []
    };
  },
  methods: {
    async fetch() {
      this.handleQueryForm();
    },
    async handleQueryForm() {
      const { data: resp } = await this.$http.get(
        this.url + "?" + this.$ser(this.queryForm)
      );
      console.log("查询结果", resp);
      this.tableData = resp.data;
    },
    async handleDelete(index, row) {
      const { data: resp } = await this.$http.delete(this.url + "/" + row._id);
      resp.msg
        ? this.$message.success("删除成功")
        : this.$message.error("删除失败");
      this.fetch();
    }
  },
  created() {
    this.fetch();
  }
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
