<template>
  <div id="app">
    <div style="text-align:center;margin-top:20px"><h1>学术搜索，链接你我</h1></div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  background-color: #ddd;
  width: 80%;
  margin: auto;
}
</style>
