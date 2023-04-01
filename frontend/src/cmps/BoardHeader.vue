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
        <div
          class="logged-in-user flex align-center btn-hover"
          @click="this.showBoardActivity = !this.showBoardActivity"
        >
          Activity
          <img
            :src="
              currUser
                ? currUser.imgUrl
                : 'https://cdn1.monday.com/dapulse_default_photo.png'
            "
            class="member-preview"
          />
        </div>
        <Activity
          v-if="showBoardActivity"
          v-clickOutside="closeActivity"
          @closeActivity="closeActivity"
        />

        <div
          class="invite flex align-center btn-hover"
          @click="showInvite = true"
        >
          <div class="icon">
            <span v-html="getSvg('invitePeople')"></span>
          </div>
          Invite / {{ this.currBoard.members.length }}
        </div>
         <Invite v-if="showInvite" @updateBoard="updateMembers" @closeInvite="closeInvite"  v-clickOutside="closeInvite" />
        <div class="dots flex align-center justify-center icon btn-hover">
          <div v-html="getSvg('headerDots')"></div>
        </div>
      </section>
    </section>
    <div class="description flex align-items" @click="toggleBoardDesc">
      <span class="header-desc">{{ currBoard.description }}</span>
      <span class="see-more">See More</span>
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
      <button
        class="add-group-arrow"
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
        :class="{ activeFilter: activeFilter === 'person' }"
        @click="togglePersonModal"
      >
        <MainPersonFilter v-if="showPersonFilter" v-clickOutside="closeModal" />
        <div
          :class="{ activePersonFilter: MemberToFilter }"
          class="member-filter flex justify-center align-center"
          v-if="MemberToFilter"
        >
          <img :src="MemberToFilter.url" alt="" />
          {{ MemberToFilter.name }}
          <span v-icon="'personX'" @click.stop="removeMemberFilter"></span>
        </div>
        <div v-else class="person-palceholder flex align-center">
          <div 
            class="flex justify-center align-center"
            v-html="getSvg('headerPerson')"
          ></div>
          Person
        </div>
      </div>
      <div  :class="{ activeFilter: activeFilter === 'filter' }"
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
        <span
          >Filter
          <span
            v-if="activeFilters.length > 0"
            :class="{ active: activeFilters.length}"
            >/ {{ activeFilters.length }}</span
          >
        </span>
      </div>
      <div :class="{ activeFilter: activeFilter === 'sort' }"
      @click="activeFilter = 'sort'"
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
      <div :class="{ activeFilter: activeFilter === 'hide' }"
        @click="toggleHideModal"
        v-tippy="{
          content: 'Hidden columns',
          theme: 'classic',
          placement: 'top',
          arrow: true,
        }"
        class="bottom-header-btn btn-hover hide-filter-btn"
      >
        <div
          class="flex justify-center align-center"
          v-html="getSvg('hide')"
        ></div>
        Hide
        <section
          @click.stop
          v-clickOutside="closeHiddenFilter"
          v-if="isHideOpen"
          class="hide-columns-filter"
        >
          <div class="column-filter-title">Choose columns to display</div>
          <div class="input-wrapper">
            <input
              class="filter-input"
              type="text"
              placeholder="Search column"
            />
          </div>
          <div
            v-for="(col, idx) in columns"
            :key="idx"
            class="flex column-div space-between"
          >
            <KanbanFilter @addCol="addCol" @removeCol="removeCol" :col="col" />
          </div>
        </section>
      </div>
      <span
        class="filterKanbanIcon"
        v-if="active"
        :class="{ active: isFilterOpen }"
        @click="toggleKanbanFilter"
        v-icon="'headerSettings'"
      ></span>
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
import Activity from './Activity.vue'
import KanbanFilter from './KanbanFilter.vue'
import Invite from './Invite.vue'

export default {
  name: 'BoardHeader',
  created() {
    this.onSearchDeb = utilService.debounce(this.onSearch, 150)
    eventBus.on('clearSearch', () => {
      this.searchQuery = ''
      this.$store.commit('setFilterBy', this.searchQuery)
    })
  },
  data() {
    return {
      activeFilter: '',
      active: '',
      task: boardService.getEmptyTask(),
      showFilter: false,
      showPersonFilter: false,
      searchQuery: '',
      showBoardDesc: false,
      isStarred: false,
      showBoardActivity: false,
      isFilterOpen: false,
      showInvite: false,
      columns: [
        'Date',
        'Text',
        'Priority',
        'Person',
        'Files',
        'Status',
        'Timeline',
      ],
      isHideOpen: false,
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
      board.title = this.$refs.boardTitle.innerText
      this.$store.dispatch({ type: 'updateBoard', board })
    },
    updateMembers(board) {
      this.$store.dispatch({ type: "updateBoard", board });
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
      this.activeFilter = 'filter'
    },
    togglePersonModal() {
      this.showPersonFilter = !this.showPersonFilter
      this.activeFilter = 'person'
    },
    toggleHideModal() {
      this.isHideOpen = !this.isHideOpen
      this.activeFilter = 'hide'
    },
    closeModal() {
      this.showFilter = false
      this.showPersonFilter = false
      this.showBoardDesc = false
      if (!this.activeFilters.length)
      this.activeFilter = ''
      this.$store.commit({ type: 'closeBlackScreen' })
    },
    onSearch() {
      this.$store.commit({
        type: 'setFilterBy',
        searchQuery: this.searchQuery,
      })
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
    removeMemberFilter() {
      this.$store.commit({ type: 'updateActiveMember' })
    },
    closeActivity() {
      this.showBoardActivity = false
    },
    toggleKanbanFilter() {
      this.isFilterOpen = !this.isFilterOpen
      eventBus.emit('toggleKanban')
    },
    closeHiddenFilter() {
      this.isHideOpen = false
    },
    addCol(col) {
      const cols = JSON.parse(JSON.stringify(this.columnsOrder))
      cols.push(col)
      this.$store.commit({ type: 'setCurrLabels', labelsOrder: cols })
    },
    removeCol(col) {
      const cols = JSON.parse(JSON.stringify(this.columnsOrder))
      const colIdx = cols.findIndex((c) => c === col)
      cols.splice(colIdx, 1)
      this.$store.commit({ type: 'setCurrLabels', labelsOrder: cols })
    },
    closeInvite() {
      this.showInvite = false
    },
  },
  watch: {
    '$route.params': {
      async handler() {
        const routeName = this.$route.name
        if (routeName === 'table') this.active = ''
        else if (routeName === 'dashboard') this.active = 'dashboard'
        else this.active = 'kanban'
      },
      immediate: true,
    },
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
    MemberToFilter() {
      return this.$store.getters.currActiveMember
    },
    currUser() {
      return this.$store.getters.loggedInUser
    },
    columnsOrder() {
      return this.$store.getters.currLabelsOrder
    },
    activeFilters() {
      return this.$store.getters.currActiveFilters
    },
  },
  components: {
    MainFilter,
    MainPersonFilter,
    BoardDesc,
    Activity,
    KanbanFilter,
    Invite,
  },
}
</script>
