<template>
  <section class="group-grid task-row" :class="{ 'active-row': isSelected }">
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
      v-clickOutside="toggleEdit"
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
        <span
          @click="openCon"
          v-tippy="{
            content: 'Open task page',
            theme: 'classic',
            placement: 'top',
            arrow: true,
          }"
          class="open-con flex align-center space-between"
        >
          <button class="svg">
            <div className="icon" v-html="getSvg('openCon')"></div>
          </button>
          Open
        </span>
      </div>
      <div
        v-tippy="{
          content: 'Start conversation',
          theme: 'classic',
          placement: 'top',
          arrow: true,
        }"
        class="conversation-wrapper flex align-center justify-center"
      >
        <button v-if="task.msgs.length === 0" @click="openCon" class="svg">
          <div v-html="getSvg('con')"></div>
        </button>
        <button v-if="task.msgs.length > 0" @click="openCon" class="svg">
          <div class="multi-con" v-html="getSvg('multiCon')"></div>
          <span class="updates-count">{{ task.msgs.length }}</span>
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
    <EmptyProgress class="last" :style="{ width: 'auto' }" />
  </section>
</template>

<script>
import { svgService } from '../services/svg.service'
import { Container, Draggable } from 'vue3-smooth-dnd'
import { utilService } from '../services/util.service'
import EditMenu from './EditMenu.vue'
import Status from './dynamicCmps/StatusPicker.vue'
import Priority from './dynamicCmps/PriorityPicker.vue'
import Timeline from './dynamicCmps/TimelinePicker.vue'
import Date from './dynamicCmps/DatePicker.vue'
import Person from './dynamicCmps/PersonPicker.vue'
import Text from './dynamicCmps/TextArea.vue'
import Files from './dynamicCmps/FilesPicker.vue'
import { eventBus } from '../services/event-bus.service'
import EmptyProgress from './dynamicCmps/EmptyProgress.vue'
import { boardService } from '../services/board.service.local'

export default {
  emits: ['saveTask', 'remove', 'addSelected', 'removeSelected'],
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
    }
  },
  created() {
    eventBus.on('clearChecked', () => {
      console.log('clearing')
      this.isSelected = false
    })
    eventBus.on('addSelected', (groupId) => {
      if (groupId === this.group._id) {
        this.isSelected = true
        this.$emit('addSelected', this.task)
      }
    })
    eventBus.on('removeSelected', (groupId) => {
      if (groupId === this.group._id) {
        this.isSelected = false
        this.$emit('removeSelected', this.task)
      }
    })
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
    updateTask({ cmpType, data }) {
      const activity = boardService.getEmptyActivity()
      const taskToSave = { ...this.task }
      if (!cmpType) {
        taskToSave.taskTitle = this.$refs.taskTitle.innerText
        console.log(taskToSave.taskTitle)
        cmpType = 'taskTitle'
      } else taskToSave[cmpType] = data
      console.log(this.task[cmpType])
      activity.from = this.task[cmpType]
      if (cmpType === 'taskTitle') activity.to = taskToSave.taskTitle
      else activity.to = data
      activity.changed = cmpType
      activity.taskTitle = this.task.taskTitle
      this.$store.commit({ type: 'setBoardActivity', activity })
      this.$emit('saveTask', taskToSave)
    },
    openCon() {
      this.isSelected = true
      this.$router.push(
        '/board/' + this.currBoardId + '/taskDetails/' + this.task.id
      )
      this.$store.commit({ type: 'setCurrGroup', group: this.group })
    },
    toggleEdit() {
      this.isEditOpen = !this.isEditOpen
    },
    removeTask(toRemove) {
      this.$emit('remove', toRemove)
    },
    selectTask() {
      if (this.$refs.checkbox.checked) {
        this.isSelected = true
        this.$emit('addSelected', this.task)
      } else {
        this.isSelected = false
        this.$emit('removeSelected', this.task.id)
      }
    },
  },
  computed: {
    currBoardId() {
      return this.$store.getters.currBoard._id
    },
    currBoard() {
      return this.$store.getters.currBoard
    },
    isChecked() {
      return this.isSelected
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
    EmptyProgress,
  },
}
</script>
