<template>
  <div
    class="status full-cell"
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
    updateOptions(updatedOptions) {
      this.$emit('updateOptions', updatedOptions)
    },
  },
  computed: {
    labels() {
      return this.$store.getters.currBoard.labels
    },
    status() {
      return this.selectedStatus
    },
    color() {
      const labels = this.labels
      let currColor = ''
      if (!labels) return
      labels.status.forEach((label) => {
        if (label.name === this.task.status) currColor = label.color
      })
      return currColor
    },
  },
  components: {
    TaskDropdown,
  },
}
</script>
