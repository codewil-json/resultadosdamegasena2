<template>
<nav class="lottery-nav container" aria-label="Navegação entre loterias">
    <button
        v-if="canScrollLeft"
        class="scroll-control scroll-control--left"
        type="button"
        aria-label="Rolar modalidades para a esquerda"
        @click="scrollMenu(-1)"
    >
        <i class="bi bi-chevron-left" aria-hidden="true"></i>
    </button>
    <div
        class="horizontal-menu"
        ref="menuScroller"
        @scroll="updateScrollState"
    >
        <div class="scroller">
            <router-link to="/" id="linkMegaSena">Mega-Sena</router-link>
            <router-link to="/duplasena" id="linkDuplaSena">Dupla Sena</router-link>
            <router-link to="/lotofacil" id="linkLotofacil">Lotofácil</router-link>
            <router-link to="/quina" id="linkQuina">Quina</router-link>
            <router-link to="/timemania" id="linkTimemania">Timemania</router-link>
            <router-link to="/lotomania" id="linkLotomania">Lotomania</router-link>
            <router-link to="/dia-de-sorte" id="linkDiaDeSorte">Dia de Sorte</router-link>
            <router-link to="/super-sete" id="linkSuperSete">Super Sete</router-link>
            <router-link to="/mais-milionaria" id="linkMaisMilionaria">+ Milionária</router-link>
            <router-link to="/federal" id="linkFederal">Federal</router-link>
        </div>
    </div>
    <button
        v-if="canScrollRight"
        class="scroll-control scroll-control--right"
        type="button"
        aria-label="Rolar modalidades para a direita"
        @click="scrollMenu(1)"
    >
        <i class="bi bi-chevron-right" aria-hidden="true"></i>
    </button>
</nav>
</template>

<script>
export default {
    data() {
        return {
            canScrollLeft: false,
            canScrollRight: false,
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.updateScrollState()
            this.scrollToActiveLink(false)
        })
        window.addEventListener('resize', this.updateScrollState)
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.updateScrollState)
    },
    watch: {
        '$route.path'() {
            this.$nextTick(() => {
                this.updateScrollState()
                this.scrollToActiveLink(true)
            })
        },
    },
    methods: {
        updateScrollState() {
            const scroller = this.$refs.menuScroller
            if (!scroller) {
                return
            }

            this.canScrollLeft = scroller.scrollLeft > 2
            this.canScrollRight = scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 2
        },
        scrollMenu(direction) {
            const scroller = this.$refs.menuScroller
            if (!scroller) {
                return
            }

            scroller.scrollBy({
                left: direction * Math.max(scroller.clientWidth * 0.7, 180),
                behavior: 'smooth',
            })
        },
        scrollToActiveLink(smooth) {
            const scroller = this.$refs.menuScroller
            const activeLink = scroller && scroller.querySelector('.router-link-active')
            if (!activeLink) {
                return
            }

            const linkCenter = activeLink.offsetLeft + activeLink.offsetWidth / 2
            scroller.scrollTo({
                left: Math.max(0, linkCenter - scroller.clientWidth / 2),
                behavior: smooth ? 'smooth' : 'auto',
            })
            this.updateScrollState()
        },
    }
};
</script>

<style scoped>
.lottery-nav {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: .5rem;
    padding-right: 2.5rem;
    padding-left: 2.5rem;
}

.horizontal-menu {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    padding: .5rem 0 .75rem;
    scrollbar-width: none;
    scroll-behavior: smooth;
    scroll-snap-type: x proximity;
    -webkit-overflow-scrolling: touch;
}

.horizontal-menu::-webkit-scrollbar {
    display: none;
}

.scroller {
    display: flex;
    width: max-content;
    min-width: 100%;
    justify-content: center;
    gap: .6rem;
    padding: 0 .5rem;
}

.scroller a {
    display: inline-flex;
    min-height: 42px;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    padding: .65rem 1rem;
    border: 1px solid #e6edf1;
    border-radius: 999px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(35, 82, 115, .06);
    color: #245475 !important;
    font-family: 'Lato', sans-serif;
    font-size: .98rem;
    font-weight: 600;
    line-height: 1;
    text-decoration: none;
    scroll-snap-align: center;
    transition: color .2s ease, background-color .2s ease, border-color .2s ease, box-shadow .2s ease, transform .2s ease;
}

.scroller a:hover {
    transform: translateY(-1px);
    border-color: #b6d5e4;
    background: #f4fafc;
    color: #0a3652 !important;
    box-shadow: 0 5px 14px rgba(35, 82, 115, .12);
}

.scroller a.router-link-active {
    border-color: #245475;
    background: linear-gradient(135deg, #2b6384, #235273);
    box-shadow: 0 5px 14px rgba(35, 82, 115, .2);
    color: #fff !important;
}

.scroll-control {
    position: absolute;
    z-index: 2;
    display: inline-flex;
    width: 36px;
    height: 36px;
    align-items: center;
    justify-content: center;
    border: 1px solid #e1e9ee;
    border-radius: 50%;
    background: rgba(255, 255, 255, .96);
    box-shadow: 0 3px 12px rgba(24, 55, 75, .12);
    color: #245475;
    transition: background-color .2s ease, color .2s ease, transform .2s ease;
}

.scroll-control:hover {
    transform: scale(1.05);
    background: #245475;
    color: #fff;
}

.scroll-control--left {
    left: .35rem;
}

.scroll-control--right {
    right: .35rem;
}

@media (max-width: 1023px) {
    .lottery-nav {
        padding-right: 1rem;
        padding-left: 1rem;
    }

    .scroller {
        justify-content: flex-start;
    }

    .scroll-control--left {
        left: .15rem;
    }

    .scroll-control--right {
        right: .15rem;
    }
}

@media (max-width: 767px) {
    .horizontal-menu {
        touch-action: auto;
    }

    .scroll-control {
        display: none;
    }
}

@media (max-width: 480px) {
    .lottery-nav {
        margin-top: .5rem;
        padding-right: .5rem;
        padding-left: .5rem;
    }

    .scroller {
        gap: .45rem;
    }

    .scroller a {
        min-height: 38px;
        padding: .6rem .85rem;
        font-size: .9rem;
    }

}
</style>
