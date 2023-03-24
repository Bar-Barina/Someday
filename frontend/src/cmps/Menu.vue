<template>
  <div class="menu-component-wrapper flex justify-center">
    <div class="actions flex">
      <div class="num flex justify-center align-center">1</div>
      <div class="action-title flex justify-center column">
        <div class="title">Tasks selected</div>
      </div>
      <div class="duplicate-wrapper item flex column align-center">
        <span v-icon="'duplicate'"></span>
        <span>Duplicate</span>
      </div>
      <div class="trash-wrapper item flex column align-center">
        <span v-icon="'menuTrash'"></span>
        <span>Delete</span>
      </div>
      <div class="action-delete flex justify-center align-center">
        <span class="icon-delete"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.board = this.$store.getters.currBoard;
  },
  data() {
    return {
      board: null,
    };
  },
  copmuted: {
    currBoard() {
      return this.$store.getters.currBoard;
    },
    // selected() {
    //   return this.board.groups.filter((g) => g.tasks.filter((t) => t.isSelected))
    //     .length;
    // },
  },
};
</script>
