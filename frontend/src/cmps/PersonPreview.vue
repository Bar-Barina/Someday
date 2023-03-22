<template>
  <section class="person-preview">
    <section class="onTask-person flex space-between">
      <div
        v-if="person"
        class="onTask-person-div flex align-center"
        v-for="(p, idx) in person"
        :key="idx"
      >
        <img :src="p.url" alt="person-img" class="person-img" />
        <span class="person-name">{{ p.name }}</span>
        <button @click.stop="updateMember(idx)">X</button>
      </div>
    </section>
    <input type="text" placeholder="Search names, roles or teams" />
    <p>Suggested people</p>
    <ul>
      <li
        v-if="members"
        v-for="(member, idx) in members"
        :key="idx"
        @click.stop="updatePerson(member)"
      >
        {{ member.name }}
      </li>
    </ul>
    <p>Invite a new member by email</p>
  </section>
</template>

<script>
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
  },
}
</script>

<style>
.person-preview {
  position: absolute;
  background-color: white;
  width: 400px;
  height: 300px;
  border: 1px solid black;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
