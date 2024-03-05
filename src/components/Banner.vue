<template>
    <div class="-mt-">
        <div v-if="isloading" class="flex justify-center" style="height: 70vh;">
            <div class="load m-auto"><v-progress-circular indeterminate></v-progress-circular></div>
        </div>
        <div v-else>
            <transition name="fade" mode="out-in">
                <div :key="randomMovie.id" v-if="randomMovie">
                    <v-parallax id="par" :src="`https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`"
                        class="movie-item fade-in"
                        gradient="to right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.0)),linear-gradient(to right, rgba(0, 0, 0, 2), rgba(0, 0, 0, 0)),linear-gradient(to right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0)"></v-parallax>
                </div>
            </transition>
            <transition name="slide-fade" appear>
                <div :key="randomMovie.id" v-if="randomMovie"
                    class="absolute md:top-20 top-40       text text-left md:ml-12 ml-5 mt-12 w-75">
                    <router-link :to="{ name: 'Info', params: { id: randomMovie.id } }">
                        <p style="margin-left: 0rem; margin-top: 6rem;" class="md:text-4xl text-3xl  font-weight-bold">
                            {{
            randomMovie.title }}</p>
                    </router-link>
                    <div class="rate d-lg-flex mt-5 mb-3" style="margin-left: 0rem;opacity: 0.9;">
                        <v-rating readonly :length="5" :size="32" :model-value="Math.floor(Math.random() * (5 - 2) + 2)"
                            active-color="primary" />
                        <h4 class="font-weight-thin mr-" style="margin-left: 0rem; padding: 4px;">{{
            randomMovie.popularity.toFixed() }} Reviews
                        </h4>
                        <h4 class="font-weight-thin pa-1"> {{ randomMovie.vote_count }} Votes</h4>
                        <h4 class="font-weight-thin pa-1"> {{ randomMovie.release_date.slice(0, 4) }}</h4>
                    </div>
                    <p class="w-50 " v-if="!$vuetify.display.mobile" style="opacity: 0.9;">{{
            randomMovie.overview.slice(0,
                        300) }}...</p>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isloading: false,
            Results: [],
            displayLimit: 100000,
            randomMovie: null,
        }
    },
    mounted() {
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
                        Authorization: import.meta.env.VITE_API_KEY
                    }
                };
                const url = ("https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc")
                const response = await fetch(url, options)
                const data = await response.json()
                this.Results = data.results.slice(0, this.displayLimit)
                const randomIndex = Math.floor(Math.random() * this.Results.length);
                this.randomMovie = this.Results[randomIndex];
                this.isloading = false
                // console.log(this.Results)
            } catch (error) {
                console.error(error);
            }

        },
    }
}
</script>