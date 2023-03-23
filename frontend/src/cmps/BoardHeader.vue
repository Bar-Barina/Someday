<template>
  <section class="board-header" v-if="currBoard">
    <section class="up-header flex align-center space-between">
      <section class="board-name flex align-center justify-center">
        <h1 class="title editable-div" contenteditable="true"
        ref="boardTitle" @focusout="updateBoard">
          {{ currBoard.title }}
        </h1>
        <div class="icon btn-hover">
          <div className="icon" v-html="getSvg('descrip')"></div>
        </div>
        <div class="icon btn-hover">
          <div className="icon" v-html="getSvg('headerStar')"></div>
        </div>
      </section>
      <section class="right-up-header flex align-center justify-center">
        <div class="logged-in-user flex align-center btn-hover">
          Activity
          <img src="../assets/img/profile-icon.png" alt="" />
        </div>

        <div class="invite flex align-center btn-hover">
          <div class="icon">
            <span v-html="getSvg('invitePeople')"></span>
          </div>
          Invite / 1
        </div>

        <div class="dots flex align-center justify-center icon btn-hover">
          <div v-html="getSvg('headerDots')"></div>
        </div>
      </section>
    </section>
    <div
      contenteditable="true"
      class="description editable-div"
      ref="boardDesc"
      @focusout="updateBoard"
    >
      {{ currBoard.description }}
    </div>
    <section class="board-view-change flex align-center">
      <div :class="{ active: active === '' }" class="view-option-container">
        <div
          class="view-option flex align-center btn-hover"
          @click="switchBoardView('')"
        >
          <div v-html="getSvg('headerHome')"></div>
          Main Table
        </div>
      </div>
      <div
        :class="{ active: active === 'kanban' }"
        class="view-option-container"
        @click="switchBoardView('kanban')"
      >
        <div class="view-option flex align-center btn-hover">Kanban</div>
      </div>
      <div
        :class="{ active: active === 'dashboard' }"
        class="view-option-container"
        @click="switchBoardView('dashboard')"
      >
        <div class="view-option flex align-center btn-hover">Dashboard</div>
      </div>
    </section>
    <section class="bottom-header flex align-center">
      <div class="new-item flex justify-center align-center">New task</div>
      <div class="bottom-header-btn btn-hover">
        <div
          class="flex justify-center align-center"
          v-html="getSvg('headerSearch')"
        ></div>
        Search
      </div>
      <div class="bottom-header-btn btn-hover">
        <div
          class="flex justify-center align-center"
          v-html="getSvg('headerPerson')"
        ></div>
        Person
      </div>
      <div class="bottom-header-btn btn-hover">
        <div
          class="flex justify-center align-center"
          v-html="getSvg('filter')"
        ></div>
        Filter
      </div>
      <div class="bottom-header-btn btn-hover">
        <div
          class="flex justify-center align-center"
          v-html="getSvg('sort')"
        ></div>
        Sort
      </div>
      <div class="bottom-header-btn btn-hover">
        <div
          class="flex justify-center align-center"
          v-html="getSvg('hide')"
        ></div>
        Hide
      </div>
    </section>
  </section>
</template>

<script>
import { svgService } from "../services/svg.service.js";
export default {
  name: "BoardHeader",
  props: {},
  components: {},
  created() {},
  data() {
    return {
      active: "",
    };
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName);
    },
    switchBoardView(routerName) {
      this.active = routerName;
      this.$router.push(`/board/${this.currBoard._id}/${routerName}`);
    },
    updateBoard() {
      const board = JSON.parse(JSON.stringify(this.currBoard))
      board.description = this.$refs.boardDesc.innerText
      board.title = this.$refs.boardTitle.innerText
      this.$store.dispatch({type: 'updateBoard' , board})
    },
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard;
    },
  },
};
</script>
