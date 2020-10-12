<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <div>
      <el-tabs tab-position="left" style="height: 600px;">
        <el-tab-pane
          v-for="(topic, index) in topics"
          :label="'第' + index + '题'"
          :key="index"
        >
          {{ topic.title }}
          <br />
          <el-radio-group v-model="answer">
            <el-radio
              v-for="(option, index) in topic.options"
              :key="index"
              :label="option"
              >{{ option }}</el-radio
            >
            <el-radio :label="6">备选项</el-radio>
            <el-radio :label="9">备选项</el-radio>
          </el-radio-group>
        </el-tab-pane>
      </el-tabs>
      <el-button>el-button</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return { topics: [], answer: "" };
  },
  methods: {
    change: function() {},
  },
  components: {},
  mounted: async function() {
    // eslint-disable-next-line no-undef
    // this.topics = await eel.topics()();
    const { data: resp } = await this.$http.get("/topics");
    this.topics = JSON.parse(resp.data);
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
