<template>
  <section class="board-activity-container">
    <span v-icon="'x'" @click="activityCheck"></span>
    <h2>{{ this.currBoard.title }} 
        <span>Log</span></h2>
    <article
      v-for="(activity, idx) in this.currBoard.activities"
      :key="idx"
      class="board-activity flex align-center space-between"
    >
    <div class="flex align-center">
        <span v-icon="'activityTime'" class="time-icon"></span>
      <span>{{ timeSince(activity.createdAt)}}</span>
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
    <img v-if="activity.changed === 'status' || activity.changed === 'priority'" src="https://cdn.monday.com/images/color2.png" class="status-img">
    <span>{{ activity.changed }}</span>
   </div>
    <div class="flex align-center">
        <span class="activity-status"
        :class="activity.from === '' ? 'Blank' : activity.from">{{ activity.from }}</span>
      <span v-icon="'arrowRightG'" class="arrow-right"></span>
      <span class="activity-status"
      :class="activity.to === '' ? 'Blank' : activity.to">{{ activity.to }}</span>
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
    return {
        
    }
  },
  methods: {
    timeSince(date) {
      return timeAgo.format(new Date(date))
    },
    activityCheck() {
     let activities = JSON.parse(JSON.stringify(this.currBoard.activities))
     console.log('activities',activities)
    }
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser
    },
  },
  created() {},
  components: {},
}
</script>
