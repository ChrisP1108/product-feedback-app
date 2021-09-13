<template>
    <div :key="item.id" v-for="item in this.$store.state.list" 
        class="suggestion-item-container">
        <h1>{{item.title}}</h1>
        <p>{{item.description}}</p>
        <h2>{{item.category.charAt(0).toUpperCase() + item.category.slice(1)}}</h2>
        <div class="votes-comments-container">
            <div class="votes-amount-container">
                <div class="up-arrow-icon"></div>
                <h3>{{item.upvotes}}</h3>
            </div>
            <div class="comments-container">
                <div class="comments-icon"></div>
                <h3>{{commentCounter(item.comments)}}</h3>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SuggestionItem',
        methods: {
            commentCounter(comment) {
                let tally = 0;
                if (!comment) {
                    return 0;
                }
                comment.forEach((item) => {
                    tally++;
                    if ('replies' in item) {
                        item.replies.forEach(() => {
                            tally++;
                        });
                    }
                });
                return tally;
            }
        }
    }
</script>

<style scoped>
    .suggestion-item-container {
        padding: 1.6875rem 1.75rem 1.5rem 1.5rem;
        background: var(--d);
        border-radius: 0.625rem;
        margin-bottom: 1rem;
        cursor: pointer;
    }
    .suggestion-item-container:hover h1 {
        color: var(--b);
    }
    h1 {
        font-size: 0.8125rem;
        color: var(--g);
        font-weight: 700;
        letter-spacing: -0.0112rem;
        margin: 0;
        transition: 0.25s;
    }
    h2 {
        display: inline-flex;
        font-size: 0.8125rem;
        color: var(--b);
        height: 1.875rem;
        padding: 0 1rem 0!important;
        font-weight: 700;
        border-radius: 0.625rem;
        letter-spacing: 0rem;
        margin: 0;
        background: var(--e); 
        align-items: center;
    }
    h3 {
        font-size: 0.8125rem;
        color: var(--g);
        font-weight: 700;
        letter-spacing: -0.0119rem;
        margin: 0;
    }
    p {
        font-size: 0.8125rem;
        margin: 1rem 0 0.75rem 0;
        color: var(--h);
    }
    .votes-amount-container {
        display: flex;
        justify-content: space-between;
        border-radius: 0.625rem;
        align-items: center;
        padding: 0 1rem 0;
        height: 2rem;
        transition: 0.25s;
        background: var(--e);
        width: 4.3125rem;
        cursor: pointer;
    }
    .votes-amount-container:hover {
        background: var(--s);
    }
    .comments-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0;
    }
    .comments-icon {
        background-image: url('../assets/shared/icon-comments.svg');
        width: 1.125rem;
        height: 1rem;
        margin-right: 0.5rem;
    }
    .votes-comments-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;
    }
    .up-arrow-icon {
        background-image: url('../assets/shared/icon-arrow-up.svg');
        width: 0.625rem;
        height: 0.4375rem;
    }
    .down-arrow-icon {
        background-image: url('../assets/shared/icon-arrow-down.svg');
        width: 0.625rem;
        height: 0.4375rem;
    }
</style>
