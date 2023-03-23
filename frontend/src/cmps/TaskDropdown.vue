<template>
  <Popper>
    <template #content>
  <section class="task-dropdown">
    <div
      v-for="(option, idx) in options"
      class="option"
      :class="option.class"
      :key="idx"
      @click.stop="changeOption(option.name)"
    >
      {{ option.name }}
    </div>
  </section>
</template>
</Popper>
</template>

<script>
import { popper } from "@popperjs/core";
import Popper from "vue3-popper";
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    options: Array,
  },
  name: '',
  data() {
    return {}
  },
  methods: {
    changeOption(optionName) {
      this.$emit('updateOption', optionName)
    },
  },
  components: {
    Popper,
    popper
  },
});
</script>
