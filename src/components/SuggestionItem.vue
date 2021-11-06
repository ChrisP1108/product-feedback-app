<template>
    <div v-if="roadmap" class="status-container">
        <div :class="[`status-dot status-${item.status}`]"></div>
        <h4>{{ statusType() }}</h4>
    </div>
    <div :class="[!roadmap && 'tablet-main-container']">
        <div :class="[!roadmap && 'tablet-comment-spacer']">
            <div :class="[voteClicked ? 'votes-amount-clicked' : 'votes-amount-no-click', 
                'votes-amount-container tablet']" @click="upvoteClick()" v-if="!roadmap">
                    <div :class="[voteClicked ? 'up-arrow-icon-clicked' : 'up-arrow-icon']"></div>
                    <h3 class="upvote-size">{{item.upvotes}}</h3>
            </div>
            <div :class="[!roadmap && 'tablet-center-container']">
                <h1 :class="[roadmap ? 'roadmap-title' : 'title-size']">
                    {{item.title}}
                </h1>
                <p :class="[roadmap ? 'roadmap-description' : 'description']">{{item.description}}</p>
                <h2>
                    {{ capitalizeCategory() }}
                </h2>
                <div :class="[!roadmap && 'mobile', 'votes-comments-container']">
                    <div :class="[voteClicked ? 'votes-amount-clicked' : 'votes-amount-no-click', 
                        'votes-amount-container-roadmap']" @click="upvoteClick()">
                            <div :class="[voteClicked ? 'up-arrow-icon-clicked' : 'up-arrow-icon']"></div>
                            <span>{{item.upvotes}}</span>
                    </div>
                    <div class="comments-container">
                        <div :class="[roadmap && 'roadmap-icon', 'comments-icon']"></div>
                        <h3 :class="[roadmap ? 'roadmap-comment-count' : 'comment-count']">
                            {{ commentCounter(item.comments) }}
                        </h3>
                    </div>
                </div>
            </div>
        </div>
        <div class="tablet comments-container" v-if="!roadmap">
            <div class="comments-icon"></div>
            <h3 :class="[roadmap ? 'roadmap-comment-count' : 'comment-count']">{{commentCounter(item.comments)}}</h3>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SuggestionItem',
        props: {
            item: Object,
            isRoadmap: String
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
            },
            roadmap() {
                return this.isRoadmap === 'true' ? true : false;
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
                        item.upvotes = item.upvotes - 1;
                        const i = data.currentUser.upvotes.findIndex(i => i.id === item.id);
                        data.currentUser.upvotes.splice(i, 1);
                        this.voteClicked = false;
                    } else {
                        item.upvotes = item.upvotes + 1;
                        data.currentUser.upvotes.push(item.id);
                    }
                } else {
                    data.currentUser.upvotes = [];
                    data.currentUser.upvotes.push(item.id);
                    item.upvotes = item.upvotes + 1;
                }
                const index = data.productRequests.findIndex(i => i.id === item.id);
                data.productRequests.splice(index, 1, item);
                this.$store.commit('setFeedbackSelect', item);
                this.$store.commit('setData', data);
                this.voteClickCheck();
            },
            voteClickCheck() {
                if (!this.userUpvotes) {
                    return
                }
                if (this.userUpvotes.includes(this.item.id)) {
                    this.voteClicked = true
                }
            },
            capitalizeCategory() {
                if (this.item.category === 'ux' || this.item.category === 'ui') {
                    return this.item.category.toUpperCase();
                } else {
                    return this.item.category.charAt(0).toUpperCase() + this.item.category.slice(1);
                }
            },
            statusType() {
                let data;
                switch(this.item.status) {
                    case 'planned':
                        data = 'Planned';
                        break;
                    case 'in-progress':
                        data = 'In Progress';
                        break;
                    case 'live':
                        data = 'Live';
                        break;
                }
                return data;
            }
        },
        created() {
            this.voteClickCheck();
        }
    }
</script>

<style scoped>
    .suggestion-item-container:hover h1 {
        color: var(--b)!important;
    }
    .roadmap-item-container:hover h1 {
        color: var(--b)!important;
    }
    h1 {
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
        font-weight: 700;
        letter-spacing: -0.0119rem;
        margin: 0;
    }
    h4 {
        font-size: 0.8125rem;
        color: var(--h);
        font-weight: 400;
        margin: 0 0 0 0.5rem;
    }
    p {
        margin: 1rem 0 0.75rem 0;
        color: var(--h);
    }
    .status-container {
        display: flex;
        align-items: center;
        margin-bottom: 1.25rem;
    }
    .status-dot {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
    }
    .status-planned {
        background: var(--i);
    }
    .status-in-progress {
        background: var(--a);
    }
    .status-live {
        background: var(--j);
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
        cursor: pointer;
    }
    .votes-amount-container-roadmap {
        display: flex;
        justify-content: space-between;
        border-radius: 0.625rem;
        align-items: center;
        padding: 0 1rem 0;
        height: 2rem;
        transition: 0.25s;
        width: 4.3125rem;
        cursor: pointer;
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
    .tablet {
        display: none;
    }
    .title-size {
        font-size: 0.8125rem;
    }
    .roadmap-title {
        font-size: 0.8125rem;
    }
    .description {
        font-size: 0.8125rem;
    }
    .roadmap-description {
        font-size: 0.8125rem;
    }
    .roadmap-comment-count {
        font-size: 0.8125rem;
    }
    .comment-count {
        font-size: 0.8125rem;
    }
    span {
        font-size: 0.8125rem;
        font-weight: 700;
        letter-spacing: -0.0119rem;
        margin: 0;
    }
    @media(min-width: 768px) {
        .mobile {
            display: none;
        }
        .tablet {
            display: flex;
        }
        .tablet-main-container {
            display: flex;
            justify-content: space-between;
        }
        .tablet-center-container {
            margin-left: 2.5rem;
        }
        .tablet-comment-spacer {
            display: flex;
        }
        .votes-amount-container {
            display: flex;
            flex-direction: column;
            padding: 0.75rem 0 0.75rem 0;
            justify-content: space-between;
            height: 3.3125rem;
            width: 2.5rem;
        }
        h4 {
            margin: 0 0 0 1rem;
        }
        p {
            margin: 0.5rem 0 1rem;
        }
        .comments-icon {
            margin-right: 0.75rem;
        }
        .upvote-size {
            font-size: 0.8125rem!important;
        }
        .title-size {
            font-size: 1.125rem;
        }
        .description {
            font-size: 1rem;
        }
        .comment-count {
            font-size: 1rem;
        }
        .roadmap-icon {
            margin-right: 0.5rem!important;
        }
        .roadmap-description {
            margin-bottom: 1.75rem;
        }
    }
</style>
