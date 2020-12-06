<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="data" label="原始分" sortable width="180"> </el-table-column>
    <el-table-column prop="stdscore" label="标准分" sortable width="180"> </el-table-column>
    <el-table-column prop="info" label="评价"> </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          data: '78',
          stdscore: '88',
          name: '张三',
          info: '成绩波动较大'
        },
        {
          data: '56',
          stdscore: '78',
          name: '李四',
          info: '成绩比较稳定，这次考试很差'
        },
        {
          data: '89',
          stdscore: '94',
          name: '王五',
          info: '成绩比较稳定，这次发挥很好'
        },
        {
          data: '91',
          stdscore: '98',
          name: '赵六',
          info: '成绩比较稳定'
        }
      ]
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style></style>
