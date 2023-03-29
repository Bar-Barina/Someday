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
      <span v-if="option.name === 'Critical'" class="dropdown-critical">
        <span v-html="getSvg('critical')" class="dropdown-critical-icon"></span>
      </span>
    </div>
  </section>
</template>

<script>
import { svgService } from '../services/svg.service.js'
import ColorPicker from '../cmps/dynamicCmps/ColorPicker.vue'
export default {
  props: {
    options: Array,
  },
  data() {
    return {}
  },
  methods: {
    changeOption(optionName) {
      this.$emit('updateOption', optionName)
    },
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
  },
  components : {
    ColorPicker
  }
}
</script>
