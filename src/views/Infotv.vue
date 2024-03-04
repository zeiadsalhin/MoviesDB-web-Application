<script setup>
import casttv from '../components/Casttv.vue'
import suggestedtv from '../components/Suggestedtv.vue'


function reveal() {
    for (var e = document.querySelectorAll(".reveal"), t = 0; t < e.length; t++) {
        var o,
            s = window.innerHeight;
        e[t].getBoundingClientRect().top < s - 1 && e[t].classList.add("active");
    }
} setInterval(reveal, 1)
</script>

<template>
    <div class="info-container">
        <transition name="fade" mode="out-in">
            <div>
                <transition name="fade" mode="out-in">
                    <div :key="movie.id" v-if="movie">
                        <v-parallax id="par" :src="`https://image.tmdb.org/t/p/original${movie.backdrop_path}`"
                            class="movie-item fade-in" gradient="to top, rgba(0, 0, 0, 2), rgba(0, 0, 0, 0.3)"
                            style=""></v-parallax>
                    </div>
                </transition>
                <transition name="slide-fade" appear>
                    <div :key="movie.id" v-if="movie"
                        class="absolute md:top-20 top-40   text text-left md:ml-12 ml-5 py-12 w-75">
                        <router-link :to="{ name: 'Infotv', params: { id: movie.id } }">
                            <p style="margin-left: 0rem; margin-top: 6rem;"
                                class="md:text-4xl text-3xl  font-weight-bold">
                                {{
                        movie.name }}</p>
                        </router-link>
                        <div class="rate d-lg-flex mt-5 mb-3" style="margin-left: 0rem;">
                            <v-rating readonly :length="5" :size="32" :model-value="Math.random() * (5 - 2) + 2"
                                active-color="primary" />
                            <h4 class="font-weight-thin mr-4" style="margin-left: 0rem; padding: 4px;">{{
                        movie.popularity.toFixed() }} Reviews
                            </h4>
                            <h4 class="font-weight-thin pa-1"> {{ movie.vote_count }} Votes</h4>
                            <h4 class="font-weight-thin pa-1"> {{ movie.first_air_date }} First release</h4>
                        </div>
                        <p class="w-50 " v-if="!$vuetify.display.mobile">{{ movie.overview.slice(0, 300) }}...</p>
                    </div>
                    <div v-else class="text-center mx-auto"><v-progress-circular indeterminate></v-progress-circular>
                    </div>
                </transition>
            </div>
        </transition>
        <transition name="fade" mode="out-in">
            <div v-if="movie" class="overview">
                <div class="overviewtext md:flex md:p-10 space-x-10 bg-zinc-900">
                    <transition name="fade" mode="out-in">
                        <div class="img p-4">
                            <img v-if="movie.poster_path || movie.backdrop_path"
                                :src="'https://image.tmdb.org/t/p/original' + movie.poster_path || movie.backdrop_path"
                                alt="Movie Poster" class="poster mx-auto" style="width: 40vh;" width="100%">
                        </div>
                    </transition>
                    <div class="txt space-y-5 w-4/5">
                        <h1 class="text-3xl font-medium">Storyline</h1>
                        <p class="opacity-70">{{ movie.overview }}</p>
                        <div class="release flex space-x-10">
                            <p>Last release</p>
                            <p class="opacity-80">{{ movie.last_air_date }}</p>
                        </div>
                        <!-- <div class="duration flex space-x-10">
                            <p>Duration</p>
                            <p class="opacity-80">{{ movie.runtime }} min</p>
                        </div>
                        <div class="duration flex space-x-10">
                            <p>Budget</p>
                            <p class="opacity-80">${{ movie.budget.toLocaleString(undefined, { maximumFractionDigits: 2 })
                            }}</p>
                        </div>
                        <div class="duration flex space-x-7">
                            <p>Revenue</p>
                            <p class="opacity-80">${{ movie.revenue.toLocaleString(undefined, { maximumFractionDigits: 2 })
                            }}</p>
                        </div> -->
                        <div class="duration flex space-x-10">
                            <div class="g">
                                <p>Genre</p>
                            </div>
                            <div class="r md:flex md:space-x-5 space-y-2 md:space-y-0">
                                <div v-for="genre in movie.genres" :key="genre.id">
                                    <p class="opacity-80 mx-auto">{{ genre.name }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="duration flex space-x-10">
                            <p>Status</p>
                            <p class="opacity-80">{{ movie.status }}</p>
                        </div>
                        <div class="duration flex space-x-10">
                            <p>In production</p>
                            <p class="opacity-80">{{ movie.in_production }}</p>
                        </div>
                        <div class="duration flex space-x-10">
                            <p>Episode</p>
                            <p class="opacity-80">{{ movie.last_episode_to_air.episode_number }}</p>
                        </div>
                        <div class="duration flex space-x-10">
                            <p>type</p>
                            <p class="opacity-80">{{ movie.last_episode_to_air.episode_type }}</p>
                        </div>
                        <div class="duration flex space-x-10">
                            <p>Season</p>
                            <p class="opacity-80">{{ movie.last_episode_to_air.season_number }}</p>
                        </div>
                        <div class="duration flex space-x-10">
                            <p>Total Episodes</p>
                            <p class="opacity-80">{{ movie.number_of_episodes }}</p>
                        </div>
                        <div class="duration flex space-x-10">
                            <p>Total Seasons</p>
                            <p class="opacity-80">{{ movie.number_of_seasons }}</p>
                        </div>
                        <div class="duration flex space-x-10">
                            <p>Language</p>
                            <p class="opacity-80">{{ movie.original_language }}</p>
                        </div>
                        <div class="duration flex space-x-10">
                            <div class="p">
                                <p>Production</p>
                            </div>
                            <div class="r md:flex md:space-x-5 space-y-2 md:space-y-0">
                                <div v-for="company in movie.production_companies" :key="company.id" class="">
                                    <img :src="'https://image.tmdb.org/t/p/original' + company.logo_path" width="40"
                                        alt="">
                                    <p class="opacity-80 mx-auto">{{ company.name }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="duration flex space-x-10">
                            <div class="p">
                                <p>Countries of produce</p>
                            </div>
                            <div class="r md:flex md:space-x-5 space-y-2 md:space-y-0">
                                <div v-for="company in movie.production_countries" :key="company.id" class="">
                                    <img :src="'https://image.tmdb.org/t/p/original' + company.logo_path" width="40"
                                        alt="">
                                    <p class="opacity-80 mx-auto">{{ company.name }} - {{ company.iso_3166_1 }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="duration flex space-x-10 mb-10 py-5">
                            <p class="my-auto">Watch</p>
                            <a :href="'https://www.google.com/search?q=yts.mx:' + movie.name" target="_blank"
                                title="yts.mx" class="text-sky-700 underline my-auto">Watch now</a>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade" mode="out-in">
            <v-lazy>
                <casttv />
            </v-lazy>
        </transition>
        <transition name="fade" mode="out-in">
            <v-lazy>
                <suggestedtv />
            </v-lazy>
        </transition>
    </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
    transition: opacity 3s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>

<script>
export default {
    data() {
        return {
            movie: null
        };
    },
    mounted() {
        this.fetchMovieDetails();
    },
    methods: {
        async fetchMovieDetails() {
            try {
                const movieId = this.$route.params.id;
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZmE1ZTFjNGYwNDljNmQ2ODk5NGUxNjFhMzkwMjdiZCIsInN1YiI6IjY1ZDJjY2QwZTA0ZDhhMDE3Yzk4NjkxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UBW80pSmqSl9C9aXlY6WfPmil2ielVKp8Iqczoa0vwA'
                    }
                };
                const url = `https://api.themoviedb.org/3/tv/${movieId}?language=en-US`;

                const response = await fetch(url, options);
                const data = await response.json();
                this.movie = data;
                document.title = `${this.movie.name} (TV Series ${this.movie.first_air_date.slice(0, 4)}-${this.movie.last_air_date.slice(0, 4)})`;
            } catch (error) {
                console.error(error);
            }
        }
    }
};
</script>