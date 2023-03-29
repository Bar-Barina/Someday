<template>
  <section class="board-activity-container">
    <span v-icon="'x'"></span>
    <h2>{{ this.currBoard.title }} Log</h2>
    <article v-for="(activity, idx) in this.currBoard.activities"
      :key="idx">
     <span>{{activity.createdAt}}</span>
     <span>{{this.loggedInUser.img}}</span>
     <!-- <span>{{activity.createdAt}}</span> -->
     
    ></article>
  </section>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  methods: {},
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
    loggedInUser() {
        return this.$store.getters.loggedInUser
    }
  },
  created() {},
  components: {},
}
</script>
