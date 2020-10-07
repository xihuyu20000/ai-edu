<template>
  <div class="data-container">
    <div class="data-box">
      <el-table :data="tableData" row-key="id" border default-expand-all>
        <el-table-column prop="label" label="名称"></el-table-column>
        <el-table-column prop="until_time" label="时长"></el-table-column>
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
      tableData: []
    }
  },
  methods: {
    async fetch() {
      let { data: resp1 } = await this.$http.get('/examroom')
      console.log('查询结果', resp1)
      this.tableData = resp1.data
    },
    startExam(index, row) {
      console.log('考试考试', index, row)
      this.$router.push('/center/examscreen/index/' + row.id)
    }
  },
  created() {
    this.fetch()
  }
}
</script>

<style lang="scss" scoped></style>
