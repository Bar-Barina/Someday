<template>
  <Container
    v-if="currBoard"
    class="main-table"
    orientation="vertical"
    @drop="onGroupDrop($event)"
  >
    <Draggable
      class="group-container"
      v-for="group in currBoard.groups"
      :key="group"
    >
      <GroupPreview
        :group="group"
        :labelsOrder="labelsOrder"
        @labelDrop="labelDrop"
      ></GroupPreview>
      <RouterView />
    </Draggable>
    <Menu v-if="false" />
  </Container>
</template>

<script>
import { Container, Draggable } from 'vue3-smooth-dnd'
import GroupPreview from './GroupPreview.vue'
import { utilService } from '../services/util.service'
import Menu from '../cmps/Menu.vue'

export default {
  emits: ['labelDrop'],
  data() {
    return {
      board: null,
      groups: null,
      labelsOrder: [
        'Date',
        'Text',
        'Priority',
        'Person',
        'Files',
        'Status',
        'Timeline',
      ],
    }
  },
  methods: {
    onGroupDrop(dropResult) {
      const board = JSON.parse(JSON.stringify(this.currBoard))
      let groups = board.groups
      groups = utilService.applyDrag(groups, dropResult)
      board.groups = groups
      this.$store.dispatch({ type: 'updateBoard', board })
    },
    labelDrop(dropResult) {
      let scene = [...this.labelsOrder]
      scene = utilService.applyDrag(scene, dropResult)
      this.labelsOrder = scene
    },
  },
  computed: {
    currBoard() {
      return JSON.parse(JSON.stringify(this.$store.getters.currBoard))
    },
    // selected() {
    //   const length = this.currBoard.groups.filter((g) => g.tasks.filter((t) => t.isSelected))
    //     .length;
    //     console.log('length', length)
    //     return length
    // },
  },
  components: {
    GroupPreview,
    Container,
    Draggable,
    Menu,
  },
}
</script>
