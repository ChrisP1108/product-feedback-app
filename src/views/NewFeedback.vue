<template>
    <div class="feedback-container">
        <GoBack />
        <CreateOrEditFeedback />
    </div>
</template>

<script>
    import GoBack from '../components/GoBack';
    import CreateOrEditFeedback from '../components/CreateOrEditFeedback';

    export default {
        name: 'NewFeedback',
        components: {
            GoBack,
            CreateOrEditFeedback
        }
    }
</script>

<style scoped>
    
</style>