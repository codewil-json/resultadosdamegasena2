<template>
    <div class="getEmail" v-show="showEmail">
        <div class="container">
            <div class="getEmail__modal py-5">
                <button class="close-modal" @click="closeModal">
                    <i class="bi bi-x-lg"></i>
                </button>
                <div class="col-md-6">
                    <p class="label">
                        Seja o primeiro a saber sobre sorteios especiais, resultados e estratégias vencedoras para aumentar
                        suas chances de ganhar!
                    </p>
                    <div class="d-flex gap-3 align-items-center" id="form">
                        <input type="text" placeholder="Ex.: Pedro Silva" class="form-control text-center" v-model="name">
                        <input type="email" placeholder="ex.: pedro@email.com" class="form-control text-center"
                            v-model="email">
                        <button class="main-btn" @click="saveContact">Cadastrar</button>
                    </div>
                    <p v-if="errorMessage" class="badge bg-danger my-3 text-center">{{ errorMessage }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            showEmail: false,
            name: null,
            email: null,
            errorMessage: null,
        }
    },
    mounted() {
        this.cron = setTimeout(() => {
            this.showEmail = true
        }, 5000)
    },
    beforeUnmount() {
        clearTimeout(this.cron);
    },
    methods: {
        closeModal() {
            this.showEmail = false
        },
        async saveContact() {
            try {
                const data = {
                    name: this.name,
                    email: this.email
                };
                await axios.post('https://subscribers-git-master-acioliwilson.vercel.app/subscribe', data)
                    .then((response) => {
                        console.log(response);
                        this.showEmail = false;
                    }).catch(error => {
                        console.error(error);
                        if (error.response && error.response.status === 400) {
                            // Se a resposta do servidor for um erro 400 (Bad Request), exibe a mensagem de erro
                            this.errorMessage = 'Este email já está cadastrado';
                        } else {
                            // Se for outro tipo de erro, exibe uma mensagem genérica de erro
                            this.errorMessage = 'Erro ao cadastrar email. Tente novamente mais tarde.';
                        }
                    });
            } catch (error) {
                console.error(error);
                this.errorMessage = 'Erro ao cadastrar email. Tente novamente mais tarde.';
            }
        },
    }
}
</script>
  
<style scoped>
.getEmail {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 3000;
    transition: 0.3s ease all;
    backdrop-filter: blur(3px);
}

.container {
    position: relative;
    height: 100vh;
}

.getEmail__modal {
    width: 100%;
    background: #fff;
    border-radius: 25px;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
    position: absolute;
    bottom: 50px;
    animation: 0.5s popIn ease forwards;
    display: flex;
    flex-direction: column;
    align-items: center;
}

@keyframes popIn {
    from {
        transform: translateY(100px);
        opacity: 0.5;
    }

    to {
        transform: translateY(-30px);
        opacity: 1;
    }
}


p.label {
    font-family: 'Lato', sans-serif;
    font-weight: 600;
    font-size: 1.5rem;
    text-align: center;
    color: #000;
}

.main-btn {
    padding: 12px 20px;
    border-radius: 100px;
    border: none;
    background: #1d2e66;
    color: #FFF;
    font-size: 1rem;
    font-family: 'Lato', sans-serif;
    font-weight: 600;
    outline: none;
    margin: 0 auto;
    display: table;
}

.close-modal {
    width: 50px;
    height: 50px;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background: #333;
    color: #FFF;
    position: absolute;
    top: 10px;
    right: 10px;
    transition: .3s ease all;
}

.close-modal:hover {
    background: #414141;
}

@media screen and (max-width: 700px) {
    .getEmail__modal {
        width: 95vw;
        left: 2.5vw;
    }
    .container {
        width: 100vw !important;
        position: relative;
    }
    p.label {
        font-size: 1.4rem;
        padding: 10px 30px;
        margin: 50px 0 20px 0;
    }
    #form {
        flex-direction: column;
        padding: 0 30px;
    }
}
</style>