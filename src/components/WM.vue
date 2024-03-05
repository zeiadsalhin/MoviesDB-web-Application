<template>
    <div class="main mt-12">
        <div class="main px-5 text-2xl mt- -mb-5 flex">
            <h1 class="my-auto">Top War Movies </h1>
            <router-link :to="{ name: 'genre', params: { id: 10752, name: 'Top War Movies' } }"
                class="text-sm my-auto text-sky-400"><button class="p-3 my-auto">view all</button></router-link>
        </div>
        <!-- <v-lazy> -->
        <div class="scrollh overflow-hidden md:m-3">
            <div class="scroll-container" ref="scrollContainer">
                <button class="scroll-button left" @click="scrollLeft" v-show="scrollLeftButtonVisible"
                    v-if="!$vuetify.display.mobile">
                    <v-icon icon="mdi-chevron-left"></v-icon>
                </button>
                <div v-if="loading" class="flex justify-center mt-5" style="width: 100%;height: 50vh;">
                    <div class="load m-auto"><v-progress-circular indeterminate></v-progress-circular></div>
                </div>
                <div v-else class="movie-list" ref="movieList">
                    <div v-for="movie in visibleMovies" :key="movie.id" class="movie-item p-2"
                        style="height: fit-content;">
                        <router-link :to="{ name: 'Info', params: { id: movie.id } }">
                            <v-img v-if="movie.poster_path" :src="'https://image.tmdb.org/t/p/w342' + movie.poster_path"
                                alt="Movie Poster"
                                class="poster mx-auto hover:scale-105 transform transition ease-in-out duration-300"></v-img>
                            <h3 class="font-semibold md:text-lg px-4 mt-2 mx-auto">{{ movie.title.slice(0, 16) }}</h3>
                            <v-rating v-if="!$vuetify.display.mobile" :model-value="Math.random() * (5 - 2) + 2" hover
                                half-increments density="compact" size="small" color="blue-lighten-1"></v-rating>
                            <p class="" v-if="$vuetify.display.mobile"><v-icon icon="mdi-star" size="x-small"
                                    class="my-auto"></v-icon>
                                {{
                movie.vote_average.toFixed(1)
            }}</p>
                            <p class="opacity-70 text-sm">Released<br> {{ movie.release_date }}</p>
                        </router-link>
                    </div>
                </div>
                <button class="scroll-button right" @click="scrollRight" v-show="scrollRightButtonVisible"
                    v-if="!$vuetify.display.mobile">
                    <v-icon icon="mdi-chevron-right"></v-icon>
                </button>
            </div>
        </div>
        <!-- </v-lazy> -->
    </div>
</template>

<style scoped>
.movie-item {
    display: inline-block;
    text-align: center;
    margin-right: 0px;
}

.poster {
    width: 25vh;
    /* height: 100%; */
}
</style>

<script>
export default {
    data() {
        return {
            loading: true,
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
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: import.meta.env.VITE_API_KEY,
                },
            };

            try {
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?&page=${this.currentPage}&with_genres=10752`, options);
                const data = await response.json();
                this.movies = [...this.movies, ...data.results];
                this.totalPages = data.total_pages;
                this.loadVisibleMovies();
                this.loading = false
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