<template>
<header>
    <div class="container py-2 follow">
        <div class="d-flex justify-content-end align-items-center gap-2">
            <label>SIGA-NOS</label>
            <a href="https://www.facebook.com/investlotooficial/" target="_blank">
                <i class="bi bi-facebook"></i>
            </a>
            <a href="https://twitter.com/investloto" target="_blank">
                <i class="bi bi-twitter-x"></i>
            </a>
            <a href="https://instagram.com/investloto_" target="_blank">
                <i class="bi bi-instagram"></i>
            </a>
        </div>
    </div>
    <nav>
        <div class="container">
            <div class="d-flex justify-content-between align-items-center">
                <router-link to="/">
                    <img src="@/assets/logo.webp" class="logo" alt="Logotipo do site Resultados da Mega-Sena" width="270" height="104">
                </router-link>
                <input type="checkbox" id="toggleNav">
                <label for="toggleNav" class="toggleNav">
                    <span></span><span></span><span></span>
                </label>
                <ul class="d-flex gap-4 align-items-center menu">
                    <li>
                        <router-link to="/resultados">Resultados</router-link>
                    </li>
                    <li>
                        <router-link to="/como-apostar">Como Apostar</router-link>
                    </li>
                    <li>
                        <a href="https://www.investloto.com.br/loterias/fale-conosco">Contato</a>
                    </li>
                    <li>
                        <button @click="signupRedirect">
                            Cadastre-se
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>
</template>

<script>
export default {
    mounted() {
        // Adiciona um evento de clique a todos os links dentro do menu
        const menuLinks = document.querySelectorAll('.menu a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Fecha o menu quando um link é clicado
                const toggleNavCheckbox = document.getElementById('toggleNav');
                if (toggleNavCheckbox.checked) {
                    toggleNavCheckbox.checked = false;
                }

                // Move a página para o topo
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        });
    },
    methods: {
        signupRedirect() {
            window.location.href = 'https://www.investloto.com.br/loterias/cadastre-se'
        }
    }
};
</script>

<style scoped>
header {
    width: 100%;
    display: table;
}

nav {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background: linear-gradient(90deg, #2B6384 22.03%, #235273 85.57%);
}

label {
    color: #C1C1C1;
    font-family: 'Futura Md BT', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    text-transform: uppercase;
}

.follow a {
    text-decoration: none;
    color: #C1C1C1;
}

ul li a {
    color: #FFF;
    font-family: 'Futura Md BT', sans-serif;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    text-transform: uppercase;
    transition: .3s ease all;
}

ul li button {
    display: flex;
    padding: 10px 20px;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    border: none;
    outline: none;
    background: #FFEC40;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.10);
    color: #245374;
    font-family: 'Futura Md BT', sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    text-transform: uppercase;
    transition: .3s ease all;
}

ul li button:hover {
    background: orange;
    color: #FFF;
}

#toggleNav,
.toggleNav {
    display: none;
}

@media (max-width: 1000px) {
    header {
        width: 100%;
        display: table;
    }

    .follow {
        justify-content: center !important;
        width: 100%;
    }

    nav {
        width: 100%;
    }

    nav div div img {
        z-index: 3000;
    }

    nav div div ul {
        flex-direction: column !important;
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 120px;
        left: -100vw;
        background: #235273;
        padding: 50px 0 0 0;
        align-items: center;
        transition: .3s ease all;
        z-index: 1000 !important;
    }

    nav div div ul li a,
    nav div div ul li button {
        font-size: 1.2rem !important;
    }

    input[type=checkbox] {
        display: none;
    }

    .toggleNav {
        display: table;
        cursor: pointer;
    }

    .toggleNav span {
        width: 25px;
        height: 2px;
        background: #FFF;
        border-radius: 100px;
        display: table;
        margin-bottom: 7px;
        transition: .3s ease all;
    }

    #toggleNav:checked~ul.menu {
        left: 0 !important;
    }

    #toggleNav:checked~label.toggleNav span:nth-child(1) {
        transform: translateY(8px) rotate(-45deg);
    }

    #toggleNav:checked~label.toggleNav span:nth-child(2) {
        opacity: 0;
    }

    #toggleNav:checked~label.toggleNav span:nth-child(3) {
        transform: translateY(-10px) rotate(45deg);
    }
}

ul.menu li a:hover {
    color: orange;
}

.follow div a {
    transition: .3s ease all;
}

.follow div a:hover {
    color: #0e2b3f !important;
}

@media screen and (max-width: 700px) {
    img.logo {
        width: clamp(180px, 60vw, 230px);
        height: auto;
        position: absolute;
        top: -10px;
        z-index: 999999 !important;
    }
}

</style>
