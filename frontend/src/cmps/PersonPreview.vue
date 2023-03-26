<template>
  <section class="person-preview">
    <div class="arrow-up-div-person"></div>
    <section class="active-person flex align-center">
        <div v-for="(p, idx) in person"
        :key="idx" class="person-card flex align-center">
          <img :src="p.url" alt="person-img" class="person-img" />
          <span class="person-name">{{ p.name }}</span>
          <button @click.stop="removeMember(idx)">X</button>
        </div>
    </section>
    <section class="suggest-person">
      <input
      class="person-input"
      type="text"
      placeholder="Search names"
      v-model="searchTerm"
      />
      <span v-if="!searchTerm" v-html="getSvg('searchGray')" class="workspace-icon-search"></span>
      <span v-else><span @click="this.searchTerm =' '" v-html="getSvg('x')" class="workspace-icon-search"></span></span>
    <p class="suggest-txt">Suggested people</p>
      <div
        class="flex align-center member"
        v-for="(member, idx) in filteredMembers"
        :key="idx"
        @click.stop="updatePerson(member)"
      >
        <img :src="member.url" class="member-img" />
        <span class="member-mail">{{ member.name }}@gmail.com</span>
      </div>
    <div class="invite flex align-center">
      <span v-html="getSvg('invite')" class="workspace-icon-invite"></span>
      <p>Invite a new member by email</p>
    </div>
    </section>
  </section>
</template>

<script>
import { svgService } from '../services/svg.service.js'
export default {
  name: 'person-preview',
  props: {
    person: Array,
  },
  data() {
    return {
      searchTerm: '',
    }
  },
  computed: {
    members() {
      let taskPersons = Object.values(this.person)
      return this.$store.getters.currBoard.members.filter((member) => {
        return !taskPersons.some((p) => p.name === member.name)
      })
    },
    filteredMembers() {
      const regex = new RegExp(this.searchTerm, 'i')
      return this.members.filter((member) => regex.test(member.name))
    },
  },
  methods: {
    updatePerson(member) {
      this.$emit('updatePerson', member)
    },
    removeMember(idx) {
      this.$emit('removeMember', idx)
    },
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
  },
}
</script>
