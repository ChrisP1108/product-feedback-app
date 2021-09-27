<template>
    <h1>Add Comment</h1>
    <textarea @keyup="(e) => textTyping(e)" 
        maxlength="250"  :value="text" placeholder="Type your comment here" 
        :class="[!limit && 'red-border']">
    </textarea>
    <div class="character-comment-container">
        <p :class="[!limit && 'red-highlight']">
            {{ limit }} Characters left
        </p>
        <div @click="postComment()"
            class="post-comment-button">
                <h2>Post Comment</h2>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AddComment',
        data() {
            return {
                limit: 250,
                characters: 0,
                text: '',
                commentData: {
                    id: null,
                    content: '',
                    user: {
                        image: '',
                        name: '',
                        username: ''
                    }
                }
            }
        },
        computed: {
            selectedFeedback() {
                return (this.$store.state.feedbackSelect)
            },
            userData() {
                return (this.$store.state.data.currentUser)
            }
        },
        methods: {
            textTyping(e) {
                const input = e.target.value
                this.characters = input.length;
                this.limit = 250 - this.characters;
                this.text = input;
            },
            postComment() {
                this.commentAdd = {
                    id: this.selectedFeedback.comments.length + 1,
                    content: this.text,
                    user: {
                        image: this.userData.image,
                        name: this.userData.name,
                        username: this.userData.username
                    }
                }
                console.log(this.commentAdd);
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
        padding: 1rem 1.25rem;
        font-size: 0.8125rem;
        color: var(--v);
    }
    textarea:focus {
        outline: none!important;
        border: 1px var(--b) solid;
    }
    h2 {
        font-size: 0.8125rem;
        color: var(--p);
        font-weight: 700;
    }
    p {
        font-size: 0.8125rem;
        font-weight: 400;
        margin: 0;
        color: var(--h);
    }
    .character-comment-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;
    }
    .red-highlight {
        color: red;
    }
    .red-border {
        border: 2px red solid;
    }
    .post-comment-button {
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
</style>