<template>
  <div class="menu-component-wrapper flex justify-center">
    <div class="actions flex">
      <div class="num flex justify-center align-center">
        {{ tasksCount }}
      </div>
      <div class="action-title flex justify-center column">
        <div class="title">Tasks selected</div>
      </div>
      <div class="duplicate-wrapper item flex column align-center">
        <span v-icon="'duplicate'" class="icon"></span>
        <span>Duplicate</span>
      </div>
      <div class="trash-wrapper item flex column align-center">
        <span v-icon="'menuTrash'" class="icon"></span>
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
  props: {
    selectedTasks: Object,
  },
  data() {
    return {};
  },
  created() {},
  computed: {
    currBoard() {
      return this.$store.getters.currBoard;
    },
    tasksCount() {
      const tasksCount = Object.keys(this.selectedTasks).reduce((acc, key) => {
        if (Array.isArray(this.selectedTasks[key])) {
          return acc + this.selectedTasks[key].length;
        }
        return acc;
      }, 0);
      return tasksCount
    },
  },
};
</script>
