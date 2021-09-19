<template>
    <h1>Add Comment</h1>
    <textarea @keydown="(e) => textTyping(e)" maxlength="250"></textarea>
    <div class="character-comment-container">
        <p>{{ limit }} Characters left</p>
    </div>
</template>

<script>
    export default {
        name: 'AddComment',
        data() {
            return {
                limit: 250,
                characters: 0
            }
        },
        methods: {
            textTyping(e) {
                this.characters = e.target.value.length;
                this.limit = 250 - this.characters;
                this.limit < 0 ? this.limit = 0 : '';
                console.log(e.target.value.length);
            }
        }
    }
</script>

<style scoped>
    h1 {
        font-size: 1.125rem;
        color: var(--g);
        font-weight: 700;
        letter-spacing: -0.0112rem;
        margin: 0 0 1.875rem!important;
        transition: 0.25s;
    }
    textarea {
        width: 100%;
        border-radius: 0.3125rem;
        background: var(--f);
        border: 0;
        height: 5rem;
    }
    textarea:active {
        border: 1px red solid;
    }
    p {
        font-size: 0.8125rem;
        margin: 0;
        color: var(--h);
    }
</style>