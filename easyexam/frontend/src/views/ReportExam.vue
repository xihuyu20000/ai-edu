<template>
  <div id="main">
    <el-row>
      <el-col :span="14" :offset="4">
        <overrall-profile></overrall-profile>
        <chart-1></chart-1>
        <chart-3></chart-3>
        <chart-2></chart-2>
        <el-card class="box-card">
          <el-collapse accordion>
            <el-collapse-item>
              <template slot="title"><h1>学生成绩</h1></template>
              <student-grade></student-grade>
            </el-collapse-item>
            <el-collapse-item>
              <template slot="title"><h1>点评试卷</h1></template>
              <discuss-exam></discuss-exam>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
    </el-row>
    <el-row> <el-col :span="14" :offset="4"> </el-col></el-row>
  </div>
</template>

<script>
import OverrallProfile from './components/OverrallProfile.vue'
import chart1 from './components/chart1.vue'
import chart2 from './components/chart2.vue'
import chart3 from './components/chart3.vue'
import StudentGrade from './components/StudentGrade.vue'
import DiscussExam from './components/DiscussExam.vue'

export default {
  components: { OverrallProfile, chart1, chart2, chart3, StudentGrade, DiscussExam },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.el-card {
  line-height: 3;
  margin-bottom: 10px;
}


</style>
