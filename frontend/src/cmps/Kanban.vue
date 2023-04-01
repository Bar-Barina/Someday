<template>
  <section class="kanban-container">
    <section class="kanban">
      <section class="kanban-content flex">
        <Container
          class="smooth-dnd-container horizontal"
          orientation="horizontal"
          group-name="group-kanban"
          tag="div"
          @drop="onColumnDrop($event)"
          :drop-placeholder="{
            className: 'kanban-placeholder',
            animationDuration: '200',
            showOnTop: true,
          }"
          :drag-class="'kanban-drag'"
        >
          <Draggable v-for="(option, idx) in statusesMap" :key="idx">
            <KanbanCol
              :status="option.title"
              :tasks="option.tasks"
              :color="option.color"
              :option="colSelected"
              @addStatusesMap="addToMap"
              @removeStatusesMap="removeFromMap"
              @updateMapOrder="setOrder"
              @updateMap="updateStatusesMap"
            />
          </Draggable>
        </Container>
      </section>
      <div class="kanban-filter flex column" :class="{ open: isFilter }">
        <span class="customize">Customize View</span>
        <div class="sub-header flex align-center space-between">
          <span>Kanban Column</span>
          <span class="svg" v-icon="'descrip'"></span>
        </div>
        <div class="select-wrapper">
          <el-select
            @change="updateStatusesMap"
            v-model="colSelected"
            class="el-select"
            placeholder="Select"
          >
            <el-option
              v-for="col in selectOptions"
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
            <input :checked="isAllChecked" type="checkbox" @change="checkAll" />
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
      </div>
    </section>
  </section>
</template>

<script>
import BoardHeader from "./BoardHeader.vue";
import { Container, Draggable } from "vue3-smooth-dnd";
import { utilService } from "../services/util.service";
import KanbanCol from "./KanbanCol.vue";
import KanbanFilter from "./KanbanFilter.vue";
import { eventBus } from "../services/event-bus.service";

export default {
  data() {
    return {
      board: null,
      options: null,
      // options: {
      //   status: {
      //     labels: ["Working on it", "Stuck", "Done", "Blank"],
      //     colors: ["#fdab3d", "#e2445c", "#00c875", "#c3c4c3"],
      //   },
      //   priority: {
      //     labels: ["Critical", "High", "Medium", "Low", ""],
      //     colors: [
      //       "rgb(51, 51, 51)",
      //       "rgb(64, 22, 148)",
      //       "rgb(85, 89, 223)",
      //       "rgb(87, 155, 252)",
      //       "#c3c4c3",
      //     ],
      //   },
      // },
      statusesMap: [],
      selectOptions: [
        { value: "status", label: "Status" },
        { value: "priority", label: "Priority" },
      ],
      colSelected: "status",
      columns: [
        "Date",
        "Text",
        "Priority",
        "Person",
        "Files",
        "Status",
        "Timeline",
      ],
      isFilter: false,
    };
  },
  created() {
    const board = this.currBoard || this.getFromParams;
    this.options = {
      status: {
        labels: board.labels.status.map((label) => label.name),
        colors: board.labels.status.map((label) => label.color),
      },
      priority: {
        labels: board.labels.priority.map((label) => label.name),
        colors: board.labels.priority.map((label) => label.color),
      },
    };
    eventBus.on("toggleKanban", () => (this.isFilter = !this.isFilter));
    const option = this.colSelected;
    if (!board) return;
    this.options[option].labels.forEach((opt, idx) => {
      var tasks = [];
      board.groups.forEach((group) => {
        group.tasks.forEach((task) => {
          if (task[option] === opt) tasks.push(task);
        });
      });
      this.statusesMap[idx] = {
        title: opt,
        color: this.options[option].colors[idx],
        tasks,
      };
    });
  },
  methods: {
    onColumnDrop(dropResult) {
      this.options[this.colSelected].labels = utilService.applyDrag(
        this.options[this.colSelected].labels,
        dropResult
      );
      this.options[this.colSelected].colors = utilService.applyDrag(
        this.options[this.colSelected].colors,
        dropResult
      );
      this.updateStatusesMap();
    },
    addToMap({ task, status }) {
      const statusIdx = this.statusesMap.findIndex((s) => s.title === status);
      this.statusesMap[statusIdx].tasks.push(task);
      this.updateStatusesMap();
    },
    removeFromMap({ taskIdx, status }) {
      const statusIdx = this.statusesMap.findIndex((s) => s.title === status);
      this.statusesMap[statusIdx].tasks.splice(taskIdx, 1);
      this.updateStatusesMap();
    },
    setOrder({ status, dropResult }) {
      const statusIdx = this.statusesMap.findIndex((s) => s.title === status);
      this.statusesMap[statusIdx].tasks = utilService.applyDrag(
        this.statusesMap[statusIdx].tasks,
        dropResult
      );
      this.updateStatusesMap();
    },
    updateStatusesMap() {
      const board = this.currBoard || this.board;
      const option = this.colSelected;
      if (!board) return;
      console.log("this.options", this.options);
      this.options[option].labels.forEach((opt, idx) => {
        var tasks = [];
        board.groups.forEach((group) => {
          group.tasks.forEach((task) => {
            if (task[option] === opt) tasks.push(task);
          });
        });
        this.statusesMap[idx] = {
          title: opt,
          color: this.options[option].colors[idx],
          tasks,
        };
      });
      console.log("this.statusesMap", this.statusesMap);
    },
    addColumn(col) {
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
      if (!this.isAllChecked)
        this.$store.commit({
          type: "setCurrLabels",
          labelsOrder: this.columns,
        });
      else this.$store.commit({ type: "setCurrLabels", labelsOrder: [] });
    },
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard;
    },
    currLabelsOrder() {
      return this.$store.getters.currLabelsOrder;
    },
    isAllChecked() {
      if (this.currLabelsOrder.length === this.columns.length) return true;
      return false;
    },
    currColSelected() {
      return this.colSelected;
    },
    mappedTasks() {
      console.log("this.statusesMap1111", this.statusesMap);
      return this.statusesMap;
    },
    async getFromParams() {
      const { boardId } = this.$route.params;
      if (!boardId) return;
      const board = await this.$store.dispatch({
        type: "getBoardById",
        boardId,
      });
      this.board = board;
    },
  },
  components: {
    Container,
    Draggable,
    KanbanCol,
    KanbanFilter,
    BoardHeader,
  },
};
</script>