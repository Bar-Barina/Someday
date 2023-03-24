<template>
  <section class="msg-preview">
    <section class="msg-header flex align-center space-between">
      <div class="title flex align-center">
        <img src="../assets/img/profile-icon.png" alt="" />
        {{ msg.from }}
        <div class="active-dot"></div>
      </div>
      <div class="header-info flex align-center">
        <span v-icon="'msgClock'" className="icon"></span>
        <span v-icon="'msgBell'" className="icon"></span>
        <span v-icon="'msgDots'" className="icon"></span>
      </div>
    </section>
    <div class="msg-txt">
      {{ msg.txt }}
    </div>
    <section class="msg-bottom-btns flex align-center">
      <div class="like btn-container">
        <div class="bottom-btn flex align-center justify-center">
          <span v-icon="'msgLike'" className="icon"></span>
          Like
        </div>
      </div>
      <div class="btn-container flex justify-center">
        <div class="bottom-btn flex align-center">
          <span v-icon="'msgReply'" className="icon"></span>
          Reply
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { icon } from "../directives.js";
export default {
  name: "MsgPreview",
  props: {
    msg: Object,
  },
  components: {},
  created() {
    console.log('msg',this.msg)
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>