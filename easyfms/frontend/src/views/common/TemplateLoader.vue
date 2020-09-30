<template>
  <component v-bind:is="app"></component>
</template>

<script>
// import Vue from 'vue'
import aa from './404'
export default {
  data() {
    return { app: aa }
  },
  methods: {
    async fetch() {
      const { data: resp } = await this.$http.get(`/template/` + this.$route.params.id)
      const aa = import('@/views/common/Login.vue')
      console.log('', resp.data.path, aa)
      // Vue.component('aaa', require('./Login.vue'))
      this.app = 'aaa'
    }
  },
  async mounted() {
    const aa = await import('@/views/common/Login.vue')
    // this.app = aa
    console.log('', aa)
    // const aa = require('@/views/common/Login.vue')
    // console.log('啊啊啊啊啊', aa)
    // this.app = import('./template/A')
    // Vue.component(this.app, require('./Login.vue'))
    // this.fetch()
  }
}
</script>

<style lang="scss" scoped></style>
