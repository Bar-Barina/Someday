<template>
    <Popper content="This is the Popper content 🍿">
      <button>Trigger element</button>
    </Popper>
  </template>
  
  <script>
    import { defineComponent } from "vue";
    import Popper from "vue3-popper";
  
    export default defineComponent({
      components: {
        Popper,
      },
    });
  </script>