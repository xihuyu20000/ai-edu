<template>
  <el-dialog
    :title="config.createTitle"
    :visible.sync="dialogFormVisible"
    @open="open"
    @close="close"
  >
    <el-form :model="formData" ref="createForm">
      <el-form-item
        v-for="(field, index) in formFields"
        :label="field.label"
        :label-width="field.width"
        :key="index"
      >
        <el-input v-model="formData[field.field]" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import bus from "./bus";
export default {
  props: {
    config: {
      type: Object,
      required: true,
      default: function() {
        return { url: "", createTitle: "", editTitle: "" };
      },
    },
    formFields: { type: Array },
  },
  data() {
    return {
      title: "",
      dialogFormVisible: false,
      formData: { type: Object, required: true },
    };
  },
  watch: {},
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
        const { data: _resp } = await this.$http.post(
          this.config.url,
          this.formData
        );
        resp = _resp;
      } else {
        const { data: _resp } = await this.$http.put(
          this.config.url + "/" + this.formData._id,
          this.formData
        );
        resp = _resp;
      }

      if (resp.status != 200) return this.$message.error(resp.msg);
      this.$parent.fetch();
      this.close();
    },
  },
  mounted() {
    bus.$on(bus.showCreateDialog, () => (this.dialogFormVisible = true));
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
