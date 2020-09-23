<template>
  <dt1 :data="data"></dt1>
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
      const { data: resp } = await this.$http.get(
        `/meta/table/` + this.$route.params.id
      )
      this.data = resp
    }
  },
  created() {
    this.fetch()
  }
}
</script>

<style lang="scss" scoped></style>
