<template>
  <div
    @click="isOpen = !isOpen"
    class="person flex align-center justify-center"
  >
    <div
      v-if="task.person.length > 0 && task.person.length < 3"
      class="person-container flex align-center justify-center"
    >
      <span v-for="(person, idx) in task.person" :key="idx">
        <div class="full-person">
          <img
            :src="person.url"
            class="person-img"
            :class="{ alone: task.person.length === 1, first: idx === 0 }"
          />
        </div>
      </span>
    </div>
    <div
      class="mini-person flex justify-center align-center"
      v-if="task.person.length > 2"
    >
      <img :src="task.person[0].url" class="person-img" />
      <div class="person-count flex align-center justify-content">
        +{{ task.person.length - 1 }}
      </div>
    </div>
    <div
      class="empty-container flex justify-center align-center"
      v-if="task.person.length === 0"
    >
      <img
        class="empty-person"
        src="https://cdn.monday.com/icons/dapulse-person-column.svg"
        aria-hidden="true"
      />
    </div>
    <span class="plus">+</span>
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
  emits: ['updateTask', 'updateOptions'],
  name: 'person',
  props: {
    task: Object,
    group: Object,
  },
  data() {
    return {
      isOpen: false,
      taskPersons: this.task.person,
    }
  },
  methods: {
    updatePerson(person) {
      const task = JSON.parse(JSON.stringify(this.task))
      const before = JSON.parse(JSON.stringify(task)).person
      task.person.push(person)
      this.$emit('updateTask', { cmpType: 'person', data: task.person, before })
    },
    removePerson(idx) {
      const task = JSON.parse(JSON.stringify(this.task))
      task.person.splice(idx, 1)
      this.$emit('updateTask', { cmpType: 'person', data: task.person })
    },
    closeModal() {
      this.isOpen = false
    },
  },
  components: {
    PersonPreview,
  },
}
</script>
