<template>
    <div class="main px-5 text-2xl mt-10 -mb-5 flex">
        <h1>Trending Movies</h1>
        <router-link class="text-sm my-auto px-5 text-sky-400" to="/discover">view all</router-link>
    </div>
    <!-- <v-lazy> -->
    <!-- <div class="scrollh overflow-hidden"> -->
    <div class="scroll-container" ref="scrollContainer">
        <button class="scroll-button left" @click="scrollLeft" v-show="scrollLeftButtonVisible"
            v-if="!$vuetify.display.mobile">
            <v-icon icon="mdi-chevron-left"></v-icon>
        </button>
        <div class="movie-list" ref="movieList">
            <div v-for="movie in visibleMovies" :key="movie.id" class="movie-item p-2">
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
        <button class="text-xl bg-zinc-900 hover:bg-zinc-950 h-2/3 mt-10 px-4 mx-5 transform transition ease-in-out"
            @click="fetchNextPage">View
            full list&#8678;</button>
        <button class="scroll-button right" @click="scrollRight" v-show="scrollRightButtonVisible"
            v-if="!$vuetify.display.mobile">
            <v-icon icon="mdi-chevron-right"></v-icon>
        </button>
    </div>
    <!-- </div> -->
    <!-- </v-lazy> -->
</template>
  
<style >
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
    height: 100%;
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
            movies: [],
            // rating: this.visibleMovies.vote_average,
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
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZmE1ZTFjNGYwNDljNmQ2ODk5NGUxNjFhMzkwMjdiZCIsInN1YiI6IjY1ZDJjY2QwZTA0ZDhhMDE3Yzk4NjkxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UBW80pSmqSl9C9aXlY6WfPmil2ielVKp8Iqczoa0vwA',
                },
            };

            try {
                const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?language=en-US`, options);
                const data = await response.json();
                this.movies = [...this.movies, ...data.results];
                // this.rating = this.movies.vote_average
                // console.log(JSON.stringify(this.visibleMovies.vote_average))
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