<template>
  <section class="group-grid group-title flex align-center">
    <div class="more sticky" v-html="getSvg('Dots')"></div>
    <!-- <div class="more sticky" v-html="getSvg('more')"></div> -->
    <!-- TODO color task border -->
    <div
      class="task-border sticky"
      :style="{'background-color': group.color }"
    ></div>
    <!-- TODO computed arrow for colors -->
    <div class="arrow-down sticky" v-html="getSvg('arrowDownB')"></div>
    <div class="title-wrapper flex align-center sticky">
      <button v-show="isTitleFocused" class="color-icon btn-color"></button>
      <div
        class="title-input editable-div"
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
        :style="{'background-color': group.color}"
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
          class="label cell1"
          v-for="(label, idx) in labelsOrder"
          :key="idx"
        >
          {{ label }}
        </Draggable>
      </Container>
    </section>
    <Container
      class="smooth-dnd-container"
      orientation="vertical"
      group-name="tasks"
      drag-class="bg-primary dark:bg-primary 
            border-2 border-primary-hover text-white 
            transition duration-100 ease-in z-50
            transform rotate-6 scale-110"
      drop-class="transition duration-100 
            ease-in z-50 transform 
            -rotate-2 scale-90"
      tag="div"
      @drop="onTaskDrop($event)"
    >
      <Draggable
        class="group-grid task-row"
        v-for="(task, idx) in group.tasks"
        :key="idx"
      >
        <TaskPreview :task="task" :labels="labelsOrder" :group="group" />
      </Draggable>
    </Container>
  </section>
</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd";
import { svgService } from "../services/svg.service.js";
import TaskPreview from "./TaskPreview.vue";
import { utilService } from "../services/util.service";

export default {
  emits: ["labelDrop"],
  props: {
    group: Object,
    labelsOrder: Array,
  },
  data() {
    return {
      titleFocus: false,
    };
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
    onLabelDrop(dropResult) {
      this.$emit("labelDrop", dropResult);
    },
    onTaskDrop(dropResult) {
      let scene = JSON.parse(JSON.stringify(this.group.tasks));
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