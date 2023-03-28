<template>
  <section class="person-filter-container">
    <div class="quick">Quick person filter</div>
    <div class="subiteams-title">Filter items and subitems by person</div>
    <span
      v-for="(member, idx) in currBoard.members"
      :key="idx"
      class="person-filter-img"
      v-tippy="{
        content: member.name,
        theme: 'classic',
        placement: 'top',
        arrow: true,
      }"
    >
      <img :src="member.url" />
    </span>
  </section>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
  },
}
</script>
