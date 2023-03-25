<template>
  <!-- Group title section-->
  <section
    class="group-grid group-title flex align-center"
    v-if="!group.isCollapse"
  >
    <div
      class="more more-group sticky flex justify-center align-center"
      @click="toggleEdit"
      v-html="getSvg('Dots')"
    ></div>
    <EditMenu v-if="isEditOpen" :groupId="group._id" @remove="remove" />
    <div
      class="task-border sticky"
      :style="{ 'background-color': group.color }"
    ></div>
    <div
      @click="collapse(true)"
      class="arrow-down sticky"
      v-html="getSvg('arrowDownB')"
      :style="{ fill: group.color }"
    ></div>
    <div
      class="title-wrapper flex align-center sticky"
      :class="{ focused: isTitleFocused }"
    >
      <button
        class="color-icon span-color"
        v-show="titleFocus"
        :style="{ 'background-color': group.color }"
        @click.stop="!showColorPicker"
      ></button>
      <div
        class="title-input editable-div"
        contenteditable="true"
        ref="groupTitle"
        @focusout="updateGroup"
        :style="{ color: group.color }"
        @focusin="titleFocus = !titleFocus"
        :class="{ focused: isTitleFocused }"
      >
        <h4>{{ group.title }}</h4>
      </div>
      <span class="tasks-count">{{ tasksCount }} tasks</span>
    </div>
  </section>

  <!-- Group content -->
  <section class="group-content" v-if="!group.isCollapse">
    <section class="group-grid labels-grid">
      <div class="empty sticky"></div>
      <div
        class="task-border sticky"
        :style="{ 'background-color': group.color }"
      ></div>
      <div class="sticky check-box cell1">
        <input
          @change="selectGroup"
          ref="groupCheckbox"
          type="checkbox"
          class="checkbox"
        />
      </div>
      <div class="sticky task cell1">Tasks</div>

      <!-- Labels drag container -->
      <Container
        class="horizontal labels-container"
        orientation="horizontal"
        group-name="labels"
        tag="div"
        @drop="onLabelDrop($event)"
      >
        <Draggable
          class="label cell1"
          v-for="(label, idx) in labelsOrder"
          :key="idx"
        >
          {{ label }}
        </Draggable>
      </Container>
    </section>
    <!-- Tasks drag container -->
    <Container
      class="smooth-dnd-container"
      orientation="vertical"
      group-name="tasks"
      tag="div"
      :shouldAcceptDrop="(e, payload) => e.groupName === 'tasks'"
      :get-child-payload="getTaskPayload(group._id)"
      @drop="onTaskDrop(group._id, $event)"
    >
      <Draggable
        v-for="(task, idx) in group.tasks"
        :key="idx"
        :class="{ selected: isSelected }"
      >
        <TaskPreview
          :task="task"
          :labels="labelsOrder"
          :group="group"
          @saveTask="saveGroup"
          @remove="remove"
          @addSelected="addSelected"
          @removeSelected="removeSelected"
        />
      </Draggable>
      <AddTask :group="group" @addTask="saveGroup" />
      <ProgressBar :labelsOrder="labelsOrder" :group="group" />
    </Container>
  </section>
  <GroupCollapse
    v-if="group.isCollapse"
    :group="group"
    :labelsOrder="labelsOrder"
    @collapse="collapse"
  />
  <ColorPicker
    v-if="showColorPicker"
    :groupColor="group.color"
    @updateColor="updateGroup"
  />
</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd";
import { svgService } from "../services/svg.service.js";
import { utilService } from "../services/util.service";
import TaskPreview from "./TaskPreview.vue";
import EditMenu from "./EditMenu.vue";
import AddTask from "./AddTask.vue";
import ProgressBar from "./ProgressBar.vue";
import ColorPicker from "../cmps/dynamicCmps/ColorPicker.vue";
import { eventBus, showErrorMsg } from "../services/event-bus.service.js";
import GroupCollapse from "./GroupCollapse.vue";

export default {
  emits: ["labelDrop", "updateTask", "addSelected", "removeSelected"],
  props: {
    group: Object,
    labelsOrder: Array,
  },
  data() {
    return {
      titleFocus: false,
      isEditOpen: false,
      showColorPicker: false,
      board: null,
    };
  },
  created() {
    this.board = JSON.parse(JSON.stringify(this.$store.getters.currBoard));
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
    onLabelDrop(dropResult) {
      this.$emit("labelDrop", dropResult);
    },
    taskDrop(dropResult) {
      let group = JSON.parse(JSON.stringify(this.group));
      group.tasks = utilService.applyDrag(group.tasks, dropResult);
      this.group.tasks = group.tasks;
    },
    toggleEdit() {
      this.isEditOpen = !this.isEditOpen;
    },
    updateGroup({ toChange, data }) {
      const newGroup = JSON.parse(JSON.stringify(this.group));
      if (!toChange) newGroup.title = this.$refs.groupTitle.innerText;
      else newGroup[toChange] = data;
      this.saveGroup(null, newGroup);
    },
    collapse(isCollapse) {
      this.group.isCollapse = isCollapse;
      this.updateGroup({ toChange: "isCollapse", data: isCollapse });
    },
    async saveGroup(task, group = this.group) {
      //    activity = boardService.getEmptyActivity()
      //    activity.txt = `Members changed for task ${}`
      //    activity.task = '{mini-task}'
      try {
        const toUpdate = { task, group };
        this.$store.dispatch({ type: "saveTask", toUpdate });
      } catch (err) {
        showErrorMsg("Couldnt add task");
      }
    },
    remove(toRemove) {
      this.$store.dispatch({ type: "remove", toRemove });
    },
    toggleModal() {
      this.showColorPicker = !this.showColorPicker;
    },
    onTaskDrop(groupId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const group = JSON.parse(JSON.stringify(this.group));
        const groupIdx = this.board.groups.findIndex((g) => g._id === groupId);
        const newGroup = JSON.parse(JSON.stringify(group));

        newGroup.tasks = utilService.applyDrag(newGroup.tasks, dropResult);
        this.board.groups.splice(groupIdx, 1, newGroup);
        // this.board.groups.splice(groupIdx , 1 , newGroup)
        // newTasks = utilService.applyDrag(newTasks, dropResult);
        // console.log('newTasks', newTasks)
        // this.group.tasks = newTasks
      } else {
        this.taskDrop(dropResult);
      }
    },
    getTaskPayload(groupId) {
      return (index) => {
        return this.board.groups.filter((g) => g._id === groupId)[0].tasks[
          index
        ];
      };
    },
    addSelected(task) {
      this.$emit("addSelected", { group: this.group, task });
    },
    removeSelected(taskId) {
      this.$emit("removeSelected", { group: this.group, taskId });
    },
    selectGroup() {
      if (this.$refs.groupCheckbox.checked) {
        eventBus.emit("addSelected", this.group._id);
      } else {
        eventBus.emit("removeSelected", this.group._id);
      }
    },
  },
  computed: {
    isTitleFocused() {
      if (this.titleFocus) return true;
      else return false;
    },
    currBoard() {
      return this.$store.getters.currBoard;
    },
    tasksCount() {
      return this.group.tasks.length;
    },
  },
  components: {
    Container,
    Draggable,
    TaskPreview,
    EditMenu,
    AddTask,
    ProgressBar,
    ColorPicker,
    GroupCollapse,
  },
};
</script>
