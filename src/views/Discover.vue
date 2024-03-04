<script setup>
</script>

<template>
    <transition name="fade" mode="out-in">
        <div class="main mt-20">
            <div class=" w-11/12 mx-auto p-2">
                <h1 class="text-2xl">{{ $route.params.id.charAt(0).toUpperCase() +
                    $route.params.id.slice(1).replace('/', ' ') }}
                </h1>
            </div>
            <div v-if="results" class="movie-list flex justify-center" ref="movieList">
                <div class="movie-row p-1">
                    <div v-for="(result, index) in  results " :key="result.id" class="movie-item justify-center"
                        :style="{ flexBasis: 100 / 8 + '%' }" style="height: fit-content;">
                        <router-link :to="{ name: 'Info', params: { id: result.id } }">
                            <div class="imagecover poster mx-auto" style="width: 11rem;height: fit-content;">
                                <v-img v-if="result.poster_path && result.title"
                                    :src="'https://image.tmdb.org/t/p/w342' + result.poster_path" alt="Movie Poster"
                                    class="poster mx-auto hover:scale-105 transform transition ease-in-out duration-300"
                                    width="100%"></v-img>
                                <v-img v-if="result.poster_path && result.name"
                                    :src="'https://image.tmdb.org/t/p/w342' + result.poster_path" alt="Movie Poster"
                                    class="poster mx-auto hover:scale-105 transform transition ease-in-out duration-300"
                                    width="100%"></v-img>
                                <v-img v-if="result.poster_path == ''" src="/error.svg" class="poster bg-zinc-900"
                                    width="100%"></v-img>
                            </div>
                            <div class="mx-auto" style="width: 11rem;">
                                <div v-if="result.title" class="vshow">
                                    <h3 v-if="result.title.length < 16" class="md:text-lg py-1 mx-1">{{
                    result.title
                }}
                                    </h3>
                                    <h3 v-else class="md:text-lg py-1 mx-1">{{ result.title.substring(0, 15) +
                    '..'
                                        }}
                                    </h3>
                                    <v-rating v-if="!$vuetify.display.mobile" :model-value="Math.random() * (5 - 2) + 2"
                                        hover half-increments density="compact" size="small"
                                        color="blue-lighten-1"></v-rating>
                                    <p class="" v-if="$vuetify.display.mobile"><v-icon icon="mdi-star" size="x-small"
                                            class="my-auto"></v-icon>
                                        {{
                    result.vote_average.toFixed(1)
                }}</p>
                                    <p v-if="result.title" class="opacity-70 text-sm mx-1">Released<br> {{
                    result.release_date }}
                                    </p>
                                    <h3 v-if="result.original_name" class="font-semibold md:text-lg px-4 mt-2 mx-auto">
                                        {{
                    result.original_name }}</h3>
                                </div>
                                <div v-if="result.name" class="vshowtv">
                                    <h3 class="font-semibold md:text-lg py-1 mx-auto">{{ result.name.slice(0, 16) }}
                                    </h3>
                                    <p class="opacity-70 text-sm">Release Date:<br> {{ result.first_air_date }}</p>
                                    <v-rating v-if="!$vuetify.display.mobile" :model-value="Math.random() * (5 - 2) + 2"
                                        hover half-increments density="compact" size="small"
                                        color="blue-lighten-1"></v-rating>
                                    <p class="" v-if="$vuetify.display.mobile"><v-icon icon="mdi-star" size="x-small"
                                            class="my-auto"></v-icon>
                                        {{
                                        result.vote_average.toFixed(1)
                                        }}</p>
                                </div>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <div v-else class="flex justify-center" style="height: 70vh;">
                <div class="load m-auto"><v-progress-circular indeterminate></v-progress-circular></div>
            </div>
            <div v-if="loading" class="flex justify-center" style="height: 70vh;">
                <div class="load m-auto"><v-progress-circular indeterminate></v-progress-circular></div>
            </div>
        </div>
    </transition>
</template>

<style>
.poster {
    width: 20vh;
    height: 100%;
    padding: 0.1rem;
    height: fit-content;
}

.movie-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2px;
}
</style>

<script>
export default {
    data() {
        return {
            search: '',
            results: [],
            visibleResults: [],
            itemsPerPage: 100,
            currentPage: 1,
            loading: false,
        };
    },
    mounted() {
        this.fetchResults()
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        clearSearch() {
            this.search = '';
            this.fetchResults();
        },
        async fetchResults() {
            this.results = [];
            this.visibleResults = [];
            this.currentPage = 1;

            await this.loadMoreResults();
        },
        async loadMoreResults() {
            if (this.loading) return;

            try {
                this.loading = true;
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZmE1ZTFjNGYwNDljNmQ2ODk5NGUxNjFhMzkwMjdiZCIsInN1YiI6IjY1ZDJjY2QwZTA0ZDhhMDE3Yzk4NjkxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UBW80pSmqSl9C9aXlY6WfPmil2ielVKp8Iqczoa0vwA'
                    }
                };
                const url = `https://api.themoviedb.org/3/${this.$route.params.id.replace(/ /g, '/')}?include_adult=true&include_video=true&language=en-US&page=${this.currentPage}&sort_by=popularity.desc`;
                const response = await fetch(url, options);
                const data = await response.json();
                this.results = this.results.concat(data.results);
                this.visibleResults = this.results.slice(0, this.currentPage * this.itemsPerPage);
                this.currentPage++;
                console.log(this.results);
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        handleScroll() {
            const scrollPosition = window.innerHeight + window.pageYOffset;
            const pageHeight = document.documentElement.scrollHeight;
            const bottomOffset = 400;

            if (scrollPosition >= pageHeight - bottomOffset && !this.loading) {
                this.loadMoreResults();
            }
        },
    },
};
</script>