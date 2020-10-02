<template>
  <el-container>
    <el-header><CountDown></CountDown><el-button type="success" size="medium">交卷</el-button></el-header>
    <el-container>
      <el-aside width="400px">
        <template v-for="(item, index) in tableData">
          <el-button type="primary" :key="index" @click="clickCurrent(item)">{{ index + 1 }}</el-button></template
        >
      </el-aside>
      <el-container>
        <el-main>
          <h1>第{{ topic.showOrder + 1 }}题</h1>
          <h2>{{ topic.title }}</h2>
          <el-form>
            <template v-if="topic.style == 'sselect'">
              <el-radio-group v-model="answer">
                <el-radio :key="index" v-for="(option, index) in topic.options" :label="option"></el-radio>
              </el-radio-group>
            </template>
          </el-form>
        </el-main>
        <el-footer><el-button type="primary" :disabled="disablePrevious" @click="clickPrevious">上一题</el-button><el-button type="primary" :disabled="disableNext" @click="clickNext">下一题</el-button></el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import CountDown from '../../components/CountDown'

export default {
  data() {
    return {
      tableData: [],
      topic: {},
      answer: '',
      disablePrevious: true,
      disableNext: true
    }
  },
  watch: {
    topic: function() {
      if (this.topic.showOrder == 0) {
        this.disablePrevious = true
        this.disableNext = false
      } else if (this.topic.showOrder == this.tableData.length - 1) {
        this.disablePrevious = false
        this.disableNext = true
      } else {
        this.disablePrevious = false
        this.disableNext = false
      }
    }
  },
  methods: {
    async fetch() {
      const { data: resp } = await this.$http.get('/examscreen/meta')
      this.tableData = resp.data.tableData
      this.topic = this.tableData[0]
    },
    clickCurrent(topic) {
      this.topic = topic
    },
    clickPrevious() {
      this.topic = this.tableData[this.topic.showOrder - 1]
    },
    clickNext() {
      this.topic = this.tableData[this.topic.showOrder + 1]
    }
  },
  components: { CountDown },
  created() {
    this.fetch()
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 500px;
}
.el-header {
  background-color: #ccc;
  display: flex;
  justify-content: space-between;
}
.el-aside {
  background-color: #bbb;
  padding: 10px;
}
.el-footer {
  background-color: #fff;
  display: flex;
  justify-content: space-around;
}
</style>
