<template>
  <div id="app">
    <el-collapse accordion @change="changeAccordion">
      <el-collapse-item v-for="(ques, index) in questions2" :key="index" :name="ques.qid">
        <template slot="title"> {{ ques.title }}</template>
        <div class="topic">{{ ques.topic }}</div>
        <ul>
          <template v-if="ques.qtype == '单选'">
            <template v-for="(option, index) in ques.options"
              ><ol :key="index + 10000">
                <input type="radio" :name="ques.qid" :value="option.value" :key="index" @click="handleChange" />{{
                  option.label
                }}
              </ol></template
            > </template
          ><template v-if="ques.qtype == '多选'">
            <template v-for="(option, index) in ques.options"
              ><ol :key="index + 10000">
                <input type="checkbox" :name="ques.qid" :value="option.value" :key="index" @click="handleChange" />{{
                  option.label
                }}
              </ol></template
            >
          </template>
        </ul>
        <el-alert title="正确答案：" type="warning" effect="dark" :closable="false"> </el-alert>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
var questionArray = [
  {
    qid: 'ques1',
    qtype: '单选',
    score: 5,
    topic: '我的单选题目是什么',
    options: [
      { value: 11, label: '选项1' },
      { value: 12, label: '选项2' },
      { value: 13, label: '选项3' }
    ]
  },
  {
    qid: 'ques2',
    qtype: '单选',
    score: 5,
    topic: '我的单选题目是什么',
    options: [
      { value: 11, label: '选项1' },
      { value: 12, label: '选项2' },
      { value: 13, label: '选项3' }
    ]
  },
  {
    qid: 'ques3',
    qtype: '多选',
    score: 15,
    topic: '我的多选题目是什么',
    options: [
      { value: 21, label: '选项1' },
      { value: 22, label: '选项2' },
      { value: 23, label: '选项3' }
    ]
  },
  {
    qid: 'ques4',
    qtype: '单选',
    score: 5,
    topic: '我的单选题目是什么',
    options: [
      { value: 11, label: '选项1' },
      { value: 12, label: '选项2' },
      { value: 13, label: '选项3' }
    ]
  },
  {
    qid: 'ques5',
    qtype: '单选',
    score: 5,
    topic: '我的单选题目是什么',
    options: [
      { value: 11, label: '选项1' },
      { value: 12, label: '选项2' },
      { value: 13, label: '选项3' }
    ]
  },
  {
    qid: 'ques6',
    qtype: '多选',
    score: 15,
    topic: '我的多选题目是什么',
    options: [
      { value: 21, label: '选项1' },
      { value: 22, label: '选项2' },
      { value: 23, label: '选项3' }
    ]
  },
  {
    qid: 'ques7',
    qtype: '单选',
    score: 5,
    topic: '我的单选题目是什么',
    options: [
      { value: 11, label: '选项1' },
      { value: 12, label: '选项2' },
      { value: 13, label: '选项3' }
    ]
  },
  {
    qid: 'ques8',
    qtype: '单选',
    score: 5,
    topic: '我的单选题目是什么',
    options: [
      { value: 11, label: '选项1' },
      { value: 12, label: '选项2' },
      { value: 13, label: '选项3' }
    ]
  },
  {
    qid: 'ques9',
    qtype: '多选',
    score: 15,
    topic: '我的多选题目是什么',
    options: [
      { value: 21, label: '选项1' },
      { value: 22, label: '选项2' },
      { value: 23, label: '选项3' }
    ]
  },
  {
    qid: 'ques10',
    qtype: '多选',
    score: 15,
    topic: '我的多选题目是什么',
    options: [
      { value: 21, label: '选项1' },
      { value: 22, label: '选项2' },
      { value: 23, label: '选项3' }
    ]
  }
]
export default {
  data() {
    return {
      questions: questionArray,
      questions2: []
    }
  },
  created() {
    this.questions = this.questions2 = this.questions.map((val, index) => {
      val.undone = true
      val.title = '第' + (index + 1) + '题  ' + val.qtype + '  ' + val.score + '分'
      return val
    })
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.el-collapse-item {
  text-align: left;
  .topic {
    font-size: 1.5em;
  }

  ul {
    margin: 0;
  }
  ol {
    display: block;
    padding-left: 0;
    padding-top: 10px;
  }
}
</style>
