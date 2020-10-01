<template>
  <div class="data-container">
    <div class="data-box">
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column type="selection" width="55"> </el-table-column>

        <template v-for="(field, index) in tableFields">
          <el-table-column v-if="field.style === 'icon'" :key="index" :label="field.label" :prop="field.field" :width="field.width" :sortable="field.sortable">
            <template slot-scope="scope">
              <i :class="scope.row.icon"></i>
            </template>
          </el-table-column>
          <el-table-column v-else :key="index" :label="field.label" :prop="field.field" :width="field.width" :sortable="field.sortable"> </el-table-column>
        </template>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button type="primary" @click="startExam(scope.$index, scope.row)">开始考试</el-button>
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
      data: {},
      tableFields: [],
      tableData: []
    }
  },
  methods: {
    async fetch() {
      let { data: resp } = await this.$http.get('/examroom/meta')
      if (resp.status != 200)
        return this.$notify.error({
          title: '严重错误',
          message: '没有获取到配置信息'
        })
      this.data = resp
      this.tableFields = resp.data.tableFields

      let { data: resp1 } = await this.$http.get('/examroom')
      console.log('查询结果', resp1)
      this.tableData = resp1.data
    },
    startExam(index, row) {
      console.log('考试考试', index, row)
      this.$router.push('/center/examscreen/index')
    }
  },
  created() {
    this.fetch()
  }
}
</script>

<style lang="scss" scoped></style>
