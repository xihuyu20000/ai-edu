<template>
  <div id="app">
    <el-row>
      <el-col :span="12" :offset="6">
        <el-card class="box-card" shadow="hover">本次考试共计35分钟，35道题</el-card>
        <el-form id="form1" ref="form">
          <el-collapse accordion @change="changeAccordion">
            <el-collapse-item v-for="(ques, index) in questions2" :key="index" :name="ques.qid">
              <template slot="title"> {{ ques.title }}<i :flag="ques.qid" style="color:red" class="header-icon el-icon-warning"></i> </template>
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
            </el-collapse-item>
          </el-collapse>
          <el-card class="box-card" shadow="hover">
            <el-popconfirm confirm-button-text="确定" cancel-button-text="再检查检查" icon="el-icon-info" icon-color="red" title="确定交卷吗？" @confirm="submitExam">
              <el-button type="primary" slot="reference">提交试卷</el-button>
            </el-popconfirm>
          </el-card>
        </el-form>

        <count-down :minutes_timeout="minutes_timeout"></count-down>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import $ from 'jquery'
import CountDown from '../components/CountDown.vue'
export default {
  components: { CountDown },
  data() {
    return {
      minutes_timeout: 10,
      questionArray
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
  computed: {},
  methods: {
    changeAccordion(p) {
      // 打开一个面板时，传入qid；关闭时，传入为空
      if (p) {
        console.log('当前面包', p)
      }
    },
    handleChange() {
      $.each(this.questions2, function(index, ques) {
        let jqs = $('input[name=' + ques.qid + ']:checked').val()
        if (jqs != undefined) {
          $('i[flag=' + ques.qid + ']').hide()
        } else {
          $('i[flag=' + ques.qid + ']').show()
        }
      })
    },
    submitExam() {
      let form = {}
      $.each(this.questions2, function(index, ques) {
        let n = ques.qid
        let v = Array()
        $('input[name=' + n + ']:checked').each(function() {
          v.push($(this).val())
        })
        v = v.join(',')
        form[n] = v
      })
      console.log(form)
      this.$router.push('/result')
      window.location.reload()
    },
    addMinutes(date, minutes) {
      const copy = new Date(Number(date))
      copy.setDate(date.getDate() + minutes)
      return copy
    }
  }
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
