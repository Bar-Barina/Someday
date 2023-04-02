<template>
  <section class="filter-container">
    <div class="filter-title flex">
      <span>Quick filters</span>
      <span class="filter-task-count"
        >Showing all of {{ this.tasksLength }} tasks</span
      >
    </div>
    <!-- <div class="filter-recent-title">Recent filters</div> -->
    <div
      @click="clearfilter"
      class="clear-all-btn flex justify-center align-center"
    >
      Clear all
    </div>
    <section class="filter-list-container flex">
      <!-- Members -->
      <article class="filter-members flex column">
        <p>Members</p>
        <div
          v-tippy="{
            content: 'Member is ' + member.name,
            theme: 'classic',
            placement: 'left',
            arrow: true,
          }"
          v-for="(member, idx) in currBoard.members"
          :key="idx"
          class="filter-div flex align-center filter-option"
          @click.stop="ChangeActive(member.name)"
          :class="{ active: isActive(member.name) }"
        >
          <img :src="member.imgUrl" class="filter-member-img" />
          <span>{{ member.name }}</span>
        </div>
      </article>
      <!-- Status -->
      <article class="filter-status flex column">
        <p>Status</p>
        <div
          v-tippy="{
            content: 'Status is ' + status.name,
            theme: 'classic',
            placement: 'left',
            arrow: true,
          }"
          v-for="(status, idx) in statusLabels"
          :key="idx"
          class="filter-div flex align-center filter-option"
          @click.stop="ChangeActive(status.name)"
          :class="{ active: isActive(status.name) }"
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
          v-tippy="{
            content: 'Priority is ' + priority.name,
            theme: 'classic',
            placement: 'left',
            arrow: true,
          }"
          v-for="(priority, idx) in priorityLabels"
          :key="idx"
          class="filter-div flex align-center filter-option"
          @click.stop="ChangeActive(priority.name)"
          :class="{ active: isActive(priority.name) }"
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
        { name: 'Blank', class: 'status-empty', color: '#c4c4c4' },
      ],
      priorityLabels: [
        { name: 'Critical', class: 'priority-critical', color: '#333333' },
        { name: 'High', class: 'priority-high', color: '#401794' },
        { name: 'Medium', class: 'priority-medium', color: '#5559df' },
        { name: 'Low', class: 'priority-low', color: '#579bfc' },
        { name: 'Blank', class: 'priority-empty', color: '#c4c4c4' },
      ],
    }
  },
  methods: {
    ChangeActive(label) {
      this.$store.commit({ type: 'updateActiveFilters', label })
    },
    isActive(label) {
      if (this.currActiveFilters.includes(label)) return true
      else return false
    },
    clearfilter() {
      this.$store.commit({ type: 'clearActiveFilters' })
    },
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
    currActiveFilters() {
      return this.$store.getters.currActiveFilters
    },
    tasksLength() {
      return this.currBoard.groups.reduce((acc, group) => {
        group.tasks.forEach((task) => {
          acc++
        })
        return acc
      }, 0)
    },
  },
}
</script>
