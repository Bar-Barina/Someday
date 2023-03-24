<template>
  <div
    class="status full-cell"
    :class="statusClass"
    v-clickOutside="closeModal"
    @click="toggleModal"
  >
    {{ status }}
    <TaskDropdown
      v-if="showDropdown"
      :options="statusOptions"
      @updateOption="updateStatus"
      optionClass="status-option"
    />
  </div>
</template>

<script>
import TaskDropdown from '../TaskDropdown.vue'

export default {
  emits: ['updateTask'],
  props: {
    task: Object,
  },
  name: '',
  data() {
    return {
      statusOptions: [
        { name: 'Working on it', class: 'status-working' },
        { name: 'Stuck', class: 'status-stuck' },
        { name: 'Done', class: 'status-done' },
        { name: '', class: 'status-empty' },
      ],
      showDropdown: false,
      selectedStatus: this.task.status,
    }
  },
  methods: {
    updateStatus(status) {
      this.selectedStatus = status
      this.toggleModal()
      this.$emit('updateTask', { cmpType: 'status', data: status })
    },
    toggleModal() {
      this.showDropdown = !this.showDropdown
    },
    closeModal() {
      this.showDropdown = false
    },
  },
  computed: {
    status() {
      return this.selectedStatus
    },
    statusClass() {
      switch (this.selectedStatus) {
        case 'Working on it':
          return 'status-working'
        case 'Stuck':
          return 'status-stuck'
        case 'Done':
          return 'status-done'
        case '':
          return 'status-empty'
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
