<template>
  <div
    @click="toggleEdit"
    class="align-center more-task sticky flex justify-center"
  >
    <div
      class="more flex justify-center align-center"
      v-html="getSvg('Dots')"
    ></div>
  </div>
  <EditMenu
    v-if="isEditOpen"
    :groupId="group._id"
    :taskId="task.id"
    @remove="removeTask"
  />
  <div
    class="task-border sticky"
    :style="{ 'background-color': group.color }"
  ></div>
  <div class="flex sticky align-center cell1 flex-justify third">
    <input
      type="checkbox"
      ref="checkbox"
      :checked="isChecked"
      @change="selectTask"
    />
  </div>
  <section class="task-title cell1 sticky flex align-center space-between">
    <div class="task-title-sub flex align-center space-between">
      <div
        class="flex align-center content-edit editable-div"
        @click="isActive = true"
        contenteditable="true"
        :class="{ active: isActive }"
        ref="taskTitle"
        @focusout="updateTask"
      >
        <span>{{ task.taskTitle }}</span>
      </div>
      <span @click="openCon" class="open-con flex align-center space-between">
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
    <component
      :is="cmp"
      :task="task"
      :group="group"
      @updateTask="updateTask"
    ></component>
  </section>
</template>

<script>
import { svgService } from "../services/svg.service";
import { Container, Draggable } from "vue3-smooth-dnd";
import { utilService } from "../services/util.service";
import EditMenu from "./EditMenu.vue";
import Status from "./dynamicCmps/StatusPicker.vue";
import Priority from "./dynamicCmps/PriorityPicker.vue";
import Timeline from "./dynamicCmps/TimelinePicker.vue";
import Date from "./dynamicCmps/DatePicker.vue";
import Person from "./dynamicCmps/PersonPicker.vue";
import Text from "./dynamicCmps/TextArea.vue";
import Files from "./dynamicCmps/FilesPicker.vue";
import { eventBus } from "../services/event-bus.service";

export default {
  emits: ["saveTask", "remove", "addSelected", "removeSelected"],
  props: {
    labels: Array,
    task: Object,
    group: Object,
  },
  data() {
    return {
      isEditOpen: false,
      isActive: false,
      isSelected: false,
    };
  },
  created() {
    eventBus.on("clearChecked", () => {
      console.log("clearing");
      this.isSelected = false;
    });
    eventBus.on("addSelected", (groupId) => {
      if (groupId === this.group._id) {
        this.isSelected = true;
        this.$emit("addSelected", this.task);
      }
    });
    eventBus.on("removeSelected", (groupId) => {
      if (groupId === this.group._id) {
        this.isSelected = false;
        this.$emit("removeSelected", this.task);
      }
    });
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
    updateTask({ cmpType, data }) {
      const taskToSave = { ...this.task };
      if (!cmpType) taskToSave.taskTitle = this.$refs.taskTitle.innerText;
      else taskToSave[cmpType] = data;
      //    activity = boardService.getEmptyActivity()
      //    activity.txt = `Members changed for task ${}`
      //    activity.task = '{mini-task}'
      // const toUpdate = {taskToSave , groupId: this.group._id}
      this.$emit("saveTask", taskToSave);
    },
    openCon() {
      this.$router.push(
        "/board/" + this.currBoardId + "/taskDetails/" + this.task.id
      );
      this.$store.commit({ type: "setCurrGroup", group: this.group });
    },
    toggleEdit() {
      this.isEditOpen = !this.isEditOpen;
    },
    removeTask(toRemove) {
      this.$emit("remove", toRemove);
    },
    selectTask() {
      if (this.$refs.checkbox.checked) {
        this.task.isSelected = true;
        this.$emit("addSelected", this.task);
      } else {
        this.task.isSelected = false;
        this.$emit("removeSelected", this.task.id);
      }
    },
  },
  computed: {
    currBoardId() {
      return this.$store.getters.currBoard._id;
    },
    currBoard() {
      return this.$store.getters.currBoard;
    },
    isChecked() {
      return this.isSelected;
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
    Text,
    Files,
  },
};
</script>