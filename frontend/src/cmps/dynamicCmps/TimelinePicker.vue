<template>
  <label class="picker-wrapper">
    <div v-if="value.length === 0" class="timeline-progress-bar emptyTimeline">
      <div class="date-diff">
        {{ dateDiff }}
      </div>
      <div class="day-diff">{{ dayDiff }}</div>
    </div>
    <div
      v-if="value.length > 0"
      :class="emptyTimeline"
      class="timeline-progress-bar"
      :style="{
        'background': `linear-gradient(90deg,${group.color} ${widthPrecent}%,  #383838 ${widthPrecent}%)`,
      }"
    >
      <div class="date-diff">
        {{ dateDiff }}
      </div>
      <div class="day-diff">{{ dayDiff }}d</div>
      <div v-if="value" class="reset-date" @click="resetTimeline">
        <span class="x-icon" v-icon="'closeTxt'"></span>
      </div>
    </div>
    <div class="demo-date-picker">
      <el-date-picker
        v-model="value"
        type="daterange"
        value-format="MMM-DD"
        start-placeholder="Start Date"
        end-placeholder="End Date"
        :default-value="[new Date(Date.now()), new Date(Date.now())]"
        @change="changeDate"
      />
    </div>
  </label>
</template>

<script>
export default {
  name: "timeline",
  emits: ["updateTask"],
  props: {
    task: Object,
    group: Object,
  },
  created() {
    if (this.task.timeline.length > 0) this.value = this.task.timeline;
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
    resetTimeline() {
      this.value = [];
    },
  },
  computed: {
    dayDiff() {
      if (this.value.length === 0) return "set dates";
      var currentDate = new Date();
      var currentYear = currentDate.getFullYear();
      var date1 = new Date(`${this.value[0]}, ${currentYear}`);
      var date2 = new Date(`${this.value[1]}, ${currentYear}`);
      var diffInMs = date2.getTime() - date1.getTime();
      var diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      return parseInt(diffInDays);
    },
    dateDiff() {
      if (this.value.length === 0) return "-";
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
      const today = new Date();
      const [startMonth, startDay] = this.value[0].split("-");
      const [endMonth, endDay] = this.value[1].split("-");
      const startYear = today.getFullYear(); // Assumes the year is the current year
      const endYear = today.getFullYear(); // Assumes the year is the current year
      const startDate = new Date(`${startMonth} ${startDay}, ${startYear}`);
      const endDate = new Date(`${endMonth} ${endDay}, ${endYear}`);
      const timeToNextDate = endDate.getTime() - today.getTime();
      const totalTimeBetween = endDate.getTime() - startDate.getTime();
      const timePassed = totalTimeBetween - timeToNextDate;
      const percentagePassed = (timePassed / totalTimeBetween) * 100;
      console.log('percentagePassed',percentagePassed )
      return percentagePassed;
    },
    borderRadiusEnd() {
      return {
        "border-radius-end": this.widthPrecent > 95,
      };
    },
    emptyTimeline() {
      return {
        emptyTimeline: this.value.length === 0,
      };
    },
  },
};
</script>
