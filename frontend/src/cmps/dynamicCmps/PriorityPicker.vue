<template>
  <div
    class="priority full-cell flex align-center justify-center"
    @click="toggleModal"
    :style="{ 'background-color': color }"
  >
    {{ priority }}
    <span
      v-if="priority === 'Critical'"
      v-icon="'critical'"
      class="critical-icon"
    ></span>
    <TaskDropdown
      v-clickOutside="closeModal"
      v-if="showDropdown"
      :options="labels"
      :type="'priority'"
      @updateOption="updatePriority"
      @updateOptions="updateOptions"
      optionClass="priority-option"
    />
    <span class="peeling-span scale-up-tr"></span>
  </div>
</template>

<script>
import TaskDropdown from '../TaskDropdown.vue'
import { defineComponent } from 'vue'
export default {
  emits: ['updateTask', 'updateOptions', 'addLabel'],
  props: {
    task: Object,
    group: Object,
  },
  name: '',
  data() {
    return {
      showDropdown: false,
      selectedPriority: this.task.priority,
    }
  },
  methods: {
    updatePriority(priority) {
      this.selectedPriority = priority
      this.toggleModal()
      this.$emit('updateTask', { cmpType: 'priority', data: priority })
    },
    toggleModal() {
      this.showDropdown = !this.showDropdown
    },
    closeModal() {
      this.showDropdown = false
    },
    updateOptions(updatedOptions) {
      this.$emit('updateOptions', updatedOptions)
    },
  },
  computed: {
    labels() {
      return this.$store.getters.currBoard.labels
    },
    priority() {
      return this.selectedPriority
    },
    color() {
      const labels = this.labels
      let currColor = ''
      if (!labels) return
      labels.priority.forEach((label) => {
        if (label.name === this.task.priority) currColor = label.color
      })
      return currColor
    },
  },
  components: {
    TaskDropdown,
  },
}
</script>
