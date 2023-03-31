<template>
  <section class="invite-container">
    <div class="invite-close-btn pointer">
      <span v-icon="'x'"></span>
    </div>
    <div class="invite-title">Board Members</div>
    <input type="text" placeholder="Enter name or email" />
    <div class="invite-subtitle-wrapper flex align-center">
      <span class="invite-subtitle">
        <img
          src="https://cdn.monday.com/images/logos/monday_logo_icon.png"
          alt="sunday icon"
        />
      </span>
      <span
        >Anyone at {{ this.currBoard.title }} account can find and access this
        board</span
      >
    </div>
    <article v-for="(member, idx) in this.currBoard.members" :key="idx">
      <img :src="member.url" />
      <span>{{ member.name }}</span>
      <span v-icon="'x'"></span>
    </article>
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
  },
  created() {},
  components: {},
}
</script>
