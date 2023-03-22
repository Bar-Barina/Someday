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
  emits:['remove'],
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
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
    remove() {
      if (!this.taskId) {
        this.$emit("remove" , {groupId: this.groupId});
      } else {
        const toRemove = {groupId: this.groupId , taskId: this.taskId}
        this.$emit( "remove" , toRemove);
      }
    },
  },
};
</script>