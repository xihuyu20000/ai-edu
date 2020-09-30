<template>
  <el-container>
    <el-aside width="200px">
      <el-tree :data="treedata" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false" :render-content="renderTreeContent"> </el-tree>
    </el-aside>
    <el-main>
      <common-table :config="config" :queryFields="queryFields" :tableFields="tableFields" ref="dataTable"> </common-table>
      <create-form :config="config" :formFields="formFields" :formData="editData" ref="createDialog"></create-form>
      <edit-form :config="config" :formFields="formFields" ref="editDialog"></edit-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      require: true
    }
  },
  data() {
    const treedata = [
      {
        id: 1,
        label: '一级 1',
        children: [
          {
            id: 4,
            label: '二级 1-1',
            children: [
              {
                id: 9,
                label: '三级 1-1-1'
              },
              {
                id: 10,
                label: '三级 1-1-2'
              }
            ]
          }
        ]
      },
      {
        id: 2,
        label: '一级 2',
        children: [
          {
            id: 5,
            label: '二级 2-1'
          },
          {
            id: 6,
            label: '二级 2-2'
          }
        ]
      },
      {
        id: 3,
        label: '一级 3',
        children: [
          {
            id: 7,
            label: '二级 3-1'
          },
          {
            id: 8,
            label: '二级 3-2'
          }
        ]
      }
    ]
    return {
      treedata: JSON.parse(JSON.stringify(treedata)),
      config: {},
      formFields: [],
      queryFields: [],
      tableFields: [],
      editData: {}
    }
  },
  watch: {
    data: function(newVal) {
      // console.log("元数据", newVal);
      this.config = newVal.data.config
      this.formFields = newVal.data.formFields
      this.queryFields = newVal.data.queryFields
      this.tableFields = newVal.data.tableFields
      this.$refs.dataTable.handleQueryForm(this.config.url)
    }
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    renderTreeContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button size="mini" type="text" on-click={() => this.append(data)}>
              Append
            </el-button>
            <el-button size="mini" type="text" on-click={() => this.remove(node, data)}>
              Delete
            </el-button>
          </span>
        </span>
      )
    },
    relateRes: function(row) {
      console.log('关联用户', row)
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped></style>
