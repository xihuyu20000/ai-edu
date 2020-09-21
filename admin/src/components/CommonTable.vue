<template>
  <div class="data-container">
    <div class="query-box">
      <el-form :inline="true" :model="queryForm" class="query-form-inline">
        <el-form-item v-for="(field, index) in queryFields" :key="index">
          <el-input
            v-if="field.style == 'textline'"
            v-model="queryForm[field.field]"
            :placeholder="field.label"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleQueryForm(config.url)"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
      <div class="operate-bar">
        <el-button type="primary" @click="handleCreate">新增</el-button>
      </div>
    </div>
    <div class="data-box">
      <el-table :data="tableData" row-key="id">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          v-for="(field, index) in tableFields"
          :key="index"
          :label="field.label"
          :prop="field.field"
          :width="field.width"
          :sortable="field.sortable"
        >
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
            <slot :row="scope.row"></slot>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import bus from "./bus";
export default {
  props: {
    config: {
      type: Object,
      required: true,
      default: function() {
        return { url: "" };
      },
    },
    queryFields: { type: Array },
    tableFields: { type: Array },
  },
  data() {
    return { queryForm: {}, tableData: [] };
  },
  watch: {},
  methods: {
    async handleQueryForm(url) {
      console.log("查询的url", url);
      const { data: resp } = await this.$http(
        url + "?" + this.$ser(this.queryForm)
      );
      console.log("查询结果", resp);
      this.tableData = resp.data;
    },
    async handleCreate() {
      bus.$emit(bus.showCreateDialog);
    },
    async handleEdit(index, row) {
      bus.$emit(bus.showEditDialog, row);
    },
    async handleDelete(index, row) {
      const { data: resp } = await this.$http.delete(
        this.config.url + "/" + row.id
      );
      console.log("删除", resp);
      if (resp.data == 1) {
        this.$message.success("删除成功");
        this.handleQueryForm(this.config.url);
      } else {
        this.$message.error("删除失败");
      }
    },
  },
  mounted() {
    bus.$on(bus.query, () => {
      console.log("执行查询");
      this.handleQueryForm(this.config.url);
    });
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
