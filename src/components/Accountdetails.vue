<script setup>
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmZhYmU3Y2YwZjE1ZmM2NzcwNDI5NTU4NjQ1MmYyMyIsInN1YiI6IjY1ZDJjY2QwZTA0ZDhhMDE3Yzk4NjkxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lHtAcwN2dmtg-x6Lw1yqU6bBCGPAceThYLxJyyXbVZU'
    }
};

// fetch('https://api.themoviedb.org/3/authentication', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));
</script>
<template>
    <button @click="random">Check API</button>
</template>
<script>
export default {
    data() {
        return {
            empty: false,
            isloading: false,
            value1: '',
            Emailinfo: [],
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
                const url = ("https://api.themoviedb.org/3/account/21017366")
                const response = await fetch(url, options)
                const data = await response.json()
                console.log(data)
                this.Emailinfo = data
                this.isloading = false
            } catch (error) {
                console.error(error);
            }

        },
    }
}
</script>