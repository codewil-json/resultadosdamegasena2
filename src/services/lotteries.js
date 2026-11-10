import axios from 'axios'

const API_BASE_URL = 'https://loteriascaixa-api.herokuapp.com/api'

export const LOTTERIES = [
    { id: 'megasena', name: 'Mega-Sena', color: '#3e9f88' },
    { id: 'duplasena', name: 'Dupla Sena', color: '#be0133' },
    { id: 'lotofacil', name: 'Lotofácil', color: '#9b1890' },
    { id: 'quina', name: 'Quina', color: '#34106e' },
    { id: 'timemania', name: 'Timemania', color: '#ffdc12', textColor: 'rgba(0, 0, 0, .7)' },
    { id: 'lotomania', name: 'Lotomania', color: '#f3690d' },
    { id: 'diadesorte', name: 'Dia de Sorte', color: '#ecce25' },
    { id: 'supersete', name: 'Super Sete', color: '#15a581' },
    { id: 'maismilionaria', name: '+ Milionária', color: '#411488' },
    { id: 'federal', name: 'Federal', color: '#245475' },
]

export async function fetchLotteryResult(lottery, contest) {
    if (!LOTTERIES.some(({ id }) => id === lottery)) {
        throw new Error(`Loteria desconhecida: ${lottery}`)
    }

    const endpoint = contest === undefined
        ? `${API_BASE_URL}/${lottery}/latest`
        : `${API_BASE_URL}/${lottery}/${contest}`
    const response = await axios.get(endpoint, { timeout: 15000 })
    const result = response.data

    if (!result || typeof result !== 'object' || result.loteria !== lottery || !Number.isInteger(Number(result.concurso))) {
        throw new Error('A API retornou um resultado em formato inesperado.')
    }

    return result
}
