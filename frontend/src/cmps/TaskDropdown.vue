<template>
  <section class="task-dropdown">
    <div class="arrow-up-div"></div>
    <div
      v-if="!showEditLabels"
      v-for="(option, idx) in options[type]"
      class="option flex align-center justify-center"
      :style="{ 'background-color': option.color }"
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
      v-for="(option, idx) in options[type]"
      class="option flex editable-div"
      :key="idx"
      contenteditable="true"
      @click.stop
      ref="`editableLabel + ${idx}`"
      @focusout=""
    >
      <!-- COLOR -->
      <span
        @click="toggleColorPicker(option, idx)"
        v-icon="'editLabelsColor'"
        class="edit-labels-color"
        :style="{ 'background-color': option.color }"
      ></span>
      {{ option.name }}
    </div>
    <ColorPicker
      v-if="showColorPicker"
      class="edit-color-picker"
      @updateColor="updateLabelColor"
    />
    <div v-if="showEditLabels" class="edit-labels">
      <span @click="showEditLabels = false">Apply</span>
    </div>
  </section>
</template>

<script>
import { svgService } from '../services/svg.service.js'
import ColorPicker from '../cmps/dynamicCmps/ColorPicker.vue'
export default {
  props: {
    options: Object,
    type: String,
  },
  data() {
    return {
      showEditLabels: false,
      showColorPicker: false,
      currOption: {},
    }
  },
  methods: {
    changeOption(optionName) {
      console.log('optionName', optionName)
      this.$emit('updateOption', optionName)
    },
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
    updateLabelColor({ data }) {
      const updatedOptions = JSON.parse(JSON.stringify(this.options))
      this.currOption.option.color = data
      updatedOptions[this.type].splice(this.currOption.idx,1,this.currOption)
      this.$emit('updateOptions',updatedOptions)
    },
    toggleColorPicker(option,idx) {
      this.currOption = { option:{...option}, idx }
      console.log('this.currOption',this.currOption)
      this.showColorPicker = !this.showColorPicker
    },
  },
  components: {
    ColorPicker,
  },
}
</script>
