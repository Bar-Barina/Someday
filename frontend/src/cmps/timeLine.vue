<template>
   <div class="demo-date-picker">
    <label class="block">
      <el-date-picker
        v-model="value"
        type="daterange"
        start-placeholder="Start Date"
        end-placeholder="End Date"
        :default-value="[new Date(2010, 9, 1), new Date(2010, 10, 1)]"
        @change="changeDate"
        class="hide"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'timeLine', 
  props: {
    task:Object
  },
components:{},
created() {},
  data() {
    return {
      value:[]
    }
  },
  methods: {
    changeDate() {
      this.$emit('updateTask',this.value)
    }
  },
  computed: {},
}

</script>

