<template>
    <div class="main mt-20" style="scale: 0.9;">
        <div class="1">
            <div class="main px-5 text-2xl mt- -mb-5 flex">
                <h1 class="my-auto">Theatre Playing Movies </h1>
                <!-- <router-link :to="{ name: 'top', params: { id: 'movie', name: 'Top Rated Movies' } }"
                class="text-sm my-auto text-sky-400"><button class="p-3 my-auto">view all</button></router-link> -->
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
                                <v-img v-if="movie.poster_path"
                                    :src="'https://image.tmdb.org/t/p/w342' + movie.poster_path" alt="Movie Poster"
                                    class="poster mx-auto hover:scale-105 transform transition ease-in-out duration-300"></v-img>
                                <h3 v-if="movie.title.length < 16" class="font-semibold md:text-lg py-1 mx-auto">
                                    {{ movie.title }}
                                </h3>
                                <h3 v-else class="font-semibold md:text-lg py-1 mx-auto">{{ movie.title.substring(0, 15)
                            +
                            '..' }}
                                </h3>
                                <v-rating v-if="!$vuetify.display.mobile" :model-value="Math.random() * (5 - 2) + 2"
                                    hover half-increments density="compact" size="small"
                                    color="blue-lighten-1"></v-rating>
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
        <div class="2">
            <div class="cast md:flex-col md:p-10 p-1 md:space-x-10 bg-zinc-950 mt-5 w-full">
                <div class="text text-2xl font-medium p-5">
                    <h1>Top People this Month</h1>
                </div>
                <div v-if="movieCredits != null" class="scroll-container" ref="scrollContainer"
                    style="height: fit-content;">
                    <button class="scroll-button left" @click="scrollLeft" v-show="scrollLeftButtonVisible"
                        v-if="!$vuetify.display.mobile">
                        <v-icon icon="mdi-chevron-left"></v-icon>
                    </button>
                    <div class="movie-list" ref="movieList">
                        <div v-for="person in movieCredits" :key="person.id" class="person p-2">
                            <div class="imagecover"
                                style=" width: 8rem;height: 100%;margin: 0.1rem;height: fit-content;"><v-img
                                    v-if="person.profile_path"
                                    :src="'https://image.tmdb.org/t/p/w154' + person.profile_path" alt="Person"
                                    width="100%" height="100%"
                                    class="poster mx-auto hover:scale-105 transform transition ease-in-out duration-300"></v-img>
                                <v-img v-else src="/error.svg"></v-img>
                            </div>
                            <h3 class="font-semibold md:text-md text-left py-2">{{ person.name }}</h3>
                            <p class="opacity-70 text-sm text-left">{{ person.character }}</p>

                        </div>
                    </div>
                    <button class="scroll-button right" @click="scrollRight" v-show="scrollRightButtonVisible"
                        v-if="!$vuetify.display.mobile && movieCredits.length > 8">
                        <v-icon icon="mdi-chevron-right"></v-icon>
                    </button>
                </div>
                <div v-else class="flex justify-center m-auto p-5">
                    <div class="load m-auto"><v-progress-circular indeterminate></v-progress-circular></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
::-webkit-scrollbar {
    display: none;
}

.scroll-container {
    /* position: relative; */
    width: 100%;
    height: 65vh;
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
}

.movie-list {
    display: flex;
    padding: 20px;
}

.movie-item {
    display: inline-block;
    text-align: center;
    margin-right: 0px;
}

.poster {
    width: 25vh;
    /* height: 100%; */
    padding: 0.1rem;
    height: fit-content;
}

.scroll-button {
    position: sticky;
    z-index: 999;
    top: 50%;
    transform: translateY(-10%);
    width: 20%;
    height: 100%;
    margin-top: auto;
    margin-bottom: auto;
    background-color: rgba(0, 0, 0, 0.447);
    border: none;
    /* border-radius: 50%; */
    font-size: 1.8rem;
    cursor: pointer;
}

.scroll-button.left {
    left: 0px;
}

.scroll-button.right {
    right: 0px;
}
</style>

<script>
export default {
    data() {
        return {
            loading: true,
            movies: [],
            visibleMovies: [],
            movieCredits: null,
            currentPage: 1,
            pageSize: 20,
            totalPages: null,
            scrollLeftButtonVisible: false,
            scrollRightButtonVisible: true,
        };
    },
    mounted() {
        this.fetchMovies();
        this.fetchMovieDetails();
    },
    methods: {
        async fetchMovies() {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: import.meta.env.VITE_API_KEY
                },
            };

            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${this.currentPage}`, options);
                const data1 = await response.json();
                this.movies = [...this.movies, ...data1.results];
                this.totalPages = data1.total_pages;
                this.loadVisibleMovies();
                this.loading = false
            } catch (error) {
                console.error(error);
            }
        },
        async fetchMovieDetails() {
            try {
                // const movieId = this.$route.params.id;
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: import.meta.env.VITE_API_KEY
                    }
                };
                const url = `https://api.themoviedb.org/3/person/popular?language=en-US&page=1`;

                const response = await fetch(url, options);
                const data2 = await response.json();
                this.movieCredits = data2;
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