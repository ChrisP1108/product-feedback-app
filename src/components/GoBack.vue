<template>
    <div class="go-back-feedback-container">
        <div @click="goBack()" class="back-arrow-container">
            <div class="back-arrow-icon"></div>
            <p>Go Back</p>
        </div>
        <div v-if="route.includes('details')" @click="toggleFeedbackEdit()"
            class="button-format edit-feedback-button">
                <h2 class="button-text">Edit Feedback</h2>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'GoBack',
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            toggleFeedbackEdit() {
                this.$router.push(`/feedback/edit/${this.$store.state.feedbackSelect.id}`);
            }
        },
        computed: {
            route() {
                return this.$router.currentRoute.value.fullPath
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
    p:hover {
        text-decoration: underline;
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
        width: 7.75rem;
        background: var(--b);
        position: absolute;
        left: 100%;
        transform: translateX(-100%);
    }
    .edit-feedback-button:hover {
        background: var(--u);
    }
    @media(min-width: 768px) {
        p {
            font-size: 0.875rem;
        }
        .edit-feedback-button {
            padding: 0 1.0625rem 0;
            width: 8.875rem;
        }
        .go-back-feedback-container {
            margin: 0rem 1.5rem 0;
        }
    }
</style>