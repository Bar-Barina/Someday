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
</template>

<script>
export default {
  name: "timeline",
  emit:['updateTask'],
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
      console.log('date', this.value)
      this.$emit("updateTask", {cmpType:'timeLine',data:this.value});
    },
  },
  computed: {},
};
</script>

