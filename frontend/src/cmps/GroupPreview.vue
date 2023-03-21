<template>
  <Draggable class="smooth-dnd-draggable-wrapper">
    <section class="group-title group-grid">
      <div class="more" v-html="getSvg('more')"></div>
      <!-- TODO color task border -->
      <div
        class="task-border"
        :style="{ 'background-color': group.color }"
      ></div>
      <!-- TODO computed arrow for colors -->
      <div class="arrow-down" v-html="getSvg('arrowDownB')"></div>
      <div class="title-wrapper">
        <button v-show="isTitleFocused" class="color-icon btn-color"></button>
        <div
          class="title-input"
          contenteditable="true"
          :style="{ color: group.color }"
          @click="titleFocus = !titleFocus"
          :class="{ focused: isTitleFocused }"
        >
          {{ group.title }}
        </div>
      </div>
    </section>
    <section class="group-content">
      <section class="group-grid labels-grid">
        <div></div>
        <div
          class="task-border sticky"
          style="background-color: rgb(0, 134, 192)"
        ></div>
        <div class="sticky cell1">
          <input type="checkbox" class="checkbox" />
        </div>
        <div class="sticky cell1">Tasks</div>
        <Container
          class="smooth-dnd-container horizontal"
          orientation="horizontal"
          group-name="labels"
          tag="div"
          @drop="onLabelDrop($event)"
        >
          <Draggable
            class="smooth-dnd-draggable-wrapper label cell1"
            v-for="label in labels"
            :key="label"
          >
            {{ label }}
          </Draggable>
        </Container>
      </section>
      <Container
        class="smooth-dnd-container"
        orientation="vertical"
        group-name="tasks"
        tag="div"
        @drop="onTaskDrop($event)"
      >
        <TaskPreview v-for="task in group.tasks" :key="task" :task="task" :labels="labels" />
      </Container>
    </section>
  </Draggable>
</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd";
import { svgService } from "../services/svg.service.js";
import TaskPreview from "./TaskPreview.vue";
import { utilService } from "../services/util.service";

export default {
  props: ["group"],
  data() {
    return {
      titleFocus: false,
      labels: [
        "Date",
        "Text",
        "Priority",
        "Person",
        "File",
        "Status",
        "Timeline",
      ],
    };
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
    onLabelDrop(dropResult) {
      let scene = [...this.labels];
      scene = utilService.applyDrag(scene, dropResult);
      this.labels = scene;
    },
    onTaskDrop(dropResult) {
      let scene = [...this.group.tasks];
      scene = utilService.applyDrag(scene, dropResult);
      this.group.tasks = scene;
    },
  },
  computed: {
    isTitleFocused() {
      if (this.titleFocus) return true;
      else return false;
    },
  },
  components: {
    Container,
    Draggable,
    TaskPreview,
  },
};
</script>