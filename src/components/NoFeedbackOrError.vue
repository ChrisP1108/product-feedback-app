<template>
    <h1>{{error ? 'Error' : 'No Items'}}</h1>
</template>

<script>
    export default {
        name: 'NoFeedbackOrError',
        props: {
            status: String
        },
        computed: {
            error () {
                return this.status === 'error' ? true : false
            }
        }
    }
</script>

<style scoped>
    
</style>