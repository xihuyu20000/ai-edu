<template>
  <el-container>
    <el-aside width="50%">
      <el-tree :data="treedata" node-key="id" default-expand-all :draggable="true" :expand-on-click-node="false" :render-content="renderTreeContent" @node-click="clickTreeLeaf"> </el-tree>
    </el-aside>
    <el-main>
      <div id="editor-main">
        <le-editor v-model="mdvalue" :hljs-css="hljsCss" :image-uploader="imageUploader" @save="saveMD"></le-editor>
        <create-form :config="config" :formFields="formFields" :formData="editData" ref="createDialog"></create-form>
        <edit-form :config="config" :formFields="formFields" ref="editDialog"></edit-form>
      </div>
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
      hljsCss: 'agate',
      mdvalue: '这里放markdown内容',
      imageUploader: {
        custom: false,
        fileType: 'file',
        fileNameType: '',
        imagePrefix: 'http://47.100.125.98', // 图片上传成功后，预览地址前缀
        type: 'server',
        url: 'http://47.100.125.98:82/upload' // 上传接口地址
      },
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
          <span style="margin-left:200px;">
            <el-button size="mini" type="text" on-click={() => this.edit(node, data)}>
              修改
            </el-button>
            <el-button size="mini" type="text" on-click={() => this.remove(node, data)}>
              删除
            </el-button>
            <el-button size="mini" type="text" on-click={() => this.append(data)}>
              添加下级
            </el-button>
          </span>
        </span>
      )
    },
    clickTreeLeaf(item, node, self) {
      if (node.isLeaf) {
        console.log('点击叶子节点', node.isLeaf, item, node, self)
        this.mdvalue = node.label
      }
    },
    edit: function(node, data) {
      console.log('修改节点', node, data)
      this.$bus.$emit(this.$bus.showEditDialog, {})
    },
    remove: async function(node, data) {
      console.log('删除节点', node, data)
      this.$message.success('删除成功')
      // const { data: resp } = await this.$http.delete(this.config.url + '/')
      // console.log('删除', resp)
      // if (resp.data == 1) {
      //   this.$message.success('删除成功')
      //   this.handleQueryForm(this.config.url)
      // } else {
      //   this.$message.error('删除失败')
      // }
    },
    append: function(node, data) {
      console.log('添加下级节点', node, data)
      this.$bus.$emit(this.$bus.showCreateDialog)
    },
    saveMD: function(val) {
      // 获取预览文本
      console.log(this.value) // 这里是原markdown文本
      console.log(val) // 这个是解析出的html
      this.$message.success('保存成功')
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}
#editor-main {
  color: #2c3e50;
  width: 100%;
  height: 90%;
}
</style>
