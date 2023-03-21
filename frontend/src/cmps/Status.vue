<template>
  <div v-if="showDropdown" class="status" @click="showDropdown = 'true'">
    {{ status }}
    <TaskDropdown
      :options="statusOptions"
      @updateOption="updateStatus"
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
      statusOptions: ['Working on it', 'Stuck', 'Done'],
      showDropdown: false,
      selectedStatus: this.task.status,
    }
  },
  methods: {
    updateStatus(status) {
      this.selectedStatus = status
      this.showDropdown = false
      this.$emit('updateTask', { ...this.task, status: status })
    },
  },
  computed: {
    status() {
      return this.selectedStatus
    },
  },
  components: {
    TaskDropdown,
  },
}
</script>
