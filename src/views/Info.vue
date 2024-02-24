<template>
    <div class="info-container">
        <div>
            <transition name="fade" mode="out-in">
                <div :key="movie.id" v-if="movie"
                    :style="{ backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.0)),linear-gradient(to right, rgba(0, 0, 0, 2), rgba(0, 0, 0, 0)),linear-gradient(to right, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }"
                    class="movie-item fade-in"></div>
            </transition>
            <div :key="movie.id" v-if="movie" class="absolute md:top-20 top-40   text text-left md:ml-12 ml-5 py-12 w-75">
                <router-link :to="{ name: 'Info', params: { id: movie.id } }">
                    <p style="margin-left: 0rem; margin-top: 6rem;" class="md:text-4xl text-3xl  font-weight-bold">
                        {{
                            movie.title }}</p>
                </router-link>
                <div class="rate d-lg-flex mt-5 mb-3" style="margin-left: 0rem;">
                    <v-rating readonly :length="5" :size="32" :model-value="Math.floor(Math.random() * (5 - 2) + 2)"
                        active-color="primary" />
                    <h4 class="font-weight-thin mr-4" style="margin-left: 0rem; padding: 4px;">{{
                        movie.popularity }} Reviews
                    </h4>
                    <h4 class="font-weight-thin pa-1"> {{ movie.vote_count }} Votes</h4>
                    <h4 class="font-weight-thin pa-1"> {{ movie.release_date }} Released</h4>
                </div>
                <p class="w-50 " v-if="!$vuetify.display.mobile">{{ movie.overview.slice(0, 300) }}...</p>
            </div>
        </div>

        <div class="overview">
            <div class="overviewtext flex p-10 space-x-10 bg-zinc-900">
                <div class="img">
                    <v-img v-if="movie.poster_path" :src="'https://image.tmdb.org/t/p/original' + movie.poster_path"
                        alt="Movie Poster" class="poster mx-auto" width="300"></v-img>
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
                        <p>Genre</p>
                        <p>{{ movie.genres.join(', ') }} min</p>
                    </div>
                </div>
            </div>
        </div>
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
                const genreIds = this.movie.genres.map(genre => genre.id);
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
                const genreNames = genreData.genres
                    .filter(genre => genreIds.includes(genre.id))
                    .map(genre => genre.name);

                this.movie.genres = genreNames;
            } catch (error) {
                console.error(error);
            }
        }
    }
};
</script>