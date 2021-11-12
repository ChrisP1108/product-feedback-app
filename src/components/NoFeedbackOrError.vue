<template>
    <div v-if="error" class="error-container">
        <img src="icon-error.svg" alt="error" />
        <h1>There was an error loading the page.</h1>
        <p>Please try reloading the page or check your internet connection.</p>
    </div>
    <div v-if="!error" class="nofeedback-container trans-fade">
        <img src="illustration-empty.svg" alt="No Feedback Items" />
        <h1 :class="[selected && 'fade-text']">{{ status === 'noneOfCategory' ? `No feedback of category "${capitalizer()}"` 
            : status === 'noRoadmaps' ? 'No feedback with status of "Planned", "In-Progress", or "Live" Exists.' 
            : 'There is no feedback yet.'}}</h1>
        <p>Got a suggestion? Found a bug that needs to be squashed? 
            We love hearing about new ideas to improve our app.
        </p>
        <div @click="toggleAddFeedback()"
            class="button-format add-feedback-button">
                <h2 class="button-text">+ Add Feedback</h2>
        </div>
    </div>
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
            },
            category() {
                return this.$store.state.sortCategory;
            }
        },
        methods: {
            toggleAddFeedback() {
                this.$router.push('/feedback/new');
            },
            capitalizer() {
                if (this.category === 'ui' || this.category === 'ux') {
                    return this.category.toUpperCase()
                } else {
                    return this.category.charAt(0).toUpperCase() + this.category.slice(1);
                }
            }
        }
    }
</script>

<style scoped>
    .nofeedback-container {
        background: var(--d);
        border-radius: 0.625rem;
        height: 28.75rem;
        padding: 4.75rem 1.5rem 4.75rem 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .error-container {
        background: var(--d);
        border-radius: 0.625rem;
        height: 28.75rem;
        padding: 10.1875rem 1.5rem 4.75rem 1.5rem;
        margin-top: 6.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    h1 {
        font-size: 1.125rem;
        letter-spacing: -0.0156rem;
        font-weight: 700;
        color: var(--g);
        text-align: center;
        margin: 2.625rem 0 1.25rem 0!important;
    }
    p {
        font-size: 0.8125rem;
        margin-bottom: 1.5rem!important;
        color: var(--h);
        text-align: center;
    }
    @media(min-width: 768px) {
        h1 {
            font-size: 1.5rem;
            margin: 3.75rem 0 1.125rem!important;
        }
        p {
            font-size: 1rem;
            margin-bottom: 3rem!important;
        }
        img {
            width: 8.1025rem;
            height: 8.5463rem;
        }
        .error-container {
            height: 37.5rem;
            padding: 6.875rem 0 6.9375rem;
        }
        .nofeedback-container {
            height: 37.5rem;
            padding: 6.875rem 0 6.9375rem;
        }
    }
</style>