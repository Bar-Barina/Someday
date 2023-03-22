<template>
  <div @click="isOpen = !isOpen" class="person">
    <span v-for="(person, idx) in task.person" :key="idx">
      <img :src="person.url" />
    </span>
  </div>
  <PersonPreview
    v-if="isOpen"
    :person="task.person"
    @click="updatePerson(person)"
  />
</template>

<script>
import PersonPreview from '../cmps/PersonPreview.vue'
export default {
  emits: ['updateTask'],
  name: 'person',
  props: {
    task: Object,
  },
  data() {
    return {
      isOpen: false,
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
