<template>
  <section class="timeline-progress-container cell" v-if="task">
    <span class="collapse-progress-label" v-if="isCollapse">{{ label }}</span>
    <div
      class="timeline-progress-bar"
      :style="{
        background: `linear-gradient(90deg,${group.color} ${percent}%,  #383838 ${percent}%)`,
      }"
    >
      <div class="date-diff">
        {{ dateDiff }}
      </div>
      <div class="day-diff">{{ dayDiff }}d</div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    group: Object,
    label: String,
    cmp: String,
    isCollapse: String,
  },
  data() {
    return {
      timeline: null,
      percent: null,
      task: null
    };
  },
  created() {
    const highest = this.group.tasks.reduce(
      (acc, task) => {
        if(!task.timeline.length) return acc
        const today = new Date();
        const [startMonth, startDay] = task.timeline[0].split("-");
        const [endMonth, endDay] = task.timeline[1].split("-");
        const startYear = today.getFullYear(); // Assumes the year is the current year
        const endYear = today.getFullYear(); // Assumes the year is the current year
        const startDate = new Date(`${startMonth} ${startDay}, ${startYear}`);
        const endDate = new Date(`${endMonth} ${endDay}, ${endYear}`);
        const timeToNextDate = endDate.getTime() - today.getTime();
        const totalTimeBetween = endDate.getTime() - startDate.getTime();
        const timePassed = totalTimeBetween - timeToNextDate;
        const percent = (timePassed / totalTimeBetween) * 100;
        if (acc.percent < percent) acc = { percent, task };
        return acc
      },
      { percent: 0 }
    );
    if(!highest.task) return
    this.task = highest.task
    this.percent = highest.percent
    this.timeline = highest.task.timeline
  },
  computed: {
    dateDiff() {
      if (this.timeline.length === 0) return "-";
      return (
        this.timeline[0].split("-")[0] +
        " " +
        this.timeline[0].split("-")[1] +
        " " +
        "-" +
        " " +
        this.timeline[1].split("-")[0] +
        " " +
        this.timeline[1].split("-")[1]
      );
    },
    dayDiff() {
      if (this.timeline.length === 0) return "set dates";
      var currentDate = new Date();
      var currentYear = currentDate.getFullYear();
      var date1 = new Date(`${this.timeline[0]}, ${currentYear}`);
      var date2 = new Date(`${this.timeline[1]}, ${currentYear}`);
      var diffInMs = date2.getTime() - date1.getTime();
      var diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      return parseInt(diffInDays);
    },
  },
};
</script>
