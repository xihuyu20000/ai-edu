<template>
  <data-template1 :data="data"></data-template1>
</template>

<script>
import DataTemplate1 from "@/components/DataTemplate1.vue";
export default {
  data() {
    return {
      data: {},
    };
  },
  methods: {
    async fetch() {
      const { data: resp } = await this.$http.get("/meta/table/100");
      this.data = resp;
    },
  },
  created() {
    this.fetch();
  },
  components: { DataTemplate1 },
};
</script>

<style lang="scss" scoped></style>
