<template>
  <div class="status-progress-bar" :style="{ width: progressPercent }"></div>
  <div class="status-progress-label">{{ progressPercent }}</div>
</template>

<script>

export default {
  data() {
    return {
      group: Object,
    }
  },
  methods: {
    tasks() {
      return this.group.tasks
    }
  }
}
</script>
