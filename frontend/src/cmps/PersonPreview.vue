<template>
  <section v-if="person">
    <section v-if="person.url" class="person-preview">
      <img :src="person.url" alt="person-img" />
    </section>
    <article :style="{ background: personColor }" v-else class="person-preview">
      {{ person.name.substring(0, 1).toUpperCase() }}
      <input type="text" placeholder="Search names, roles or teams" />
      <p>Suggested people</p>
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

  computed: {
    personColor() {
      return this.person.color
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
