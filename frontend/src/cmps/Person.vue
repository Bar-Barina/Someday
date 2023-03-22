<template>
  <section class="persons-list">
    <person-preview
      v-for="(person, idx) in task"
      :key="idx"
      :person="task.person"
      @click="updatePerson(person)"
    />
  </section>
</template>

<script>
import PersonPreview from '../cmps/PersonPreview.vue'
export default {
  name: 'person',
  props: {
    task: Object,
  },
  data() {
    return {
      selectedPerson: this.task.person,
    }
  },
  methods: {
    updatePerson(person) {
      this.selectedPerson = person
      this.$emit('updateTask', { cmpType: 'person', data: person })
    },
  },
  components: {
    PersonPreview,
  },
}
</script>

<style>
p {
  margin: 0;
}

.persons-list {
  display: inline-flex;
  justify-items: center;
  flex-direction: row;
  background-color: lightseagreen;
  width: 100%;
  display: flex;
  justify-content: center;
}
.persons {
  background-color: lightseagreen;
}
</style>
