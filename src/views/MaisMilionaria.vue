<template>
    <main class="container mt-5">
        <LotteryResult lottery="maismilionaria" />
    </main>
    <div class="container">
        <DefaultContent />
    </div>
    <MainFooter />
</template>

<script>
import LotteryResult from '@/components/LotteryResult.vue'
import MainFooter from '@/components/MainFooter.vue'
import DefaultContent from '../components/DefaultContent.vue'

export default {
    components: { LotteryResult, MainFooter, DefaultContent },
}
</script>
