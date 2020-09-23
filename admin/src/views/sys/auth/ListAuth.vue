<template>
  <dt2 :treedata="treedata" :data="data"></dt2>
</template>

<script>
export default {
  data() {
    return {
      treedata: [],
      data: {}
    }
  },
  methods: {
    async fetch() {
      const { data: resp } = await this.$http.get('/meta/table/600')
      console.log('授权配置信息', resp)
      this.data = resp
    }
  },
  created() {
    this.fetch()
  }
}
</script>

<style lang="scss" scoped></style>
