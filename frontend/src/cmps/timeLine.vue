<template>
  <div class="demo-date-picker">
    <label class="picker-wrapper">
      <el-date-picker
        class="hide"
        v-model="value"
        type="daterange"
        start-placeholder="Start Date"
        end-placeholder="End Date"
        :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]"
        @change="changeDate"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: "timeline",
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
      this.$emit("updateTask", {cmpType:'timeLine',data:this.value});
    },
  },
  computed: {},
};
</script>

