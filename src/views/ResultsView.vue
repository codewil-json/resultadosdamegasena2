<template>
    <main class="container mt-5 lottery-results">
        <h1 v-reveal>Resultados das Loterias</h1>
        <p v-reveal>Consulte o último sorteio ou informe o número do concurso desejado.</p>
        <div class="lottery-list">
            <LotteryResult
                v-for="lottery in lotteries"
                :key="lottery.id"
                :lottery="lottery.id"
            />
        </div>
        <MainFooter />
    </main>
</template>

<script>
import LotteryResult from '@/components/LotteryResult.vue'
import MainFooter from '@/components/MainFooter.vue'
import { LOTTERIES } from '@/services/lotteries'

export default {
    components: { LotteryResult, MainFooter },
    data() {
        return {
            lotteries: LOTTERIES,
        }
    },
}
</script>

<style scoped>
.lottery-results h1 {
    margin-bottom: .5rem;
}

.lottery-list {
    display: grid;
    gap: 2rem;
    margin-top: 2rem;
}
</style>
