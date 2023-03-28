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
      @click="ChangeActive(member.name)"
      :class="{ activePerson: isActive(member.name) }"
    >
      <img :src="member.url" />
    </span>
  </section>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    ChangeActive(label) {
      console.log('from filter',label)
      this.$store.commit({ type: 'updateActiveMember', label })
    },
    isActive(label) {
      if (this.currActiveFilters.includes(label)) return true
      else return false
    },
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
    currActiveFilters() {
      return this.$store.getters.currActiveFilters
    },
  },
}
</script>
