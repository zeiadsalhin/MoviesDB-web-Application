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
    <!-- <button @click="random">Check API</button> -->

    <!-- <div class="main"> -->
    <div class="about p-1 md:p-10 flex-col justify-center h-fit bg-zinc-950 dark:text-white reveal1">
        <h1 class="text-2xl md:text-4xl dark:text-white text-center font-bold p-2">My Account</h1>
        <div class="w-1/4 h-1 mt-5 rounded-xl mx-auto bg-zinc-700 "></div>
        <div class="bg-zinc-950 mt-5 w-fit mx-auto">
            <div id="loader" class="bg-zinc-900 w-fit animate-pulse    mx-auto">
                <img id="profile" @load="imageload" src="" class="mx-auto p- opacity-0" width="250" height="200" alt="user">
            </div>

        </div>
        <form @submit.prevent="update">
            <input type="file" id="choose" name="img" accept="image/*" required hidden>
            <!-- <button @click="choose" type="button" class="mx-auto flex p-2">
                    <p class="my-auto text-sm">تعديل الصورة الشخصية</p><img src=""
                        class="p-2 dark:invert hover:cursor-pointer" width="30" height="40" alt="edit">
                </button> -->
            <!-- <span class="text-sm flex justify-center opacity-50 -mt-3 mb-4">Max size 1Mb</span> -->
            <!-- <button id="edit" type="submit"
                class="mx-auto flex justify-center text-center text-white text-sm bg-red-700 px-4 py-1 hidden">تحديث</button> -->
        </form>

        <div class="w-1/6 h-1 m-5 rounded-xl mx-auto bg-zinc-900"></div>
        <form id="form" class="space-y-5 p-5 h- text-center mx-auto justify-center flex-col" @submit.prevent="register">
            <div class="form flex justify-center">
                <label class="p-2 font-semibold text-md md:text-xl text-right md:mr-14">Name</label>
                <input id="username" type="name" readonly spellcheck="false"
                    class="bg-zinc-900 dark:text-white text-black text-center rounded-md  focus:outline-none w-2/3 "
                    required />
                <!-- <img id="editname" @click="editname" src="" class="px-2 dark:invert hover:cursor-pointer" width="40"
                        height="40" alt="edit">
                    <img id="confirmname" @click="editname" src=""
                        class="hidden px-3 mx-2 dark:invert bg-gray-300 dark:bg-gray-200 rounded-xl hover:cursor-pointer"
                        width="40" height="40" alt="edit"> -->
            </div>

            <div class="form mt-3 flex justify-center">
                <label class="p-2 font-semibold text-md md:text-xl md:mr-14">Email</label>
                <input v-model="email" id="email" type="email" readonly spellcheck="false"
                    class="bg-zinc-900 dark:text-white text-black text-center rounded-md  focus:outline-none w-2/3 "
                    required />
                <!-- <img id="editemail" @click="editemail" src="" class="px-2 dark:invert hover:cursor-pointer opacity-100"
                        width="40" height="40" alt="edit"> -->
                <!-- <button id="updatemailb" @click="updatemail" type="button"
                        class="bg-gray-300 dark:bg-gray-800 m-1 px-2 rounded-md hidden">Update</button> -->
            </div>
            <div class="form mt-10">
                <label class="p-3 font-semibold text-md md:text-xl text-center md:mr-5">Email Verified:</label>
                <input id="verified" readonly placeholder="yes"
                    class="hidden bg-gray-200 dark:bg-gray-300 text-black text-center p-1 md:p-2 rounded-md placeholder:text-green-700 focus:outline-none" />
                <input id="notverified" readonly placeholder="No"
                    class="hidden bg-gray-200 dark:bg-gray-300 text-black text-center p-1 md:p-2 rounded-md placeholder:text-red-700 focus:outline-none" />
                <!-- <p id="sendverification" @click="sendverfication"
                        class="p-2 m-5 hover:cursor-pointer w-fit mx-auto bg-gray-100 dark:bg-gray-900 hover:bg-gray-300">
                        Send
                        verification
                        Link</p> -->
            </div>

            <!-- <button id="submit" @click="" type="submit"
                    class="px-5 py-2 w-32 rounded-md hover:cursor-pointer bg-gray-400 hover:bg-gray-500 dark:hover:bg-gray-900 dark:bg-gray-800">
                    Save
                </button> -->


        </form>
        <!-- <button class="flex justify-cente mx-auto" @click="deleteuser">
                <p class="my-auto">حذف الحساب نهائيا</p><img id="" src="" class=" my-auto p-2" width="50" height="200"
                    alt="user">
            </button> -->
    </div>
    <!-- </div> -->
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