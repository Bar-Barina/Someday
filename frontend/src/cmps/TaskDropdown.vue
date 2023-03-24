<template>
  <section class="task-dropdown">
    <div class="arrow-up-div"></div>
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

<script>
export default {
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
}
</script>
