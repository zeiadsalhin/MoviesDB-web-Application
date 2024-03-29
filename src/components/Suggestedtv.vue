<template>
    <div class="main px-10 text-2xl mt-10 flex">
        <h1>Similar TV Shows</h1>
        <router-link class="text-sm my-auto px-5 text-sky-400" to="/discover">view all</router-link>
    </div>
    <v-lazy>
        <div v-if="movies.length > 1" class="scrollh overflow-hidden">
            <div class="scroll-container" ref="scrollContainer">
                <button class="scroll-button left" @click="scrollLeft" v-show="scrollLeftButtonVisible"
                    v-if="!$vuetify.display.mobile">
                    <v-icon icon="mdi-chevron-left"></v-icon>
                </button>
                <div class="movie-list" ref="movieList">
                    <div v-for="movie in visibleMovies" :key="movie.id" class="movie-item p-2">
                        <router-link :to="{ name: 'Infotv', params: { id: movie.id } }">
                            <div class="imagecover poster mx-auto"><v-img v-if="movie.poster_path"
                                    :src="'https://image.tmdb.org/t/p/w342' + movie.poster_path" alt="Movie Poster"
                                    class="mx-auto hover:scale-105 transform transition ease-in-out duration-300"
                                    width="100%"></v-img>
                                <v-img v-else src="/error.svg" class="poster bg-zinc-900"></v-img>
                            </div>

                            <h3 v-if="movie.original_name.length < 16" class="font-semibold md:text-lg p-2 mx-auto">{{
            movie.original_name }}
                            </h3>
                            <h3 v-else class="font-semibold md:text-lg p-2 mx-auto">{{ movie.original_name.substring(0,
            15)
            + '..'
                                }}</h3>
                            <p class="opacity-70 text-sm">Release Date:<br> {{ movie.first_air_date.slice(0, 4) }}</p>
                            <v-rating v-if="!$vuetify.display.mobile" :model-value="Math.random() * (5 - 2) + 2" hover
                                half-increments density="compact" size="small" color="blue-lighten-1"></v-rating>
                            <p class="mt-1" v-if="$vuetify.display.mobile"><v-icon icon="mdi-star" size="x-small"
                                    class="my-auto"></v-icon>
                                {{
            movie.vote_average.toFixed(1)
        }}</p>
                            <!-- <p class="opacity-70 text-sm">Release Date:<br> {{ movie.release_date }}</p> -->
                        </router-link>
                    </div>
                </div>
                <button
                    class="text-xl bg-zinc-900 hover:bg-zinc-950 h-2/3 mt-10 px-4 mx-5 transform transition ease-in-out"
                    @click="fetchNextPage">View
                    full list&#8678;</button>
                <button class="scroll-button right" @click="scrollRight" v-show="scrollRightButtonVisible"
                    v-if="!$vuetify.display.mobile">
                    <v-icon icon="mdi-chevron-right"></v-icon>
                </button>
            </div>
        </div>
        <div v-else class="flex justify-center m-auto p-5">Cannot find similar Shows</div>
    </v-lazy>
</template>

<style scoped>
.movie-list {
    padding: 40px;
}

.movie-item {
    display: inline-block;
    text-align: center;
    margin-right: 0px;
}

.poster {
    width: 25vh;
}
</style>

<script>
export default {
    data() {
        return {
            movies: [],
            visibleMovies: [],
            currentPage: 1,
            pageSize: 20,
            totalPages: null,
            scrollLeftButtonVisible: false,
            scrollRightButtonVisible: true,
        };
    },
    mounted() {
        this.fetchMovies();
    },
    methods: {
        async fetchMovies() {
            const movieId2 = this.$route.params.id;
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: import.meta.env.VITE_API_KEY
                },
            };

            try {
                const response = await fetch(`https://api.themoviedb.org/3/tv/${movieId2}/similar?language=en-US&page=1`, options);
                const data = await response.json();
                this.movies = [...this.movies, ...data.results];
                this.totalPages = data.total_pages;
                this.loadVisibleMovies();
            } catch (error) {
                console.error(error);
            }
        },
        loadVisibleMovies() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = startIndex + this.pageSize;
            this.visibleMovies = this.movies.slice(startIndex, endIndex);
        },
        scrollLeft() {
            const container = this.$refs.scrollContainer;
            const scrollAmount = 200; // Amount to scroll
            const divsToScroll = 5; // Number of divs to scroll

            const currentScroll = container.scrollLeft;

            const targetScroll = Math.max(
                currentScroll - (scrollAmount * divsToScroll),
                0
            );
            this.smoothScroll(container, currentScroll, targetScroll);
            this.updateScrollButtonVisibility();
        },

        scrollRight() {
            const container = this.$refs.scrollContainer;
            const scrollAmount = 200; // Amount to scroll
            const divsToScroll = 5; // Number of divs to scroll

            const currentScroll = container.scrollLeft;
            const maxScroll = container.scrollWidth - container.clientWidth;
            const targetScroll = Math.min(
                currentScroll + (scrollAmount * divsToScroll),
                maxScroll
            );
            this.smoothScroll(container, currentScroll, targetScroll);
            this.updateScrollButtonVisibility();
        },
        updateScrollButtonVisibility() {
            const container = this.$refs.scrollContainer;
            const maxScroll = container.scrollWidth - container.clientWidth;

            this.scrollLeftButtonVisible = container.scrollLeft > 0;
            this.scrollRightButtonVisible = container.scrollLeft = maxScroll;
        },

        smoothScroll(container, currentScroll, targetScroll) {
            const duration = 500; // Duration of the smooth scroll animation
            const startTime = performance.now();

            const scroll = () => {
                const currentTime = performance.now();
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = this.easeInOutQuad(progress);

                container.scrollLeft = currentScroll + (targetScroll - currentScroll) * easedProgress;

                if (progress < 1) {
                    requestAnimationFrame(scroll);
                }
            };

            scroll();
        },

        easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        },
    },
};
</script>