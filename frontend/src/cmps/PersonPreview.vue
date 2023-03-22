<template>
  <section v-if="person" class="person-preview">
    <img :src="person.url" alt="person-img" />
    <article>
      {{ person.name }}
      <input type="text" placeholder="Search names, roles or teams" />
      <p>Suggested people</p>
      <!-- <ul>
        <li v-for="(member, idx) in board.members" :key="idx">
          {{ member }}
        </li>
      </ul> -->
      <p>Invite a new member by email</p>
    </article>
  </section>
</template>

<script>
export default {
  name: 'person-preview',
  props: {
    person: Object,
  },
  data() {
    return {
      board : null
    }
  },
  computed: {
    members() {
      return this.$store.getters.currentBoard.members
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
