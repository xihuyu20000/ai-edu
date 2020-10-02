<template>
  <el-container>
    <el-aside :width="treeExpandable ? '400px' : '50px'">
      <el-button-group>
        <el-button type="primary" size="medium" :icon="treeExpandable ? 'el-icon-arrow-left' : 'el-icon-arrow-right'" @click="toggleTree" style="width:50px"></el-button>
        <el-tooltip class="item" effect="dark" content="添加下级" placement="right">
          <el-button type="primary" size="medium" style="width:50px" @click="formDialog = true">+</el-button>
        </el-tooltip>
      </el-button-group>
      <el-tree :data="treedata" node-key="id" default-expand-all :draggable="true" :expand-on-click-node="false" @node-click="clickTreeLeaf">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button type="text" size="mini" @click="() => edit(node, data)">
              修改
            </el-button>
            <el-button type="text" size="mini" @click="() => remove(node, data)">
              删除
            </el-button>
            <el-button type="text" size="mini" @click="() => append(node, data)">
              添加下级
            </el-button>
          </span>
        </span>
      </el-tree>
      <el-dialog title="添加目录" :visible="formDialog" @open="openDialog" @close="closeDialog">
        <el-form :model="formData" ref="form1">
          <el-form-item label="名称">
            <el-input v-model="formData.label"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="saveDialog">保 存</el-button>
        </div>
      </el-dialog>
    </el-aside>
    <el-main>
      <div id="editor-main">
        <le-editor v-model="mdvalue" :hljs-css="hljsCss" :image-uploader="imageUploader" @save="saveMD"></le-editor>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      treeExpandable: true,
      treedata: [],
      formDialog: false,
      formData: {},
      rules: [{ label: [{ required: true, message: '名称', trigger: 'blur' }] }],
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
    toggleTree() {
      this.treeExpandable = !this.treeExpandable
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
    },
    append: function(node, data) {
      console.log('添加下级节点', node, data)
      this.$bus.$emit(this.$bus.showCreateDialog)
    },
    openDialog: function() {},
    closeDialog: function() {
      this.formDialog = false
    },
    saveDialog: function() {
      this.formDialog = false
    },
    saveMD: function(val) {
      // 获取预览文本
      console.log(this.value) // 这里是原markdown文本
      console.log(val) // 这个是解析出的html
      this.$message.success('保存成功')
    },
    onMouseoverEnvDelBtn: function(event) {
      event.target.parentElement.querySelector('.env-del-btn-span').style.cssText += 'display:block'
    },
    onMouseleaveEnvDelBtn: function(event) {
      event.target.parentElement.querySelector('.env-del-btn-span').style.cssText += 'display:none'
    },
    fetch: async function() {
      const { data: resp } = await this.$http.get('/material_category')
      this.treedata = JSON.parse(JSON.stringify(resp.data))
      console.log('分类', resp)
    }
  },
  created() {
    this.fetch()
  }
}
</script>

<style lang="scss" scoped>
.el-aside {
  margin-right: 10px;
  .tree-node {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    .node-bar {
      margin-left: 20px;
    }
  }
}

.el-main {
  padding: 0;
}
#editor-main {
  color: #2c3e50;
  width: 100%;
  height: 90%;
}
</style>
