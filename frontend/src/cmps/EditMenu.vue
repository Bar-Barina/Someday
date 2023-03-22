<template>
  <section class="edit-menu">
    <div @click="remove" class="edit-cell flex align-center">
      <div className="icon" v-html="getSvg('editTrash')"></div>
      <span>Delete</span>
    </div>
  </section>
</template>

<script>
import { svgService } from "../services/svg.service";

export default {
  props: {
    taskId: String,
    groupId: String,
  },
  data() {
    return {
      task: null,
      group: null,
    };
  },
  created() {
    if (this.task) this.task = this.taskId;
    this.group = this.groupId;
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
    remove() {
      if (!this.taskId) {
        const toRemove = {removeType: 'group' , groupId: this.groupId}
        this.$store.dispatch({type: "remove" , toRemove});
      } else {
        const toRemove = {removeType: 'task' , groupId: this.groupId , taskId: this.taskId}
        this.$store.dispatch({type: "remove" , toRemove});
      }
    },
  },
};
</script>