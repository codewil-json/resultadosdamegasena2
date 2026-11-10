<template>

    <div class="ads" v-reveal>
        <h1>
            APOSTE NA SUA SORTE<br />
            E TRANSFORME SEUS SONHOS EM REALIDADE!
        </h1>
        <div class="types">
            <div class="groups">
                <p>
                    Descubra o poder dos nossos bolões! Junte-se a milhares de apostadores e aumente suas chances de ganhar na Mega-Sena. Compartilhe a emoção de jogar em grupo e divida a alegria de conquistar o prêmio dos seus sonhos com seus amigos e familiares.
                </p>
                <a href="https://investloto.com.br" class="join-b">Ver bolões</a>
            </div>
            <div class="single">
                <p>
                    Não quer dividir o prêmio? Nossos jogos individuais são a escolha perfeita para quem busca a exclusividade e a possibilidade de se tornar um milionário de uma vez por todas. Faça parte dessa jornada e seja o protagonista da sua própria história!
                </p>
                <a href="https://www.investloto.com.br/loterias/faca-seu-jogo" class="join-b">Faça seu jogo</a>
            </div>
        </div>
    </div>
    <div class="stats mt-5" v-reveal>
        <div class="d-flex justify-content-center align-items-center gap-3">
            <div class="item">
                <i class="bi bi-award"></i>
                <div>
                    <h3>+20</h3>
                    <p>Anos</p>
                </div>
            </div>
            <i class="bi bi-dot"></i>
            <div class="item">
                <i class="bi bi-emoji-heart-eyes"></i>
                <div>
                    <h3>+80k</h3>
                    <p>Clientes</p>
                </div>
            </div>
            <i class="bi bi-dot"></i>
            <div class="item">
                <i class="bi bi-coin"></i>
                <div>
                    <h3>+1M</h3>
                    <p>Em prêmios</p>
                </div>
            </div>
        </div>
    </div>

    <div class="dont-waste-time" v-reveal>
        <div>
            <h1>NÃO PERCA TEMPO!</h1>
            <p>ESCOLHA SEU BOLÃO OU JOGO INDIVIDUAL, CONFIE NA SUA INTUIÇÃO E VENHA FAZER PARTE DA HISTÓRIA DOS GANHADORES DA MEGA-SENA. O PRÓXIMO SORTUDO PODE SER VOCÊ! Participe E VIVA A EMOÇÃO DE GANHAR!</p>
            <a href="https://investloto.com.br" class="btn-orange">Participar Agora</a>
        </div>
    </div>

    <p class="text-center my-5 last-call" v-reveal>
        A Mega-Sena oferece premiações incríveis e já tornou inúmeras pessoas em verdadeiros vencedores. Agarre essa oportunidade única e faça sua aposta agora mesmo! Quem sabe o próximo contemplado será você?
    </p>
    <h2 class="bet-now" v-reveal>
        APROVEITE O PRÓXIMO SORTEIO E GARANTA A SUA PARTICIPAÇÃO.<br />
        FAÇA SUA APOSTA AGORA MESMO!
    </h2>

</template>

<style scoped>
.types {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
}

.groups {
    background: url('@/assets/groups.webp') no-repeat;
    background-size: cover;
    padding: 15px;
    width: 100%;
    max-width: 541px;
    height: 541px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    color: #FFF;
    text-align: center;
    border-radius: 20px;
}

.single {
    background: url('@/assets/single.webp') no-repeat;
    background-size: cover;
    padding: 15px;
    width: 100%;
    max-width: 543px;
    height: 541px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    color: #FFF;
    text-align: center;
    border-radius: 20px;
}

.single p,
.groups p {
    color: #FFF;
    text-align: center;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: 'Futura Md BT', sans-serif;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 25px;
    /* 147.059% */
}

.join-b {
    display: inline-flex;
    padding: 13px 20px;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    border: 1px solid #FFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    color: #FFF;
    font-family: Futura Md BT;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: 1;
}

@media (max-width: 900px) {
    .types {
        flex-direction: column;
        width: 100%;
    }

    .groups {
        border-radius: 20px;
        background-size: cover;
        width: 100%;
    }

    .single {
        border-radius: 20px;
        background-size: cover;
        width: 100%;
    }
}

.ads h1 {
    color: #285D7E;
    text-align: center;
    font-family: 'Futura Md BT', sans-serif;
    font-size: 25px;
    font-style: italic;
    font-weight: 700;
    line-height: normal;
    margin: 50px 0 30px 0;
}

.item {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    align-items: center;
}

@media (max-width: 550px) {
    .item {
        justify-content: center;
    }
}

i {
    font-size: 35px;
    color: #285D7E;
}

.item div h3 {
    color: #285D7E;
    font-family: 'Futura Md BT', sans-serif;
    font-size: 23px;
    font-style: italic;
    font-weight: 700;
    line-height: 1;
    margin: 0;
}

.item div p {
    margin: 0;
    color: #285D7E;
    font-family: 'Futura Md BT', sans-serif;
    font-size: 14px;
    font-style: italic;
    font-weight: 700;
    line-height: 1;
    text-transform: uppercase;
}

.dont-waste-time {
    background: url('@/assets/man.webp') no-repeat;
    background-size: center;
    width: 100%;
    height: 403px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.dont-waste-time div {
    width: 100%;
    max-width: 500px;
    margin-top: 60px;
    margin-left: 200px;
}

@media (max-width: 900px) {
    .dont-waste-time {
        background: #285D7E;
        height: auto;
        border-radius: 20px;
        margin-top: 50px;
    }

    .dont-waste-time div {
        margin: 0 !important;
        padding: 2rem;
        text-align: center;
    }
}

.dont-waste-time div h1 {
    color: #FFF;
    font-family: 'Futura Md BT', sans-serif;
    font-size: 30px;
    font-style: italic;
    font-weight: 700;
    line-height: normal;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
}

.dont-waste-time div p {
    color: #FFF;
    font-family: 'Futura Md BT', sans-serif;
    font-size: 17px;
    font-style: italic;
    font-weight: 400;
    line-height: 29px;
    text-transform: uppercase;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
}

.dont-waste-time div a {
    display: inline-flex;
    padding: 15px 20px;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    background: #FF800B;
    box-shadow: 0px 0px 15px 0px rgba(255, 99, 11, 0.50);
    color: #FFF;
    font-family: 'Futura Md BT', sans-serif;
    font-size: 17px;
    font-style: italic;
    font-weight: 700;
    line-height: 1;
    text-transform: uppercase;
}

.last-call {
    color: #000;
    text-align: center;
    font-family: 'Futura Md BT', sans-serif;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 29px;
}

.bet-now {
    color: #255576;
    text-align: center;
    font-family: 'Futura Md BT', sans-serif;
    font-size: 25px;
    font-style: italic;
    font-weight: 700;
    line-height: normal;
    margin: 0;
}
</style>