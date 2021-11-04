<template>
    <div class="createoredit-main-container">
        <GoBack />
        <div class="trans-fade">
            <CreateOrEditFeedback />
        </div>
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