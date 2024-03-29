<script setup>
</script>

<template>
    <div class="cast md:flex-col md:p-10 p-1 md:space-x-10 bg-zinc-900 mt-5">
        <div class="text text-3xl font-medium p-5">
            <h1>Cast</h1>
        </div>
        <v-lazy>
            <div v-if="movieCredits != null" class="scroll-container h-full mb-4" ref="scrollContainer">
                <button class="scroll-button left" @click="scrollLeft" v-show="scrollLeftButtonVisible"
                    v-if="!$vuetify.display.mobile">
                    <v-icon icon="mdi-chevron-left"></v-icon>
                </button>
                <div class="movie-list" ref="movieList">
                    <div v-for="person in movieCredits.cast" :key="person.id" class="person p-2 h-fit">
                        <div class="imagecover" style=" width: 20vh;height: 100%;margin: 0.1rem;height: fit-content;">
                            <v-img v-if="person.profile_path"
                                :src="'https://image.tmdb.org/t/p/w342' + person.profile_path" alt="Person" width="100%"
                                height="100%"
                                class="poster mx-auto hover:scale-105 transform transition ease-in-out duration-300"></v-img>
                            <v-img v-else src="/error.svg"></v-img>
                        </div>
                        <h3 class="font-semibold md:text-md text-left py-2">{{ person.name }}</h3>
                        <p class="opacity-70 text-sm text-left">{{ person.character }}</p>

                    </div>
                </div>
                <button class="scroll-button right" @click="scrollRight" v-show="scrollRightButtonVisible"
                    v-if="!$vuetify.display.mobile && movieCredits.cast.length > 8">
                    <v-icon icon="mdi-chevron-right"></v-icon>
                </button>
            </div>
            <div v-else class="flex justify-center m-auto p-5">Cannot find Cast</div>

        </v-lazy>
    </div>
</template>

<style scoped>
.movie-list {
    padding: 0px;
}

.movie-item {
    display: inline-block;
    text-align: center;
    margin-right: 0px;
}
</style>

<script>
export default {
    data() {
        return {
            movieCredits: null,
            scrollLeftButtonVisible: false,
            scrollRightButtonVisible: true,
        };
    },
    mounted() {
        this.fetchMovieDetails();
    },
    methods: {
        async fetchMovieDetails() {
            try {
                const tvid = this.$route.params.id;
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: import.meta.env.VITE_API_KEY
                    }
                };
                const url = `https://api.themoviedb.org/3/tv/${tvid}/aggregate_credits?language=en-US`;

                const response = await fetch(url, options);
                const data = await response.json();
                this.movieCredits = data;
            } catch (error) {
                console.error(error);
            }
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
    }
};
</script>