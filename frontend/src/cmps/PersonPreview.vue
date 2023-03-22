<template>
  <section v-if="person" class="person-preview">
    <img :src="person.url" alt="person-img" />
    <article>
      {{ person.name.substring(0, 1).toUpperCase() }}
      <input type="text" placeholder="Search names, roles or teams" />
      <p>Suggested people</p>
      <ul>
        <li v-for="(member, idx) in board.members" :key="idx">
          {{ member }}
        </li>
      </ul>
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
      board : this.currentBoard()
    }
  },
  computed: {
    currentBoard() {
      this.$store.getters.currentBoard
    },
  },
}
</script>

<style>
.person-preview {
  color: #fff;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-inline-start: -10px;
}
</style>
