<template>
  <div class="status full-cell" :class="statusClass" @click="toggleModal">
    {{ status }}
    <Popper>
      <button class="popper-btn">Pop</button>
      <template #content>
        <TaskDropdown
          v-if="showDropdown"
          :options="statusOptions"
          @updateOption="updateStatus"
          optionClass="status-option"
        />
      </template>
    </Popper>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import TaskDropdown from '../TaskDropdown.vue'

export default defineComponent({
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
})
</script>
