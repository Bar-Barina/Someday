<template>
  <article class="card-preview flex column">
    <div class="title-wrapper flex align-center space-between">
      <section class="task-title cell1 space-between sticky">
        <div class="flex align-center edit-div" contenteditable="true">
          {{ task.taskTitle }}
        </div>
        <span v-icon="'con'" class="open-con flex align-center space-between">
        </span>
        <div class="conversation-wrapper flex align-center"></div>
      </section>
      <span v-icon="'Dots'"></span>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    task: Object,
  },
}
</script>
