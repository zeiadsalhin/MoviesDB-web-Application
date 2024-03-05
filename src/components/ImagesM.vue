<template>
    <div class="main mb-5 mt-5">
        <v-lazy>
            <transition name="fade" mode="out-in">
                <div class="overview flex-col">
                    <div class="text text-3xl p-5">
                        <h1>Trailer & Photos</h1>
                    </div>
                    <div class="scrollh overflow-hidden p-3">
                        <div class="images">
                            <v-overlay dark="true" v-model="overlay" class="flex justify-center"
                                style="width: 100%; height: 100vh;background-color: rgba(0, 0, 0, 40%);">
                                <div class="flex justify-center my-auto w-screen"
                                    style="width: 23rem;transform: translateY(50%);">
                                    <div id="player" class="flex justify-center bg-zinc-950">
                                    </div>
                                </div>
                            </v-overlay>

                            <div v-for="image in movie?.backdrops.slice(10, 11)" :key="image.file_path"
                                class="my-auto bg-zinc-900" :style="{ flexBasis: 100 / 10 + '%' }">
                                <div class="img p-4 brightness-90 ">
                                    <v-img :src="'https://image.tmdb.org/t/p/original' + image.file_path"
                                        alt="Movie Poster" class="poster mx-auto" style="width: 20rem;">
                                        <button @click="overlay = true" class="m-auto backdrop-brightness-75    "
                                            style="position: relative;top: 50%;left: 50%; transform: translate(-20%,-10%);scale: 3;"><v-icon
                                                size="x-large">mdi-play</v-icon></button>
                                    </v-img>
                                </div>
                            </div>
                            <div v-for="image in movie?.backdrops.slice(0, 3)" :key="image.file_path"
                                class="my-auto bg-zinc-900" :style="{ flexBasis: 100 / 10 + '%' }">
                                <div class="img p-4">
                                    <v-img :src="'https://image.tmdb.org/t/p/original' + image.file_path"
                                        alt="Movie Poster" class="poster mx-auto" style="width: 20rem;"></v-img>
                                </div>
                            </div>
                            <div v-for="image in movie?.logos.slice(0, 1)" :key="image.file_path"
                                class="my-auto bg-zinc-900" :style="{ flexBasis: 100 / 10 + '%' }">
                                <div class="img p-4">
                                    <v-img :src="'https://image.tmdb.org/t/p/original' + image.file_path"
                                        alt="Movie Poster" class="poster mx-auto" style="width: 15rem;"></v-img>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </transition>
        </v-lazy>
    </div>
</template>

<style scoped>
.images {
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
            movie: null,
            youtubePlayer: null,
            videoKey: null,
            videoFetched: false,
            overlay: false,
        };
    },
    mounted() {
        this.fetchMovieDetails();
        this.fetchMovieVideo();
    },
    watch: {
        overlay(value) {
            if (value) {
                this.initializeYouTubePlayer();
            } else {
                this.destroyYouTubePlayer();
            }
        },
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
                const url = `https://api.themoviedb.org/3/movie/${movieId}/images`;

                const response = await fetch(url, options);
                const data = await response.json();
                this.movie = data;
            } catch (error) {
                console.error(error);
            }
        },
        async fetchMovieVideo() {
            try {
                if (this.videoFetched) {
                    return;
                }

                const movieId = this.$route.params.id;
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: import.meta.env.VITE_API_KEY
                    }
                };
                const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
                const response = await fetch(url, options);
                const data = await response.json();
                if (data.results && data.results.length > 0) {
                    this.videoKey = data.results[0].key;
                    this.initializeYouTubePlayer();
                    this.videoFetched = true;
                }
            } catch (error) {
                console.error(error);
            }
        },
        initializeYouTubePlayer() {
            this.$nextTick(() => {
                this.youtubePlayer = new YT.Player('player', {
                    videoId: this.videoKey,
                    height: '360',
                    width: '100%',
                });
            });
        },
        destroyYouTubePlayer() {
            if (this.youtubePlayer) {
                this.youtubePlayer.destroy();
                this.youtubePlayer = null;
            }
        },
    },
};
</script>