<template>
  <section class="dashboard">
    <section class="status-pie">
      <div class="chart-header">Tasks by status</div>
      <PieChart
        class="chart"
        :style="{ height: '280px' }"
        :chartData="testData"
        :options="options"
      />
    </section>
    <section class="person-bar">
      <div class="chart-header">Tasks by members</div>
      <BarChart
        class="chart"
        :style="{ height: '280px' }"
        :chartData="personData"
        :options="options1"
      />
    </section>
    <section class="priority-doughtnut">
      <div class="chart-header">Tasks by priority</div>
      <DoughnutChart
        class="chart"
        :style="{ height: '280px' }"
        :chartData="priorityData"
        :options="options2"
      />
    </section>
    <div class="flip-card" :class="{ flipped: firstFlip }">
      <div class="flip-card-front">
        <section class="board-tasks">
          <div class="title">Board tasks</div>
          <div class="body flex align-center">
            <div>{{ tasks }}</div>
            <img src="../assets/img/task.png" alt="" />
          </div>
        </section>
      </div>
      <div class="flip-card-back">
        <section class="dor-section">
          <div class="img-container flex justify-center">
            <img class="member-img" src="../assets/img/dor-img1.jpg" />
          </div>
          <div class="icon-container">
            <a href="https://www.linkedin.com/in/dor-tayari-758605163/">
              <span class="facebook" v-icon="'facebook'"></span>
            </a>
            <div class="title">Dor Tayari</div>
            <a href="https://www.facebook.com/profile.php?id=100000463356100">
              <span class="linkedin" v-icon="'linkedin'"></span>
            </a>
          </div>
        </section>
      </div>
    </div>
    <div class="flip-card" :class="{ flipped: secondFlip }">
      <div class="flip-card-front">
        <section class="board-members">
          <div class="title">Board members</div>
          <div class="body flex align-center">
            <div>{{ members }}</div>
            <img src="../assets/img/person.png" alt="" />
          </div>
        </section>
      </div>
      <div class="flip-card-back">
        <section class="bar-section">
          <div class="img-container flex justify-center">
            <img class="member-img" src="../assets/img/bar-img.jpg" />
          </div>
          <div class="icon-container">
            <a href="https://www.facebook.com/bar.barina.5/">
              <span class="facebook" v-icon="'facebook'"></span>
            </a>
            <div class="title">Bar Barina</div>
            <a href="https://www.linkedin.com/in/bar-barina-a6854b23a/">
              <span class="linkedin" v-icon="'linkedin'"></span>
            </a>
          </div>
        </section>
      </div>
    </div>
    <div class="flip-card" :class="{ flipped: thirdFlip }">
      <div class="flip-card-front">
        <section class="board-groups">
          <div class="title">Board groups</div>
          <div class="body flex align-center">
            <div>{{ groups }}</div>
            <img src="../assets/img/members.png" alt="" />
          </div>
        </section>
      </div>
      <div class="flip-card-back">
        <section class="ofek-section">
          <div class="img-container flex justify-center">
            <img class="member-img" src="../assets/img/ofek-img.jpg" />
          </div>
          <div class="icon-container">
            <a href="https://www.facebook.com/profile.php?id=100001720277883">
              <span class="facebook" v-icon="'facebook'"></span>
            </a>
            <div class="title">Ofek Dov</div>
            <a
              href="https://www.linkedin.com/in/ofek-dov-62a36b270?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BQ3zVYyMCQRCZHO5GAQJN3g%3D%3D"
            >
              <span class="linkedin" v-icon="'linkedin'"></span>
            </a>
          </div>
        </section>
      </div>
    </div>
    <section class="board-owners" @click="openOwners">
      <div class="title">owners</div>
      <div class="body flex align-center">
        <div>1</div>
        <img src="../assets/img/members.png" alt="" />
      </div>
    </section>
  </section>
</template>

<script>
import { PieChart, DoughnutChart, BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
// statusOptions: ['Working on it', , 'Stuck', 'Done', ''],
//       statusColors: ['#fdab3d', , '#e2445c', '#00c875', '#c3c4c3'],
Chart.register(...registerables);
export default {
  name: "Dashboard",
  data() {
    return {
      isFlip: false,
      firstFlip: false,
      secondFlip: false,
      thirdFlip: false,
      testData: {
        labels: null,
        datasets: [
          {
            data: null,
            // data: this.labelsInv,
            backgroundColor: null,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: "left",
            labels: {
              usePointStyle: true,
              font: {
                size: 12,
              },
            },
          },
        },
      },
      personData: {
        labels: null,
        datasets: [
          {
            data: [],
            // data: this.labelsInv,
            backgroundColor: [
              "#8ecae6",
              "#219ebc",
              "#023047",
              "#ffb703",
              "#fb8500",
              "#e76f51",
              "#ae2012",
            ],
          },
        ],
      },
      options1: {
        plugins: {
          legend: { display: false },
        },
      },
      priorityData: {
        labels: null,
        datasets: [
          {
            data: [],
            // data: this.labelsInv,
            backgroundColor: null,
          },
        ],
      },
      options2: {
        plugins: {
          legend: {
            position: "left",
            labels: {
              usePointStyle: true,
              font: {
                size: 12,
              },
            },
          },
        },
      },
    };
  },
  components: { DoughnutChart, BarChart, PieChart },
  computed: {
    currBoard() {
      return JSON.parse(JSON.stringify(this.$store.getters.currBoard));
    },
    tasks() {
      return this.currBoard.groups.reduce((acc, group) => {
        return (acc += group.tasks.length);
      }, 0);
    },
    groups() {
      return this.currBoard.groups.length;
    },
    members() {
      return this.currBoard.members.length;
    },
  },
  components: { DoughnutChart, BarChart, PieChart },
  created() {
    const statusesLabels = this.currBoard.labels.status.map((label) => {
      if (label.name === "") return "blank";
      else return label.name;
    });
    const statusesColors = this.currBoard.labels.status.map(
      (label) => label.color
    );
    const statusesMap = [];
    statusesLabels.forEach((label, idx) => {
      var tasks = [];
      this.currBoard.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          if (task.status === label) tasks.push(task);
        });
      });
      statusesMap.push(tasks.length);
    });
    this.testData.labels = statusesLabels;
    this.testData.datasets[0].backgroundColor = statusesColors;
    this.testData.datasets[0].data = statusesMap;
    //////////////////////////////////////////
    const persons = this.currBoard.members;
    const personsNames = this.currBoard.members.map((m) => m.name);
    const membersMap = [];
    persons.forEach((person, idx) => {
      var tasks = [];
      this.currBoard.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          if (task.person.some((p) => p.id === person.id)) tasks.push(task);
        });
      });
      membersMap.push(tasks.length);
    });

    this.personData.labels = personsNames;
    this.personData.datasets[0].data = membersMap;
    ///////////////////////////////////
    const prioritiesLabels = this.currBoard.labels.priority.map((label) => {
      if (label.name === "") return "blank";
      else return label.name;
    });
    const prioritiesColors = this.currBoard.labels.priority.map(
      (label) => label.color
    );
    const priorityMap = [];
    prioritiesLabels.forEach((label, idx) => {
      var tasks = [];
      this.currBoard.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          if (task.priority === label) tasks.push(task);
        });
      });
      priorityMap.push(tasks.length);
    });
    this.priorityData.labels = prioritiesLabels;
    this.priorityData.datasets[0].backgroundColor = prioritiesColors;
    this.priorityData.datasets[0].data = priorityMap;
  },
};
</script>
