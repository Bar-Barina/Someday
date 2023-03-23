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
      drag-class="bg-primary dark:bg-primary 
            border-2 border-primary-hover text-white 
            transition duration-100 ease-in z-50
            transform rotate-6 scale-110"
      drop-class="transition duration-100 
            ease-in z-50 transform 
            -rotate-2 scale-90"
      tag="div"
      @drop="onTaskDrop($event)"
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
import { Container, Draggable } from 'vue3-smooth-dnd'
import { svgService } from '../services/svg.service.js'
import { utilService } from '../services/util.service'
import TaskPreview from './TaskPreview.vue'
import EditMenu from './EditMenu.vue'
import AddTask from './AddTask.vue'
import ProgressBar from './ProgressBar.vue'
import ColorPicker from '../cmps/dynamicCmps/ColorPicker.vue'

export default {
  emits: ['labelDrop', 'updateTask'],
  props: {
    group: Object,
    labelsOrder: Array,
  },
  data() {
    return {
      titleFocus: false,
      isEditOpen: false,
      showColorPicker: true,
    }
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
    onLabelDrop(dropResult) {
      this.$emit('labelDrop', dropResult)
    },
    onTaskDrop(dropResult) {
      let scene = JSON.parse(JSON.stringify(this.group.tasks))
      scene = utilService.applyDrag(scene, dropResult)
      this.group.tasks = scene
    },
    toggleEdit() {
      this.isEditOpen = !this.isEditOpen
    },
    updateGroup({ toChange, data }) {
      if (!toChange) this.group.title = this.$refs.groupTitle.innerText
      else this.group[toChange] = data
      this.saveGroup()
    },
    saveGroup(task) {
      //    activity = boardService.getEmptyActivity()
      //    activity.txt = `Members changed for task ${}`
      //    activity.task = '{mini-task}'
      const toUpdate = { task, group: this.group }
      this.$store.dispatch({ type: 'saveTask', toUpdate })
    },
    remove(toRemove) {
      this.$store.dispatch({ type: 'remove', toRemove })
    },
    toggleModal() {
      this.showColorPicker = !this.showColorPicker
    },
  },
  computed: {
    isTitleFocused() {
      if (this.titleFocus) return true
      else return false
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
}
</script>
