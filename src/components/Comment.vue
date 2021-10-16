<template>
    <div class="comment-container">
        <div class="img-name">
            <img :src="comment.user.image"  
                :alt="comment.user.name" 
                onerror="this.src='/icon-no-image.svg'"
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
        <h3><span>{{ replyGenerator(comment) }}</span> {{ comment.content }}</h3>
    </div>
    <Reply @reply-off="toggleReply()" v-if="reply" :comment="comment" />
</template>

<script>
    import Reply from './Reply';

    export default {
        name: 'Comment',
        components: {
            Reply
        },
        props: {
            comment: Object
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
</style>
