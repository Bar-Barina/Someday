<template>
  <section class="board-activity-container">
    <span v-icon="'x'" @click="activityCheck"></span>
    <h2>{{ this.currBoard.title }} <span>Log</span></h2>
    <article
      v-for="(activity, idx) in activities"
      :key="idx"
      class="board-activity flex align-center space-between"
    >
      <div class="flex align-center">
        <span v-icon="'activityTime'" class="time-icon"></span>
        <span>{{ timeSince(activity.createdAt) }}</span>
        <img
          :src="
            loggedInUser
              ? loggedInUser.imgUrl
              : 'https://cdn1.monday.com/dapulse_default_photo.png'
          "
          class="member-preview"
        />
        <span>{{ activity.taskTitle }}</span>
      </div>
      <div class="flex align-center">
        <img
          v-if="
            activity.changed === 'status' || activity.changed === 'priority'
          "
          src="https://cdn.monday.com/images/color2.png"
          class="status-img"
        />
        <span
          v-if="activity.changed === 'timeline'"
          v-icon="'activityTimeLine'"
        ></span>
        <span class="changed-activity">{{ activity.changed }}</span>
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
              activity.changed !== 'date',
            [activity.from]:
              activity.changed === 'status' || activity.changed === 'priority',
          }"
        >
          {{
            activity.changed === 'timeline'
              ? timelineDisplay(activity.from)
              : activity.from
          }}
        </span>
        <span v-icon="'arrowRightG'" class="arrow-right"></span>
        <span
          class="activity-status"
          :class="{
            timeline: activity.changed === 'timeline',
            date: activity.changed === 'date',
            Blank:
              activity.to === '' &&
              activity.changed !== 'timeline' &&
              activity.changed !== 'date',
            [activity.to]:
              activity.changed === 'status' || activity.changed === 'priority',
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
</template>

<script>
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

export default {
  name: '',
  data() {
    return {}
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
      console.log(value)
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
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
    activities() {
      const board = this.$store.getters.currBoard
      let activities = []
      if (board.activities) activities.push(...board.activities)
      board.groups.forEach((group) => {
        if (group.activities) activities.push(...group.activities)
        group.tasks.forEach((task) => {
          if (task.activities) activities.push(...task.activities)
        })
      })
      activities.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
      return activities
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser
    },
    fromValue() {
      return (activity) => {
        if (activity.changed === 'timeline') {
          return activity.from.replace('-', '')
        }
        return activity.from
      }
    },
  },
  created() {},
  components: {},
}
</script>
