<template>
  <section class="person-preview">
    <div class="arrow-up-div-person"></div>
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
    <input
      type="text"
      placeholder="     Search names, roles or teams"
      v-model="searchTerm"
    />
    <!-- <span v-html="getSvg('search')" class="workspace-icon"></span> -->
    <p>Suggested people</p>
    <section>
      <div
        class="flex align-center member"
        v-if="members"
        v-for="(member, idx) in filteredMembers"
        :key="idx"
        @click.stop="updatePerson(member)"
      >
        <img :src="member.url" class="member-img" />
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
    return {
      searchTerm: '',
    }
  },
  computed: {
    members() {
      let taskPersons = JSON.parse(JSON.stringify(this.person))
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
      // console.log('personPreview member' ,member)
      // console.log('persons',this.person.length)
      // console.log('members',this.members.length)
      if (this.person.length < this.members.length) return
      this.$emit('updatePerson', { ...member })
    },
    updateMember(idx) {
      console.log('before this.person from personPreview', this.person)
      console.log('idx from personPreview',idx)
      this.person.splice(idx, 1)
      console.log('after this.person from personPreview', this.person)
    },
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
  },
}
</script>
