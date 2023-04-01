<template>
  <section
    :class="{
      'board-activity-container': !task,
      'task-activity-container': task,
    }"
  >
    <div class="activity-header" v-if="!task">
      <div
        @click="closeActivity"
        class="close-activity flex justify-center align-center"
      >
        <span v-icon="'x'"></span>
      </div>
      <h2>{{ this.currBoard.title }} <span>Log</span></h2>
    </div>
    <input
      type="text"
      placeholder="Filter by name"
      v-model="this.searchTerm"
      v-if="!task"
    />
    <section class="activity-list-wrapper">
      <section class="activity-list">
        <article
          v-for="(activity, idx) in activities"
          :key="idx"
          class="board-activity flex align-center space-between"
        >
          <div class="flex align-center">
            <span v-icon="'activityTime'" class="time-icon"></span>
            <span class="activity-time">{{
              timeSince(activity.createdAt)
            }}</span>
            <img
              :src="
                loggedInUser
                  ? loggedInUser.imgUrl
                  : 'https://cdn1.monday.com/dapulse_default_photo.png'
              "
              class="member-preview"
            />
            <span class="activity-task-title">{{ activity.taskTitle }}</span>
          </div>
          <div class="flex align-center activity-icons">
            <img
              v-if="
                activity.changed === 'status' || activity.changed === 'priority'
              "
              src="https://cdn.monday.com/images/color2.png"
              class="status-img"
            />
            <span
              v-if="activity.changed === 'timeline'"
              v-icon="'TimelineFilter'"
            ></span>
            <span
              v-if="activity.changed === 'date'"
              v-icon="'activityDate'"
            ></span>
            <span
              v-if="activity.changed === 'person'"
              v-icon="'activityPerson'"
            ></span>
            <span
              v-if="
                activity.changed === 'text' || activity.changed === 'taskTitle'
              "
              v-icon="'activityText'"
            ></span>
            <span
              v-if="activity.changed === 'files'"
              v-icon="'activityFiles'"
            ></span>
            <span class="changed-activity">{{
              activity.changed.charAt(0).toUpperCase() +
              activity.changed.slice(1)
            }}</span>
          </div>
          <div class="flex align-center">
            <span
              class="activity-status"
              :class="{
                timeline: activity.changed === 'timeline',
                date: activity.changed === 'date',
                Blank:
                  activity.from === '' &&
                  activity.changed !== 'timeline' &&
                  activity.changed !== 'date' &&
                  activity.changed !== 'files',
                [activity.from]:
                  activity.changed === 'status' ||
                  activity.changed === 'priority',
              }"
            >
              {{
                activity.changed === 'timeline'
                  ? timelineDisplay(activity.from)
                  : activity.from.length < activity.to.length &&
                    activity.changed === 'person'
                  ? 'Added'
                  : activity.from.length > activity.to.length &&
                    activity.changed === 'person'
                  ? 'Removed'
                  : activity.changed === 'person'
                  ? activity.to
                  : activity.from
              }}
            </span>
            <span v-if="activity.changed === 'file'">Added</span>
            <span v-icon="'arrowRightG'" class="arrow-right"></span>
            <span
              class="activity-status"
              :class="{
                timeline: activity.changed === 'timeline',
                date: activity.changed === 'date',
                Blank:
                  activity.to === '' &&
                  activity.changed !== 'timeline' &&
                  activity.changed !== 'date' &&
                  activity.changed !== 'taskTitle',
                [activity.to]:
                  activity.changed === 'status' ||
                  activity.changed === 'priority',
              }"
            >
              {{
                activity.changed === 'timeline'
                  ? timelineDisplay(activity.to)
                  : activity.to
              }}
            </span>
          </div>
        </article>
      </section>
    </section>
  </section>
</template>

<script>
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
// import ActivityPerson from './ActivityPerson.vue'
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

export default {
  name: '',
  props: {
    task: Object,
  },
  data() {
    return {
      searchTerm: '',
      // showFilter: false
    }
  },
  methods: {
    timeSince(date) {
      const timeAgoInstance = timeAgo.format(new Date(date), 'mini')
      return timeAgoInstance
    },
    activityCheck() {
      let activities = JSON.parse(JSON.stringify(this.currBoard.activities))
      console.log('activities', activities)
    },
    timelineDisplay(value) {
      if (value.length === 0) return '-'
      return (
        value[0].split('-')[0] +
        ' ' +
        value[0].split('-')[1] +
        ' ' +
        '-' +
        ' ' +
        value[1].split('-')[0] +
        ' ' +
        value[1].split('-')[1]
      )
    },
    closeActivity() {
      this.$emit('closeActivity')
    },
    
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
    activities() {
      const board = this.$store.getters.currBoard
      const regex = new RegExp(this.searchTerm, 'i')
      let activities = []
      if (this.task) {
        activities = this.task.activities || []
        activities.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt)
        })
        return activities
      }
      if (board.activities) activities.push(...board.activities)
      board.groups.forEach((group) => {
        if (group.activities) activities.push(...group.activities)
        group.tasks.forEach((task) => {
          if (task.activities) activities.push(...task.activities)
        })
      })
      activities = activities.filter((activity) =>
        regex.test(activity.taskTitle)
      )
      activities.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
      return activities
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser
    },
  },
  created() {
    console.log('task',this.currBoard)
  },
  components: {
    // ActivityPerson,
  },
}
</script>
