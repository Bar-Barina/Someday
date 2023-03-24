<template>
  <section class="status-progress cell">
    <div v-for="(option , idx) in options" :key="idx"
     :style="{'background-color': colors[idx]}"></div>
  </section>
</template>

<script>
export default {
  props: {
    group: Object
  },
  data() {
    return {
      options: ['working on it' , 'Done' , 'Stuck' , '' ,'High' , 'Medium' , 'Low' , 'Critical'],
      colors: ['#fdab3d' , '#00c875' , '#e2445c' , '#c3c4c3' , 'rgb(64, 22, 148)' ,
      'rgb(85, 89, 223)', 'rgb(87, 155, 252)' , 'rgb(51, 51, 51)']
    }
  },
  computed: {
    getPercent() {
      
    }
  }
}
</script>