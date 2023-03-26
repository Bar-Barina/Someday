<template>
  <section class="edit-menu">
    <div @click.stop="remove" class="edit-cell flex align-center">
      <div class="icon-wrapper">
        <span class="icon" v-icon="'editTrash'"></span>
      </div>
      <span>Delete</span>
    </div>
    <div v-if="!taskId" @click.stop="rename" class="edit-cell flex align-center">
      <div class="icon-wrapper">
        <span class="icon" v-icon="'renameEdit'"></span>
      </div>
      <span>Rename Board</span>
    </div>
  </section>
</template>

<script>
export default {
  emits: ["remove", "removeBoard" , 'rename'],
  props: {
    taskId: String,
    groupId: String,
    boardId: String
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
    }
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard;
    },
  },
};
</script>
