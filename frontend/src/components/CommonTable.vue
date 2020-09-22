<template>
  <div class="data-container">
    <div class="query-box">
      <el-form
        v-if="queryFields.length > 0"
        :inline="true"
        :model="queryForm"
        class="query-form-inline"
      >
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
      <div class="operator-bar">
        <slot name="header"></slot>
      </div>
      <div class="operate-bar">
        <el-button type="primary" @click="handleCreate">新增</el-button>
      </div>
    </div>
    <div class="data-box">
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column type="selection" width="55"> </el-table-column>

        <template v-for="(field, index) in tableFields">
          <el-table-column
            v-if="field.style === 'icon'"
            :key="index"
            :label="field.label"
            :prop="field.field"
            :width="field.width"
            :sortable="field.sortable"
          >
            <template slot-scope="scope">
              <i :class="scope.row.icon"></i>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :key="index"
            :label="field.label"
            :prop="field.field"
            :width="field.width"
            :sortable="field.sortable"
          >
          </el-table-column>
        </template>
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
            <slot name="row" :row="scope.row"></slot>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      required: true,
      default: function() {
        return { url: '' }
      }
    },
    queryFields: { type: Array },
    tableFields: { type: Array }
  },
  data() {
    return { queryForm: {}, tableData: [] }
  },
  watch: {},
  methods: {
    async handleQueryForm(url) {
      console.log('查询的url', url)
      const { data: resp } = await this.$http(
        url + '?' + this.$ser(this.queryForm)
      )
      console.log('查询结果', resp)
      this.tableData = resp.data
    },
    async handleCreate() {
      this.$bus.$emit(this.$bus.showCreateDialog)
    },
    async handleEdit(index, row) {
      this.$bus.$emit(this.$bus.showEditDialog, row)
    },
    async handleDelete(index, row) {
      const { data: resp } = await this.$http.delete(
        this.config.url + '/' + row.id
      )
      console.log('删除', resp)
      if (resp.data == 1) {
        this.$message.success('删除成功')
        this.handleQueryForm(this.config.url)
      } else {
        this.$message.error('删除失败')
      }
    }
  },
  mounted() {
    this.$bus.$on(this.$bus.loadData, () => {
      console.log('回调，执行查询')
      this.handleQueryForm(this.config.url)
    })
  }
}
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
