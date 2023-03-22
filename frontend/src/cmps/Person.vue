<template>
  <div @click="isOpen = !isOpen" class="person">
    <img src="task.person.url" />
  </div>
  <PersonPreview
    v-if="isOpen"
    :person="task.person"
    @click="updatePerson(person)"
  />
</template>

<script>
import PersonPreview from "../cmps/PersonPreview.vue";
export default {
  emits: ['updateTask'],
  name: "person",
  props: {
    task: Object,
  },
  data() {
    return {
      isOpen: false,
      selectedPerson: this.task.person,
    };
  },
  methods: {
    updatePerson(person) {
      this.selectedPerson = person;
      this.$emit("updateTask", { cmpType: "person", data: person });
    },
  },
  components: {
    PersonPreview,
  },
};
</script>
