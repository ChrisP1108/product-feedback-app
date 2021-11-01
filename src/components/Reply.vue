<template>
    <div class="reply-container trans-fade">
        <div v-if="currentUser" class="reply-active-border"></div>    
        <textarea @keyup="(e) => textTyping(e)" 
            maxlength="250"  :value="text" placeholder="Type your reply here" 
            :class="[!limit && 'red-border']">
        </textarea>
        <div v-if="!currentUser" @click="postReply()"
            class="button button-format reply-button position-relative">
                <div v-if="loadingPost" class="position-absolute">
                    <ButtonSpinner />
                </div>
                <h2 :class="[loadingPost ? 'invisible' : 'visible', 'button-text']">Post Reply</h2>  
        </div>
        <div v-if="currentUser" class="edit-container">
            <div @click="replyChange('delete')"
                class="button button-format delete-button position-relative">
                    <div v-if="loadingDelete" class="position-absolute">
                        <ButtonSpinner />
                    </div>
                <h2 :class="[loadingDelete ? 'invisible' : 'visible', 'button-text']">Delete</h2> 
            </div>
            <div v-if="this.text && this.text !== comment.content" @click="replyChange('update')"
                class="update-button button-format reply-button">
                    <div v-if="loadingUpdate" class="position-absolute">
                        <ButtonSpinner />
                    </div>
                    <h2 :class="[loadingUpdate ? 'invisible' : 'visible', 'button-text']">Update Reply</h2>
            </div>
        </div>
    </div>
</template>

<script>
    import ButtonSpinner from './ButtonSpinner';

    export default {
        name: 'Reply',
        components: {
            ButtonSpinner
        },
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
                loadingPost: false,
                loadingDelete: false,
                loadingUpdate: false,
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
            },
            dataList() {
                return (this.$store.state.data)
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
                const data = {...this.dataList};
                const index = data.productRequests.findIndex(i => i.id === input.id);
                data.productRequests.splice(index, 1, input);
                this.$store.commit('setData', data);
                this.$emit('reply-off');
            },
            postReply() {
                if (!this.text) {
                    this.$emit('reply-off');
                    return 
                }
                this.loadingPost = true;
                setTimeout(() => {
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
                        const index = commentRoot.replies.findIndex(i => i.content === replyAdd.content);
                        commentRoot.replies[index] = replyAdd;
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
                    this.loadingPost = false;
                }, 2000);
            },
            replyChange(type) {
                if (type === 'update') {
                    this.loadingUpdate = true;
                } else {
                    this.loadingDelete = true;
                }
                setTimeout(() => {
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
                    if (type === 'update') {
                        this.loadingUpdate = false;
                    } else {
                        this.loadingDelete = false;
                    }
                }, 2000);
                
            }
        }
    }
</script>

<style scoped>
    .reply-container {
        margin-top: 1.5rem;
        display: flex;
        flex-direction: column;
        position: relative;
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
    .update-button {
        margin-top: 1.25rem;
        margin-left: 1rem;
        display: flex;
        align-items: center;
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
        justify-content: flex-end;
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
    .reply-active-border {
        position: absolute;
        border-left: 0.0625rem var(--bb) solid;
        height: calc(100% + 2.75rem);
        left: -3rem;
    }
    @media(min-width: 768px) {
        textarea {
            font-size: 0.9375rem;
            height: 6rem;
        }
        .reply-container {
            margin-top: 2rem;
            margin-left: 4.5rem;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
        }
        .button {
            margin-top: 0rem;
            margin-left: 1rem;
            width: 8rem;
        }
        .update-button {
            margin-top: 0rem;
            margin-left: 1rem;
            width: 8rem;
        }
        .edit-container {
            display: flex;
            height: 6rem;
            flex-direction: column;
            justify-content: space-between;
        }
        .reply-active-border {
            height: calc(100% + 2.75rem);
            left: -9.1rem;
        }
    }
</style>