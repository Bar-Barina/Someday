<template>
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
  
  <div v-if="value.length>0" class="timeline-progress-bar">
    <div :style="{width:widthPrecent+'%'}" class="bar-precent flex justify-center align-center">
      <div class="date-diff">
        {{ dateDiff }}
      </div>
      <div class="day-diff">
        {{dayDiff}}d
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "timeline",
  emits: ["updateTask"],
  props: {
    task: Object,
  },
  components: {},
  created() {},
  data() {
    return {
      value: [],
    };
  },
  methods: {
    changeDate() {
      console.log("date", this.value);
      this.$emit("updateTask", { cmpType: "timeLine", data: this.value });
    },
  },
  computed: {
    dayDiff() {
      var currentDate = new Date();
      var currentYear = currentDate.getFullYear();
      var date1 = new Date(`${this.value[0]}, ${currentYear}`);
      var date2 = new Date(`${this.value[1]}, ${currentYear}`);
      var diffInMs = date2.getTime() - date1.getTime();
      var diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      return parseInt(diffInDays);
    },
    dateDiff() {
      return this.value[0].split("-")[0] +" "+this.value[0].split("-")[1] +" " +"-" +" " +this.value[1].split("-")[0] +" " + this.value[1].split("-")[1]
    },
    widthPrecent() {
      var currentDate = new Date();
      var currentYear = currentDate.getFullYear();
      var date = new Date(`${this.value[0]}, ${currentYear}`);
      var todayDate = new Date(Date.now());
      var diffInMs = todayDate.getTime() - date.getTime();
      var diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      console.log('daysInDiff',diffInDays)
      var precent = (diffInDays/this.dayDiff)*100
      console.log('precent',precent)
      return parseInt(precent);
    }
  },
};
</script>

