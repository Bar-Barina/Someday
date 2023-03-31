<template>
  <section class="edit-menu">
    <div v-if="!user" @click.stop="remove" class="edit-cell flex align-center">
      <div class="icon-wrapper">
        <span class="icon" v-icon="'editTrash'"></span>
      </div>
      <span>Delete</span>
    </div>
    <div v-if="!taskId && !user" @click.stop="rename" class="edit-cell flex align-center">
      <div class="icon-wrapper">
        <span class="icon" v-icon="'renameEdit'"></span>
      </div>
      <span>Rename Board</span>
    </div>
    <div v-if="user" @click.stop="logout" class="edit-cell flex align-center">
      <div class="icon-wrapper">
        <span class="icon logout" v-icon="'logoutSide'"></span>
      </div>
      <span>Log out</span>
    </div>
  </section>
</template>

<script>
export default {
  emits: ["remove", "removeBoard" , 'rename'],
  props: {
    taskId: String,
    groupId: String,
    boardId: String,
    user: Boolean
  },
  data() {
    return {
      task: null,
      group: null,
    };
  },
  created() {},
  methods: {
    remove() {
      if (!this.taskId) {
        this.$emit("remove", { groupId: this.groupId });
      } else {
        const toRemove = { groupId: this.groupId, taskId: this.taskId };
        this.$emit("remove", toRemove);
      }
      this.$emit("removeBoard", this.currBoard._id);
    },
    rename() {
      this.$emit("rename", { boardId: this.boardId });
    },
    logout() {
      this.$store.dispatch({ type: 'logout' })
      this.$router.push('/')
    }
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard;
    },
  },
};
</script>
