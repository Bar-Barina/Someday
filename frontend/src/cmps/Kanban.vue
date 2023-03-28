<template>
  <section class="kanban">
    <section class="kanban-content flex">
      <Container
        class="smooth-dnd-container horizontal"
        orientation="horizontal"
        group-name="group-kanban"
        tag="div"
        @drop="onColumnDrop($event)"
      >
        <Draggable v-for="(status, idx) in statusesMap" :key="idx">
          <KanbanCol
            :status="status.title"
            :tasks="status.tasks"
            :color="colors[idx]"
            @addStatusesMap="addToMap"
            @removeStatusesMap="removeFromMap"
            @updateMapOrder="setOrder"
          />
        </Draggable>
      </Container>
    </section>
    <section class="kanban-filter flex column">
      <span class="customize">Customize View</span>
      <div class="sub-header flex align-center space-between">
        <span>Kanban Column</span>
        <span class="svg" v-icon="'descrip'"></span>
      </div>
      <div class="select-wrapper">
        <el-select v-model="colSelected" class="el-select" placeholder="Select">
          <el-option
            v-for="col in options"
            :key="col.value"
            :label="col.label"
            :value="col.value"
          />
        </el-select>
      </div>
      <section class="card-columns-wrapper">
        <div class="sub-header2 flex align-center space-between">
          <span>Card Columns</span>
          <span class="svg" v-icon="'descrip'"></span>
        </div>
        <div class="all-columns flex align-center">
          <input :checked="isAllChecked" type="checkbox" @change="checkAll"/>
          <span>All-Columns</span>
        </div>
        <div class="flex column">
          <div
            v-for="(col, idx) in columns"
            :key="idx"
            class="card-col flex align-center space-between"
          >
            <KanbanFilter
              :col="col"
              @addCol="addColumn"
              @removeCol="removeColumn"
            />
          </div>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd";
import { utilService } from "../services/util.service";
import KanbanCol from "./KanbanCol.vue";
import KanbanFilter from "./KanbanFilter.vue";
import { onUnmounted } from 'vue'
export default {
  setup() {
    onUnmounted(() => {
      console.log('Component unmounted')
    })
  },
  data() {
    return {
      statuses: ["Working on it", "Stuck", "Done", "Blank"],
      colors: ["#fdab3d", "#e2445c", "#00c875", "#c3c4c3"],
      statusesMap: [],
      options: [
        { value: "Status", label: "Status" },
        { value: "Priority", label: "Priority" },
      ],
      colSelected: "Status",
      columns: [
        "Date",
        "Text",
        "Priority",
        "Person",
        "Files",
        "Status",
        "Timeline",
      ],
    };
  },
  created() {
    const board = JSON.parse(JSON.stringify(this.currBoard));
    if(!board) return
    const statusesMap = this.statuses.forEach((status , idx) => {
      var tasks = []
      board.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          if (task.status === status) tasks.push(task)
        });
      })
      this.statusesMap[idx] = {title: status , tasks};
      console.log('this.statusesMap', this.statusesMap)
    });
  },
  methods: {
    onColumnDrop(dropResult) {
      this.statuses = utilService.applyDrag(this.statuses, dropResult);
      this.colors = utilService.applyDrag(this.colors, dropResult);
      // this.updateStatusesMap();
    },
    addToMap({ task, status }) {
      this.statusesMap[status].push(task);
    },
    removeFromMap({ taskIdx, status }) {
      this.statusesMap[status].splice(taskIdx, 1);
    },
    setOrder({ status, dropResult }) {
      this.statusesMap[status] = utilService.applyDrag(
        this.statusesMap[status],
        dropResult
      );
    },
    updateStatusesMap() {
      const board = JSON.parse(JSON.stringify(this.currBoard));
      const statusesMap = this.statuses.reduce((acc, status) => {
        if (!acc[status]) acc[status] = [];
        board.groups.forEach((group) => {
          group.tasks.forEach((task) => {
            if (task.status === status) acc[status].push(task);
          });
        });
        return acc;
      }, []);
      this.statusesMap = statusesMap;
    },
    addColumn(col) {
      console.log('hi')
      const labelsOrder = JSON.parse(JSON.stringify(this.currLabelsOrder));
      labelsOrder.push(col);
      this.$store.commit({ type: "setCurrLabels", labelsOrder });
    },
    removeColumn(col) {
      const labelsOrder = JSON.parse(JSON.stringify(this.currLabelsOrder));
      const colIdx = labelsOrder.findIndex((c) => c === col);
      labelsOrder.splice(colIdx, 1);
      this.$store.commit({ type: "setCurrLabels", labelsOrder });
    },
    checkAll() {
      if(!this.isAllChecked) this.$store.commit({ type: "setCurrLabels", labelsOrder: this.columns });
      else this.$store.commit({ type: "setCurrLabels", labelsOrder: [] });
    }
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard;
    },
    currLabelsOrder() {
      return this.$store.getters.currLabelsOrder;
    },
    isAllChecked() {
      if(this.currLabelsOrder.length === this.columns.length) return true
      return false
    }
  },
  components: {
    Container,
    Draggable,
    KanbanCol,
    KanbanFilter,
  },
};
</script>