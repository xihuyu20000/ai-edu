<template>
  <div>
    {{ data }}
    <div>篇名：{{ data.title }}</div>
    <div>作者：{{ data.authors }}</div>
    <div>单位：{{ data.orgs }}</div>
    <div>摘要：{{ data.abstract }}</div>
    <div>关键词：{{ data.kws }}</div>
    <div>POI：{{ data.doi }}</div>
    <div>下载全文：{{ data.pdf_url }}</div>
    <div>正文:{{ data.content }}</div>
    <div v-html="data.refs">引文：</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {}
    }
  },
  methods: {
    async fetch() {
      const { data: resp } = await this.$http.get('/article/' + this.$route.params.id)
      this.data = resp.data
    }
  },
  created() {
    this.fetch()
  }
}
</script>

<style lang="scss" scoped></style>
