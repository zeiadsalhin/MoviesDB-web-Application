<script setup>
// const options = {
//     method: 'GET',
//     headers: {
//         accept: 'application/json',
//         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmZhYmU3Y2YwZjE1ZmM2NzcwNDI5NTU4NjQ1MmYyMyIsInN1YiI6IjY1ZDJjY2QwZTA0ZDhhMDE3Yzk4NjkxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lHtAcwN2dmtg-x6Lw1yqU6bBCGPAceThYLxJyyXbVZU'
//     }
// };

// fetch('https://api.themoviedb.org/3/authentication', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));
</script>
<template>
    <!-- <div>
        <div v-if="isloading">Loading...</div>
        <div v-else>
            <div v-for="movie in Results" :key="movie.id">
                <div class="movie-item">
                    <h3>{{ movie.title }}</h3> -->
    <!-- Add other movie information here -->
    <!-- </div>
            </div>
        </div>
    </div> -->



    <div>
        <div v-if="isloading">Loading...</div>
        <div v-else>
            <transition name="fade" mode="out-in">
                <div :key="randomMovie.id" v-if="randomMovie"
                    :style="{ backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.0)),linear-gradient(to right, rgba(0, 0, 0, 2), rgba(0, 0, 0, 0)),linear-gradient(to right, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0)), url(https://image.tmdb.org/t/p/original${randomMovie.backdrop_path})` }"
                    class="movie-item fade-in">
                    <div class="text text-left ml-12 py-12 w-75">
                        <p style="font-size: 2.1rem; margin-left: 0rem; margin-top: 6rem;" class="text-4 font-weight-bold">
                            {{
                                randomMovie.title }}</p>
                        <div class="rate d-lg-flex" style="margin-left: 0rem;">
                            <v-rating readonly :length="5" :size="32" :model-value="3" active-color="primary" />
                            <h4 class="font-weight-thin mr-4" style="margin-left: 0rem; padding: 4px;">{{
                                randomMovie.popularity }} Reviews
                            </h4>
                            <h4 class="font-weight-thin pa-1"> {{ randomMovie.vote_count }} Votes</h4>
                            <h4 class="font-weight-thin pa-1"> {{ randomMovie.release_date }} Release-date</h4>
                        </div>
                        <p class="w-100 ">{{ randomMovie.overview.slice(0, 80) }}...</p>
                    </div>
                    <!-- Display other movie information here -->
                </div>
            </transition>
        </div>
    </div>
    <!-- <button @click="random">Get</button> -->
</template>
<script>
export default {
    data() {
        return {
            isloading: false,
            Results: [],
            displayLimit: 100,
            randomMovie: null,
        }
    },
    mounted() {
        this.random();
    },
    methods: {
        loadImage() {
            const image = new Image();
            image.src = `https://image.tmdb.org/t/p/original${this.randomMovie.backdrop_path}`;
            image.addEventListener('load', () => {
                this.isloading = false;
                this.$refs.movieItem.style.opacity = 1;
            });
        },

        async random() {

            try {
                this.isloading = true;

                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmZhYmU3Y2YwZjE1ZmM2NzcwNDI5NTU4NjQ1MmYyMyIsInN1YiI6IjY1ZDJjY2QwZTA0ZDhhMDE3Yzk4NjkxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lHtAcwN2dmtg-x6Lw1yqU6bBCGPAceThYLxJyyXbVZU'
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
        watch: {
            randomMovie() {
                this.isloading = true;
                this.$refs.movieItem.style.opacity = 0;
                this.loadImage();
            },
        },
    }
}
</script>
<style>
.movie-item {

    width: 100%;
    height: 75vh;
    background-position: center;
    background-size: cover;
    background-blend-mode: multiply;
    /* Add other desired styles */
}

.fade-in {
    opacity: 0;
    animation: fadeInAnimation 2s ease forwards;
}

@keyframes fadeInAnimation {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>