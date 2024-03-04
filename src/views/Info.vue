<script setup>
// import banner from '../components/Banner.vue'
import cast from '../components/Cast.vue'
import suggested from '../components/Suggested.vue'
</script>

<template>
    <div class="info-container">
        <transition name="fade" mode="out-in">
            <div>
                <transition name="fade" mode="out-in">
                    <div :key="movie.id" v-if="movie">
                        <v-parallax id="par" :src="`https://image.tmdb.org/t/p/original${movie.backdrop_path}`"
                            class="movie-item fade-in" gradient="to top, rgba(0, 0, 0, 2), rgba(0, 0, 0, 0.2)"
                            style=""></v-parallax>
                    </div>
                </transition>
                <transition name="slide-fade" appear>
                    <div :key="movie.id" v-if="movie"
                        class="absolute md:top-20 top-40   text text-left md:ml-12 ml-5 py-12 w-75">
                        <router-link :to="{ name: 'Info', params: { id: movie.id } }">
                            <p style="margin-left: 0rem; margin-top: 6rem;"
                                class="md:text-4xl text-3xl  font-weight-bold">
                                {{
                        movie.title }}</p>
                        </router-link>
                        <div class="rate d-lg-flex mt-5 mb-3" style="margin-left: 0rem;">
                            <v-rating readonly :length="5" :size="32"
                                :model-value="Math.floor(Math.random() * (5 - 2) + 2)" active-color="primary" />
                            <h4 class="font-weight-thin mr-4" style="margin-left: 0rem; padding: 4px;">{{
                        movie.popularity.toFixed() }} Reviews
                            </h4>
                            <h4 class="font-weight-thin pa-1"> {{ movie.vote_count }} Votes</h4>
                            <h4 class="font-weight-thin pa-1"> {{ movie.release_date }} Released</h4>
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
                <div class="overviewtext md:flex md:p-10 p-1 space-x-10 bg-zinc-900">
                    <transition name="fade" mode="out-in">
                        <div class="img p-4">
                            <img v-if="movie.poster_path"
                                :src="'https://image.tmdb.org/t/p/original' + movie.poster_path" alt="Movie Poster"
                                class="poster mx-auto" style="width: 35vh;" width="100%">
                        </div>
                    </transition>
                    <div class="txt space-y-5 w-4/5">
                        <h1 class="text-3xl font-medium">Storyline</h1>
                        <p class="opacity-70">{{ movie.overview }}</p>
                        <div class="release flex space-x-10">
                            <p>Released</p>
                            <p class="opacity-80">{{ movie.release_date }}</p>
                        </div>
                        <div class="duration flex space-x-10">
                            <p>Duration</p>
                            <p class="opacity-80">{{ movie.runtime }} min</p>
                        </div>
                        <div class="duration flex space-x-10">
                            <p>Budget</p>
                            <p class="opacity-80">${{ movie.budget.toLocaleString(undefined, {
                        maximumFractionDigits: 2
                    })
                                }}</p>
                        </div>
                        <div class="duration flex space-x-7">
                            <p>Revenue</p>
                            <p class="opacity-80">${{ movie.revenue.toLocaleString(undefined, {
                        maximumFractionDigits: 2
                    })
                                }}</p>
                        </div>
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
                            <p>Language</p>
                            <p class="opacity-80">{{ movie.original_language }}</p>
                        </div>
                        <div class="duration flex space-x-10">
                            <div class="p">
                                <p>Production</p>
                            </div>
                            <div class="r md:flex md:space-x-5 space-y-2 md:space-y-0">
                                <div v-for="company in movie.production_companies" :key="company.id" class="">
                                    <p class="opacity-80 mx-auto">{{ company.name }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="duration flex space-x-10 mb-10">
                            <p class="my-auto">Watch</p>
                            <a :href="'https://yts.mx/movies/' + movie.title.toLowerCase().replace(/ /g, '-') + '-' + movie.release_date.slice(0, 4)"
                                target="_blank" title="yts.mx" class="text-sky-700 underline my-auto">Watch now</a>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="fade" mode="out-in">
            <v-lazy>
                <cast />
            </v-lazy>
        </transition>
        <transition name="fade" mode="out-in">
            <v-lazy>
                <suggested />
            </v-lazy>
        </transition>
    </div>
</template>

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
                        Authorization: import.meta.env.VITE_API_KEY
                    }
                };
                const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

                const response = await fetch(url, options);
                const data = await response.json();
                this.movie = data;
                document.title = `${this.movie.title} (${this.movie.release_date.slice(0, 4)})`;
            } catch (error) {
                console.error(error);
            }
        }
    }
};
</script>