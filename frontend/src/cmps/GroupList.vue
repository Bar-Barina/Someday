<template>
  <Container
    class="group-list group-container smooth-dnd"
    orientation="vertical"
    group-name="group"
    tag="div"
    @drop="onGroupDrop($event)"
  >
    <GroupPreview v-for="group in groups" :key="group.id" :group="group" />
  </Container>
</template>

<script>
import GroupPreview from "./GroupPreview.vue";
import { Container, Draggable } from "vue3-smooth-dnd";
import { utilService } from '../services/util.service'

export default {
  data() {
    return {
      groups: [
        {
          title: 'First task',
          id: Math.random().toString(36).slice(2),
          color: "red",
          tasks: [
            {
              id: "t101",
              side: "null",
              taskTitle: "learn CSS",
              Person: [
                { name: "tal", color: "red" },
                { name: "bal", color: "black" },
                { name: "shal", color: "green" },
              ],
              Date: "27-02-2022",
              Status: "IN WORK",
              Priority: "LOW",
              Timeline: 'late',
              File: '11',
              Text: 'Something'
            },
            {
              id: "t102",
              side: "null",
              taskTitle: "learn vue",
              Person: [
                { name: "tal", color: "red" },
                { name: "bal", color: "black" },
                { name: "shal", color: "green" },
              ],
              Date: "27-02-2022",
              Status: "STUCK",
              Priority: "LOW",
              Timeline: 'late',
              File: '11',
              Text: 'Something'
            },
            {
              id: "t103",
              side: "null",
              taskTitle: "learn js",
              Person: [
                { name: "tal", color: "red" },
                { name: "bal", color: "black" },
                { name: "shal", color: "green" },
              ],
              Date: "27-02-2022",
              Status: "DONE",
              priority: "LOW",
              Timeline: 'late',
              File: '11',
              Text: 'Something'
            },
          ],
        },
        {
          title: 'Second task',
          id: Math.random().toString(36).slice(2),
          color: "blue",
          tasks: [
            {
              id: "t101",
              side: "null",
              taskTitle: "learn CSS",
              Person: [
                { name: "tal", color: "red" },
                { name: "bal", color: "black" },
                { name: "shal", color: "green" },
              ],
              Date: "27-02-2022",
              Status: "IN WORK",
              Priority: "LOW",
              Timeline: 'late',
              File: '11',
              Text: 'Something'
            },
            {
              id: "t102",
              side: "null",
              taskTitle: "learn vue",
              File: '11',
              Person: [
                { name: "tal", color: "red" },
                { name: "bal", color: "black" },
                { name: "shal", color: "green" },
              ],
              Timeline: 'late',
              Date: "27-02-2022",
              Status: "STUCK",
              Priority: "LOW",
              Text: 'Something'
            },
            {
              id: "t103",
              side: "null",
              taskTitle: "learn js",
              Person: [
                { name: "tal", color: "red" },
                { name: "bal", color: "black" },
                { name: "shal", color: "green" },
              ],
              Timeline: 'late',
              File: '11',
              Date: "27-02-2022",
              Status: "DONE",
              Priority: "LOW",
              Text: 'Something'
            },
          ],
        },
        {
          title: 'Third task',
          id: Math.random().toString(36).slice(2),
          color: "green",
          tasks: [
            {
              id: "t101",
              side: "null",
              taskTitle: "learn CSS",
              Person: [
                { name: "tal", color: "red" },
                { name: "bal", color: "black" },
                { name: "shal", color: "green" },
              ],
              Date: "27-02-2022",
              Status: "IN WORK",
              Priority: "LOW",
              TimeLine: 'late',
              File: '11',
              Text: 'Something'
            },
            {
              id: "t102",
              side: "null",
              taskTitle: "learn vue",
              Person: [
                { name: "tal", color: "red" },
                { name: "bal", color: "black" },
                { name: "shal", color: "green" },
              ],
              Date: "27-02-2022",
              Status: "STUCK",
              Priority: "LOW",
              Timeline: 'late',
              File: '11',
              Text: 'Something'
            },
            {
              id: "t103",
              side: "null",
              taskTitle: "learn js",
              Person: [
                { name: "tal", color: "red" },
                { name: "bal", color: "black" },
                { name: "shal", color: "green" },
              ],
              Date: "27-02-2022",
              Status: "DONE",
              Priority: "LOW",
              Timeline: 'late',
              File: '11',
              Text: 'Something'
            },
          ],
        },
      ],
    };
  },
  methods: {
    onGroupDrop(dropResult) {
      let scene = [...this.groups];
      scene = utilService.applyDrag(scene, dropResult);
      this.groups = scene;
    },
  },
  components: {
    GroupPreview,
    Container,
    Draggable,
  },
};
</script>