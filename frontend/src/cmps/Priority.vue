<template>
  <div class="priority" @click="toggleModal">
    {{ priority }}
    <TaskDropdown
      v-if="showDropdown"
      :options="priorityOptions"
      @updateOption="updatePriority"
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
      priorityOptions: ['Critical', 'High', 'Medium', 'Low'],
      showDropdown: false,
      selectedPriority: this.task.priority,
    }
  },
  methods: {
    updatePriority(priority) {
      console.log('from priority', priority)
      this.selectedPriority = priority
      this.toggleModal()
      this.$emit('updateTask', { ...this.task, priority: priority })
    },
    toggleModal() {
      this.showDropdown = !this.showDropdown
    },
  },
  computed: {
    priority() {
      return this.selectedPriority
    },
  },
  components: {
    TaskDropdown,
  },
}
</script>
