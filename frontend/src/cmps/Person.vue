<template>
  <div class="person">
    <img src="task.person.url" />
    <person-preview
      v-for="(person, idx) in task"
      :key="idx"
      :person="task.person"
      @click="updatePerson(person)"/>
  </div>
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
