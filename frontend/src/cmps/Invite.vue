<template>
  <section class="invite-container">
    <div @click="closeInvite" class="invite-close-btn pointer">
      <span v-icon="'x'"></span>
    </div>
    <div class="invite-title">Board Members</div>
    <input v-model="searchTerm" type="text" placeholder="Enter name or email" />

    <section v-if="searchTerm" class="searched-users">
      <div class="user" v-for="(user,idx) in filteredUsers" :key="idx">
      <img :src="user.imgUrl" alt=""/>
      <span @click.stop="saveUser(user)">{{user.email}}</span>
      </div>
      <span v-if="filteredUsers.length===0">No accounts found with this email...</span>
    </section>

    <div class="invite-subtitle-wrapper flex align-center">
      <span class="invite-subtitle">
        <img
          src="https://cdn.monday.com/images/logos/monday_logo_icon.png"
          alt="sunday icon"
        />
      </span>
      <span
        >Anyone at <span class="invite-board-title">{{ this.currBoard.title }} account</span> can find and access this
        board</span
      >
    </div>
    <article v-for="(member, idx) in currBoard.members" :key="idx" class="members-list">
      <div class="member flex align-center">
      <img :src="member.imgUrl" />
      <span>{{ member.name }}</span>
      <div class="x flex justify-center align-center">
      <span @click.stop="removeMember(idx)" v-icon="'x'"></span>
      </div>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      searchTerm:''
    }
  },
  methods: {
    removeMember(idx) {
      const board = JSON.parse(JSON.stringify(this.currBoard))
      const members = board.members
      members.splice(idx,1)
      this.$emit('updateBoard', board)
    },
    saveUser(user) {
      const member = {
        id:user.id,
        name:fullName,
        imgUrl:user.imgUrl,
        email:user.email
      }
      const board = JSON.parse(JSON.stringify(this.currBoard))
      const members = board.members
      members.unshift(member)
      this.searchTerm = ''
      this.$emit('updateBoard', board)
    },
    closeInvite() {
      this.$emit('closeInvite')
    }
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
    filteredUsers() {
      const users = this.users
      const regex = new RegExp(this.searchTerm, 'i')
      return users.filter((user) => regex.test(user.accountName))
    },
    users() {
      return this.$store.getters.users
    }
  },
  created() {
  },
  components: {},
}
</script>
