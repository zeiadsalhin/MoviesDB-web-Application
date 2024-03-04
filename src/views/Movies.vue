<script setup>
import UpM from "../components/UpcomingM.vue"
import TopRM from "../components/TopRM.vue"
import ActionM from "../components/ActionM.vue"
import AdvM from "../components/AdventureM.vue"
import CrimeM from "../components/CrimeM.vue"
import DocM from "../components/DocumentaryM.vue"
import HistoryM from "../components/HistoryM.vue"
import HorrorM from "../components/HorrorM.vue"
import SFM from "../components/SFM.vue"
import TM from "../components/TM.vue"
import WM from "../components/WM.vue"
import latest from "../components/LatestM.vue"
import latest2 from "../components/LatestTV.vue"
import trending from "../components/Trending.vue"
import trendingtv from "../components/Trendingtv.vue"
import TopRTV from "../components/TopRTV.vue"
</script>

<template>
    <div v-if="isloading" class=""
        style="height: 100vh;width: 100%; background-color: black; position: a1bsolute; z-index: 999;">
        <div class="load m-auto" style="position: re1lative;top: 50%;transform: translateX(50%);overflow: hidden;">
            <v-progress-circular indeterminate></v-progress-circular>
        </div>
    </div>
    <div v-else style="scale: 0.9;" class="-mt-80 -mb-96">
        <div class="h1 text-3xl text-center">Browse Movies and TV</div>
        <transition name="fade" mode="out-in">
            <UpM />
        </transition>
        <transition name="fade" mode="out-in">
            <TopRM />
        </transition>
        <transition name="fade" mode="out-in">
            <ActionM />
        </transition>
        <transition name="fade" mode="out-in">
            <AdvM />
        </transition>
        <transition name="fade" mode="out-in">
            <CrimeM />
        </transition>
        <transition name="fade" mode="out-in">
            <DocM />
        </transition>
        <transition name="fade" mode="out-in">
            <HistoryM />
        </transition>
        <transition name="fade" mode="out-in">
            <HorrorM />
        </transition>
        <transition name="fade" mode="out-in">
            <SFM />
        </transition>
        <transition name="fade" mode="out-in">
            <TM />
        </transition>
        <transition name="fade" mode="out-in">
            <WM />
        </transition>
        <transition name="fade" mode="out-in">
            <latest />
        </transition>
        <transition name="fade" mode="out-in">
            <latest2 />
        </transition>
        <transition name="fade" mode="out-in">
            <trending />
        </transition>
        <transition name="fade" mode="out-in">
            <trendingtv />
        </transition>
        <transition name="fade" mode="out-in">
            <TopRTV />
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isloading: true,
        }
    },
    mounted() {
        this.isloading = false
    },
}
</script>