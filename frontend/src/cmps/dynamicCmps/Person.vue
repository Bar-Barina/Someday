<template>
  <div @click="isOpen = !isOpen" class="person">
    <span v-for="(person, idx) in task.person" :key="idx">
      <img :src="person.url" class="person-img" />
    </span>
  </div>
  <PersonPreview
    v-if="isOpen"
    :person="task.person"
    @updatePerson="updatePerson"
  />
</template>

<script>
import PersonPreview from '../PersonPreview.vue'
export default {
  emits: ['updateTask'],
  name: 'person',
  props: {
    task: Object,
  },
  data() {
    return {
      isOpen: false,
      taskPersons: this.task.person,
    }
  },
  methods: {
    updatePerson(person) {
      console.log('person from person', person)
      this.taskPersons.push(person)
      console.log('this.taskPersons', this.taskPersons)
    //   this.isOpen = false
      this.$emit('updateTask', { cmpType: 'person', data: {...this.taskPersons} })
    },
  },
  components: {
    PersonPreview,
  },
}
</script>
