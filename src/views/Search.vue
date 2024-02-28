<script setup>
</script>
<template>
    <div class="main">
        <input ref="search" v-model="search" type="search" name="search" id="search"
            placeholder="Search Movies, TV Shows..."
            class="bg-zinc-800 p-5 outline-none w-11/12 mx-auto flex justify-center rounded-md text-lg">
    </div>
</template>
<script>
export default {
    mounted() {
        this.$refs.search.focus();
    },
};
</script>