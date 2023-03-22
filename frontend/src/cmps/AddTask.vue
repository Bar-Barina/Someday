<template>
  <section class="add-task group-grid">
    <div class="empty sticky"></div>
    <div
      class="task-border add-task sticky"
      :style="{ 'background-color': group.color }"
    ></div>
    <div class="cell1 sticky third">
        <input type="checkbox">
    </div>
    <div class="input-wrapper cell1 sticky">
        <input v-model="task" type="text" class="flex align-center" placeholder="+ Add task">
    </div>
  </section>
</template>

<script>
import { boardService } from '../services/board.service.local';
export default {
  props: {
    group: Object,
  },
  data() {
    return {
        task: boardService.getEmptyTask
    };
  },
};
</script>