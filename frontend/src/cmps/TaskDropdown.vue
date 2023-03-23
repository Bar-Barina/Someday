<template>
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
