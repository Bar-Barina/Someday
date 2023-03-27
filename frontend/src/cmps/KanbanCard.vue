<template>
  <article class="card-preview flex column">
    <div class="title-wrapper flex align-center space-between">
      <section class="task-title cell1 space-between sticky">
        <div class="flex align-center edit-div" contenteditable="true">
          {{ task.taskTitle }}
        </div>
        <div class="conversation-wrapper flex align-center">
          <span v-icon="'con'" class="open-con flex align-center space-between">
          </span>
        </div>
      </section>
      <span v-icon="'Dots'"></span>
    </div>
    <section
      class="card-cmp flex align-center"
      v-for="(cmp, idx) in labelsOrder"
      :key="idx"
    >
      <div class="cmp-title flex align-items">
        <span v-icon="cmp" class="cmp-icon"></span>
        <div>{{ labelsOrder[idx] }}</div>
      </div>
      <div class="cmp-cell">
        <component
          :is="cmp"
          :task="task"
          :group="group"
          @updateTask="updateTask"
        ></component>
      </div>
    </section>
  </article>
</template>

<script>
import Status from "./dynamicCmps/StatusPicker.vue";
import Priority from "./dynamicCmps/PriorityPicker.vue";
import Timeline from "./dynamicCmps/TimelinePicker.vue";
import Date from "./dynamicCmps/DatePicker.vue";
import Person from "./dynamicCmps/PersonPicker.vue";
import Text from "./dynamicCmps/TextArea.vue";
import Files from "./dynamicCmps/FilesPicker.vue";

export default {
  props: {
    task: Object,
  },
  data() {
    return {
      group: null,
    };
  },
  created() {
    this.group = this.currBoard.groups.find((group) => {
      return group.tasks.filter((t) => t.id === this.task.id)[0];
    });
  },
  methods: {
    updateTask({ cmpType, data }) {
      const taskToSave = { ...this.task };
      if (!cmpType) taskToSave.taskTitle = this.$refs.taskTitle.innerText;
      else taskToSave[cmpType] = data;
      // FOR LATER USE!!!
      //    activity = boardService.getEmptyActivity()
      //    activity.txt = `Members changed for task ${}`
      //    activity.task = '{mini-task}'
      // const toUpdate = {taskToSave , groupId: this.group._id}
      try {
        const toUpdate = { task: taskToSave, group: this.group };
        this.$store.dispatch({ type: "saveTask", toUpdate });
      } catch (err) {
        showErrorMsg("Couldnt add task");
      }
    },
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard;
    },
    labelsOrder() {
      return this.$store.getters.currLabelsOrder;
    },
  },
  components: {
    Status,
    Priority,
    Timeline,
    Date,
    Person,
    Text,
    Files,
  },
};
</script>
