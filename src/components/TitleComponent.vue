<template>
<div>
</div>
</template>

<script>
export default {
    watch: {
        $route() {
            this.updateTitle();
        },
    },
    mounted() {
        this.updateTitle();
    },
    methods: {
        updateTitle() {
            const pageTitle = this.$route.meta.title || 'Resultados da Mega Sena';
            document.title = `Resultados da Mega Sena | ${pageTitle}`;
        },
    },
};
</script>
