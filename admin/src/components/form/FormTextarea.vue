<template>
  <el-input
    v-if="field.style == 'textarea'"
    type="textarea"
    v-model="formData[field.field]"
  ></el-input>
</template>

<script>
export default {
  props: {
    formData: { type: Object, required: true },
    field: {
      type: Object,
      required: true,
      default: function() {
        return {};
      },
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
