<template>
    <div class="reply-container">
        <textarea @keyup="(e) => textTyping(e)" 
            maxlength="250"  :value="text" placeholder="Type your reply here" 
            :class="[!limit && 'red-border']">
        </textarea>
        <div @click="postReply()"
            class="reply-comment-button">
                <h2>Post Reply</h2>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Reply',
        data() {
            return {
                limit: 250,
                characters: 0,
                text: ''
            }
        },
        methods: {
            textTyping(e) {
                const input = e.target.value
                this.characters = input.length;
                this.limit = 250 - this.characters;
                this.text = input;
            },
            postReply() {
                this.$emit('reply-off')
            }
        }
    }
</script>

<style scoped>
    .reply-container {
        margin-top: 1.5rem;
        display: flex;
        flex-direction: column;
    }
    .reply-comment-button {
        margin-left: auto;
        margin-top: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 1rem 0;
        height: 2.5rem;
        background: var(--a);
        border-radius: 0.625rem;
        cursor: pointer;
        transition: 0.25s;
    }
    h2 {
        font-size: 0.8125rem;
        color: var(--p);
        font-weight: 700;
    }
    textarea {
        width: 100%;
        border-radius: 0.3125rem;
        background: var(--f);
        border: 0;
        height: 5rem;
        padding: 1rem 1.25rem;
        font-size: 0.8125rem;
        color: var(--v);
    }
    textarea:focus {
        outline: none!important;
        border: 1px var(--b) solid;
    }
    .red-border {
        border: 2px red solid;
    }
</style>