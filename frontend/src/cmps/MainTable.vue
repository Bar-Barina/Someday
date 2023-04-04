<template>
  <Container
    v-if="currBoard && currBoard.groups.length"
    class="main-table"
    orientation="vertical"
    @drop="onGroupDrop($event)"
    :drag-class="'group-drag'"
    :drop-placeholder="{
      className: 'group-placeholder',
      animationDuration: '200',
      showOnTop: true,
    }"
  >
    <!-- <section class="table"> -->
    <Draggable
      class="group-container"
      v-for="group in currBoard.groups"
      :key="group"
    >
      <GroupPreview
        :group="group"
        :labelsOrder="currLabelsOrder"
        @labelDrop="labelDrop"
        @addSelected="addSelected"
        @removeSelected="removeSelected"
        @updateDragGroup="updateDragGroup"
      ></GroupPreview>
      <RouterView />
    </Draggable>
    <Menu
      v-if="isSelected > 0"
      :selectedTasks="selectedTasks"
      :groupColors="groupColors"
      @clearSelected="clearSelected"
    />
    <div class="Add-new-group flex align-center" @click="addGroup">
      <span v-html="getSvg('plus')"></span>
      <button>Add new group</button>
    </div>
    <!-- </section> -->
  </Container>
  <!-- <NoResultsFound
  v-if="currBoard.groups.length === 0"
    @clearSearch="clearSearch"
  /> -->
  <div @click="showAddOptions = !showAddOptions" class="mobile-plus">
    <span
      v-icon="'x'"
      :style="{ rotate: showAddOptions}"
    ></span>
  </div>

  <section v-if="showAddOptions" class="add-new-mobile">
    <div class="mobile-icon-container flex align-center">
      <span class="icon-mobile-text task">New Task</span>
      <div class="add-group-moblie icon-moblie" @click="addTask">
        <span v-icon="'mobileAddTask'"></span>
      </div>
    </div>
    <div class="mobile-icon-container flex align-center">
      <span class="icon-mobile-text group">New Group</span>
      <div class="add-task-moblie icon-moblie" @click="addGroupMobile">
        <span v-icon="'mobileAddGroup'"></span>
      </div>
    </div>
  </section>
</template>

<script>
import BoardHeader from '../cmps/BoardHeader.vue'
import { Container, Draggable } from 'vue3-smooth-dnd'
import GroupPreview from './GroupPreview.vue'
import { utilService } from '../services/util.service'
import Menu from '../cmps/Menu.vue'
import { svgService } from '../services/svg.service.js'
import { eventBus } from '../services/event-bus.service'
import GroupDrag from './GroupDrag.vue'
import NoResultsFound from './NoResultsFound.vue'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { boardService } from '../services/board.service.local.js'
export default {
  data() {
    return {
      board: null,
      groups: null,
      showAddOptions: false,
      task: boardService.getEmptyTask(),
      labelsOrder: [
        'Date',
        'Text',
        'Priority',
        'Person',
        'Files',
        'Status',
        'Timeline',
      ],
      selectedTasks: {},
      groupColors: [],
      newBoard: this.currBoard,
    }
  },
  created() {},
  methods: {
    onGroupDrop(dropResult) {
      const board = JSON.parse(JSON.stringify(this.currBoard))
      let groups = board.groups
      groups = utilService.applyDrag(groups, dropResult)
      board.groups = groups
      this.$store.dispatch({ type: 'updateBoard', board })
    },
    labelDrop(dropResult) {
      let newLabels = [...this.currLabelsOrder]
      newLabels = utilService.applyDrag(newLabels, dropResult)
      const board = this.currBoard
      board.labelsOrder = newLabels
      this.$store.dispatch({ type: 'updateBoard', board })
    },
    addSelected({ group, task }) {
      if (!this.selectedTasks[group._id]) this.selectedTasks[group._id] = []
      this.selectedTasks[group._id].push(task)
      this.groupColors.push(group.color)
    },
    removeSelected({ group, taskId }) {
      const taskIdx = this.selectedTasks[group._id].findIndex(
        (t) => t.id === taskId
      )
      this.selectedTasks[group._id].splice(taskIdx, 1)
      const colorIdx = this.groupColors.findIndex((c) => c === group.color)
      this.groupColors.splice(colorIdx, 1)
      if (this.selectedTasks[group._id].length === 0)
        delete this.selectedTasks[group._id]
    },
    clearSelected() {
      this.groupColors = []
      this.selectedTasks = {}
    },
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
    addGroup() {
      const newGroup = {
        title: 'New Group',
        color: '#e2445c',
        tasks: [],
      }
      this.$store.dispatch({ type: 'saveTask', toUpdate: { group: newGroup } })
      const msg = 'New group added'
      showSuccessMsg(msg)
      // this.showAddOptions = !this.showAddOptions
    },
    addGroupMobile() {
      const newGroup = {
        title: 'New Group',
        color: '#e2445c',
        tasks: [],
      }
      this.$store.dispatch({ type: 'saveTask', toUpdate: { group: newGroup } })
      const msg = 'New group added'
      showSuccessMsg(msg)
      this.showAddOptions = !this.showAddOptions
    },
    updateDragGroup(group) {
      const board = this.currBoard
      const groupIdx = board.groups.findIndex((g) => g._id === group._id)
      board.groups.splice(groupIdx, 1, group)
      this.$store.dispatch({ type: 'updateBoard', board })
    },
    clearSearch() {
      eventBus.emit('clearSearch')
    },
    addTask() {
      const group = JSON.parse(JSON.stringify(this.currBoard)).groups[0]
      group.tasks.unshift({ ...this.task })
      this.task.taskTitle = 'New Task'
      const toUpdate = { task: this.task, group }
      this.$store.dispatch({ type: 'saveTask', toUpdate })
      this.task = boardService.getEmptyTask()
      const msg = 'New task added'
      showSuccessMsg(msg)
      this.showAddOptions = !this.showAddOptions
    },
  },
  computed: {
    currBoard() {
      return JSON.parse(JSON.stringify(this.$store.getters.currBoard))
    },
    isSelected() {
      return Object.keys(this.selectedTasks).length
    },
    currLabelsOrder() {
      return this.currBoard.labelsOrder
    },
  },
  components: {
    GroupPreview,
    Container,
    Draggable,
    Menu,
    GroupDrag,
    NoResultsFound,
    BoardHeader,
  },
}
</script>
