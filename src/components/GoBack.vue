<template>
    <div class="go-back-feedback-container">
        <div @click="goBackHome()" class="back-arrow-container">
            <div class="back-arrow-icon"></div>
            <p>Go Back</p>
        </div>
        <div @click="toggleFeedbackEdit()"
            class="edit-feedback-button">
                <h2>Edit Feedback</h2>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'GoBack',
        methods: {
            goBackHome() {
                this.$router.push('/');
            }
        }
    }
</script>

<style scoped>
    h2 {
        font-size: 0.8125rem;
        color: var(--p);
        font-weight: 700;
    }
    p {
        font-size: 0.8125rem;
        color: var(--h);
        font-weight: 700;
        letter-spacing: -0.0112rem;
        transition: 0.25s;
        margin: 0 0 0 0.9375rem;
    }
    .go-back-feedback-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0rem 1.5rem 0;
        position: relative;
        height: 2.5rem;
    }
    .back-arrow-container {
        display: flex;
        align-items: center;
        position: absolute;
        height: 3rem;
        cursor: pointer;
    }
    .back-arrow-icon {
        background-image: url('../assets/shared/icon-arrow-left.svg');
        width: 0.4375rem;
        height: 0.625rem;
    }
    .edit-feedback-button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 1rem 0;
        height: 2.5rem;
        width: 7.75rem;
        background: var(--b);
        border-radius: 0.625rem;
        cursor: pointer;
        transition: 0.25s;
        position: absolute;
        left: 100%;
        transform: translateX(-100%);
    }
</style>