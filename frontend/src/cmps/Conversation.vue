<template>
  <section class="conversation-container">
    <div class="conversation-action-wrapper">
      <button class="conversation-exit-btn">X</button>
    </div>
    <div class="conversation-title">
      <h3>Item 1</h3>
      <div class="conversation-img-section">
        <img src="../assets/img/profile-icon.png" class="conversation-img" /> |
        <span v-html="getSvg('Dots')"></span>
      </div>
    </div>
    <div class="conversation-up-nav">
      <span><span v-html="getSvg('noFillHome')"></span>Updates</span> |
      <span>Files</span> | <span>Activity Log</span> |
      <hr>
    </div>
    <input placeholder="Write an update..." />
    <section class="nav-btn flex space-between align-center">
      <div class="conversation-middle-nav">
        <span>Add files</span> | <span>GIF</span> | <span>Emoji</span> |
        <span>Mention</span> |
      </div>
      <button class="update-btn">Update</button>
    </section>
    <img
      src="https://cdn.monday.com/images/pulse-page-empty-state.svg"
      class="hands"
    />
    <h2>No updates yet for this item</h2>
    <p>
      Be the first one to update about progress, mention someone or upload files
      to share with your team members
    </p>
  </section>
</template>

<script>
import { svgService } from '../services/svg.service.js'
export default {
  name: '',
  data() {
    return {
    }
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
  },
  computed: {},
  created() {},
  components: {},
}
</script>

