<template>
  <section class="filter-container">
    <div class="filter-title flex">
      <span>Quick filters</span>
      <span class="filter-task-count">Showing all of 4 tasks</span>
    </div>
    <div class="filter-recent-title">Recent filters</div>
    <section class="filter-list-container flex">
      <!-- Members -->
      <article class="filter-members flex column">
        <p>Members</p>
        <div
          v-for="(member, idx) in currBoard.members"
          :key="idx"
          class="filter-div flex align-center"
          @click.stop="ChangeActive(member.name)"
          :class="{active:isActive(member.name)}"
        >
          <img :src="member.url" class="filter-member-img" />
          <span>{{ member.name }}</span>
        </div>
      </article>
      <!-- Status -->
      <article class="filter-status flex column">
        <p>Status</p>
        <div
          v-for="(status, idx) in statusLabels"
          :key="idx"
          class="filter-div flex align-center"
          @click.stop="ChangeActive(status.name)"
          :class="{active:isActive(status.name)}"
        >
          <div
            :style="{ 'background-color': status.color }"
            class="filter-status-clr"
          ></div>
          <span>{{ status.name }}</span>
        </div>
      </article>
      <!-- Priority -->
      <article class="filter-status flex column">
        <p>Priority</p>
        <div
          v-for="(priority, idx) in priorityLabels"
          :key="idx"
          class="filter-div flex align-center"
          @click.stop="ChangeActive(priority.name)"
          :class="{active:isActive(priority.name)}"
        >
          <div
            :style="{ 'background-color': priority.color }"
            class="filter-status-clr"
          ></div>
          <span>{{ priority.name }}</span>
        </div>
      </article>
    </section>
    <div class="triangle"></div>
  </section>
</template>

<script>
export default {
  name: 'mainFilter',
  data() {
    return {
      selectedMember: null,
      statusLabels: [
        { name: 'Done', class: 'status-done', color: '#00c875' },
        { name: 'Working on it', class: 'status-working', color: '#fdab3d' },
        { name: 'Stuck', class: 'status-stuck', color: '#e2445c' },
        { name: 'Empty status', class: 'status-empty', color: '#c4c4c4' },
      ],
      priorityLabels: [
        { name: 'Critical', class: 'priority-critical', color: '#333333' },
        { name: 'High', class: 'priority-high', color: '#401794' },
        { name: 'Medium', class: 'priority-medium', color: '#5559df' },
        { name: 'Low', class: 'priority-low', color: '#579bfc' },
        { name: 'Empty priority', class: 'priority-empty', color: '#c4c4c4' },
      ],
    }
  },
  methods: {
    filterTasksByMember(member) {
      //console.log(member)
      const board = JSON.parse(JSON.stringify(this.currBoard))
      const filtered = board.groups.filter((group) => {
        const array = group.tasks.filter((task) => {
          return task.person.some((p) => p.name === member.name)
        })
        console.log(array)
      })
      //console.log(filtered)
      //   console.log('member from filter', member)
      //   const groupsIds = Object.keys(board.groups)
      //   console.log('tasks from filter', tasks)
      //   const filteredTasks = tasks.filter((task) => {
      //     return task.person.some((p) => p.name === member.name)
      //   })
      //   console.log('filteredTasks from filter', filteredTasks)
      //   this.$store.dispatch('filterTasks', filteredTasks)
    },
    ChangeActive(label) {
      this.$store.commit({type:'updateActiveFilters',label})
      // this.$store.dispatch({type:'FilterBoard'})
    },
    isActive(label) {
      // if(label === 'Empty status' || 'Empty priority') label = ''
      if (this.currActiveFilters.includes(label)) return true
      else return false
      
    }
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
    currActiveFilters() {
      return this.$store.getters.currActiveFilters
    },
  },
  created() {},
  components: {},
}
</script>
