<template>
  <div class="alert flex align-center justify-center" :class="alertClass">
    {{ msg?.txt }}
  </div>
</template>

<script>
import { eventBus, SHOW_MSG } from '../services/event-bus.service.js'

export default {
  created() {
    eventBus.on(SHOW_MSG, (msg) => {
      this.msg = msg
      var delay = msg.delay || 2000
      setTimeout(() => {
        this.msg = ''
      }, delay)
    })
  },
  data() {
    return {
      alive: false,
      msg: null,
    }
  },
  computed: {
    alertClass() {
      if (!this.msg) return false
      return `alert-${this.msg.type}`
    },
  },
}
</script>
