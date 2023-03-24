<template>
  <section class="person-filter-container">
    <div>Quick person filter</div>
    <div class="subiteams-title">Filter items and subitems by person</div>
    <span v-for="(member, idx) in currBoard.members" :key="idx"
    class="person-filter-img">
      <img :src="member.url" />
    </span>
  </section>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  methods: {},
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
  },
}
</script>
