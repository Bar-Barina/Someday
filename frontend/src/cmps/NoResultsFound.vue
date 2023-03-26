<template>
  <section class="no-results-container">
    <img src="https://cdn.monday.com/images/search_empty_state.svg" />
    <h3>No results found in this board</h3>
    <p>
      Try using a different search term or use "Clear Search" to reset your
      filters across the entire account
    </p>
    <button @click="clearSearch">Clear search</button>
  </section>
</template>

<script>
import { eventBus } from '../services/event-bus.service'
export default {
  name: '',
  data() {
    return {}
  },
  methods: {
    clearSearch() {
        console.log('entered')
        this.$emit('clearSearch')
    }
  },
  computed: {},
  components: {},
}
</script>