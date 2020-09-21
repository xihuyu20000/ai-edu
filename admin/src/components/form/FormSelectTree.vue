<template>
  <treeselect
    v-if="field.style == 'selecttree'"
    v-model="formData[field.field]"
    :multiple="false"
    :options="field.options.values"
  />
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
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
  data() {
    return {};
  },
  components: { Treeselect },
};
</script>

<style lang="scss" scoped></style>
