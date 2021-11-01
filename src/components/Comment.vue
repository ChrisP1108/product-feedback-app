<template>
    <div class="comment-main-container">
        <div v-if="type === 'reply'" class="reply-border"></div>
        <div class="comment-container">
            <div class="img-name">
                <img :src="comment.user.image"  
                    :alt="comment.user.name" 
                    onerror="this.src='/icon-no-image.svg"
                >
                <div class="name">
                    <h2>{{ comment.user.name }}</h2>
                    <p>@{{ comment.user.username }}</p>
                </div>
            </div>
            <h1 v-if="userData.username !== comment.user.username"
                @click="toggleReply()">{{ reply ? 'Close' : 'Reply' }}
            </h1>
            <h1 v-if="userData.username === comment.user.username"
                @click="toggleReply()">{{ reply ? 'Close' : 'Edit' }}
            </h1>
        </div>
        <div class="comment-content">
            <div v-if="('replies' in comment) && comment.replies.length !== 0 && this.$store.state.response !== 'mobile'" 
                class="reply-start-border">
            </div>
            <h3><span>{{ replyGenerator(comment) }}</span> {{ comment.content }}</h3>
        </div>
        <div :class="[reply ? 'reply-fade-in' : '', 'trans-fade']">
            <Reply @reply-off="toggleReply()" v-if="reply" :comment="comment" />
        </div>
        <div v-if="type === 'reply' && ('replies' in comment) && comment.replies.length !== 0" 
            class="reply-extension-border">
        </div>
    </div>
</template>

<script>
    import Reply from './Reply';

    export default {
        name: 'Comment',
        components: {
            Reply
        },
        props: {
            comment: Object,
            type: String
        },
        computed: {
            userData() {
                return (this.$store.state.data.currentUser)
            },
        },
        data() {
            return {
                reply: false
            }
        },
        methods: {
            replyGenerator(comment) {
                if ('replyingTo' in comment) {
                    const reply = `@${comment.replyingTo}`;
                    return reply
                } else {
                    return
                }
            },
            toggleReply() {
                this.reply = !this.reply;
            }
        }
    }
</script>

<style scoped>
    h1 {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 100%;
        transform: translateX(-90%);
        font-size: 0.8125rem;
        color: var(--b);
        font-weight: 700;
        letter-spacing: -0.0112rem;
        transition: 0.25s!important;
        margin: 0;
        cursor: pointer;
        height: 2.5rem;
        width: 2.5rem;
    }
    h1:hover {
        text-decoration: underline;
        transition: 0.25s!important;
    }
    h2 {
        font-size: 0.8125rem;
        color: var(--g);
        font-weight: 700;
        letter-spacing: -0.0112rem;
    }
    h3 {
        font-size: 0.9375rem;
        color: var(--h);
        font-weight: 400;
        letter-spacing: 0rem;
        line-height: 1.25rem;
        margin: 0;

    }
    h3 span {
        color: var(--a);
        font-weight: 700;
    }
    p {
        font-size: 0.8125rem;
        color: var(--h);
        font-weight: 400;
        letter-spacing: -0.0112rem;
        margin: 0;
    }
    .comment-main-container {
        height: 100%!important;
        position: relative;
    }
    .comment-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        transition: 0.25s!important;
    }
    img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
    }
    .img-name {
        display: flex;
        align-items: center;
    }
    .name {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: space-between;
        margin-left: 1rem!important;
    }
    .comment-content {
        margin-top: 1.125rem;
    }
    .reply-border {
        position: absolute;
        border-left: 0.0625rem var(--bb) solid;
        height: calc(100% + 2.85rem);
        left: -1.5rem;
    }
    .reply-extension-border {
        position: absolute;
        border-left: 0.0625rem var(--bb) solid;
        height: calc(100%);
        left: -1.5rem;
    }
    .reply-fade-in {
        animation-name: reply-in;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
    }
    @keyframes reply-in {
        from {transform: translateY(-3rem); display: block; opacity: 0}
        to {transform: translateY(0rem); opacity: 1}
    }
    .reply-fade-out {
        animation-name: reply-in;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
    }
    @keyframes reply-out {
        from {transform: translateY(0rem); opacity: 1}
        to {transform: translateY(-3rem); opacity: 0}
    }
    @media(min-width: 768px) {
        h2 {
            font-size: 0.875rem;
        }
        p {
            font-size: 0.875rem;
            margin-top: 0.125rem;
        }
        .comment-content {
            margin-left: 4.5rem;
        }
        .name {
            margin-left: 2rem!important;
        }
        .reply-border {
            left: -1.8rem;
        }
        .reply-start-border {
            position: absolute;
            border-left: 0.0625rem var(--bb) solid;
            height: calc(100% - 1rem);
            left: 1.05rem;
            margin-top: 0.25rem;
        }
        .reply-extension-border {
            left: -1.8rem;
            height: calc(125%);
        }
    }
</style>
