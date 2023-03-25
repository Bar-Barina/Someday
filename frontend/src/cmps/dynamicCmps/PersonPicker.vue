<template>
  <div @click="isOpen = !isOpen" class="person">
    <span v-for="(person, idx) in task.person" :key="idx">
      <img :src="person.url" class="person-img" />
    </span>
  </div>
  <PersonPreview
    v-clickOutside="closeModal"
    v-if="isOpen"
    :person="task.person"
    @updatePerson="updatePerson"
    @removeMember="removePerson"
  />
</template>

<script>
import PersonPreview from '../PersonPreview.vue'
export default {
  emits: ['updateTask'],
  name: 'person',
  props: {
    task: Object,
    group: Object
  },
  data() {
    return {
      isOpen: false,
      taskPersons: this.task.person,
    }
  },
  methods: {
    updatePerson(person) {
      this.task.person.push(person)
      this.$emit('updateTask', { cmpType: 'person', data: this.task.person })
    },
    removePerson(idx) {
      this.task.person.splice(idx , 1)
      this.$emit('updateTask' , {cmpType: 'person' , data: this.task.person})
    },
    closeModal() {
      this.isOpen = false
    }
  },
  components: {
    PersonPreview,
  },
}
</script>
