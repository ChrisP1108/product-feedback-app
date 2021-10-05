<template>
    <div class="reply-container">
        <textarea @keyup="(e) => textTyping(e)" 
            maxlength="250"  :value="text" placeholder="Type your reply here" 
            :class="[!limit && 'red-border']">
        </textarea>
        <div v-if="!currentUser" @click="postReply()"
            class="button reply-button">
                <h2>Post Reply</h2>
        </div>
        <div v-if="currentUser" class="edit-container">
            <div @click="replyChange('delete')"
                class="button delete-button">
                    <h2>Delete</h2>
            </div>
            <div v-if="this.text" @click="replyChange('update')"
                class="button reply-button">
                    <h2>Update Reply</h2>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Reply',
        props: {
            comment: Object
        },
        created() {
            if (this.userData.username === this.comment.user.username) {
                this.currentUser = true;
                this.text = this.comment.content
            }
        },
        data() {
            return {
                limit: 250,
                characters: 0,
                text: '',
                currentUser: false,
                replyData: {
                    content: '',
                    replyingTo: '',
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
            },
            productData() {
                return (this.$store.state.data.productRequests)
            }
        },
        methods: {
            textTyping(e) {
                const input = e.target.value;
                this.characters = input.length;
                this.limit = 250 - this.characters;
                this.text = input;
            },
            dataUpdate(input) {
                const productData = [];
                this.productData.forEach(product => {
                    product.id === input.id ? productData.push(input) 
                    : productData.push(product)
                })
                const data = {
                    currentUser: this.userData,
                    productRequests: productData
                }
                this.$store.commit('setData', data);
                this.$store.commit('setList');
                this.$emit('reply-off');
            },
            postReply() {
                if (!this.text) {
                    this.$emit('reply-off');
                    return 
                }
                this.replyData = {
                    content: this.text,
                    replyingTo: this.comment.user.username,
                    user: {
                        image: this.userData.image, 
                        name: this.userData.name, 
                        username: this.userData.username
                    }
                }
                let replyAdd = {...this.comment}
                if (!this.comment.replies) {
                        replyAdd = {...this.comment, replies: []}
                }
                replyAdd.replies.push(this.replyData);
                if ('replyingTo' in this.comment) {
                    let commentRoot;
                    this.selectedFeedback.comments.forEach(comment => {
                        if ('replies' in comment) {
                            comment.replies.forEach(reply => {
                                if(reply.content === replyAdd.content) {
                                    commentRoot = comment
                                }
                            });
                        }
                    });
                    for(let i = 0; commentRoot.replies.length > i; i++) {
                        if (commentRoot.replies[i].content === replyAdd.content) {
                            commentRoot.replies[i] = replyAdd;
                        }
                    }
                    replyAdd = commentRoot;
                }
                const commentsUpdate = [] 
                this.selectedFeedback.comments.forEach(comment => {
                        comment.content === replyAdd.content ? commentsUpdate.push(replyAdd)
                        : commentsUpdate.push(comment)
                }); 
                const feedbackUpdate = {...this.selectedFeedback, comments: commentsUpdate}
                this.$store.commit('setFeedbackSelect', feedbackUpdate);
                this.dataUpdate(feedbackUpdate);
            },
            replyChange(type) {
                let data = {...this.selectedFeedback};
                for (let i = 0; i < data.comments.length; i++) {
                    if (data.comments[i] === this.comment) {
                        if (type === 'update') {
                            data.comments[i].content = this.text;
                        } else {
                            data.comments.splice(i, 1);
                        }
                        break;
                    }
                    if ('replies' in data.comments[i]) {
                        for (let j = 0; j < data.comments[i].replies.length; j++) {
                            if (data.comments[i].replies[j].content === this.comment.content) {
                                if (type === 'update') {
                                    data.comments[i].replies[j].content = this.text;
                                } else {
                                    data.comments[i].replies.splice(j, 1);
                                }
                                
                                break;
                            }
                            if ('replies' in data.comments[i].replies[j]) {
                                for (let k = 0; k < data.comments[i].replies[j].replies.length; k++) {
                                    if (data.comments[i].replies[j].replies[k].content === this.comment.content) {
                                        if (type === 'update') {
                                            data.comments[i].replies[j].replies[k].content = this.text;
                                        } else {
                                            data.comments[i].replies[j].replies.splice(k, 1); 
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                this.$store.commit('setFeedbackSelect', data);
                this.dataUpdate(data);
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
    .button {
        margin-left: auto;
        margin-top: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 1rem 0;
        height: 2.5rem;
        border-radius: 0.625rem;
        cursor: pointer;
        transition: 0.25s;
    }
    .reply-button {
        background: var(--a);
    }
    .delete-button {
        background: var(--w);
    }
    .edit-container {
        display: flex;
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