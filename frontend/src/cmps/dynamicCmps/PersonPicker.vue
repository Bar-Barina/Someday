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
      console.log('from personPicker',person)
      console.log('before',this.taskPersons)
      this.task.person.push(person)
      console.log('after',this.taskPersons)
      this.$emit('updateTask', { cmpType: 'person', data: this.task.person })
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
