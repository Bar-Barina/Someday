<template>
  <Container
    v-if="currBoard"
    class="main-table"
    orientation="vertical"
    @drop="onGroupDrop($event)"
  >
    <Draggable
      class="group-container"
      v-for="group in currBoard.groups"
      :key="group"
    >
      <GroupPreview
        :group="group"
        :labelsOrder="labelsOrder"
        @labelDrop="labelDrop"
        @addSelected="addSelected"
        @removeSelected="removeSelected"
      ></GroupPreview>
      <RouterView />
    </Draggable>
    <Menu
      v-if="isSelected > 0"
      :selectedTasks="selectedTasks"
      @clearSelected="clearSelected"
    />
    <div class="Add-new-group flex align-center" @click="addGroup">
      <span v-html="getSvg('plus')"></span>
      <button>Add new group</button>
    </div>
  </Container>
</template>

<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import GroupPreview from './GroupPreview.vue'
import { utilService } from '../services/util.service'
import Menu from '../cmps/Menu.vue'
import { svgService } from '../services/svg.service.js'

export default {
  emits: ['labelDrop'],
  data() {
    return {
      board: null,
      groups: null,
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
      newBoard: this.currBoard,
    }
  },
  methods: {
    onGroupDrop(dropResult) {
      const board = JSON.parse(JSON.stringify(this.currBoard))
      let groups = board.groups
      groups = utilService.applyDrag(groups, dropResult)
      board.groups = groups
      this.$store.dispatch({ type: 'updateBoard', board })
    },
    labelDrop(dropResult) {
      let scene = [...this.labelsOrder]
      scene = utilService.applyDrag(scene, dropResult)
      this.labelsOrder = scene
    },
    addSelected({ group, task }) {
      if (!this.selectedTasks[group._id]) this.selectedTasks[group._id] = []
      this.selectedTasks[group._id].push(task)
    },
    removeSelected({ group, taskId }) {
      const taskIdx = this.selectedTasks[group._id].findIndex(
        (t) => t.id === taskId
      )
      this.selectedTasks[group._id].splice(taskIdx, 1)
      if (this.selectedTasks[group._id].length === 0)
        delete this.selectedTasks[group._id]
    },
    clearSelected() {
      this.selectedTasks = {}
    },
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
    addGroup() {
      const newGroup = {
        title: 'Full Stack',
        color: '#e2445c',
        tasks: [],
      }
      this.$store.dispatch({ type: 'saveTask', toUpdate: { group: newGroup } })
    },
  },
  computed: {
    currBoard() {
      return JSON.parse(JSON.stringify(this.$store.getters.currBoard))
    },
    isSelected() {
      return Object.keys(this.selectedTasks).length
    },
  },
  components: {
    GroupPreview,
    Container,
    Draggable,
    Menu,
  },
}
</script>
