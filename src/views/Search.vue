<script setup>
</script>

<template>
    <div class="main mt-20 h-screen">
        <div class="search-bar w-11/12 mx-auto">
            <input ref="search" v-model="search" type="search" name="search" id="search" @input="fetchResults"
                placeholder="Search Movies, TV Shows..."
                class="bg-zinc-800 p-5 outline-none w-full rounded-md text-lg" />
            <button class="clear-button" @click="clearSearch" v-show="search.length > 0">
                <svg width="256px" height="256px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path
                            d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z"
                            fill="#a1a1aa"></path>
                    </g>
                </svg>
            </button>
        </div>
        <!-- <div v-if="results.length < 1 && !loading" class="tip flex justify-center p-5 opacity-50">
            <h1>Start Searching</h1>
        </div> -->
        <div v-if="results" class="movie-list flex justify-center" ref="movieList">
            <div class="movie-row p-1">
                <div v-for="(result, index) in results" :key="result.id" class="movie-item justify-center"
                    :style="{ flexBasis: 100 / 7 + '%' }" style="height: fit-content;">
                    <router-link :to="{ name: 'Info', params: { id: result.id } }">
                        <div class="imagecover poster mx-auto" style="width:11rem;height: fit-content;">
                            <v-img v-if="result.poster_path && result.title"
                                :src="'https://image.tmdb.org/t/p/w342' + result.poster_path" alt="Movie Poster"
                                class="poster mx-auto hover:scale-105 transform transition ease-in-out duration-300"
                                width="100%"></v-img>
                            <v-img v-else src="/error.svg" class="poster bg-zinc-900" width="100%"></v-img>
                        </div>
                        <div class="text mx-auto" style="width: 11rem;">
                            <h3 class="mx-1 mt-2">{{ result.title }}</h3>
                            <p v-if="result.title" class="opacity-70 text-xs mx-1">Released<br> {{
                result.release_date.slice(0,
                    4) }}
                            </p>
                            <h3 v-if="result.original_name" class="mt-2 mx-1">{{
                result.original_name }}</h3>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <div v-else class="flex justify-center" style="height: 20vh;">
            <div class="load m-auto"><v-progress-circular indeterminate></v-progress-circular></div>
        </div>
        <div v-if="loading" class="flex justify-center" style="height: 20vh;">
            <div class="load m-auto"><v-progress-circular indeterminate></v-progress-circular></div>
        </div>
    </div>
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
    gap: 5px;
}

.search-bar {
    position: relative;
    display: flex;
    align-items: center;
}

.clear-button {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
}

.clear-button svg {
    width: 3rem;
    height: 1.8rem;
}
</style>

<script>
export default {
    data() {
        return {
            search: '',
            results: [],
            visibleResults: [],
            itemsPerPage: 20,
            currentPage: 1,
            loading: false,
        };
    },
    mounted() {
        this.$refs.search.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
            this.$refs.search.focus();
        }, 500);

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
                const url = `https://api.themoviedb.org/3/search/multi?query=${this.search}&include_adult=false&language=en-US&page=${this.currentPage}`;
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
            const bottomOffset = 10;

            if (scrollPosition >= pageHeight - bottomOffset && !this.loading && this.search != '') {
                this.loadMoreResults();
            }
        },
    },
};
</script>