<template>
  <Draggable class="group-grid task-row smooth-dnd-draggable-wrapper">
    <div></div>
    <div class="task-border" style="background-color: rgb(0, 134, 192)"></div>
    <div class="flex align-items-center cell1 flex-justify">
      <input type="checkbox" />
    </div>
    <section class="task-title cell1 flex align-items-center space-between">
      <div class="task-title-sub flex align-items-center space-between">
        <div class="flex align-items-center" contenteditable="true">
          {{ task.taskTitle }}
        </div>
        <span class="open-con flex align-items-center space-between">
          <button class="svg">
            <div className="icon" v-html="getSvg('openCon')"></div>
          </button>
          open
        </span>
      </div>
      <div class="conversation-wrapper flex align-items-center flex-justify">
        <button class="svg">
          <div className="icon" v-html="getSvg('con')"></div>
        </button>
      </div>
    </section>
    <section class="cell2" v-for="label in labels" :key="label">
      {{ task[label] }}
    </section>
  </Draggable>
</template>

<script>
import { svgService } from "../services/svg.service";
import { Container, Draggable } from "vue3-smooth-dnd";
import { utilService } from '../services/util.service'


export default {
  props: ['task' , 'labels'],
  data() {
    return {};
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
  },
  components: {
    Draggable,
    Container
  }
};
</script>