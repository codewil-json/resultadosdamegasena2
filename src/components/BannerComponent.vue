<template>
<div class="container" v-if="result">
    <div class="banner" v-reveal>
        <div class="d-flex gap-2 align-items-center banner-content">
            <div class="bl1"></div>
            <div class="bl2">
                <h1>MEGA-SENA</h1>
                <p class="desc">Concurso {{ result.proximoConcurso }} | {{ result.dataProximoConcurso }}</p>
                <h2>{{ formatarValor(result.valorEstimadoProximoConcurso) }}</h2>
                <a href="https://investloto.com.br" class="btn-orange">Participe</a>
            </div>
            <div class="bl3">
                <i class="bi bi-patch-check"></i>
                <i class="bi bi-shield-check"></i>
            </div>
        </div>
    </div>
</div>
<div class="container" v-else-if="errorMessage">
    <p class="api-error" role="alert">{{ errorMessage }}</p>
</div>
<div class="container" v-else>
    <div class="lazyloading">
        <!-- content -->
    </div>
</div>
</template>

<script>
import { fetchLotteryResult } from '@/services/lotteries'
export default {
    data() {
        return {
            result: null,
            errorMessage: '',
        }
    },
    async mounted() {
        try {
            await this.getNextDraw()
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        async getNextDraw() {
            try {
                this.result = await fetchLotteryResult('megasena')
            } catch (error) {
                console.error(error);
                this.errorMessage = 'Não foi possível carregar as informações do próximo sorteio.'
            }
        },
        formatarValor(valor) {
            const valorInteiro = parseInt(valor);
            if (isNaN(valorInteiro)) {
                return valor;
            }

            if (valorInteiro === 1000000) {
                return 'R$ 1 Milhão';
            }

            const valorFormatado = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(valorInteiro);

            return valorFormatado;
        },
    },
}
</script>

<style scoped>
.banner {
    width: 100%;
    height: 350px;
    border-radius: 20px;
    background: url('@/assets/banner-bg.webp') no-repeat;
    overflow: hidden;
}

@media (min-width: 600px) {
    .banner {
        background-position: center;
        background-size: cover;
    }
}

@media (max-width: 650px) {
    .banner {
        margin-top: 30px;
        background-position-x: right !important;
    }
}

.bl1,
.bl2,
.bl3 {
    min-width: 400px;
    height: 350px;
    display: flex;
}

.bl2 {
    flex-direction: column;
    justify-content: center;
    gap: 10px;
}

.bl2 h1 {
    color: #FFF;
    text-shadow: 0px 0px 30px rgba(38, 88, 111, 0.40);
    font-family: 'Futura Md BT', sans-serif;
    font-size: clamp(2rem, 8vw, 3rem);
    font-style: italic;
    font-weight: 700;
    margin: 0;
    padding: 0;
    line-height: 1;
}

.bl2 p.desc {
    color: #FFF;
    text-shadow: 0px 0px 30px rgba(38, 88, 111, 0.40);
    font-family: 'Futura Md BT', sans-serif;
    font-size: clamp(1rem, 4vw, 20px);
    font-style: italic;
    font-weight: 400;
    line-height: 1;
}

.bl2 h2 {
    color: #FFEB3C;
    text-shadow: 0px 0px 30px rgba(38, 88, 111, 0.40);
    font-family: 'Futura Md BT', sans-serif;
    font-size: clamp(2rem, 8vw, 3rem);
    font-style: italic;
    font-weight: 700;
    line-height: 1;
    margin: 0;
    padding: 0;
}

.bl2 a {
    color: #FFF;
    font-family: 'Futura Md BT', sans-serif;
    font-size: 20px;
    font-style: italic;
    font-weight: 700;
    line-height: 1;
    display: table;
    width: min-content;
    padding: 10px 20px;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    border: 1px solid #FFF;
    margin-top: 15px;
    transition: .3s ease all;
}

.bl2 a:hover {
    background: #FFF;
    color: rgb(0, 68, 68);
    box-shadow: 2px 2px 15px rgba(38, 88, 111, 0.40);
}

.bl3 {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    gap: 10px;
}

.bl3 i {
    color: #FFF;
    font-size: 1.4rem;
}

@media (max-width: 1000px) {

    .bl1,
    .bl3 {
        display: none !important;
    }

    .bl2 {
        min-width: 0;
        flex: 1 1 0;
        box-sizing: border-box;
        padding: 0 clamp(.75rem, 4vw, 2rem);
        width: 100% !important;
    }
}
.lazyloading {
    width: 100%;
    height: 350px;
    border-radius: 20px;
    background: #EAEAEA;
    overflow: hidden;
    opacity: 1;
    animation: lazy 2s ease-in-out infinite;
}
.api-error {
    margin: 0;
    padding: 1rem;
    color: #b02a37;
    text-align: center;
}

@keyframes lazy {
    0%, 100% { opacity: 1; }
    50% { opacity: .3; }
}
</style>
