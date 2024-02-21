<script setup>

</script>
<template>
    <div class="about p-1 md:p-10 flex-col justify-center h-fit bg-zinc-950 dark:text-white reveal1">
        <h1 class="text-2xl md:text-4xl dark:text-white text-center font-bold p-2">My Account</h1>
        <div class="w-1/4 h-1 mt-5 rounded-xl mx-auto bg-zinc-700 "></div>
        <div class="bg-zinc-950 mt-5 w-fit mx-auto">
            <div :key="Emailinfo.avatar.tmdb.avatar_path" v-if="!Emailinfo == null" id="loader"
                class="bg-white w-fit    mx-auto">
                <img id="profile" :src="`https://image.tmdb.org/t/p/w200${Emailinfo.avatar.tmdb.avatar_path}`"
                    class="mx-auto p- opacity-100" width="100" height="200" alt="user">
            </div>

        </div>
        <form @submit.prevent="update">
            <input type="file" id="choose" name="img" accept="image/*" required hidden>
        </form>

        <div class="w-1/6 h-1 m-5 rounded-xl mx-auto bg-zinc-900"></div>
        <form id="form" class="space-y-5 p-5 h- text-center mx-auto justify-center flex-col" @submit.prevent="register">
            <div class="form flex justify-center">
                <label class="p-2 font-semibold text-md md:text-xl text-right md:mr-14 text-zinc-300">Name</label>
                <input id="username" type="name" readonly spellcheck="false" :value="Emailinfo.name"
                    class="bg-zinc-950 text-center rounded-md  focus:outline-none w-92 " required />
            </div>

            <div class="form mt-3 flex justify-center">
                <label class="p-2 font-semibold text-md md:text-xl md:mr-14 text-zinc-300">Username </label>
                <input id="email" type="email" readonly spellcheck="false" :value="Emailinfo.username"
                    class="bg-zinc-950 text-center rounded-md  focus:outline-none w-92 " required />
            </div>

            <div class="form mt-3 flex justify-center">
                <label class="p-2 font-semibold text-md md:text-xl md:mr-14 text-zinc-300">Account ID </label>
                <input id="email" type="email" readonly spellcheck="false" :value="Emailinfo.id"
                    class="bg-zinc-950 text-center rounded-md  focus:outline-none w-92 " required />
            </div>

            <div class="form mt-3 flex justify-center">
                <label class="p-2 font-semibold text-md md:text-xl md:mr-14 text-zinc-300">Language </label>
                <input id="email" type="email" readonly spellcheck="false" :value="Emailinfo.iso_639_1"
                    class="bg-zinc-950 text-center rounded-md  focus:outline-none w-92 " required />
            </div>
        </form>
        <div class="form mt-10 flex justify-center">
            <p class="p-2 text-md md:text-lg text-zinc-400">Powered by <a href="https://www.themoviedb.org/"
                    title="The movie database">TMDB</a> API</p>
        </div>
    </div>
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
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZmE1ZTFjNGYwNDljNmQ2ODk5NGUxNjFhMzkwMjdiZCIsInN1YiI6IjY1ZDJjY2QwZTA0ZDhhMDE3Yzk4NjkxNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UBW80pSmqSl9C9aXlY6WfPmil2ielVKp8Iqczoa0vwA'
                    }
                };
                const url = ("https://api.themoviedb.org/3/account/21017366")
                const response = await fetch(url, options)
                const data = await response.json()
                console.log(data)
                this.Emailinfo = data
                this.isloading = false
                // console.log(`https://image.tmdb.org/t/p/w200${this.Emailinfo.avatar.tmdb.avatar_path}?s=200`)
            } catch (error) {
                console.error(error);
            }

        },
    }
}
</script>