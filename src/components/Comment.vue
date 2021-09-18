<template>
    <div class="comment-container">
        <div class="img-name">
            <div :style="[!comment.user.image 
                && `background: url(.${comment.user.image})`]" 
                class="img-avatar">
            </div>
            <div class="name">
                <h2>{{ comment.user.name }}</h2>
                <p>@{{ comment.user.username }}</p>
            </div>
        </div>
        <h1>Reply</h1>
    </div>
    <div class="comment-content">
        <h3><span>{{ replyGenerator(comment) }}</span> {{ comment.content }}</h3>
    </div>
</template>

<script>
    export default {
        name: 'Comment',
        props: {
            comment: Object
        },
        methods: {
            replyGenerator(comment) {
                if ('replyingTo' in comment) {
                    const reply = `@${comment.replyingTo}`;
                    return reply
                } else {
                    return
                }
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
        transition: 0.25s;
        margin: 0;
        cursor: pointer;
        height: 2.5rem;
        width: 2.5rem;
    }
    h1:hover {
        text-decoration: underline;
        transition: 0.25s;
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
    }
    .img-avatar {
        width: 2.5rem;
        height: 2.5rem;
        background: url('../assets/shared/icon-no-image.svg');
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
