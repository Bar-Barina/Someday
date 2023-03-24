<template>
  <div class="menu-component-wrapper flex justify-center">
    <div class="actions flex">
      <div class="num flex justify-center align-center">{{ tasksSelected }}</div>
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
  },
  data() {
    return {
    };
  },
  created() {
  },
  copmuted: {
    currBoard() {
      return this.$store.getters.currBoard
    },
    tasksSelected() {
      const tasks = this.currBoard.groups.map(group => {
        return group.tasks.filter(t => t.isSelected)
      }) 
      const combinedTasks = [...tasks[0], ...tasks[1]]
      console.log('combinedTasks',combinedTasks )
      return combinedTasks
    },
  },
};
</script>
