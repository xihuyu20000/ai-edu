<template>
  <el-select
    v-if="field.style == 'selectlist'"
    v-model="formData[field.field]"
    :value="field.value"
    :placeholder="field.tip"
    :multiple="field.multiple"
  >
    <el-option
      v-for="item in field.options.values"
      :key="item.id"
      :label="item.label"
      :value="item.id"
    >
    </el-option>
  </el-select>
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
      }
    }
  },
  setup() {
    return {};
  }
};
</script>

<style lang="scss" scoped></style>
