<template>
  <div>
    <el-card>
      <el-button @click="reportStu">学生报告</el-button>
      <el-button @click="reportExam">讲师报告</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    reportStu() {
      this.$router.push('/reportStu')
    },
    reportExam() {
      this.$router.push('/reportExam')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  display: flex;
  width: 250px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
