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
          v-for="(member, idx) in members"
          :key="idx"
          class="filter-div flex align-center"
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
        >
          <div
            :style="{ 'background-color': priority.color }"
            class="filter-status-clr"
          ></div>
          <span>{{ priority.name }}</span>
        </div>
      </article>
    </section>
  </section>
</template>

<script>
export default {
  name: 'mainFilter',
  data() {
    return {
      statusLabels: [
        { name: 'Done', class: 'status-done', color: '#00c875' },
        { name: 'Working', class: 'status-working', color: '#fdab3d' },
        { name: 'Stuck', class: 'status-stuck', color: '#e2445c' },
        { name: 'Empty', class: 'status-empty', color: '#c4c4c4' },
      ],
      priorityLabels: [
        { name: 'Critical', class: 'priority-critical', color: '#333333' },
        { name: 'High', class: 'priority-high', color: '#401794' },
        { name: 'Medium', class: 'priority-medium', color: '#5559df' },
        { name: 'Low', class: 'priority-low', color: '#579bfc' },
        { name: 'Empty', class: 'priority-empty', color: '#c4c4c4' },
      ],
    }
  },
  methods: {},
  computed: {
    members() {
      return this.$store.getters.currBoard.members
    },
  },
  created() {},
  components: {},
}
</script>
