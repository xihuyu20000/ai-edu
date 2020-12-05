<template>
  <el-card class="box-card">
    <div style="display:flex;align-items: center;justify-content: space-between;">
      <h1>考试分析</h1>
      <h3><el-button type="success" round>2020-11-20</el-button></h3>
    </div>

    <el-badge :value="12" class="item" type="primary">
      <el-button size="small">参考</el-button>
    </el-badge>
    <el-badge :value="3" class="item">
      <el-button size="small">缺考</el-button>
    </el-badge>
    <el-badge :value="98" class="item" type="warning">
      <el-button size="small">最高分</el-button>
    </el-badge>
    <el-badge :value="38" class="item" type="danger">
      <el-button size="small">最低分</el-button>
    </el-badge>
    <el-badge :value="84" class="item" type="info">
      <el-button size="small">平均分</el-button>
    </el-badge>
    <el-divider></el-divider>
    <el-badge :value="0.6" class="item" type="primary">
      <el-button size="small">难度</el-button>
    </el-badge>
    <el-badge :value="28" class="item" type="success">
      <el-button size="small">优秀率</el-button>
    </el-badge>
    <el-badge :value="38" class="item" type="success">
      <el-button size="small">及格率</el-button>
    </el-badge>
    <el-badge :value="0.6" class="item" type="info">
      <el-button size="small">标准差</el-button>
    </el-badge>
    <el-divider></el-divider>
    <el-alert title="综评：本次考试标准差较大，及格率较低，部分知识点掌握不好" type="error" effect="dark" :closable="false"> </el-alert>
  </el-card>
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

<style lang="scss" scoped>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
