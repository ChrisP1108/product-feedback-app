<template>
    <h1>Add Comment</h1>
    <textarea @keyup="(e) => textTyping(e)" 
        maxlength="250"  :value="text" placeholder="Type your comment here" 
        :class="[empty || !limit ? 'red-border' : '', 'text-field text-area']">
    </textarea>
    <div class="character-comment-container">
        <p :class="[empty || !limit ? 'red-highlight' : '']">
            {{empty ? "Can't Be Empty" : `${limit} Character Left`}}
        </p>
        <div @click="postComment()"
            class="post-comment-button position-relative">
                <div v-if="loading" class="position-absolute">
                    <ButtonSpinner />
                </div>
                <h2 :class="[loading ? 'invisible' : 'visible']">Post Comment</h2>
        </div>
    </div>
</template>

<script>
    import ButtonSpinner from './ButtonSpinner';

    export default {
        name: 'AddComment',
        components: {
            ButtonSpinner
        },
        data() {
            return {
                limit: 250,
                characters: 0,
                text: '',
                empty: false,
                loading: false,
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
            productData() {
                return (this.$store.state.data.productRequests)
            },
            selectedFeedback() {
                return (this.$store.state.feedbackSelect)
            },
            userData() {
                return (this.$store.state.data.currentUser)
            },
            listData() {
                return (this.$store.state.data);
            }
        },
        methods: {
            textTyping(e) {
                if (this.text) {
                    this.empty = false;
                }
                const input = e.target.value
                this.characters = input.length;
                this.limit = 250 - this.characters;
                this.text = input;
            },
            postComment() {
                if (!this.text) {
                    this.empty = true;
                    return
                }
                this.loading = true;
                setTimeout(() => {
                    let idTally = 0;
                    this.productData.forEach(request => {
                        if ('comments' in request) {
                            request.comments.forEach(() => {
                                idTally += 1;
                            });
                        }
                    });
                    this.commentData = {
                        id: idTally + 1,
                        content: this.text,
                        user: {
                            image: this.userData.image,
                            name: this.userData.name,
                            username: this.userData.username
                        }
                    }
                    let update = {...this.selectedFeedback};
                    if (!update.comments) {
                        update = {...this.selectedFeedback, comments: []};
                    }
                    update.comments.push(this.commentData);
                    this.$store.commit('setFeedbackSelect', update);
                    const output = {...this.listData};
                    for(let i = 0; i < output.productRequests.length; i++) {
                        if (output.productRequests[i].id === update.id) {
                            output.productRequests.splice(i, 1, update);
                        }
                    }
                    console.log(output);
                    this.$store.commit('setData', output);
                    this.text = '';
                    this.loading = false;
                }, 2000);
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
    @media(min-width: 768px) {
        .post-comment-button {
            height: 2.75rem;
            width: 8.875rem;
        }
        h2 {
            font-size: 0.875rem;
        }
        p {
            font-size: 0.9375rem;
        }
    }
</style>