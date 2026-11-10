<template>
    <section
        class="lottery-result"
        :class="[
            variant === 'main' ? 'main-variant' : 'detail-variant',
            { 'federal-variant': lottery === 'federal' },
        ]"
        :style="{ '--lottery-color': lotteryInfo.color, '--lottery-text-color': lotteryInfo.textColor || '#fff' }"
    >
        <form class="contest-search" @submit.prevent="searchContest">
            <label :for="`contest-${lottery}`">Buscar por número de concurso</label>
            <div class="search-controls">
                <input
                    :id="`contest-${lottery}`"
                    v-model="contestInput"
                    type="number"
                    min="1"
                    step="1"
                    inputmode="numeric"
                    placeholder="Número do concurso"
                    :aria-label="`Número do concurso da ${lotteryInfo.name}`"
                >
                <button type="submit" :disabled="loading || !contestInput">
                    {{ loading ? 'Buscando...' : 'Buscar' }}
                </button>
                <button type="button" class="latest-button" :disabled="loading" @click="loadLatest">
                    Último resultado
                </button>
            </div>
        </form>

        <p v-if="errorMessage" class="error-message" role="alert">{{ errorMessage }}</p>
        <p v-if="loading && !result" class="loading-message" role="status">Carregando resultado...</p>

        <template v-if="result && variant === 'main'">
            <div class="main-draw" v-reveal>
                <div class="results">
                    <h2>Números<br>Sorteados</h2>
                    <span class="draw-number">Sorteio nº {{ result.concurso }}</span>
                    <div v-for="draw in draws" :key="draw.label" class="draw-group">
                        <span v-if="draws.length > 1" class="draw-label">{{ draw.label }}</span>
                        <ul class="numbers">
                            <li v-for="(number, index) in draw.numbers" :key="`${draw.label}-${index}`">
                                {{ number }}
                            </li>
                        </ul>
                    </div>
                    <div v-if="extraResults.length" class="draw-extras">
                        <p v-for="extra in extraResults" :key="extra.label">
                            <strong>{{ extra.label }}:</strong> {{ extra.value }}
                        </p>
                    </div>
                </div>

                <div class="draw-info-wrapper">
                    <div class="draw">
                        <div class="draw-info">
                            <p class="draw-meta">
                                <span>Sorteio <strong>{{ result.data }}</strong></span>
                                <span>Concurso <strong>{{ result.concurso }}</strong></span>
                            </p>
                            <p v-if="result.local" class="draw-location">
                                Local de Sorteio:<br>
                                <strong>{{ result.local }}</strong>
                            </p>
                            <div v-if="prizeSummary" class="draw-value">
                                <span>{{ prizeSummary.label }}:</span>
                                <h3>{{ formatCurrency(prizeSummary.amount) }}</h3>
                            </div>
                        </div>
                        <span class="divisor"></span>
                        <div v-if="result.premiacoes && result.premiacoes.length" class="main-table-wrapper">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Premiação</th>
                                        <th>Ganhadores</th>
                                        <th>Prêmio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="prize in result.premiacoes" :key="prize.faixa">
                                        <td>{{ prize.descricao }}</td>
                                        <td>{{ prize.ganhadores }}</td>
                                        <td>{{ formatCurrency(prize.valorPremio) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <aside class="next-draw">
                        <h3>Próximo<br>Concurso</h3>
                        <p v-if="result.valorEstimadoProximoConcurso > 0" class="next-draw-value">
                            {{ formatPrizeMillions(result.valorEstimadoProximoConcurso) }}
                        </p>
                        <p v-else class="next-draw-value">Em breve</p>
                        <span v-if="result.acumulou" class="accumulate">Acumulada!</span>
                        <span v-if="result.dataProximoConcurso" class="draw-span">Sorteio {{ result.dataProximoConcurso }}</span>
                        <span v-if="result.proximoConcurso" class="draw-number">Concurso {{ result.proximoConcurso }}</span>
                        <a href="https://investloto.com.br" class="join-secondary">Participe</a>
                    </aside>
                </div>
            </div>

            <div class="ms-alert" v-reveal>
                <span class="target"></span>
                <div class="inner">
                    <p v-if="result.acumulou">
                        A {{ lotteryInfo.name }} acumulou e a estimativa do prêmio para o próximo concurso
                        ({{ result.proximoConcurso }})<span v-if="result.dataProximoConcurso">, que será sorteado no dia {{ result.dataProximoConcurso }}</span>,
                        é de {{ formatPrizeMillions(result.valorEstimadoProximoConcurso) }}.
                        <br>Aumente consideravelmente sua chance de ganhar o prêmio.
                    </p>
                    <p v-else-if="result.proximoConcurso && result.valorEstimadoProximoConcurso > 0">
                        A estimativa para o prêmio da {{ lotteryInfo.name }} (concurso {{ result.proximoConcurso }})
                        <span v-if="result.dataProximoConcurso">, que será sorteado no dia {{ result.dataProximoConcurso }}</span>,
                        é de {{ formatPrizeMillions(result.valorEstimadoProximoConcurso) }}.
                        <br>Aumente consideravelmente sua chance de ganhar o prêmio.
                    </p>
                    <p v-else>
                        Resultado oficial da {{ lotteryInfo.name }} para o concurso {{ result.concurso }}.
                    </p>
                    <a href="https://investloto.com.br" class="join-default">Participe</a>
                </div>
            </div>
        </template>

        <template v-else-if="result">
            <article class="detail-result" v-reveal>
                <header class="detail-header">
                    <div class="detail-heading">
                        <img src="@/assets/clover.png" alt="">
                        <h2>{{ lotteryInfo.name }}</h2>
                    </div>
                    <div class="detail-header-content">
                        <div class="detail-metadata">
                            <span><i class="bi bi-box-seam-fill"></i> Concurso {{ result.concurso }}</span>
                            <span><i class="bi bi-calendar-event-fill"></i> {{ result.data }}</span>
                        </div>
                        <p v-if="result.local" class="detail-location">
                            Local do sorteio:<br><strong>{{ result.local }}</strong>
                        </p>
                        <div v-if="prizeSummary" class="detail-prize">
                            <span>{{ prizeSummary.label }}</span>
                            <strong>{{ formatCurrency(prizeSummary.amount) }}</strong>
                        </div>
                        <p v-if="result.acumulou" class="detail-accumulated">Prêmio acumulado</p>
                    </div>
                </header>

                <div class="detail-body">
                    <div v-for="draw in draws" :key="draw.label" class="detail-draw">
                        <h3 v-if="draws.length > 1 || lottery === 'timemania' || lottery === 'federal'">
                            {{ draw.label }}
                        </h3>
                        <ul class="detail-numbers" :class="{ 'federal-tickets': lottery === 'federal' }">
                            <li
                                v-for="(number, index) in draw.numbers"
                                :key="`${draw.label}-${index}`"
                                :class="{ 'federal-ticket': lottery === 'federal' }"
                            >
                                <template v-if="lottery === 'federal'">
                                    <span class="federal-ticket-rank">{{ index + 1 }}º prêmio</span>
                                    <strong>{{ number }}</strong>
                                </template>
                                <template v-else>{{ number }}</template>
                            </li>
                        </ul>
                    </div>

                    <div v-for="extra in extraResults" :key="extra.label" class="detail-extra">
                        <label>{{ extra.label }}</label>
                        <div class="extra-value">
                            <img v-if="extra.label === 'Trevos'" src="@/assets/clover.png" alt="">
                            <span>{{ extra.value }}</span>
                        </div>
                    </div>

                    <div v-if="lottery === 'duplasena' && result.premiacoes && result.premiacoes.length" class="detail-dupla-prizes">
                        <div
                            v-for="group in duplaPrizeGroups"
                            :key="group.label"
                            class="detail-table-wrapper"
                        >
                            <h3>{{ group.label }}</h3>
                            <table class="detail-table">
                                <thead>
                                    <tr>
                                        <th>Premiação</th>
                                        <th>Ganhadores</th>
                                        <th>Prêmio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="prize in group.prizes" :key="prize.faixa">
                                        <td>{{ prize.descricao }}</td>
                                        <td>{{ prize.ganhadores }}</td>
                                        <td>{{ formatCurrency(prize.valorPremio) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div v-else-if="result.premiacoes && result.premiacoes.length" class="detail-table-wrapper">
                        <table class="detail-table">
                            <thead>
                                <tr>
                                    <th>Premiação</th>
                                    <th>Ganhadores</th>
                                    <th>Prêmio</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="prize in result.premiacoes" :key="prize.faixa">
                                    <td>{{ prize.descricao }}</td>
                                    <td>{{ prize.ganhadores }}</td>
                                    <td>{{ formatCurrency(prize.valorPremio) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </article>
        </template>
    </section>
</template>

<script>
import { fetchLotteryResult, LOTTERIES } from '@/services/lotteries'

export default {
    name: 'LotteryResult',
    props: {
        lottery: {
            type: String,
            required: true,
        },
        variant: {
            type: String,
            default: 'detail',
            validator: (value) => ['main', 'detail'].includes(value),
        },
    },
    data() {
        return {
            contestInput: '',
            result: null,
            loading: false,
            errorMessage: '',
        }
    },
    computed: {
        lotteryInfo() {
            return LOTTERIES.find(({ id }) => id === this.lottery)
        },
        mainPrize() {
            return this.result && this.result.premiacoes && this.result.premiacoes[0]
        },
        prizeSummary() {
            if (!this.mainPrize) {
                return null
            }

            if (Number(this.mainPrize.ganhadores) > 0) {
                return {
                    label: 'Valor do prêmio',
                    amount: this.mainPrize.valorPremio,
                }
            }

            const estimatedPrize = Number(this.result.valorEstimadoProximoConcurso)
            const accumulatedPrize = Number(this.result.valorAcumuladoProximoConcurso)
            const amount = estimatedPrize > 0 ? estimatedPrize : accumulatedPrize

            if (amount > 0) {
                return {
                    label: 'Prêmio estimado próximo concurso',
                    amount,
                }
            }

            return {
                label: 'Valor do prêmio',
                amount: this.mainPrize.valorPremio,
            }
        },
        draws() {
            if (!this.result || !Array.isArray(this.result.dezenas)) {
                return []
            }

            if (this.lottery === 'duplasena') {
                return [
                    { label: 'Primeiro sorteio', numbers: this.result.dezenas.slice(0, 6) },
                    { label: 'Segundo sorteio', numbers: this.result.dezenas.slice(6, 12) },
                ].filter(({ numbers }) => numbers.length)
            }

            return [{
                label: this.lottery === 'federal' ? 'Bilhetes premiados' : 'Dezenas sorteadas',
                numbers: this.result.dezenas,
            }]
        },
        extraResults() {
            if (!this.result) {
                return []
            }

            const extras = []
            if (this.result.trevos && this.result.trevos.length) {
                extras.push({ label: 'Trevos', value: this.result.trevos.join(', ') })
            }
            if (this.result.timeCoracao) {
                extras.push({ label: 'Time do Coração', value: this.result.timeCoracao })
            }
            if (this.result.mesSorte) {
                extras.push({ label: 'Mês da Sorte', value: this.result.mesSorte })
            }
            return extras
        },
        duplaPrizeGroups() {
            const prizes = (this.result && this.result.premiacoes) || []
            return [
                { label: 'Premiação do primeiro sorteio', prizes: prizes.slice(0, 4) },
                { label: 'Premiação do segundo sorteio', prizes: prizes.slice(4, 8) },
            ].filter(({ prizes: groupPrizes }) => groupPrizes.length)
        },
    },
    created() {
        this.loadLatest()
    },
    methods: {
        async loadLatest() {
            this.contestInput = ''
            await this.loadResult()
        },
        async searchContest() {
            const contest = String(this.contestInput).trim()
            if (!/^[1-9]\d*$/.test(contest)) {
                this.errorMessage = 'Informe um número de concurso válido.'
                return
            }

            await this.loadResult(Number(contest))
        },
        async loadResult(contest) {
            this.loading = true
            this.errorMessage = ''
            this.result = null

            try {
                this.result = await fetchLotteryResult(this.lottery, contest)
            } catch (error) {
                console.error(`Erro ao carregar resultado da ${this.lotteryInfo.name}:`, error)
                if (error.response && error.response.status === 404) {
                    this.errorMessage = contest
                        ? `O concurso ${contest} da ${this.lotteryInfo.name} não foi encontrado.`
                        : `Não foi possível localizar o resultado mais recente da ${this.lotteryInfo.name}.`
                } else {
                    this.errorMessage = `Não foi possível carregar o resultado da ${this.lotteryInfo.name}. Tente novamente.`
                }
            } finally {
                this.loading = false
            }
        },
        formatCurrency(value) {
            const amount = Number(value)
            if (!Number.isFinite(amount)) {
                return 'Valor não informado'
            }

            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            }).format(amount)
        },
        formatPrizeMillions(value) {
            const amount = Number(value)
            if (!Number.isFinite(amount) || amount <= 0) {
                return 'Valor não informado'
            }
            if (amount < 1000000) {
                return this.formatCurrency(amount)
            }
            if (amount === 1000000) {
                return 'R$ 1 Milhão'
            }

            return `R$ ${Math.floor(amount / 1000000)} Milhões`
        },
    },
}
</script>

<style scoped>
.lottery-result {
    width: 100%;
}

.detail-result {
    display: block;
    width: 100%;
    min-width: 0;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 20px;
}

.detail-header {
    padding: 2rem;
    background: var(--lottery-color);
    color: var(--lottery-text-color);
}

.detail-heading {
    display: flex;
    align-items: center;
    gap: .6rem;
}

.detail-heading img {
    width: 30px;
    height: 30px;
    object-fit: contain;
}

.detail-heading h2 {
    min-width: 0;
    margin: 0;
    color: inherit;
    font-family: 'Futura Md BT', sans-serif;
    font-size: 20px;
    font-style: italic;
    font-weight: 700;
    line-height: 1;
    text-transform: uppercase;
}

.detail-header-content {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    gap: .75rem 2rem;
    margin-top: 1rem;
}

.detail-metadata {
    display: flex;
    flex-wrap: wrap;
    gap: .5rem 1.5rem;
}

.detail-metadata span {
    display: inline-flex;
    align-items: center;
    gap: .4rem;
}

.detail-location,
.detail-prize,
.detail-accumulated {
    margin: 0;
}

.detail-location {
    flex: 1 1 100%;
    overflow-wrap: anywhere;
}

.detail-prize {
    display: flex;
    flex-direction: column;
    margin-left: auto;
    text-align: right;
    overflow-wrap: anywhere;
}

.detail-prize strong {
    font-family: 'Futura Md BT', sans-serif;
    font-size: 35px;
    font-style: italic;
    line-height: 1.1;
}

.detail-accumulated {
    font-weight: 700;
}

.detail-body {
    min-width: 0;
    padding: 2rem;
    border: 1px solid #eaeaea;
    border-top: 0;
    border-radius: 0 0 20px 20px;
}

.detail-draw + .detail-draw {
    margin-top: 1.5rem;
}

.detail-draw h3,
.detail-extra label,
.detail-table-wrapper h3 {
    display: table;
    margin: 0 auto 1rem;
    color: var(--lottery-color);
    font-family: 'Futura Md BT', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
}

.detail-numbers {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin: 0 auto;
    padding: 0;
}

.detail-numbers li {
    display: flex;
    width: 50px;
    height: 50px;
    flex: 0 0 50px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: var(--lottery-color);
    box-shadow: 2px 3px 8px rgba(0, 0, 0, .12);
    color: var(--lottery-text-color);
    font-family: 'Futura Md BT', sans-serif;
    font-size: 18px;
    font-weight: 700;
}

.federal-variant .detail-body {
    padding-top: 2.5rem;
}

.federal-variant .detail-draw h3 {
    margin-bottom: 1.25rem;
    color: var(--lottery-color);
    letter-spacing: .04em;
}

.federal-variant .federal-tickets {
    display: grid;
    width: 100%;
    max-width: 920px;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 1rem;
}

.federal-variant .federal-ticket {
    position: relative;
    display: flex;
    width: 100%;
    min-width: 0;
    height: auto;
    min-height: 104px;
    flex: initial;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: .55rem;
    padding: .85rem 1rem;
    overflow: hidden;
    border: 1px solid #dce8ef;
    border-left: 4px solid var(--lottery-color);
    border-radius: 12px;
    background: linear-gradient(145deg, #fff 0%, #f3f8fb 100%);
    box-shadow: 0 5px 14px rgba(36, 84, 117, .1);
    color: #245475;
}

.federal-ticket-rank {
    color: #65849a;
    font-size: .75rem;
    font-weight: 700;
    letter-spacing: .06em;
    line-height: 1;
    text-transform: uppercase;
}

.federal-variant .federal-ticket strong {
    color: #173f5b;
    font-family: 'Courier New', monospace;
    font-size: clamp(1.05rem, 2vw, 1.4rem);
    font-weight: 700;
    letter-spacing: .08em;
    line-height: 1.1;
    white-space: nowrap;
}

.detail-extra {
    margin-top: 1.5rem;
    text-align: center;
}

.detail-extra label {
    margin-bottom: .5rem;
}

.extra-value {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;
}

.extra-value img {
    width: 28px;
    height: 28px;
    object-fit: contain;
}

.detail-dupla-prizes {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
}

.detail-table-wrapper {
    width: 100%;
    margin: 1.5rem auto 0;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}

.detail-dupla-prizes .detail-table-wrapper {
    margin-top: 0;
}

.detail-table {
    width: 100%;
    min-width: 360px;
    border-collapse: collapse;
}

.detail-table th,
.detail-table td {
    padding: .5rem;
    border-bottom: 1px solid #eaeaea;
    text-align: center;
}

.detail-table th {
    color: rgba(0, 0, 0, .55);
}

.contest-search {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    gap: .5rem;
    margin-bottom: 1.25rem;
}

.contest-search label {
    margin: 0 .25rem 0 0;
    color: #333;
    font-weight: 600;
}

.search-controls {
    display: flex;
    flex-wrap: wrap;
    gap: .5rem;
}

.search-controls input {
    width: 190px;
    min-width: 0;
    padding: .5rem .75rem;
    border: 1px solid #d8d8d8;
    border-radius: 100px;
}

.search-controls button {
    padding: .5rem 1rem;
    border: 1px solid #285d7e;
    border-radius: 100px;
    background: #285d7e;
    color: #fff;
    font-weight: 600;
}

.search-controls .latest-button {
    background: #fff;
    color: #285d7e;
}

.search-controls button:disabled {
    cursor: not-allowed;
    opacity: .6;
}

.main-draw {
    display: flex;
    gap: 48px;
}

.results {
    display: flex;
    width: 100%;
    max-width: 326px;
    min-height: 362px;
    flex-shrink: 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1.25rem;
    border-radius: 20px;
    background: linear-gradient(174deg, #42c669 13.31%, #3e9f88 94.97%);
    box-shadow: 3px 4px 20px rgba(63, 184, 167, .3);
    color: #fff;
    text-align: center;
}

.results h2,
.next-draw h3 {
    margin: 0;
    color: #fff;
    font-family: 'Futura Md BT', sans-serif;
    font-size: 25px;
    font-style: italic;
    font-weight: 700;
    line-height: 1.1;
    text-transform: uppercase;
}

.draw-number {
    color: inherit;
    font-size: 14px;
    font-style: italic;
}

.results > .draw-number {
    margin: 10px 0 26px;
}

.draw-group {
    max-width: 100%;
}

.draw-label {
    display: block;
    margin: .5rem 0;
    font-size: .85rem;
    font-style: italic;
}

.numbers {
    display: flex;
    max-width: 220px;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin: 0 auto;
    padding: 0;
}

.numbers li {
    display: flex;
    width: 50px;
    height: 50px;
    flex: 0 0 50px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: linear-gradient(180deg, #fff 0%, #a8c3b4 100%);
    box-shadow: 4px 4px 15px rgba(63, 197, 168, .4);
    color: #234028;
    font-family: 'Futura Md BT', sans-serif;
    font-size: 20px;
    font-weight: 700;
}

.draw-extras {
    margin-top: 1rem;
    font-size: .9rem;
}

.draw-extras p {
    margin: .2rem 0;
}

.draw-info-wrapper {
    display: flex;
    width: 100%;
    min-width: 0;
    min-height: 362px;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    border: 1px solid #eaeaea;
    border-radius: 20px;
    box-shadow: 3px 4px 20px rgba(63, 184, 167, .3);
}

.draw {
    width: 100%;
    min-width: 0;
    overflow: hidden;
}

.draw-info {
    padding: 0 3rem;
}

.draw-info p {
    margin: 0;
}

.draw-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.25rem !important;
}

.draw-location {
    margin-bottom: 1.25rem !important;
}

.draw-value h3 {
    margin: 0;
    color: #ffcc18;
    font-family: 'Futura Md BT', sans-serif;
    font-size: clamp(1.7rem, 3vw, 2.5rem);
    font-weight: 700;
    line-height: 1.1;
    overflow-wrap: anywhere;
}

.divisor {
    display: block;
    width: 100%;
    height: 1px;
    margin: 15px 0;
    background: #eaeaea;
}

.main-table-wrapper {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}

.draw table {
    width: 100%;
    min-width: 380px;
    border-collapse: collapse;
}

.draw th,
.draw td {
    padding: .2rem .35rem;
    text-align: center;
}

.draw th {
    color: rgba(0, 0, 0, .5);
    font-weight: 600;
}

.next-draw {
    display: flex;
    width: 100%;
    max-width: 326px;
    min-height: 362px;
    flex-shrink: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border-radius: 0 20px 20px 0;
    background: linear-gradient(174deg, #42c669 13.31%, #3e9f88 94.97%);
    color: #fff;
    text-align: center;
}

.next-draw-value {
    margin: 15px 0;
    color: #ffeb39;
    font-family: 'Futura Md BT', sans-serif;
    font-size: 30px;
    font-style: italic;
    font-weight: 700;
    letter-spacing: -1px;
    text-transform: uppercase;
}

.accumulate {
    margin-bottom: 10px;
    font-size: 14px;
    font-style: italic;
    font-weight: 700;
    text-transform: uppercase;
}

.draw-span {
    font-size: 16px;
    font-style: italic;
}

.join-secondary,
.join-default {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    border-radius: 100px;
    font-family: 'Futura Md BT', sans-serif;
    font-size: 17px;
    font-style: italic;
    font-weight: 700;
    transition: .3s ease all;
}

.join-secondary {
    margin-top: 20px;
    background: #1d5071;
    color: #fff;
}

.join-secondary:hover {
    background: #0b2333;
    color: #fff;
}

.ms-alert {
    display: flex;
    width: 100%;
    min-height: 126px;
    align-items: center;
    gap: 15px;
    margin-top: 2.5rem;
    padding: 1rem 2rem;
    border: 1px solid #eaeaea;
    border-radius: 20px;
}

.target {
    display: block;
    width: 3px;
    min-height: 89px;
    flex-shrink: 0;
    background: #285d7e;
}

.inner p {
    margin: 0;
    color: #000;
    font-size: 17px;
    line-height: normal;
}

.join-default {
    margin-top: 10px;
    border: 1px solid #285d7e;
    color: #285d7e;
    font-weight: 500;
}

.join-default:hover {
    background: #285d7e;
    color: #fff;
}

.error-message {
    margin: 0 0 1rem;
    color: #b02a37;
}

.loading-message {
    color: #555;
    text-align: center;
}

@media (max-width: 1200px) {
    .main-draw {
        flex-direction: column;
        gap: 1.5rem;
    }

    .results {
        max-width: 100%;
    }

    .draw-info-wrapper {
        min-height: auto;
    }
}

@media (max-width: 900px) {
    .contest-search {
        justify-content: flex-start;
    }

    .draw-info-wrapper {
        flex-direction: column;
    }

    .draw-info {
        padding: 1.5rem;
    }

    .next-draw {
        max-width: 100%;
        min-height: 300px;
        border-radius: 0 0 20px 20px;
    }

    .target {
        display: none;
    }

    .inner {
        width: 100%;
        text-align: center;
    }

    .detail-prize {
        margin-left: 0;
        text-align: left;
    }
}

@media (max-width: 600px) {
    .contest-search {
        align-items: flex-start;
        flex-direction: column;
    }

    .search-controls {
        width: 100%;
    }

    .search-controls input {
        flex: 1 1 100%;
        width: 100%;
    }

    .results {
        min-height: 330px;
    }

    .draw-info {
        padding: 1.25rem;
    }

    .draw-meta {
        gap: .5rem;
    }

    .draw th,
    .draw td {
        padding: .25rem .1rem;
        font-size: .8rem;
        overflow-wrap: anywhere;
    }

    .draw table {
        min-width: 0;
        table-layout: fixed;
    }

    .draw th,
    .draw td {
        font-size: .75rem;
        overflow-wrap: anywhere;
    }

    .detail-table {
        min-width: 0;
        table-layout: fixed;
    }

    .detail-table th,
    .detail-table td {
        padding: .4rem .15rem;
        font-size: .75rem;
        overflow-wrap: anywhere;
    }

    .ms-alert {
        padding: 1rem;
    }

    .inner p {
        font-size: 15px;
    }

    .detail-header,
    .detail-body {
        padding: 1.25rem;
    }

    .detail-header-content {
        align-items: flex-start;
        flex-direction: column;
    }

    .detail-prize {
        margin-left: 0;
        text-align: left;
    }

    .detail-prize strong {
        font-size: 28px;
    }

    .detail-dupla-prizes {
        grid-template-columns: 1fr;
    }

    .federal-variant .detail-body {
        padding-top: 1.5rem;
    }

    .federal-variant .federal-tickets {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: .75rem;
    }

    .federal-variant .federal-ticket {
        min-height: 92px;
        padding: .75rem;
    }
}
</style>
