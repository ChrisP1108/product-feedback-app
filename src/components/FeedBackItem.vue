<template>
    <div class="feedback-item-container">
        <h1>Add tags for solutions</h1>
        <p>Easier to search for solutions based on 
        a specific stack.</p>
    </div>
</template>

<script>
    export default {
        name: 'FeedBackItem'
    }

</script>

<style scoped>
    .feedback-item-container {
        padding: 1.6875rem 1.75rem 1.5rem 1.5rem;
        width: 100%;
        height: 12.5rem;
        background: gray;
        border-radius: 0.625rem;
        margin-bottom: 1rem;
    }
    h1 {
        font-size: 0.8125rem;
        color: var(--g);
        font-weight: 700;
        letter-spacing: -0.0112rem;
    }
    p {
        font-size: 0.8125rem;
        margin-top: 1rem;
        color: var(--h);
    }
</style>
