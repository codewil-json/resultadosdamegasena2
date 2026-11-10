<template>
<HeaderComponent />
<HorizontalMenu />
<BannerComponent />
<router-view />
</template>

<script>
// import GetEmail from '@/components/GetEmail.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import HorizontalMenu from '@/components/HorizontalMenu.vue'
import BannerComponent from '@/components/BannerComponent.vue'

export default {
    components: {
        // GetEmail,
        HeaderComponent,
        HorizontalMenu,
        BannerComponent
    },
}
</script>

<style>
@import url('https://db.onlinewebfonts.com/c/1ffbed7089a941aa728bb970f3ad49f6?family=Futura+Md+BT+Bold');
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Oswald:wght@200..700&display=swap');

html {
    scroll-behavior: smooth;
}

ul {
    list-style: none;
    margin: 0 !important;
    padding: 0;
}

a {
    text-decoration: none !important;
}

::-webkit-scrollbar {
    width: 2px;
}

::-webkit-scrollbar-thumb {
    background-color: #007bff;
    border-radius: 6px;
}

::-webkit-scrollbar-track {
    background-color: #f8f9fa;
}

::-moz-scrollbar-thumb {
    background-color: #007bff;
    border-radius: 6px;
}

::-moz-scrollbar-track {
    background-color: #f8f9fa;
}

.router-link-exact-active {
    color: yellow !important;
}

.scroll-reveal {
    opacity: 1;
    transform: translateY(0);
    transition: opacity .65s ease, transform .65s cubic-bezier(.2, .7, .2, 1);
}

.scroll-reveal--pending {
    opacity: 0;
    transform: translateY(24px);
}

.scroll-reveal--visible {
    opacity: 1;
    transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
    html {
        scroll-behavior: auto;
    }

    .scroll-reveal,
    .scroll-reveal--pending,
    .scroll-reveal--visible {
        opacity: 1;
        transform: none;
        transition: none;
    }
}

.btn-orange {
    display: inline-flex !important;
    padding: 15px 20px !important;
    justify-content: center !important;
    align-items: center !important;
    border-radius: 100px !important;
    background: #FF800B !important;
    box-shadow: 0px 0px 15px 0px rgba(255, 99, 11, 0.50) !important;
    color: #FFF !important;
    font-family: 'Futura Md BT', sans-serif !important;
    font-size: 17px !important;
    font-style: italic !important;
    font-weight: 700 !important;
    line-height: 1 !important;
    text-transform: uppercase !important;
    border: none !important;
}
.btn-orange:hover {
    background: #ffb20b !important;
}
</style>
