<template>
  <div>
    <el-form>
      <div><CountDown :period="period"></CountDown><el-button type="primary" @click="onSubmit" size="medium">交卷</el-button></div>
      <el-tabs tab-position="left" @tab-click="clickTopic">
        <el-tab-pane v-for="(topic, index) in topicData" :label="'第' + (index + 1) + '题'" :key="index">
          <template v-if="topic.style == 'sselect'">
            <div>单选题：{{ topic.title }}</div>
            <hr />
            <el-radio-group v-model="answer">
              <el-radio v-if="topic.a" :label="topic.a"></el-radio>
              <el-radio v-if="topic.b" :label="topic.b"></el-radio>
              <el-radio v-if="topic.c" :label="topic.c"></el-radio>
              <el-radio v-if="topic.d" :label="topic.d"></el-radio>
            </el-radio-group>
          </template>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
import CountDown from '../../components/CountDown'

export default {
  data() {
    return {
      period: 20,
      topicData: [],
      topic: {},
      answer: ''
    }
  },
  watch: {},
  methods: {
    async fetch() {
      const { data: resp } = await this.$http.get('/examscreen/' + this.$route.params.id)
      this.topicData = resp.data
    },
    async onSubmit() {
      this.sendEvent('end')
      const { data: resp } = await this.$http.post('/examscreen', {})
      if (resp.status != 200) return this.$message.error('交卷失败')
      this.$message.success('成功交卷')
      this.$router.push('/center/examroom/index')
    },
    clickTopic(tab) {
      this.sendEvent('topic', tab.index)
    },
    sendEvent(style, index) {
      this.$http.post('/examscreen/event', { event: style, exam: this.$route.params.id, topic: index })
    }
  },
  components: { CountDown },
  created() {
    this.fetch()
    this.sendEvent('topic', 0)
  }
}
</script>

<style lang="scss" scoped></style>
