<template>
<GetEmail v-if="api_data" />
<main class="container mt-5">
    <MainResults />
    <DefaultContent />
    <MainFooter />
</main>
</template>

<script>
import GetEmail from '@/components/GetEmail.vue';
import MainResults from '@/components/MainResults.vue'
import MainFooter from '@/components/MainFooter.vue'
import axios from 'axios';
import DefaultContent from '../components/DefaultContent.vue';
export default {
    name: 'HomeView',
    components: {
        GetEmail,
        MainResults,
        MainFooter,
        DefaultContent
    },
    data() {
        return {
            api_data: {}
        }
    },
    methods: {
        async getApiData() {
            const id = '66084f7849b117edf3a09175'
            await axios.get(`https://subscribers-git-master-acioliwilson.vercel.app/status/${id}`)
            .then((response) => {
                this.api_data = response.data.signup
            }).catch((error) => { console.error(error) })
        }
    },
    mounted() {
        this.getApiData()
    }
}
</script>