<script setup>
// import TheWelcome from '../components/TheWelcome.vue'
import banner from '../components/Banner.vue'
import latest from "../components/LatestM.vue"
import latest2 from "../components/LatestTV.vue"
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
      <banner />
    </transition>
    <transition name="fade" mode="out-in">
      <latest />
    </transition>
    <transition name="fade" mode="out-in">
      <latest2 />
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
