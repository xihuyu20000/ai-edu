<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    @open="open"
    @close="close"
  >
    <el-form :model="formData" ref="createForm">
      <el-form-item label="角色名称" label-width="100px">
        <el-input v-model="formData.label" autocomplete="off"></el-input>
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
  props: {
    isnew: { type: Boolean, default: false },
    url: { type: String, required: true },
    title: { type: String, required: true },
    formData: { type: Object, required: true },
  },
  data() {
    return {
      dialogFormVisible: false,
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
      this.reset();
      this.dialogFormVisible = false;
    },
    reset() {
      console.log("重置");
      this.$refs["createForm"].resetFields();
    },
    async save() {
      let resp;
      if (this.isnew) {
        const { data: _resp } = await this.$http.post(this.url, this.formData);
        resp = _resp;
      } else {
        const { data: _resp } = await this.$http.put(
          this.url + "/" + this.formData._id,
          this.formData
        );
        resp = _resp;
      }

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
