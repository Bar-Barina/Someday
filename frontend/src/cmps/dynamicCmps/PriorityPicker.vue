<template>
  <div class="priority full-cell flex align-center justify-center" :class="priorityClass" @click="toggleModal">
    {{ priority }} <span v-if="priority==='Critical'" v-icon="'critical'" class="critical-icon"></span>
    <TaskDropdown
    v-clickOutside="closeModal"
      v-if="showDropdown"
      :options="priorityOptions"
      @updateOption="updatePriority"
      optionClass="priority-option"
    />
    <span class="peeling-span scale-up-tr"></span>
  </div>
</template>

<script>
import TaskDropdown from '../TaskDropdown.vue'
import { defineComponent } from "vue";
export default defineComponent ({
  emits:['updateTask'],
  props: {
    task: Object,
    group: Object
  },
  name: '',
  data() {
    return {
      priorityOptions: [
        { name: 'Critical', class: 'priority-critical',color: '#333333' },
        { name: 'High', class: 'priority-high',color: '#401694' },
        { name: 'Medium', class: 'priority-medium',color: '#5559df' },
        { name: 'Low', class: 'priority-low',color: '#579bfc' },
        { name: '', class: 'priority-empty',color: '#c3c4c3' },
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
    closeModal() {
      this.showDropdown = false
    }
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
})
</script>
