<template>
  <section class="board-header" v-if="currBoard">
    <section class="up-header flex align-center space-between">
      <section class="board-name flex align-center justify-center">
        <h1
          v-tippy="{
            content: 'Click to edit',
            theme: 'classic',
            placement: 'bottom',
            arrow: true,
          }"
          class="title editable-div"
          contenteditable="true"
          ref="boardTitle"
          @focusout="updateBoard"
        >
          {{ currBoard.title }}
        </h1>
        <div
          v-tippy="{
            content: 'Show board description',
            theme: 'classic',
            placement: 'top',
            arrow: true,
          }"
          class="icon btn-hover"
        >
          <span
            v-icon="'descrip'"
            className="icon"
            @click="toggleBoardDesc"
          ></span>
          <BoardDesc
            v-if="showBoardDesc"
            v-clickOutside="closeModal"
            @closeDesc="closeDesc"
          />
          <!-- <BlackScreen/> -->
        </div>

        <div
          v-if="!isStarred"
          @click="isStarred = !isStarred"
          v-tippy="{
            content: 'Add to favorites',
            theme: 'classic',
            placement: 'top',
            arrow: true,
          }"
          class="icon btn-hover"
          className="icon"
          v-html="getSvg('headerStar')"
        ></div>
        <div
          v-if="isStarred"
          @click="isStarred = !isStarred"
          v-tippy="{
            content: 'Remove from favorites',
            theme: 'classic',
            placement: 'top',
            arrow: true,
          }"
          className="icon"
          class="filled-star"
          v-html="getSvg('headerStarFill')"
        ></div>
      </section>
      <section class="right-up-header flex align-center justify-center">
        <div class="logged-in-user flex align-center btn-hover">
          Activity
          <img src="../assets/img/profile-icon.png" alt="" />
        </div>

        <div class="invite flex align-center btn-hover">
          <div class="icon">
            <span v-html="getSvg('invitePeople')"></span>
          </div>
          Invite / {{ this.currBoard.members.length }}
        </div>

        <div class="dots flex align-center justify-center icon btn-hover">
          <div v-html="getSvg('headerDots')"></div>
        </div>
      </section>
    </section>
    <div
      contenteditable="true"
      class="description editable-div"
      ref="boardDesc"
      @focusout="updateBoard"
    >
      {{ currBoard.description }}
    </div>
    <section class="board-view-change flex align-center">
      <div :class="{ active: active === '' }" class="view-option-container">
        <div
          v-tippy="{
            content: 'Main Table',
            theme: 'classic',
            placement: 'top',
            arrow: true,
          }"
          class="view-option flex align-center btn-hover"
          @click="switchBoardView('')"
        >
          <div v-html="getSvg('headerHome')"></div>
          Main Table
        </div>
      </div>
      <div
        :class="{ active: active === 'kanban' }"
        class="view-option-container"
        @click="switchBoardView('kanban')"
      >
        <div
          v-tippy="{
            content: 'Kanban',
            theme: 'classic',
            placement: 'top',
            arrow: true,
          }"
          class="view-option flex align-center btn-hover"
        >
          Kanban
        </div>
      </div>
      <div
        :class="{ active: active === 'dashboard' }"
        class="view-option-container"
        @click="switchBoardView('dashboard')"
      >
        <div
          v-tippy="{
            content: 'Dashboard',
            theme: 'classic',
            placement: 'top',
            arrow: true,
          }"
          class="view-option flex align-center btn-hover"
        >
          Dashboard
        </div>
      </div>
    </section>
    <section class="bottom-header flex align-center">
      <div class="new-item flex justify-center align-center" @click="addTask">
        New Task
      </div>
      <button class="add-group-arrow"
        v-tippy="{
          content: 'New Group',
          theme: 'classic',
          placement: 'top',
          arrow: true,
        }"
        @click="addGroup"
      >
        <span v-icon="'arrowDownB'"></span>
      </button>
      <div class="bottom-header-btn btn-hover search-div">
        <div
          class="search-icon flex justify-center align-center"
          v-html="getSvg('headerSearch')"
        ></div>
        <input
          type="text"
          placeholder="Search"
          class="header-search"
          v-model="searchQuery"
          @input="onSearchDeb"
        />
      </div>
      <div
        v-tippy="{
          content: 'Filter by person',
          theme: 'classic',
          placement: 'top',
          arrow: true,
        }"
        class="bottom-header-btn btn-hover"
        @click="togglePersonModal"
      >
        <div
          class="flex justify-center align-center"
          v-html="getSvg('headerPerson')"
        ></div>
        <MainPersonFilter v-if="showPersonFilter" v-clickOutside="closeModal" />
        Person
      </div>
      <div
        v-tippy="{
          content: 'Filter by anything',
          theme: 'classic',
          placement: 'top',
          arrow: true,
        }"
        class="bottom-header-btn btn-hover"
        @click="toggleFilterModal"
      >
        <div
          class="flex justify-center align-center"
          v-html="getSvg('filter')"
        ></div>
        <MainFilter v-if="showFilter" v-clickOutside="closeModal" />
        Filter
      </div>
      <div
        v-tippy="{
          content: 'Sort by any column',
          theme: 'classic',
          placement: 'top',
          arrow: true,
        }"
        class="bottom-header-btn btn-hover"
      >
        <div
          class="flex justify-center align-center"
          v-html="getSvg('sort')"
        ></div>
        Sort
      </div>
      <div
        v-tippy="{
          content: 'Hidden columns',
          theme: 'classic',
          placement: 'top',
          arrow: true,
        }"
        class="bottom-header-btn btn-hover"
      >
        <div
          class="flex justify-center align-center"
          v-html="getSvg('hide')"
        ></div>
        Hide
      </div>
    </section>
  </section>
</template>

<script>
import { boardService } from '../services/board.service.local.js'
import { svgService } from '../services/svg.service.js'
import MainFilter from './MainFilter.vue'
import MainPersonFilter from './MainPersonFilter.vue'
import { utilService } from '../services/util.service.js'
import { eventBus } from '../services/event-bus.service'
import BoardDesc from './BoardDesc.vue'

export default {
  name: 'BoardHeader',
  created() {
    this.onSearchDeb = utilService.debounce(this.onSearch, 800)
    eventBus.on('clearSearch', () => {
      this.searchQuery = ''
      this.$store.commit('setFilterBy', this.searchQuery)
    })
  },
  data() {
    return {
      active: '',
      task: boardService.getEmptyTask(),
      showFilter: false,
      showPersonFilter: false,
      searchQuery: '',
      showBoardDesc: false,
      isStarred: false,
    }
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
    switchBoardView(routerName) {
      this.active = routerName
      this.$router.push(`/board/${this.currBoard._id}/${routerName}`)
    },
    updateBoard() {
      const board = JSON.parse(JSON.stringify(this.currBoard))
      board.description = this.$refs.boardDesc.innerText
      board.title = this.$refs.boardTitle.innerText
      this.$store.dispatch({ type: 'updateBoard', board })
    },
    addTask() {
      const group = JSON.parse(JSON.stringify(this.currBoard)).groups[0]
      group.tasks.unshift({ ...this.task })
      this.task.taskTitle = 'New Task'
      const toUpdate = { task: this.task, group }
      this.$store.dispatch({ type: 'saveTask', toUpdate })
      this.task = boardService.getEmptyTask()
    },
    toggleFilterModal() {
      this.showFilter = !this.showFilter
    },
    togglePersonModal() {
      this.showPersonFilter = !this.showPersonFilter
    },
    closeModal() {
      this.showFilter = false
      this.showPersonFilter = false
      this.showBoardDesc = false
      this.$store.commit({ type: 'closeBlackScreen' })
    },
    onSearch() {
      this.$store.commit({ type: 'setFilterBy', searchQuery: this.searchQuery })
    },
    toggleBoardDesc() {
      this.showBoardDesc = !this.showBoardDesc
      this.$store.commit({ type: 'toggleBlackScreen' })
    },
    closeDesc() {
      this.showBoardDesc = false
    },
    addGroup() {
      const newGroup = {
        title: 'New Group',
        color: '#e2445c',
        tasks: [],
      }
      this.$store.dispatch({ type: 'saveTask', toUpdate: { group: newGroup } })
    },
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
  },
  components: {
    MainFilter,
    MainPersonFilter,
    BoardDesc,
  },
}
</script>
