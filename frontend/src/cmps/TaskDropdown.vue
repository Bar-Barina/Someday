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
      class="option flex"
      :key="idx"
      @click.stop
    >
      <!-- COLOR -->
      <span
        @click="toggleColorPicker(option)"
        v-icon="'editLabelsColor'"
        class="edit-labels-color"
        :style="{ 'background-color': option.color }"
      ></span>
      <span
        class="editable-div"
        contenteditable="true"
        ref="editableLabel"
        @focusout="updateLabelName(idx)"
        >{{ option.name }}</span
      >
    </div>
    <ColorPicker
      v-if="showColorPicker"
      class="edit-color-picker"
      @updateColor="updateLabelColor"
    />
    <!-- ADD -->
    <div
      v-if="showEditLabels"
      class="flex align-center editable-div new-label"
      @click.stop="addLabel"
    >
      <span v-icon="'editLabelsPlus'" class="edit-plus"></span>
      <span>New label</span>
    </div>
    <div v-if="showEditLabels" class="edit-labels">
      <span @click="showEditLabels = false">Apply</span>
    </div>
  </section>
</template>

<script>
import { svgService } from '../services/svg.service.js'
import { utilService } from '../services/util.service.js'
import ColorPicker from '../cmps/dynamicCmps/ColorPicker.vue'
export default {
  emits: ['updateOptions', 'updateOption'],
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
      this.$emit('updateOption', optionName)
    },
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
    toggleColorPicker(option) {
      this.currOption = { ...option }
      this.showColorPicker = !this.showColorPicker
    },
    updateLabelColor({ data }) {
      const updatedOptions = JSON.parse(JSON.stringify(this.options))
      const optionIdx = updatedOptions[this.type].findIndex(
        (opt) => opt.id === this.currOption.id
      )
      this.currOption.color = data
      updatedOptions[this.type].splice(optionIdx, 1, this.currOption)
      this.$emit('updateOptions', { updatedOptions })
    },
    updateLabelName(idx) {
      const updatedOptions = JSON.parse(JSON.stringify(this.options))
      const option = updatedOptions[this.type][idx]
      option.name = this.$refs.editableLabel[idx].innerText
      updatedOptions[this.type].splice(idx, 1, option)
      this.$emit('updateOptions', { updatedOptions, idx, type: this.type })
    },
    addLabel() {
      const updatedOptions = JSON.parse(JSON.stringify(this.options))
      const newLabel = {
        id: utilService.makeId(),
        name: utilService.getRandomStatus(),
        color: utilService.getRandomColor(),
      }
      updatedOptions[this.type].push(newLabel)
      this.$emit('updateOptions', { updatedOptions, type: this.type })
    },
  },
  components: {
    ColorPicker,
  },
}
</script>
