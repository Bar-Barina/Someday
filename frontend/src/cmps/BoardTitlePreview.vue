<template>
           <span v-html="getSvg('board')" class="workspace-icon"></span>
          <span>{{ board.title }}</span>
          <span 
            v-html="getSvg('Dots')"
            class="workspace-icon dots"
            @click.stop="ToggleEditMenu"
          ></span>
          <EditMenu v-if="isEditMenuOpen" @removeBoard="removeBoard"
          v-clickOutside="closeModal"/>
</template>

<script>
import { svgService } from '../services/svg.service.js'
import  EditMenu  from '../cmps/EditMenu.vue'

export default {
    emits:['removeBoard'],
  name: 'BoardTitlePreview', 
  props: {
    board:Object
  },
components:{
    EditMenu,
},
created() {},
  data() {
    return {
      isEditMenuOpen: false
    }
  },
  methods: {
    removeBoard() {
        this.$emit('removeBoard',this.board._id)
    },
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
    ToggleEditMenu() {
      this.isEditMenuOpen = !this.isEditMenuOpen
    },
    closeModal() {
      this.isEditMenuOpen = false
    }
  },
}
</script>
