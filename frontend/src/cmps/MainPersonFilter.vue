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
  methods: {
    filterTasksByMember(member) {
      const board = JSON.parse(JSON.stringify(this.currBoard))
      const filtered = board.groups.filter((group) => {
        const array = group.tasks.filter((task) => {
          return task.person.some((p) => p.name === member.name)
        })
      })
    },
    ChangeActive(label) {
      this.$store.commit({ type: 'updateActiveFilters', label })
    },
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
  },
}
</script>
