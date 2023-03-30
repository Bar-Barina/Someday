<template>
  <section class="kanban-col" :style="{ 'background-color': color }">
    <div class="col-header flex space-between align-center">
      <div
        v-tippy="{
          content: status,
          theme: 'classic',
          placement: 'top',
          arrow: true,
        }"
      >
        {{ status }} / {{ tasksCount }}
      </div>
      <span class="add-task-plus" @click="addTask" v-icon="'plusKanban'"></span>
    </div>
    <section class="col-content flex column">
      <!-- <section class="cards-container"> -->
      <Container
        class="smooth-dnd-container"
        orientation="vertical"
        group-name="tasks"
        tag="div"
        :drag-class="'task-kanban-drag'"
        :shouldAcceptDrop="(e, payload) => e.groupName === 'tasks'"
        :get-child-payload="getColPayload()"
        @drop="onTaskDrop($event)"
      >
        <Draggable v-for="(task, idx) in tasks" :key="idx">
          <KanbanCard :task="task" @updateMap="updateOrder"/>
        </Draggable>
      </Container>
    </section>
  </section>
  <!-- </section> -->
</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd";
import { boardService } from "../services/board.service.local";
import { utilService } from "../services/util.service";
import KanbanCard from "./KanbanCard.vue";
export default {
  emits: ["addStatusesMap", "removeStatusesMap", 'updateMapOrder'],
  props: {
    status: String,
    tasks: Array,
    color: String,
    option: String
  },
  data() {
    return {
      board: this.$store.getters.currBoard,
    };
  },
  created() {
  },
  methods: {
    getColPayload(id) {
      return (index) => {
        return this.tasks[index];
      };
    },
    onTaskDrop(dropResult) {
      if (dropResult.removedIndex === null && dropResult.addedIndex === null)
        return;
      const task = JSON.parse(JSON.stringify(dropResult.payload));
      const taskIdx = this.tasks.findIndex((t) => t.id === task.id);
      const board = JSON.parse(JSON.stringify(this.currBoard));
      if (dropResult.addedIndex !== null && dropResult.removedIndex === null) {
        const group = board.groups.find((group) => {
          return group.tasks.filter((t) => t.id === task.id)[0];
        });
        task[this.option] = this.status;
        this.$emit("addStatusesMap", { task, status: this.status });
        const toUpdate = { group, task };
        this.$store.dispatch({ type: "saveTask", toUpdate });
      } else if (
        dropResult.addedIndex === null &&
        dropResult.removedIndex !== null
      ) {
        this.$emit("removeStatusesMap", { taskIdx, status: this.status });
      } else {
        this.$emit("updateMapOrder", { status: this.status, dropResult });
      }
    },
    addTask() {
      const task = boardService.getEmptyTask();
      task[this.option] = this.status;
      task.taskTitle = 'New Task'
      const group = this.currBoard.groups[0];
      this.tasks.unshift(task)
      const toUpdate = { group, task };
      this.$store.dispatch({ type: "saveTask", toUpdate });
    },
    updateOrder() {
      this.$emit('updateMap')
    }
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard;
    },
    tasksCount() {
      return this.tasks.length;
    },
  },
  components: {
    KanbanCard,
    Container,
    Draggable,
  },
};
</script>
