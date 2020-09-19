<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    @open="open"
    @close="close"
  >
    <el-form :model="form" ref="createForm">
      <el-form-item label="角色名称" label-width="100px">
        <el-input v-model="form.label" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      url: "/role",
      dialogFormVisible: false,
      form: {},
    };
  },
  methods: {
    open() {
      console.log("open");
    },
    show() {
      this.dialogFormVisible = true;
    },
    close() {
      console.log("关闭", this.$refs.createForm.resetFields());
      this.$refs.createForm.resetFields();
      this.dialogFormVisible = false;
    },
    async save() {
      const { data: resp } = await this.$http.post(this.url, this.form);
      if (resp.status != 200) return this.$message.error(resp.msg);
      this.$parent.fetch();
      this.close();
    },
  },
  // beforeRouteEnter(to, from, next) {
  //   console.log("beforeRouteEnter");
  //   next();
  // },
  // beforeRouteUpdate(to, from, next) {
  //   console.log("beforeRouteUpdate");
  //   next();
  // },
  // beforeRouteLeave(to, from, next) {
  //   console.log("beforeRouteLeave");
  //   next();
  // },
};
</script>

<style lang="scss" scoped></style>
