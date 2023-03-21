<template>
  <div>
    <span class="status" @click="showDropdown = !showDropdown">{{
      status
    }}</span>
    <select v-if="showDropdown" v-model="selectedStatus" @change="updateStatus">
      <option v-for="(option , idx) in statusOptions" :key="idx" :value="status">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
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
    updateStatus() {
      this.$emit('updateTask', this.selectedStatus)
      this.showDropdown = false
    },
  },
  computed: {
    status() {
      return this.selectedStatus
    },
  },
}
</script>

<style>
.status {
  background-color: blueviolet;
}
</style>
