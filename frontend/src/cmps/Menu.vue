<template>
  <div class="menu-component-wrapper flex justify-center">
    <div class="actions flex">
      <div class="num flex justify-center align-center">
        {{ tasksCount }}
      </div>
      <div class="action-title flex justify-center column">
        <div class="title">{{ title }}</div>
      </div>
      <section class="action-btns flex">
      <div
        @click="handleTasks('duplicate')"
        class="duplicate-wrapper item flex column align-center pointer"
      >
        <span v-icon="'duplicate'" class="icon"></span>
        <span>Duplicate</span>
      </div>
      <div
        @click="handleTasks('remove')"
        class="trash-wrapper item flex column align-center pointer"
      >
        <span v-icon="'menuTrash'" class="icon"></span>
        <span>Delete</span>
      </div>
    </section>
      <div
        @click="clearSelected"
        class="action-delete flex justify-center align-center"
      >
        <span class="icon-delete"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../services/event-bus.service'
import { utilService } from '../services/util.service'
export default {
  props: {
    selectedTasks: Object,
  },
  data() {
    return {}
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
    tasksCount() {
      const tasksCount = Object.keys(this.selectedTasks).reduce((acc, key) => {
        if (Array.isArray(this.selectedTasks[key])) {
          return acc + this.selectedTasks[key].length
        }
        return acc
      }, 0)
      return tasksCount
    },
    title() {
      if (this.tasksCount === 1) return 'Task selected'
      else return 'Tasks selected'
    },
  },
  methods: {
    handleTasks(todo) {
      const board = JSON.parse(JSON.stringify(this.currBoard))
      Object.keys(this.selectedTasks).forEach((key) => {
        const groupIdx = board.groups.findIndex((g) => g._id === key)
        this.selectedTasks[key].forEach((task) => {
          const taskIdx = board.groups[groupIdx].tasks.findIndex(
            (t) => t.id === task.id
          )
          if (todo === 'remove') {
            board.groups[groupIdx].tasks.splice(taskIdx, 1)
          } else {
            const copy = JSON.parse(JSON.stringify(task))
            copy.id = utilService.makeId()
            copy.taskTitle = task.taskTitle + ' (copy)'
            board.groups[groupIdx].tasks.splice(taskIdx + 1, 0, copy)
          }
        })
      })
      this.$store.dispatch({ type: 'updateBoard', board })
      this.clearSelected()
    },
    clearSelected() {
      this.$emit('clearSelected')
      eventBus.emit('clearChecked')
    },
  },
}
</script>
