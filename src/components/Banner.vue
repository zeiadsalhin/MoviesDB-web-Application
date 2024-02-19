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
                    :style="{ backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.2)), url(https://image.tmdb.org/t/p/original${randomMovie.backdrop_path})` }"
                    class="movie-item">
                    <h3>{{ randomMovie.title }}</h3>
                    <!-- Display other movie information here -->
                </div>
            </transition>
        </div>
    </div>
    <button @click="random">Get</button>
</template>
<script>
export default {
    data() {
        return {
            empty: false,
            isloading: false,
            value1: '',
            Results: [],
            displayLimit: 10,
            randomMovie: null,
        }
    },
    mounted() {
        this.random();
    },
    methods: {
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
    }
}
</script>
<style>
.movie-item {

    width: 100vw;
    height: 70vh;
    background-size: cover;
    background-blend-mode: multiply;
    /* Add other desired styles */
}

.dd {
    width: 100%;
    height: 50vh;
    background-size: cover;
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