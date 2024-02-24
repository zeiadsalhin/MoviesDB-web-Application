<script setup>
import bannerinfo from '../components/Banner.vue'
</script>
<template>
    <div class="info-container">
        <bannerinfo />

        <div v-if="movie" class="overview">
            <div class="overviewtext flex p-10 space-x-10 bg-zinc-900">
                <div class="img">
                    <img v-if="movie.poster_path" :src="'https://image.tmdb.org/t/p/original' + movie.poster_path"
                        alt="Movie Poster" class="poster mx-auto" width="300">
                </div>
                <div class="txt space-y-5 w-3/4">
                    <h1 class="text-3xl font-medium">Storyline</h1>
                    <p class="opacity-70">{{ movie.overview }}</p>
                    <div class="release flex space-x-10">
                        <p>Released</p>
                        <p>{{ movie.release_date }}</p>
                    </div>
                    <div class="duration flex space-x-10">
                        <p>Duration</p>
                        <p>{{ movie.runtime }} min</p>
                    </div>
                    <div class="duration flex space-x-10">
                        <p>Budget</p>
                        <p>${{ movie.budget.toLocaleString(undefined, { maximumFractionDigits: 2 }) }}</p>
                    </div>
                    <div class="duration flex space-x-7">
                        <p>Revenue</p>
                        <p>${{ movie.revenue.toLocaleString(undefined, { maximumFractionDigits: 2 }) }}</p>
                    </div>
                    <div class="duration flex space-x-10">
                        <p>Status</p>
                        <p>{{ movie.status }}</p>
                    </div>
                    <div class="duration flex space-x-10">
                        <p>Language</p>
                        <p>{{ movie.original_language }}</p>
                    </div>
                    <div class="duration flex space-x-10">
                        <p>Production</p>
                        <p>{{ movie.production_companies }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>NO Data</div>
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
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZmE1ZTFjNGYwNDljNmQ2ODk5NGUxNjFhMzkwMjdiZCIsInN1YiI6IjY1ZDJjY2QwZTA0ZDhhMDE3Yzk4NjkxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UBW80pSmqSl9C9aXlY6WfPmil2ielVKp8Iqczoa0vwA'
                    }
                };
                const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

                const response = await fetch(url, options);
                const data = await response.json();
                this.movie = data;
            } catch (error) {
                console.error(error);
            }
        }
    }
};
</script>