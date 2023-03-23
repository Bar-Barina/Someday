<template>
  <!-- Group title section-->
  <section class="group-grid group-title flex align-center">
    <div
      class="more more-group sticky flex justify-center"
      @click="toggleEdit"
      v-html="getSvg('Dots')"
    ></div>
    <EditMenu v-if="isEditOpen" :groupId="group._id" @remove="remove" />
    <div
      class="task-border sticky"
      :style="{ 'background-color': group.color }"
    ></div>
    <div
      class="arrow-down sticky"
      v-html="getSvg('arrowDownB')"
      :style="{ fill: group.color }"
    ></div>
    <div class="title-wrapper flex align-center sticky">
      <div
        v-show="titleFocus"
        class="color-icon span-color"
        :style="{ 'background-color': group.color }"
        @click="toggleModal"
      >
        <ColorPicker
          v-if="showColorPicker"
          :groupColor="group.color"
          @updateColor="updateGroup"
        />
      </div>
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
    </div>
  </section>

  <!-- Group content -->
  <section class="group-content">
    <section class="group-grid labels-grid">
      <div class="empty sticky"></div>
      <div
        class="task-border sticky"
        :style="{ 'background-color': group.color }"
      ></div>
      <div class="sticky check-box cell1">
        <input type="checkbox" class="checkbox" />
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
      :get-child-payload="getGroupPayload(group._id)"
      @drop="onTaskDrop(group._id, $event)"
    >
      <Draggable
        class="group-grid task-row"
        v-for="(task, idx) in group.tasks"
        :key="idx"
      >
        <TaskPreview
          :task="task"
          :labels="labelsOrder"
          :group="group"
          @saveTask="saveGroup"
          @remove="remove"
        />
      </Draggable>
      <AddTask :group="group" @addTask="saveGroup" />
      <ProgressBar :labelsOrder="labelsOrder" />
    </Container>
  </section>
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
import { showErrorMsg } from "../services/event-bus.service.js";

export default {
  emits: ["labelDrop", "updateTask"],
  props: {
    group: Object,
    labelsOrder: Array,
  },
  data() {
    return {
      titleFocus: false,
      isEditOpen: false,
      showColorPicker: true,
    };
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
    onLabelDrop(dropResult) {
      this.$emit("labelDrop", dropResult);
    },
    // onTaskDrop(dropResult) {
    //   let tasks = JSON.parse(JSON.stringify(this.group.tasks))
    //   tasks = utilService.applyDrag(tasks, dropResult)
    //   this.group.tasks = tasks
    // },
    toggleEdit() {
      this.isEditOpen = !this.isEditOpen;
    },
    updateGroup({ toChange, data }) {
      if (!toChange) this.group.title = this.$refs.groupTitle.innerText;
      else this.group[toChange] = data;
      this.saveGroup();
    },
    async saveGroup(task) {
      //    activity = boardService.getEmptyActivity()
      //    activity.txt = `Members changed for task ${}`
      //    activity.task = '{mini-task}'
      try {
        const toUpdate = { task, group: this.group };
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
      // check if element where ADDED or REMOVED in current collumn
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const board = JSON.parse(JSON.stringify(this.currBoard));
        const group = board.groups.filter((g) => g._id === groupId)[0];
        const groupIdx = board.groups.indexOf(group);
        const newGroup = JSON.parse(JSON.stringify(group));

        // check if element was ADDED in current column
        if (dropResult.removedIndex == null && dropResult.addedIndex >= 0) {
          // your action / api call
          newGroup.tasks = utilService.applyDrag(newGroup.tasks, dropResult);
          board.groups.splice(groupIdx, 1, newGroup);
          this.$store.dispatch({ type: "updateBoard", board });
          return;
          // board.groups[groupIdx] = group
          // dropResult.payload.loading = true
          // simulate api call
          // setTimeout(function(){ dropResult.payload.loading = false }, (Math.random() * 5000) + 1000);
        }
        newGroup.tasks = utilService.applyDrag(newGroup.tasks, dropResult);
        board.groups.splice(groupIdx, 1, newGroup);
        this.$store.dispatch({ type: "updateBoard", board });
      }
    },
    getGroupPayload(groupId) {
      return (index) => {
        return this.currBoard.groups.filter((g) => g._id === groupId)[0].tasks[
          index
        ];
      };
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
  },
  components: {
    Container,
    Draggable,
    TaskPreview,
    EditMenu,
    AddTask,
    ProgressBar,
    ColorPicker,
  },
};
</script>
