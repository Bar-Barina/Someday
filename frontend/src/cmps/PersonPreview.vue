<template>
  <section v-if="person" class="person-preview">
    <section class="onTask-person flex space-between">
      <div
        class="onTask-person-div flex align-center"
        v-for="(p, idx) in person"
        :key="idx"
      >
        <img :src="p.url" alt="person-img" class="person-img" />
        <span class="person-name">{{ p.name }}</span>
      </div>
    </section>
    <input type="text" placeholder="Search names, roles or teams" />
    <p>Suggested people</p>
    <ul>
      <li
        v-for="(member, idx) in members"
        :key="idx"
        @click="updatePerson(member)"
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
      console.log('this.person', this.person)
      let taskPersons = JSON.parse(JSON.stringify(this.person))
      console.log('taskPresons', taskPersons)
      return this.$store.getters.currBoard.members.filter((member) => {
        return !taskPersons.some((p) => p.name === member.name)
      })
    },
  },
  methods: {
    updatePerson(member) {
      console.log('member from preview', member)
      this.$emit('updatePerson', { ...member })
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
