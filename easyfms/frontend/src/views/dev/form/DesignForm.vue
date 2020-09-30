<template>
  <div style="height:auto">
    <el-form :inline="true" :model="formData" ref="form1" :rules="rules">
      <el-form-item v-for="(field, index) in formFields" :label="field.label" :label-width="field.width" :key="index" :prop="field.field">
        <form-textline :formData="formData" :field="field" />
        <form-textarea :formData="formData" :field="field" />
        <form-select-list :formData="formData" :field="field" />
        <form-select-tree :formData="formData" :field="field" />
        <form-radio :formData="formData" :field="field" />
      </el-form-item>
      <el-form-item><el-button type="primary" @click="saveForm">保 存</el-button> </el-form-item>
    </el-form>
    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button icon="fa fa-plus" @click="insertEvent()">新增</vxe-button>
      </template>
    </vxe-toolbar>
    <vxe-grid ref="xGrid" v-bind="gridOptions">
      <vxe-table-column type="checkbox" title="#" fixed="left" width="120" />
      <vxe-table-column type="seq" title="序号" fixed="left" width="120" />
      <vxe-table-column field="field_name" title="字段名" />
      <vxe-table-column field="field_label" title="显示名" />
      <vxe-table-column field="control_style" title="控件类型" />
      <vxe-table-column field="valid_rules" title="校验规则" />
      <vxe-table-column title="操作" width="100" show-overflow>
        <template v-slot="{ row }">
          <vxe-button type="text" icon="fa fa-edit" @click="editEvent(row)"></vxe-button>
          <vxe-button type="text" icon="fa fa-trash-o" @click="removeEvent(row)"></vxe-button>
        </template>
      </vxe-table-column>
    </vxe-grid>
    <vxe-modal v-model="showEdit" :title="selectRow ? '编辑&保存' : '新增&保存'" width="800" min-width="600" min-height="300" :loading="submitLoading" resize destroy-on-close>
      <template v-slot>
        <vxe-form :data="formData" :items="subFormItems" :rules="subFormRules" title-align="right" title-width="100" @submit="submitEvent"></vxe-form>
      </template>
    </vxe-modal>
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
      gridOptions: {
        border: true,
        resizable: true,
        showHeaderOverflow: true,
        showOverflow: true,
        highlightHoverRow: true,
        keepSource: true,
        height: 600,
        rowId: 'id'
      },
      submitLoading: false,
      showEdit: false,
      selectRow: null,
      subFormItems: [
        {
          field: 'field_name',
          title: '字段名',
          span: 12,
          itemRender: { name: '$input', props: { placeholder: '请输入字段名' } }
        },
        {
          field: 'field_label',
          title: '显示名',
          span: 12,
          itemRender: { name: '$input', props: { placeholder: '请输入显示名' } }
        },
        {
          field: 'control_style',
          title: '控件类型',
          span: 12,
          itemRender: {
            name: '$select',
            options: [],
            props: { placeholder: '请选择控件类型' }
          }
        },
        {
          field: 'valid_rules',
          title: '校验规则',
          span: 12,
          itemRender: {
            name: '$input',
            props: { placeholder: '请选择校验规则' }
          }
        },
        {
          align: 'center',
          span: 24,
          titleAlign: 'left',
          itemRender: {
            name: '$buttons',
            children: [{ props: { type: 'submit', content: '提交', status: 'primary' } }, { props: { type: 'reset', content: '重置' } }]
          }
        }
      ],
      subFormRules: {
        field_name: [{ required: true, message: '请输入名称' }],
        field_label: [{ required: true, message: '请输入昵称' }],
        control_style: [{ required: true, message: '请输入名称' }],
        valid_rules: [{ required: true, message: '请输入昵称' }]
      }
    }
  },
  computed: {},
  methods: {
    insertEvent() {
      this.formData = {
        name: '',
        nickname: '',
        role: '',
        sex: '',
        age: '',
        num: '',
        checkedList: [],
        flag1: '',
        date3: '',
        address: ''
      }
      this.selectRow = null
      this.showEdit = true
    },
    editEvent(row) {
      console.log('编辑', row)
      // this.formData = {
      //   name: row.name,
      //   nickname: row.nickname,
      //   role: row.role,
      //   sex: row.sex,
      //   age: row.age,
      //   num: row.num,
      //   checkedList: row.checkedList,
      //   flag1: row.flag1,
      //   date3: row.date3,
      //   address: row.address
      // }
      // this.selectRow = row
      // this.showEdit = true
    },
    removeEvent(row) {
      this.$XModal.confirm('您确定要删除该数据?').then(type => {
        if (type === 'confirm') {
          this.$refs.xTable.remove(row)
        }
      })
    },
    submitEvent() {
      this.submitLoading = true
      setTimeout(() => {
        this.submitLoading = false
        this.showEdit = false
        if (this.selectRow) {
          this.$XModal.message({ message: '保存成功', status: 'success' })
          Object.assign(this.selectRow, this.formData)
        } else {
          this.$XModal.message({ message: '新增成功', status: 'success' })
          this.$refs.xTable.insert(this.formData)
        }
      }, 500)
    },
    async saveForm() {
      let _formData = this.formData
      let _tableData = this.$refs.xGrid.getTableData()
      _formData.tableData = _tableData['tableData']
      console.log('表达拿数据', _formData)
      const { data: resp } = await this.$http.post('/designform', _formData)
      console.log('保存结果', resp)
    },
    async fetch() {
      const { data: resp } = await this.$http.get('/meta/table/designform')
      if (resp.status != 200)
        return this.$notify.error({
          title: '严重错误',
          message: '没有获取到配置信息'
        })
      this.data = resp
      this.config = this.data.data.config
      this.formFields = this.data.data.formFields
    }
  },
  created() {
    this.fetch()
  }
}
</script>

<style lang="scss" scoped></style>
