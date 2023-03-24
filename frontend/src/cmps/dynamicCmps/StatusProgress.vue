<template>
  <!-- <div class="status-progress-bar" :style="{ width: progressPercent }"></div>
  <div class="status-progress-label">{{ progressPercent }}</div> -->
</template>

<script>
export default {
  props: {
    group: Object,
  },
  data() {},
  methods: {},
  computed: {
    //   progressPercent() {
    //     const { status } = this.task;
    //     switch (status) {
    //       case 'Working on it':
    //         return '33%';
    //       case 'Stuck':
    //         return '66%';
    //       case 'Done':
    //         return '100%';
    //       default:
    //         return '0%';
    //     }
    // }
  },
}
</script>
