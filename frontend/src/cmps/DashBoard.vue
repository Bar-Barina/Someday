<template>
  <section class="dashboard">
    <section class="status-pie">
      <div class="chart-header" >Tasks by status</div>
      <PieChart class="chart" :style="{'height':'280px'}" :chartData="testData" :options="options"/>
    </section>
    <section class="person-bar">
      <div class="chart-header">Tasks by members</div>
      <BarChart class="chart" :style="{'height':'280px'}" :chartData="personData" :options="options1" />
    </section>
    <section class="priority-doughtnut">
      <div class="chart-header">Tasks by priority</div>
      <DoughnutChart class="chart" :style="{'height':'280px'}" :chartData="priorityData" :options="options2" />
    </section>
    <section class="board-tasks">
      <div class="title">Board tasks</div>
        <div class="body flex align-center">
          <div>{{ tasks }}</div>
        <img src="../assets/img/task.png" alt=""/>
        </div>
    </section>
    <section class="board-members">
      <div class="title">Board members</div>
        <div class="body flex align-center ">
          <div>{{ members }}</div>
        <img src="../assets/img/person.png" alt=""/>
        </div>
    </section>
    <section class="board-groups">
      <div class="title">Board groups</div>
        <div class="body flex align-center ">
          <div>{{ groups }}</div>
        <img src="../assets/img/members.png" alt=""/>
        </div>
    </section>
    <section class="board-owners">
      <div class="title">owners</div>
        <div class="body flex align-center ">
          <div>1</div>
        <img src="../assets/img/members.png" alt=""/>
        </div>
    </section>
  </section>
</template>

<script>
import { PieChart, DoughnutChart , BarChart} from "vue-chart-3";
import { Chart, registerables } from "chart.js";
// statusOptions: ['Working on it', , 'Stuck', 'Done', ''],
//       statusColors: ['#fdab3d', , '#e2445c', '#00c875', '#c3c4c3'],
Chart.register(...registerables);
export default {
  name: 'Dashboard',
  data() {
    return {
      testData: {
        labels:['Working on it', 'Stuck', 'Done', 'blank'],
        datasets: [
          {
            data: null,
            // data: this.labelsInv,
            backgroundColor: ['#fdab3d', '#e2445c', '#00c875', '#c3c4c3'],
          },
        ],
      },
      options: {
        plugins: {
          legend: { 
            position: "left",
            labels:{
              usePointStyle: true
            }
           } 
        },
      },
      personData: {
        labels:null,
        datasets: [
          {
            data: [],
            // data: this.labelsInv,
            backgroundColor: [
      '#8ecae6',
      '#219ebc',
      '#023047',
      '#ffb703',
      '#fb8500',
      '#e76f51',
      '#ae2012'
    ],
          },
        ],
      },   
      options1: {
        plugins: {
          legend: { display: false }
        },
      },  
      priorityData: {
        labels: ["Critical", "High", "Medium", "Low", "blank"],
        datasets: [
          {
            data: [],
            // data: this.labelsInv,
            backgroundColor: [
            "rgb(51, 51, 51)",
            "rgb(64, 22, 148)",
            "rgb(85, 89, 223)",
            "rgb(87, 155, 252)",
            "#c3c4c3",
          ],
          },
        ],
      },   
      options2: {
        plugins: {
          legend: { 
            position: "left",
            labels:{
              usePointStyle: true
            }
           } 
        },
      },  
    }
  },
  components: { DoughnutChart , BarChart, PieChart },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
    tasks() {
      return this.currBoard.groups.reduce((acc,group)=>{
        return acc+=group.tasks.length
      },0)
    },
    groups() {
      return this.currBoard.groups.length
    },
    members() {
      return this.currBoard.members.length
    }
  },
  created() {
    const statusesLabels = ['Working on it', 'Stuck', 'Done', '']
      const statusesMap = []
      statusesLabels.forEach((label,idx) => {
      var tasks = [];
      this.currBoard.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          if (task.status === label) tasks.push(task);
        });
      });
      statusesMap.push(tasks.length)
    });
    this.testData.datasets[0].data = statusesMap
/////////////////////////////////
    const persons = this.currBoard.members
    const personsNames = this.currBoard.members.map(m=>m.name)
    console.log('personNames',personsNames)
      const membersMap = []
      persons.forEach((person,idx) => {
      var tasks = []
      this.currBoard.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          console.log('task.person', task.person)
          console.log('person.id', person.id)
          if (task.person.some(p=>p.id===person.id)) tasks.push(task);
        });
      });
      membersMap.push(tasks.length)
    });
    console.log('statusesMap',membersMap)

    this.personData.labels = personsNames
    this.personData.datasets[0].data = membersMap
///////////////////////////////////
const prioritiesLabels = ["Critical", "High", "Medium", "Low", ""]
      const priorityMap = []
      prioritiesLabels.forEach((label,idx) => {
      var tasks = [];
      this.currBoard.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          if (task.priority === label) tasks.push(task);
        });
      });
      priorityMap.push(tasks.length)
    });
    console.log('priorityMap',priorityMap)
    this.priorityData.datasets[0].data = priorityMap
    }
  }
</script>
