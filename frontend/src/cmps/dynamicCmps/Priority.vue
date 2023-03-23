<template>
  <div class="priority full-cell" :class="priorityClass" @click="toggleModal">
    {{ priority }}
    <TaskDropdown
      v-if="showDropdown"
      :options="priorityOptions"
      @updateOption="updatePriority"
      optionClass="priority-option"
    />
  </div>
</template>

<script>
import TaskDropdown from '../TaskDropdown.vue'
export default {
  props: {
    task: Object,
  },
  name: '',
  data() {
    return {
      priorityOptions: [
        { name: 'Critical', class: 'priority-critical' },
        { name: 'High', class: 'priority-high' },
        { name: 'Medium', class: 'priority-medium' },
        { name: 'Low', class: 'priority-low' },
        { name: '', class: 'priority-empty' },
      ],
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
  },
  computed: {
    priority() {
      return this.selectedPriority
    },
    priorityClass() {
      switch (this.selectedPriority) {
        case 'Critical':
          return 'priority-critical'
        case 'High':
          return 'priority-high'
        case 'Medium':
          return 'priority-medium'
        case 'Low':
          return 'priority-low'
        case '':
          return 'priority-empty'
        default:
          break
      }
    },
  },
  components: {
    TaskDropdown,
  },
}
</script>
