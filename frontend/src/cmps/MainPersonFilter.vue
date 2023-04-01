<template>
  <section class="person-filter-container">
    <div class="quick">Quick person filter</div>
    <div class="subiteams-title">Filter items and subitems by person</div>
    <span
      v-for="(member, idx) in membersToShow"
      :key="idx"
      class="person-filter-img"
      v-tippy="{
        content: member.name,
        theme: 'classic',
        placement: 'top',
        arrow: true,
      }"
      @click="ChangeActive(member)"
    >
      <img :src="member.imgUrl" />
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
    ChangeActive(member) {
      this.$store.commit({ type: 'updateActiveMember', member: member })
    },
    // isActive(label) {
    //   if (this.currActiveFilters.includes(label)) return true
    //   else return false
    // },
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
    currActiveMember() {
      return this.$store.getters.currActiveMember
    },
    membersToShow() {
      console.log('this.currBoard.members', this.currBoard.members)
      let members = this.currBoard.members
      if(members.includes(this.currActiveMember)) {
        const memberIdx = members.findIndex(m=>m.name===this.currActiveMember.name)
        members.splice(memberIdx,1) 
        return members
      }
      return members
    }

  },
}
</script>
