<template>
  <Container v-if="board" orientation="vertical" @drop="onGroupDrop($event)">
    <Draggable class="smooth-dnd-draggable-wrapper group-container" v-for="group in board.groups" :key="group">
      <GroupPreview :group="group"></GroupPreview>
    </Draggable>
  </Container>
</template>

<script>
import { Container, Draggable } from "vue3-smooth-dnd";
import GroupPreview from "./GroupPreview.vue";

export default {
  data() {
    return {
      board: null,
    };
  },
  watch: {
    "$route.params": {
      handler() {
        const { boardId } = this.$route.params;
        if (!boardId) return;
        this.$store
          .dispatch({ type: "getBoardById", boardId })
          .then((board) => {
            this.board = board;
            console.log("this.board", this.board);
          });
        // this.$store
        //   .dispatch({ type: 'getById', todoId })
        //   .then(todo => (this.todo = todo))
        // this.$store.dispatch({type:'loadReviews'})
      },
      immediate: true,
    },
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