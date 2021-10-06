<template>
    <h1>CreateOrEditFeedback Works!</h1>
    <p>{{isNew ? 'New Feedback' : 'Edit Feedback'}}</p>
</template>

<script>
    export default {
        name: 'CreateOrEditFeedback',
        props: {
            type: String
        },
        computed: {
            route() {
                return this.$router.currentRoute.value.fullPath
            }
        },
        data() {
            return {
                isNew: false
            }
        },
        created() {
            if (this.route === '/newfeedback') {
                this.isNew = true;
            }
            console.log(this.isNew);        
        }
    }
</script>

<style scoped>

</style>