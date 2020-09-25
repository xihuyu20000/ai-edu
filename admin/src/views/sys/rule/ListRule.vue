<template>
  <div style="height:auto">
    <el-form :inline="true" :model="formData" ref="form1" :rules="rules">
      <el-form-item
        v-for="(field, index) in formFields"
        :label="field.label"
        :label-width="field.width"
        :key="index"
        :prop="field.field"
      >
        <form-textline :formData="formData" :field="field" />
        <form-textarea :formData="formData" :field="field" />
        <form-select-list :formData="formData" :field="field" />
        <form-select-tree :formData="formData" :field="field" />
        <form-radio :formData="formData" :field="field" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveForm">保 存</el-button>
      </el-form-item>
    </el-form>

    <vxe-grid ref="xTable" v-bind="gridOptions" :data="tableData">
      <vxe-table-column type="seq" width="60" />
      <vxe-table-column
        v-for="(item, index) in tableFields"
        :field="item.field"
        :title="item.label"
        :key="index"
      />
      <vxe-table-column title="操作" width="160">
        <template v-slot="{ row }"
          ><vxe-button type="primary" @click="editRowEvent(row)"
            >编辑</vxe-button
          >
          <vxe-button
            status="danger"
            icon="fa fa-trash-o"
            @click="removeRowEvent(row)"
            >删除</vxe-button
          >
        </template>
      </vxe-table-column>
    </vxe-grid>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {},
      config: {},
      formFields: [],
      formData: {},
      rules: {},
      tableFields: [],
      tableData: [],
      gridOptions: {
        border: true,
        resizable: true,
        showHeaderOverflow: true,
        showOverflow: true,
        highlightHoverRow: true,
        keepSource: true,
        id: 'full_edit_1',
        height: 600,
        rowId: 'id',
        editConfig: {
          trigger: 'click',
          mode: 'row',
          showStatus: true
        }
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    async saveForm() {
      console.log('传递表单', this.formData)
      const { data: resp } = await this.$http.patch(
        this.config.url,
        this.formData
      )
      if (resp.status != 200)
        return this.$notify.error({
          title: '严重错误',
          message: resp.msg
        })
      this.$refs.form1.resetFields()
      this.fetch()
    },
    editRowEvent(row) {
      this.formData = Object.assign({}, row)
    },
    removeRowEvent(row) {
      this.$XModal.confirm('您确定要删除该数据?').then(async type => {
        if (type === 'confirm') {
          this.$refs.xTable.remove(row)
          await this.$http.delete(this.config.url + '/' + row.id)
        }
      })
    },
    async fetch() {
      const { data: resp } = await this.$http.get('/meta/table/rule')
      if (resp.status != 200)
        return this.$notify.error({
          title: '严重错误',
          message: '没有获取到配置信息'
        })
      this.data = resp
      this.config = this.data.data.config
      this.formFields = this.data.data.formFields
      this.tableFields = this.data.data.tableFields

      const { data: resp1 } = await this.$http.get(this.config.url)
      this.tableData = resp1.data
    }
  },
  created() {
    this.fetch()
  }
}
</script>

<style lang="scss" scoped>
.my-list {
  border: 1px solid #e8eaec;
}
.my-list .my-list-item {
  height: 28px;
  padding-left: 15px;
}
</style>
