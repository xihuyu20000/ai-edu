<template>
  <div>
    <el-card class="box-card  center">
      <span>本次是开卷考试，可以翻阅资料，禁止交头接耳、互相讨论！</span>
      <el-button type="primary" class="center" @click="startExam">开始考试</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {},
  methods: {
    startExam() {
      this.$router.push('/exam')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  width: 50%;
  height: 50%;
}
.el-button {
}
.center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
