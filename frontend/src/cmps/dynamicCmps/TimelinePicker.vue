<template>
  <div v-if="value.length===0" class="timeline-progress-bar emptyTimeline">
    <div  class="date-diff">
        {{ dateDiff }}
      </div>
      <div class="day-diff">{{ dayDiff }}</div>
  </div>
  <div  v-if="value.length>0" :class="emptyTimeline" class="timeline-progress-bar">
    <div
      
      :style="{ width: widthPrecent + '%', 'background-color': group.color }"
      class="bar-precent flex justify-center align-center"
      :class=" borderRadiusEnd"
    >
      <div  class="date-diff">
        {{ dateDiff }}
      </div>
      <div class="day-diff">{{ dayDiff }}d</div>
    </div>
  </div>
  <div class="demo-date-picker">
    <label class="picker-wrapper">
      <el-date-picker
        v-model="value"
        type="daterange"
        value-format="MMM-DD"
        start-placeholder="Start Date"
        end-placeholder="End Date"
        :default-value="[new Date(Date.now()), new Date(Date.now())]"
        @change="changeDate"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: "timeline",
  emits: ["updateTask"],
  props: {
    task: Object,
    group:Object,
  },
  components: {},
  created() {
    if(this.task.timeline.length > 0) this.value = this.task.timeline
  },
  data() {
    return {
      value: [],
    };
  },
  methods: {
    changeDate() {
      this.$emit("updateTask", { cmpType: "timeline", data: this.value });
    },
  },
  computed: {
    dayDiff() {
        if(this.value.length === 0) return 'set dates'
      var currentDate = new Date();
      var currentYear = currentDate.getFullYear();
      var date1 = new Date(`${this.value[0]}, ${currentYear}`);
      var date2 = new Date(`${this.value[1]}, ${currentYear}`);
      var diffInMs = date2.getTime() - date1.getTime();
      var diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      return parseInt(diffInDays);
    },
    dateDiff() {
      if(this.value.length === 0) return '-'
      return (
        this.value[0].split("-")[0] +
        " " +
        this.value[0].split("-")[1] +
        " " +
        "-" +
        " " +
        this.value[1].split("-")[0] +
        " " +
        this.value[1].split("-")[1]
      );
    },
    widthPrecent() {
      var currentDate = new Date();
      var currentYear = currentDate.getFullYear();
      var date = new Date(`${this.value[0]}, ${currentYear}`);
      var todayDate = new Date(Date.now());
      var diffInMs = todayDate.getTime() - date.getTime();
      var diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      var precent = (diffInDays / this.dayDiff) * 100;
      if(precent > 100) return 100
      return parseInt(precent);
    },
    borderRadiusEnd() {
      return {
        'border-radius-end' : this.widthPrecent>90 
      }
    },
    emptyTimeline() {
      return {
        emptyTimeline : this.value.length === 0
      }
    }
  },
};
</script>

