<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  methods: {
    fetch() {
      setInterval(async () => {
        const { data: resp } = await this.$http.get("/token");
        if (resp.status == 200) {
          sessionStorage.setItem("token", resp.token);
        }
        console.log("定时5秒", resp);
      }, 5000 * 20 * 30);
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style>
#app {
}
</style>
