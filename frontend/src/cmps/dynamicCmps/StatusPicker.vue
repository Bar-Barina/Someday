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
      :options="labels"
      :type="'status'"
      @updateOption="updateStatus"
      optionClass="status-option"
    />
    <span class="peeling-span scale-up-tr"></span>
    <!-- <span
      v-if="selectedStatus === 'Done'"
      class="confetti-sprite-animation"
    ></span> -->
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
    labels() {
      console.log(this.$store.getters.currBoard.labels)
      return this.$store.getters.currBoard.labels
    },
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
          return 'status-done animated-status'
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
