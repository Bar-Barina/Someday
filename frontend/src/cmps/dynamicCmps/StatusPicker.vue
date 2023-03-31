<template>
  <div
    class="status full-cell"
    :class="statusClass"
    v-clickOutside="closeModal"
    @click="toggleModal"
    :style="{ 'background-color': color }"
  >
    {{ status }}
    <TaskDropdown
      v-if="showDropdown"
      :options="labels"
      :type="'status'"
      @updateOption="updateStatus"
      @updateOptions="updateOptions"
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
  emits: ['updateTask', 'updateOptions'],
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
    updateOptions(optionsUpdate) {
      this.$emit('updateOptions', optionsUpdate)
    },
  },
  computed: {
    labels() {
      // console.log('from picker', this.$store.getters.currBoard.labels)
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
    color() {
      const labels = this.labels
      const currLabel = []
      labels.status.forEach((label) => {
        if (label.name === this.task.status) currLabel.push(label)
        console.log(label)
      })
      if (currLabel.length > 0) {
    return currLabel[0].color
  } else {
    return null 
  }
    },
  },
  components: {
    TaskDropdown,
  },
}
</script>
