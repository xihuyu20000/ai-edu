<template>
  <el-dialog
    :title="config.createTitle"
    :visible.sync="dialogFormVisible"
    @open="open"
    @close="close"
  >
    <el-form :model="formData" ref="form1" :rules="rules">
      <el-form-item
        v-for="(field, index) in formFields"
        :label="field.label"
        :label-width="field.width"
        :key="index"
        :prop="field.field"
      >
        <el-input
          v-if="field.style == 'textline'"
          v-model="formData[field.field]"
          autocomplete="off"
        ></el-input>
        <el-select
          v-if="field.style == 'selectlist'"
          v-model="formData[field.field]"
          :value="field.value"
          :placeholder="field.tip"
        >
          <el-option
            v-for="item in field.options.values"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-radio-group
          v-if="field.style == 'radio'"
          v-model="formData[field.field]"
        >
          <el-radio
            v-for="item in field.options.values"
            :key="item"
            :label="item"
          ></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">保 存</el-button>
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
      rules: {},
    };
  },
  watch: {
    formFields: function(newVal) {
      let _this = this;
      newVal.forEach(function(field) {
        _this.rules[field.field] = field.rule;
      });
    },
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
      this.$refs["form1"].resetFields();
    },
    async save() {
      this.$refs["form1"].validate(async (valid) => {
        if (!valid) return false;

        const { data: resp } = await this.$http.post(
          this.config.url,
          this.formData
        );
        if (resp.status === 200) {
          this.$emit(bus.query);
          this.close();
        } else {
          return this.$message.error(resp.msg);
        }
      });
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
