<template>
  <div class="sub2 flex align-center">
    <input
      @click.stop
      type="checkbox"
      :ref="col"
      :checked="isChecked"
      @change="addColumn"
    />
    <span>{{ col }}</span>
  </div>
  <span class="svg" v-icon="col"></span>
</template>

<script>
export default {
  emits: ["addCol", "removeCol"],
  props: {
    col: String,
  },
  methods: {
    addColumn() {
      if (!this.isChecked) this.$emit("addCol", this.col);
      else this.$emit("removeCol", this.col);
    },
  },
  computed: {
    isChecked() {
      const labelsOrder = this.$store.getters.currLabelsOrder;
      if (labelsOrder.includes(this.col)) return true;
      return false;
    },
  },
};
</script>