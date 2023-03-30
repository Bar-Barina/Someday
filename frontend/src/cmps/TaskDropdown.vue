<template>
  <section class="task-dropdown">
    <div class="arrow-up-div"></div>
    <div
      v-if="!showEditLabels"
      v-for="(option, idx) in options"
      class="option flex align-center justify-center"
      :class="option.class"
      :key="idx"
      @click.stop="changeOption(option.name)"
    >
      {{ option.name }}
      <span
        v-if="option.name === 'Critical'"
        v-icon="'critical'"
        class="critical-icon"
      ></span>
      <!-- <span v-if="option.name === 'Critical'" class="dropdown-critical flex align-center justify-center">
        <span v-html="getSvg('critical')" class="dropdown-critical-icon"></span>
      </span> -->
    </div>
    <div
      v-if="!showEditLabels"
      class="edit-labels"
      @click.stop="showEditLabels = true"
    >
      <span v-icon="'editLabels'"></span>
      <span>Edit Labels</span>
    </div>
    <!-- EDIT -->
    <div
      v-if="showEditLabels"
      v-for="(option, idx) in options"
      class="option flex editable-div"
      :key="idx"
      contenteditable="true"
      @click.stop
      @focusout="changeOption(option.name)"
    >
      <span
        @click="showColorPicker = !showColorPicker"
        v-icon="'editLabelsColor'"
        class="edit-labels-color"
        :style="{ 'background-color': option.color }"
      ></span>
      {{ option.name }}
    </div>
    <div v-if="showEditLabels" class="edit-labels" @click.stop="saveLabel">
      <span>Apply</span>
    </div>
    <ColorPicker v-if="showColorPicker" class="edit-color-picker" />
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
    return {
      showEditLabels: false,
      showColorPicker: false,
    }
  },
  methods: {
    changeOption(optionName) {
      this.$emit('updateOption', optionName)
    },
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
  },
  computed: {
    labels() {
      return this.$store.getters.labels
    },
  },
  components: {
    ColorPicker,
  },
}
</script>
