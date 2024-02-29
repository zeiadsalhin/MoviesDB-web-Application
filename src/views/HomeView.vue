<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import banner from '../components/Banner.vue'
import latest from "../components/LatestM.vue"
import latest2 from "../components/LatestTV.vue"
import trending from "../components/Trending.vue"
import trendingtv from "../components/Trendingtv.vue"
</script>

<template>
  <main>
    <div v-if="isloading" class=""
      style="height: 100vh;width: 100%; background-color: black; position: absolute; z-index: 999;">
      <div class="load m-auto" style="position: relative;top: 50%;transform: translateX(50%);overflow: hidden;">
        <v-progress-circular indeterminate></v-progress-circular>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <div class="1">
        <!-- <transition name="fade" mode="out-in"> -->
        <banner />
        <!-- </transition> -->
      </div>
    </transition>
    <transition name="fade" mode="out-in">
      <div class="2">
        <!-- <transition name="fade" mode="out-in"> -->
        <latest />
        <!-- </transition> -->
      </div>
    </transition>
    <transition name="fade" mode="out-in">
      <div class="3">
        <!-- <transition name="fade" mode="out-in"> -->
        <latest2 />
        <!-- </transition> -->
      </div>
    </transition>
    <transition name="fade" mode="out-in">
      <div class="4">
        <!-- <transition name="fade" mode="out-in"> -->
        <trending />
        <!-- </transition> -->
      </div>
    </transition>
    <transition name="fade" mode="out-in">
      <div class="5">
        <!-- <transition name="fade" mode="out-in"> -->
        <trendingtv />
        <!-- </transition> -->
      </div>
    </transition>
  </main>
</template>
<style>
html,
body {
  overflow: hidden;
}
</style>
<script>
export default {
  data() {
    return {
      isloading: true,
    }
  },
  mounted() {
    this.isloading = false
  },
}
</script>
