<template>
  <div class="priority" :class="priorityClass" @click="toggleModal">
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
import TaskDropdown from './TaskDropdown.vue'
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
      ],
      showDropdown: false,
      selectedPriority: this.task.priority,
    }
  },
  methods: {
    updatePriority(priority) {
      console.log('from priority', priority)
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
      console.log(this.selectedPriority)
      switch (this.selectedPriority) {
        case 'Critical':
          return 'priority-critical'
        case 'High':
          return 'priority-high'
        case 'Medium':
          return 'priority-medium'
        case 'Low':
          return 'priority-low'
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
