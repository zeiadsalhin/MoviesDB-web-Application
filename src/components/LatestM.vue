<template>
    <div class="main px-10 text-2xl mt-10 flex">
        <h1>Discover Movies</h1>
        <routerLink class="text-sm my-auto px-5" to="/discover">view all</routerLink>
    </div>
    <v-lazy>
        <div class="scroll-container" ref="scrollContainer">
            <div class="movie-list" ref="movieList">
                <div v-for="movie in visibleMovies" :key="movie.id" class="movie-item p-2 ">
                    <v-img v-if="movie.poster_path" :src="'https://image.tmdb.org/t/p/original' + movie.poster_path"
                        alt="Movie Poster"
                        class="poster mx-auto hover:scale-105 transform transition ease-in-out duration-300 "></v-img>
                    <h3 class="font-semibold text-lg p-4 mx-auto">{{ movie.title.slice(0, 16) }}</h3>
                    <p class="opacity-70 ">Release Date:<br> {{ movie.release_date }}</p>
                </div>
            </div>
            <button class="text-xl bg-zinc-900 hover:bg-zinc-950 h-3/4 px-4 mx-5 my-auto transform transition ease-in-out"
                @click="fetchNextPage">View
                full list&#8678;</button>
        </div>
    </v-lazy>
</template>
  
<style>
.scroll-container {
    width: 100%;
    height: 75vh;
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
}

.movie-list {
    display: flex;
    padding: 30px;
}

.movie-item {
    display: inline-block;
    text-align: center;
    margin-right: 0px;
    /* width: 500px; */
}

.poster {
    width: 200px;
    padding: 0.1rem;
    /* Adjust the width as needed */
    height: fit-content;
}

.movie-title {
    max-width: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.fetch-button {
    position: relative;
    top: 0;
    right: 0;
    margin-top: 20px;
    font-size: 20px;
    padding: 10px 20px;
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
            totalPages: null
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
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZmE1ZTFjNGYwNDljNmQ2ODk5NGUxNjFhMzkwMjdiZCIsInN1YiI6IjY1ZDJjY2QwZTA0ZDhhMDE3Yzk4NjkxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UBW80pSmqSl9C9aXlY6WfPmil2ielVKp8Iqczoa0vwA'
                }
            };

            try {
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=true&language=en-US&page=${this.currentPage}&sort_by=popularity.desc`, options);
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


    }
};
</script>