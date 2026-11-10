import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Último Sorteio e Números Premiados | www.resultadosdamegasena.com.br' }
  },
  {
    path: '/resultados',
    name: 'resultados',
    component: () => import('../views/ResultsView.vue'),
    meta: { title: 'Confira os Números Premiados Agora | www.resultadosdamegasena.com.br' }
  },
  {
    path: '/duplasena',
    name: 'duplasena',
    component: () => import('../views/DuplaSena.vue'),
    meta: { title: 'Dupla Sena: Confira os Números Premiados do Último Sorteio | www.resultadosdamegasena.com.br' }
  },
  {
    path: '/lotofacil',
    name: 'lotofacil',
    component: () => import('../views/LotoFacil.vue'),
    meta: { title: 'Lotofácil: Confira os Números Premiados do Último Sorteio | www.resultadosdamegasena.com.br' }
  },
  {
    path: '/quina',
    name: 'quina',
    component: () => import('../views/QuiNa.vue'),
    meta: { title: 'Quina: Confira os Números Premiados do Último Sorteio | www.resultadosdamegasena.com.br' }
  },
  {
    path: '/timemania',
    name: 'timemania',
    component: () => import('../views/TimeMania.vue'),
    meta: { title: 'Timemania: Confira os Números Premiados do Último Sorteio | www.resultadosdamegasena.com.br' }
  },
  {
    path: '/lotomania',
    name: 'lotomania',
    component: () => import('../views/LotoMania.vue'),
    meta: { title: 'Lotomania: Confira os Números Premiados do Último Sorteio | www.resultadosdamegasena.com.br' }
  },
  {
    path: '/dia-de-sorte',
    name: 'diadesorte',
    component: () => import('../views/DiadeSorte.vue'),
    meta: { title: 'Dia de Sorte: Confira os Números Premiados do Último Sorteio | www.resultadosdamegasena.com.br' }
  },
  {
    path: '/super-sete',
    name: 'super-sete',
    component: () => import('../views/SuperSete.vue'),
    meta: { title: 'Super Sete: Confira os Números Premiados do Último Sorteio | www.resultadosdamegasena.com.br' }
  },
  {
    path: '/mais-milionaria',
    name: 'mais-milionaria',
    component: () => import('../views/MaisMilionaria.vue'),
    meta: { title: 'Mais Milionária: Confira os Números Premiados do Último Sorteio | www.resultadosdamegasena.com.br' }
  },
  {
    path: '/federal',
    name: 'federal',
    component: () => import('../views/Federal.vue'),
    meta: { title: 'Loteria Federal: Confira os Bilhetes Premiados | www.resultadosdamegasena.com.br' }
  },
  {
    path: '/como-apostar',
    name: 'como-apostar',
    component: () => import('../views/ComoApostar.vue'),
    meta: { title: 'Como Apostar nas Loterias: Guia Passo a Passo para Aumentar Suas Chances | www.resultadosdamegasena.com.br' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
