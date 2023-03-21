<template>
  <section v-if="person">
    <section v-if="person.imgUrl" class="person-preview">
      <img :src="person.imgUrl" alt="" />
    </section>
    <article :style="{ background: personColor }" v-else class="person-preview">
      {{ person.name.substring(0, 1).toUpperCase() }}
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
