<template>
  <div id="main">
    <el-card class="box-card  center">
      <h1>学生报告</h1>
      本次考试:
      <p class="line">客观题<el-tag size="mini">27</el-tag>分，答错<el-tag size="mini">3</el-tag>题，正确率<el-tag size="mini">27</el-tag>%，超过<el-tag size="mini">27%</el-tag>人。</p>
      <p class="line">最近学习成绩<el-tag size="mini" type="danger">退步</el-tag>，请自我寻找原因，也可以找班主任或者讲师帮忙，希望尽快进步。</p>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
#main {
}
.el-card {
  line-height: 3;
}
.center {
  width: 50%;
  height: 50%;
  position: absolute;
  left: 25%;
  top: 25%;
  transform: transition(-50%, -50%);
}
.line {
  display: block;
  padding-left: 20px;
}
</style>
