<template>
  <section class="person-preview">
    <section class="onTask-person flex space-between">
      <div
        v-if="person"
        class="onTask-person-div flex align-center"
        v-for="(p, idx) in person"
        :key="idx"
      >
      <div class="flex align-center">
        <img :src="p.url" alt="person-img" class="person-img" />
        <span class="person-name">{{ p.name }}</span>
      </div>
        <button @click.stop="updateMember(idx)">X</button>
      </div>
    </section>
    <input type="text" placeholder="Search names, roles or teams" />
    <p>Suggested people</p>
    <section>
      <div class="flex align-center member"
        v-if="members"
        v-for="(member, idx) in members"
        :key="idx"
        @click.stop="updatePerson(member)"
      >
       <img :src="member.url" class="member-img">
        <span class="member-mail">{{ member.name }}@gmail.com</span>
      </div>
    </section>
    <div class="invite flex align-center">
      <span v-html="getSvg('invite')" class="workspace-icon"></span>
      <p>Invite a new member by email</p>
  </div>
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
    return {}
  },
  computed: {
    members() {
      let taskPersons = JSON.parse(JSON.stringify(this.person))
      return this.$store.getters.currBoard.members.filter((member) => {
        return !taskPersons.some((p) => p.name === member.name)
      })
    },
    filteredMembers() {},
  },
  methods: {
    updatePerson(member) {
      if (this.person.length < this.members.length) return
      this.$emit('updatePerson', { ...member })
    },
    updateMember(idx) {
      this.person.splice(idx, 1)
    },
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
  },
}
</script>
