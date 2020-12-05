<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
    <el-table-column prop="data" label="分数" sortable width="180"> </el-table-column>
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
          name: '张三',
          info: '成绩波动较大'
        },
        {
          data: '56',
          name: '李四',
          info: '成绩比较稳定，这次考试很差'
        },
        {
          data: '89',
          name: '王五',
          info: '成绩比较稳定，这次发挥很好'
        },
        {
          data: '91',
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
