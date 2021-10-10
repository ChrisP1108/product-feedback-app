<template>
    <h1 :style="[route !== '/' && 'color: var(--g)']">
        {{item.title}}
    </h1>
    <p>{{item.description}}</p>
    <h2>
        {{item.category.charAt(0).toUpperCase() + item.category.slice(1)}}
    </h2>
    <div class="votes-comments-container">
        <div :class="[voteClicked ? 'votes-amount-clicked' : 'votes-amount-no-click', 
            'votes-amount-container']" @click="upvoteClick()">
                <div :class="[voteClicked ? 'up-arrow-icon-clicked' : 'up-arrow-icon']"></div>
                <h3>{{item.upvotes}}</h3>
        </div>
        <div class="comments-container">
            <div class="comments-icon"></div>
            <h3>{{commentCounter(item.comments)}}</h3>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SuggestionItem',
        props: {
            item: Object
        },
        data() {
            return {
                voteClicked : false
            }
        },
        computed: {
            route() {
                return this.$router.currentRoute.value.fullPath
            },
            userUpvotes() {
                return this.$store.state.data.currentUser.upvotes
            },
            productRequests() {
                return this.$store.state.data.productRequests
            }
        },
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
            },
            upvoteClick() {
                let data = {...this.$store.state.data};
                let item = {...this.item};
                if ('upvotes' in data.currentUser) {
                    if (data.currentUser.upvotes.includes(item.id)) {
                        return;
                    }
                    data.currentUser.upvotes.push(item.id);
                } else {
                    data.currentUser.upvotes = [];
                    data.currentUser.upvotes.push(item.id);
                }
                item.upvotes = item.upvotes + 1;
                for (let i = 0; i < data.productRequests.length; i++) {
                    if (data.productRequests[i].id === item.id) {
                        data.productRequests.splice(i, 1, item);
                    }
                }
                this.$store.commit('setFeedbackSelect', item);
                this.$store.commit('setData', data);
                this.$store.commit('setList');
                this.voteClickCheck();
            },
            voteClickCheck() {
                if (!this.userUpvotes) {
                    return
                }
                if (this.userUpvotes.includes(this.item.id)) {
                    this.voteClicked = true
                }
            }
        },
        created() {
            this.voteClickCheck();
        }
    }
</script>

<style scoped>
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
        width: 4.3125rem;
    }
    .votes-amount-no-click {
        cursor: pointer;
        color: var(--g);
        background: var(--e);
    }
    .votes-amount-no-click:hover {
        background: var(--s);
    }
    .votes-amount-clicked {
        background: var(--b);
        color: var(--d);
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
    .up-arrow-icon-clicked {
        background-image: url('../assets/shared/icon-arrow-down-white.svg');
        transform: rotate(180deg);
        width: 0.625rem;
        height: 0.4375rem;
    }
</style>
