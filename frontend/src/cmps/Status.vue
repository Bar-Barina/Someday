<template>
  <div class="status" :class="statusClass" @click="toggleModal">
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
import TaskDropdown from './TaskDropdown.vue'
export default {
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
      ],
      showDropdown: false,
      selectedStatus: this.task.status,
    }
  },
  methods: {
    updateStatus(status) {
      this.selectedStatus = status
      this.toggleModal()
      this.$emit('updateTask', { ...this.task, status: status })
    },
    toggleModal() {
      this.showDropdown = !this.showDropdown
    },
  },
  computed: {
    status() {
      return this.selectedStatus
    },
    statusClass() {
      console.log(this.selectedStatus)
      switch (this.selectedStatus) {
        case 'Working on it':
          return 'status-working'
        case 'Stuck':
          return 'status-stuck'
        case 'Done':
          return 'status-done'
        default:
          break
      }
      // const statusClasses = [
      //   { 'status-working': this.selectedStatus === 'Working on it' },
      //   { 'status-stuck': this.selectedStatus === 'Stuck' },
      //   { 'status-done': this.selectedStatus === 'Done' },
      // ]
      // return statusClasses[this.selectedStatus]
    },
  },
  components: {
    TaskDropdown,
  },
}
</script>
