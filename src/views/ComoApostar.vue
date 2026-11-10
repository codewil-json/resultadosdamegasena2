<template>
<main class="container my-5">
    <h1 v-reveal>Como Apostar nas Loterias Online</h1>

    <p v-reveal>Apostar nas loterias online pelo <a href="https://investloto.com.br" target="_blank">InvestLoto</a> é descomplicado e rápido. Siga nossas orientações abaixo e esteja pronto para a boa sorte!</p>

    <h2 v-reveal>Como Apostar:</h2>

    <ol>
        <li v-reveal><strong>Cadastro:</strong>
            <ul>
                <li>Clique em <a href="https://www.investloto.com.br/loterias/cadastre-se" target="_blank">"CADASTRE-SE"</a> e preencha todas as informações solicitadas. Lembre-se de que apenas cadastros de maiores de 18 anos são aceitos.</li>
            </ul>
        </li>

        <li v-reveal><strong>Login e Compra de Créditos:</strong>
            <ul>
                <li>Após confirmar o cadastro, <a href="https://www.investloto.com.br/loterias/entrar" target="_blank">faça login</a> com seu e-mail e senha.</li>
                <li>Para participar dos bolões, clique em <a href="https://www.investloto.com.br/loterias/compra-de-creditos" target="_blank">"COMPRA DE CRÉDITOS"</a>.</li>
                <li>Escolha a forma de pagamento desejada (transferência/depósito bancário ou boleto bancário).</li>
                <li>Para transferência/depósito, selecione o banco, insira o valor desejado e clique em "COMPRAR". O sistema enviará um formulário para seu e-mail com todas as informações para efetuar a transação.</li>
                <li>Para boleto bancário, insira o valor desejado e clique em "COMPRAR". O boleto gerado pode ser visualizado e impresso para pagamento.</li>
                <li>Os créditos serão liberados conforme os horários indicados:
                    <ul>
                        <li>Pagamentos aos Sábados, Domingos e Feriados terão os créditos disponíveis no 2º dia útil.</li>
                        <li>Pagamentos de segunda a sexta até as 20:00 horas terão os créditos disponíveis no 1º dia útil, inclusive no sábado.</li>
                    </ul>
                </li>
            </ul>
        </li>

        <li v-reveal><strong>Escolha do Bolão:</strong>
            <ul>
                <li>Após a liberação dos créditos, vá para <a href="https://investloto.com.br" target="_blank">"BOLÕES"</a> e escolha o tipo de jogo (DIA DE SORTE, DUPLA SENA, LOTOFÁCIL, LOTOMANIA, MEGA-SENA, QUINA, SUPER SETE e TIMEMANIA) e o respectivo(s) grupo(s).</li>
                <li>Selecione a quantidade de cotas desejadas e clique em "EFETUAR COMPRA".</li>
                <li>Revise suas apostas na nova página e conclua a compra clicando em "CONCLUIR A COMPRA".</li>
            </ul>
        </li>

        <li v-reveal><strong>Acompanhamento e Verificação:</strong>
            <ul>
                <li>Após a compra, suas apostas estarão no "EXTRATO DE APOSTAS". Clique em "prognósticos" para verificar as dezenas apostadas.</li>
                <li>O InvestLoto verificará os resultados e enviará por e-mail as informações aos acertadores.</li>
            </ul>
        </li>

        <li v-reveal><strong>Recebimento do Prêmio:</strong>
            <ul>
                <li>Caso seja um ganhador, ao receber o e-mail de confirmação, clique no link para escolher a forma de recebimento do prêmio.</li>
                <li>Deixe um comentário ou depoimento no site, se desejar.</li>
            </ul>
        </li>

        <li v-reveal><strong>Confirmação Alternativa:</strong>
            <ul>
                <li>Se o e-mail não chegar, acesse o link "Aposta (bolão)" para verificar se foi premiado e siga as instruções de recebimento do prêmio.</li>
            </ul>
        </li>

        <li v-reveal><strong>Conferência e Impressão:</strong>
            <ul>
                <li>Para conferir e imprimir os cartões, acesse o site, clique em "EXTRATO DE APOSTAS", utilize o botão FILTRAR, localize o jogo desejado e clique na LUPA ao lado de "PROGNÓSTICOS". Todos os cartões conferidos e premiados estarão lá.</li>
            </ul>
        </li>

        <li v-reveal><strong>Informação Adicional:</strong>
            <ul>
                <li>Sobre os valores dos jogos, cobramos de 20% a 50% a mais em relação às lotéricas, cobrindo os serviços prestados.</li>
            </ul>
        </li>
    </ol>
</main>
<MainFooter />
</template>

<script>
import MainFooter from '@/components/MainFooter.vue'
export default {
    components: {
        MainFooter
    }
}
</script>

<style scoped>
h1 {
    color: #333;
}

h2 {
    color: #555;
}

p,
li {
    color: #777;
}
</style>
