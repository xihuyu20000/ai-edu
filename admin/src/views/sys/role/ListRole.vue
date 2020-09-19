<template>
  <div class="data-container">
    <div class="query-box">
      <el-form :inline="true" :model="queryForm" class="query-form-inline">
        <el-form-item>
          <el-input v-model="queryForm.label" placeholder="岗位名称"></el-input>
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
      <div class="operate-bar">
        <el-button type="primary" @click="toCreate">新增</el-button>
      </div>
    </div>
    <div class="data-box">
      <el-table :data="tableData">
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
    <form-role
      :isnew="true"
      ref="createDialog"
      :url="url"
      title="创建角色"
      :formData="editData"
    ></form-role>
    <form-role
      ref="editDialog"
      :url="url"
      title="修改角色"
      :formData="editData"
    ></form-role>
  </div>
</template>

<script>
import FormRole from "@/views/sys/role/FormRole.vue";
export default {
  data() {
    return {
      url: "/role",
      queryForm: {},
      tableData: [],
      editData: {},
    };
  },
  methods: {
    async fetch() {
      this.handleQueryForm();
    },
    async handleQueryForm() {
      const { data: resp } = await this.$http(
        this.url + "?" + this.$ser(this.queryForm)
      );
      console.log("查询结果", resp);
      this.tableData = resp.data;
    },
    async toCreate() {
      this.$refs["createDialog"].show();
    },
    async handleEdit(index, row) {
      this.editData = row;
      this.$refs["editDialog"].show();
    },
    async handleDelete(index, row) {
      const { data: resp } = await this.$http.delete(this.url + "/" + row._id);
      resp.msg
        ? this.$message.success("删除成功")
        : this.$message.error("删除失败");
      this.fetch();
    },
  },
  created() {
    this.fetch();
  },
  components: { FormRole },
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
