<template>
  <section class="side-nav">
    <section class="logo-icon-pattern">
      <router-link to="/">
        <div
          class="monday-icon"
          v-tippy="{
            content: 'Home Page',
            theme: 'classicRight',
            placement: 'right',
            arrow: true,
          }"
        >
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABVpJREFUeNrsnT1yGkEQhWc5AT6BVqkSQ6DQVVJEKBE5NJzAcIJFJxA6gSB0BA4VCZdDBVonpMI3WJ/A7maHKgrD/s70jOB9VVsKZEHXvOmeefOzVgoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwHv+fvrc9CaWF9X0ua2CdyBmSD++0nNFT2vn1wk9C3q+Bz+/TYTE7NFzo+PZZc6x8M/gch0bBM7J0nvdoEVY0TMkoeeWhB3QExX8Exb3jkQeQ+D94nKmPtNTpfxNSOS+QXG5gsz2VI8icHXpuszm4MjENSqyFve1ZiwxPdeuRG54WJbrisv06LNGBkKaGYiFO+yjqzZteJbAjwYadEOkJ2hVs3dUsSzv45Y+7/akBSYxuAFMN0JUUdxW1b/N4P5kx2BdmnmsCy18/Acaj5OSAj8fsEF1adNYHJ9iBkeWxFVlqwKJO7AkLvPl5Eq0njUPLH7Fx5J+N7IYS+vkBBaYYbZKxuL10uO7Epiyd+CiVx/I3isLk7zTFVhbmEjgq5IC4jZdetVjzeB7oXL4q8C/GVic5JXqbEchsCXPe4jYgec9xI+jF3hrl0iCpMDukuQCxPwUMtim593lwaHn/U/c4HK9pSlKIJy9XA5fpbKXnvNDq1h6YvUmaIvOXQgsncGSM9V+zhKlpOe9cyGuaAZrzys13i1I3Oscz/ssFMuKxD0/apsk6Hk3pbnvkeftK4dIlWgpz7ueWFH2rjzwvMyEsnfhUuBAIHvZ786kPC+J287xvLKTPMenKxuWxZX0vMzQI8879OHorO0SLel5x5S9C08874LEnSgPCCxmr+RMFZ7XQQZLlkN4XskM1kdWpWwRPK9kBm/dJYLnPdISLVsO4XnlSjQ8rx83Cq1ksPa8PpVDyViGPoprukRHgqWZPW+c43mlDvN543mtlWhhz8tjbjvD84aq/o1A85532eG4eAi70Z1vOz4eu7nDTtXFU+yjwK+CGdPNOoZDAs+U3Hkv9ryjHGHLXmRnsYemhA4MiCvpeeckbjdDXNlJ3qVq54h7papfQb0jkUdOx2AHnneY43n92dhYdm5VvbvOEX3Go1OBPfO8shsbWZ532TF16btHn1Xr3lZQI3t98rws7Js3nnfZMXn9lL+nTeV6JZ3BUqW5iOeNJGPJEbenzG5L1rrx2KiYvaGS21vN9LwaqVkze968w+s3Fr63p2fjYhksJe5qPZvM6mzpbpHEPCBRxTYTbHW2K0mBpSYzwwKvX5Dy3w+5CxqpLbJFS1LgMyHPW+Quj0T2xrkLGp5SVWDbC+uJyj9AJ4kPsZxJCvzHsefdHafdeV45fksKbLNR2fOWeYmnzdcSJXmTPMF2SSQFttmjSx170e+dsjVk9Evt86aLEbZEnosJrMunjcvMRTzvPiaOPO8+pjZicbGS9SDteXNiMZnFiap+gG5soaJUbZfqAutbBCZfeN0v+8rBrTJdp3Psn+RVPdt88WTaAczpMxfiAm/1rNhIg2ZcOyko8thQqZ7UflP7xdPEUCyxqnkU18SG/+Ydz1VXlHjcNdbj/76st+l6NcQ1d7Y53c/t1RD3WlcE5SqDuVQneiuvbInkEtg1Ka7O5L4ukWUaZl1WjYqbZjJ/XrfCmDw2Ia6RDN7J5lCl24jca5sZPXOq0tfuW1sR2/qPNPgNr2FGJ5vqxQx7q3PpTlBPt02Y0cnmKj2qY8xq2bxduDk52NLBrz1iiRUqk2KHumFDHVOs0ntE4rHo05W7sSSmT1MCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPCMfwIMAE+t3eZL7HeYAAAAAElFTkSuQmCC"
            width="30"
            height="30"
            alt=""
          />
        </div>
      </router-link>
      <div class="work-management">
        <div v-html="getSvg('wm')"></div>
      </div>
    </section>
    <!-- REMOVED -->
    <!-- <hr/> -->
    <!-- <section class="icon-pattern-top">
      <div class="icon-wrapper">
        <span v-html="getSvg('bell')"></span>
      </div>
      <div class="icon-wrapper">
        <span v-html="getSvg('inbox')"></span>
      </div>
      <div class="icon-wrapper">
        <span v-html="getSvg('date')"></span>
      </div>
      <div class="icon-wrapper">
        <span v-html="getSvg('star')"></span>
      </div>
    </section> -->

    <!-- <section
      class="icon-pattern-bottom flex column justify-center align-center"
    >
      <div class="icon-wrapper">
        <span v-html="getSvg('pazel')"></span>
      </div>
      <div class="icon-wrapper">
        <span v-html="getSvg('addpeople')"></span>
      </div>
      <div class="icon-wrapper">
        <span v-html="getSvg('search')"></span>
      </div>
      <div class="icon-wrapper">
        <span v-html="getSvg('info')"></span>
      </div>
    </section> -->
    <!-- ADDED CLASS -->
    <section class="flex justify-center align-center column user-img">
      <div class="icon-wrapper">
        <div v-html="getSvg('apps')"></div>
      </div>
      <div class="member-wrapper flex justify-center align-center" @click="userMenu = !userMenu">
        <img
          :src="
            currUser
              ? currUser.imgUrl
              : 'https://cdn1.monday.com/dapulse_default_photo.png'"
          class="member-preview"
        />
        <EditMenu v-if="userMenu" :user="true"/>
      </div>
    </section>
    <div class="workspace-arrow-left-div"></div>
  </section>
  <!-- <div class="black-screen"></div> -->
</template>

<script>
import { svgService } from '../services/svg.service.js'
import EditMenu from './EditMenu.vue'
export default {
  name: 'SideNav',
  data() {
    return {
      userMenu: false
    }
  },
  methods: {
    getSvg(iconName) {
      return svgService.getSvg(iconName)
    },
  },
  computed: {
    currUser() {
      return this.$store.getters.loggedInUser
    },
  },
  components: {
    EditMenu,
  }
}
</script>
