<template>
<div @click="toggleEdit" class="align-center more-task sticky flex justify-center">
  <div class="more" v-html="getSvg('Dots')"></div>
  </div>
  <EditMenu v-if="isEditOpen" :groupId="group._id" :taskId="task.id" />
  <div class="task-border sticky" :style="{ 'background-color': group.color }"></div>
  <div class="flex sticky align-center cell1 flex-justify third">
    <input type="checkbox" />
  </div>
  <section class="task-title cell1 sticky flex align-center space-between">
    <div class="task-title-sub flex align-center space-between">
      <div class="flex align-center" contenteditable="true">
        {{ task.taskTitle }}
      </div>
      <span
        @click="openCon"
        class="open-con flex align-center space-between"
      >
        <button class="svg">
          <div className="icon" v-html="getSvg('openCon')"></div>
        </button>
        open
      </span>
    </div>
    <div class="conversation-wrapper flex align-center justify-center">
      <button @click="openCon" class="svg">
        <div className="icon" v-html="getSvg('con')"></div>
      </button>
    </div>
  </section>
  <section class="cell2" v-for="(cmp, idx) in labels" :key="idx">
    <component :is="cmp" :task="task" @updateTask="updateTask"></component>
  </section>
</template>

<script>
import { svgService } from "../services/svg.service";
import { Container, Draggable } from "vue3-smooth-dnd";
import { utilService } from "../services/util.service";
import EditMenu from "./EditMenu.vue";
import Status from "./Status.vue";
import Priority from "./Priority.vue";
import Timeline from "./Timeline.vue";
import Date from "./Date.vue";
import Person from "./Person.vue";

export default {
  emits: ["saveTask"],
  props: {
    labels: Array,
    task: Object,
    group: Object,
  },
  data() {
    return {
      isEditOpen: false,
    };
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
    updateTask({ cmpType, data }) {
      const taskToSave = { ...this.task };
      taskToSave[cmpType] = data;
      //    activity = boardService.getEmptyActivity()
      //    activity.txt = `Members changed for task ${}`
      //    activity.task = '{mini-task}'
      // const toUpdate = {taskToSave , groupId: this.group._id}
      this.$emit("saveTask", taskToSave);
    },
    openCon() {
      this.$router.push(
        "/board/" + this.currBoardId + "/conversation/" + this.task.id
      );
    },
    toggleEdit() {
      this.isEditOpen = !this.isEditOpen;
    },
  },
  computed: {
    currBoardId() {
      return this.$store.getters.currBoard._id;
    },
  },
  components: {
    Draggable,
    Container,
    Status,
    Timeline,
    Date,
    Priority,
    Person,
    EditMenu,
  },
};
</script>