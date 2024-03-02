<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from "vue"
import { useTheme } from 'vuetify/lib/framework.mjs';
import { onMounted } from 'vue';
import footer1 from "./components/footer.vue"

//set automatic theme
// onMounted(() => {
//   if (!localStorage.getItem("data-theme")) {
//     if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
//       localStorage.setItem('data-theme', "dark");
//       document.documentElement.setAttribute('data-theme', "dark");
//     } else {
//       localStorage.setItem('data-theme', "light");
//       document.documentElement.setAttribute('data-theme', "light");
//     }
//   }
// })

// const theme = ref(false)
// const themelook = useTheme()

// function changetheme() {

//   theme.value = !theme.value
//   themelook.global.name.value = theme.value ? "dark" : "light"
//   document.documentElement.setAttribute('data-theme', themelook.global.name.value);
//   localStorage.setItem('data-theme', themelook.global.name.value);
// }
</script>

<template>
  <!--Desktop-->
  <v-layout class="" color="black">
    <v-navigation-drawer v-if="!$vuetify.display.mobile" v-model="drawer" :rail="rail"
      :permanent="!$vuetify.display.mobile" color="black">
      <v-list-item :prepend-avatar="avatarsrc" :title="'Hello, ' + Accinfo.name" nav color="gray">
        <template v-slot:append>
          <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="default" na>
        <v-list-item prepend-icon="mdi-home" title="Home" value="home" to="/"></v-list-item>
        <v-list-item prepend-icon="mdi-account" title="My Account" value="account" to="/account"></v-list-item>
        <v-list-item prepend-icon="mdi-filmstrip" title="My Movies" value="movies" to="/movies"></v-list-item>
        <v-list-item prepend-icon="mdi-heart" title="Favorites" value="favourites" to="/favourites"></v-list-item>
        <v-list-item prepend-icon="mdi-list-box" title="My list" value="list" to="/list"></v-list-item>
        <v-list-item prepend-icon="mdi-information" title="About" value="about" to="/about"></v-list-item>
        <v-list-item v-if="rail" prepend-icon="mdi-chevron-right" title="" value="expand"
          @click.stop="rail = !rail"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class=" align-center justify-center bg-black" style="min-height: 300px;" @Click="">
      <v-toolbar density="default" class="sticky1 top-0 z-50 backdrop-blur-sm">

        <v-app-bar-nav-icon v-if="!$vuetify.display.mobile" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <!-- <v-spacer></v-spacer> -->
        <v-toolbar-title><img src="/logo.png" class="bg-white md:mx-auto" width="40" alt=""></v-toolbar-title>
        <!-- <v-spacer></v-spacer> -->
        <!-- <v-btn icon @Click="changetheme">
          <v-icon :icon="theme ? 'mdi-weather-night' : 'mdi-weather-sunny'"></v-icon>
        </v-btn> -->
        <v-btn to="/search" class="">
          <v-icon color="white" icon="mdi-magnify"></v-icon>
        </v-btn>

      </v-toolbar>

      <v-fade-transition>
        <RouterView :key="$route.path" />
      </v-fade-transition>
      <footer1 />

    </v-main>

  </v-layout>

  <!--mobile-->

  <v-layout class="overflow-visible" style="height: 56px;" color="black">
    <v-bottom-navigation v-if="$vuetify.display.mobile" grow class="bg-black">

      <v-btn to="/">
        <v-icon>mdi-home</v-icon>
        Home
      </v-btn>

      <v-btn to="/about">
        <v-icon>mdi-filmstrip</v-icon>
        Movies
      </v-btn>

      <v-btn to="/favourites">
        <v-icon>mdi-heart</v-icon>
        Favorites
      </v-btn>

      <v-btn to="/account">
        <v-icon>mdi-account</v-icon>
        Account
      </v-btn>

    </v-bottom-navigation>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      search: null,
      drawer: false,
      rail: false,
      value: 1,
      Accinfo: [],
      avatarsrc: '',
    }
  },
  mounted() {
    console.log(this.$vuetify.display.mobile)
    this.random();
  },
  methods: {
    async random() {

      try {
        this.isloading = true;

        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZmE1ZTFjNGYwNDljNmQ2ODk5NGUxNjFhMzkwMjdiZCIsInN1YiI6IjY1ZDJjY2QwZTA0ZDhhMDE3Yzk4NjkxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UBW80pSmqSl9C9aXlY6WfPmil2ielVKp8Iqczoa0vwA'
          }
        };
        const url = ("https://api.themoviedb.org/3/account/21017366")
        const response = await fetch(url, options)
        const data = await response.json()
        // console.log(data)
        this.Accinfo = data
        this.avatarsrc = (`https://image.tmdb.org/t/p/w200${this.Accinfo.avatar.tmdb.avatar_path}`)
        console.log(`https://image.tmdb.org/t/p/w200${this.Accinfo.avatar.tmdb.avatar_path}`)
        // this.isloading = false
      } catch (error) {
        console.error(error);
      }

    },

    ts() {
      this.search = true
      searchinput.focus()
    }

  }
}









const items = [
  { title: 'Message', icon: 'mdi-email' },
  { title: 'Click Me', icon: 'mdi-email' },
  { title: 'Click Me', icon: 'mdi-email' },
  { title: 'Click Me 2', icon: 'mdi-email' },
]
</script>
<style scoped>
.sticky1 {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
