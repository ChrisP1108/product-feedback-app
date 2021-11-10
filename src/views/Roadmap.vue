<template>
    <div class="roadmap-main-container">
        <div class="roadmap-header-container">
            <div class="back-roadmap-container">
                <div @click="goBackHome()" class="back-arrow-container">
                    <div class="back-arrow-icon"></div>
                    <p>Go Back</p>
                </div>
                <h1>Roadmap</h1>
            </div>
            <div @click="toggleAddFeedback()"
                class=" button-text button-format add-feedback-button">
                    <h2>+ Add Feedback</h2>
            </div>
        </div>
        <div class="roadmap-headings-container mobile">
            <div v-if="roadmapList.planned.length > 0" :class="[headingSelect[0].selected && 
                'heading-active heading-planned', 'heading']" @click="toggleHeading('planned')">
                <h3>{{ `Planned (${roadmapList.planned.length})` }}</h3>
            </div>
            <div v-if="roadmapList.inProgress.length > 0" :class="[headingSelect[1].selected && 
                'heading-active heading-in-progress', 'heading']" @click="toggleHeading('inProgress')">
                <h3>{{ `In-Progress (${roadmapList.inProgress.length})` }}</h3>
            </div>
            <div v-if="roadmapList.live.length > 0" :class="[headingSelect[2].selected && 
                'heading-active heading-live', 'heading']" @click="toggleHeading('live')">
                <h3>{{ `Live (${roadmapList.live.length})` }}</h3>
            </div>
        </div>
        <div class="roadmap-body-container">
            <div class="mobile">
                <h4>{{ titleGenerator() }}</h4>
                <h5>{{ description }}</h5>
            </div>
            <div class="roadmap-list-container">
                <div :key="item.id" v-for="item in outputList" class="mobile">
                    <div :class="[`roadmap-top-border roadmap-${selected}-border`, 'trans-fade']"></div>
                    <div class="roadmap-item-container trans-fade">
                        <SuggestionItem :item="item" isRoadmap='true' />
                        <div @click="selectFeedback(item)" 
                            class="suggestion-click-area-1">
                        </div>
                        <div @click="selectFeedback(item)" 
                            class="suggestion-click-area-2">
                        </div>
                    </div>
                </div>
                <div v-if="roadmapList.planned.length > 0" class="tablet-list-column">
                    <h4>{{ `Planned (${roadmapList.planned.length})` }}</h4>
                    <h5>{{ headingSelect[0].description }}</h5>
                    <div :key="item.id" v-for="item in roadmapList.planned" 
                            class="tablet position-relative">
                        <div :class="[`roadmap-top-border roadmap-planned-border`, 'trans-fade']"></div>
                        <div class="roadmap-item-container trans-fade">
                            <SuggestionItem :item="item" isRoadmap='true' />
                            <div @click="selectFeedback(item)" 
                                class="roadmap-click-area-1">
                            </div>
                            <div @click="selectFeedback(item)" 
                                class="roadmap-click-area-2">
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="roadmapList.inProgress.length > 0" class="tablet-list-column roadmap-tablet-gap">
                    <h4>{{ `In-Progress (${roadmapList.inProgress.length})` }}</h4>
                    <h5>{{ headingSelect[1].description }}</h5>
                    <div :key="item.id" v-for="item in roadmapList.inProgress" class="tablet position-relative">
                        <div :class="[`roadmap-top-border roadmap-inProgress-border`, 'trans-fade']"></div>
                        <div class="roadmap-item-container trans-fade">
                            <SuggestionItem :item="item" isRoadmap='true' />
                            <div @click="selectFeedback(item)" 
                                class="roadmap-click-area-1">
                            </div>
                            <div @click="selectFeedback(item)" 
                                class="roadmap-click-area-2">
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="roadmapList.live.length > 0" class="tablet-list-column roadmap-tablet-gap">
                    <h4>{{ `Live (${roadmapList.live.length})` }}</h4>
                    <h5>{{ headingSelect[2].description }}</h5>
                    <div :key="item.id" v-for="item in roadmapList.live" class="tablet position-relative">
                        <div :class="[`roadmap-top-border roadmap-live-border`, 'trans-fade']"></div>
                        <div class="roadmap-item-container trans-fade">
                            <SuggestionItem :item="item" isRoadmap='true' />
                            <div @click="selectFeedback(item)" 
                                class="roadmap-click-area-1">
                            </div>
                            <div @click="selectFeedback(item)" 
                                class="roadmap-click-area-2">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SuggestionItem from '../components/SuggestionItem';
    export default {
        name: 'Roadmap',
        components: {
            SuggestionItem
        },
        data() {
            return {
                outputList: [],
                selected: 'planned',
                description: 'Ideas prioritized for research',
                headingSelect: [
                    {
                        type: 'planned',
                        selected: true,
                        description: 'Ideas prioritized for research'
                    },
                    {
                        type: 'inProgress',
                        selected: false,
                        description: 'Currently being developed'
                    },
                    {
                        type: 'live',
                        selected: false,
                        description: 'Released features'
                    },
                ]
            }
        },
        computed: {
            roadmapList() {
                return this.$store.state.roadmap;
            }
        },
        methods: {
            toggleAddFeedback() {
                this.$router.push('/feedback/new');
            },
            goBackHome() {
                this.$router.push('/');
            },
            toggleHeading(type)  {
                for (let i = 0; i < this.headingSelect.length; i++) {
                    if (this.headingSelect[i].type === type) {
                        this.headingSelect[i].selected = true;
                        this.description = this.headingSelect[i].description;
                    } else {
                        this.headingSelect[i].selected = false;
                    }
                }
            },
            titleGenerator() {
                let type;
                this.headingSelect.forEach(heading => { 
                    if (heading.selected) {
                        type = heading.type;
                    } 
                });
                this.selected = type;
                let quantity = 0;
                if (type === 'planned') {
                    type = 'Planned';
                    quantity = this.roadmapList.planned.length;
                    this.outputList = this.roadmapList.planned;
                }
                if (type === 'inProgress') {
                    type = 'In-Progress';
                    quantity = this.roadmapList.inProgress.length;
                    this.outputList = this.roadmapList.inProgress;
                }
                if (type === 'live') {
                    type = 'Live';
                    quantity = this.roadmapList.live.length;
                    this.outputList = this.roadmapList.live;
                }
                return `${type} (${quantity})`
            },
            selectFeedback(feedback) {
                this.$store.commit('setFeedbackSelect', feedback);
                this.$store.commit('toggleSortByDropdown', false);
                this.$router.push(`/feedback/details/${this.$store.state.feedbackSelect.id}`);
            }
        }
    }
</script>

<style scoped>
    .roadmap-header-container {
        background: var(--c);
        padding: 1.5rem;
        height: 6.25rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .back-roadmap-container {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .roadmap-headings-container {
        padding: 0 0rem 0;
        background: var(--f);
        display: flex;
        justify-content: space-between;
        border-bottom: 0.0625rem var(--z) solid;
        flex: 1;
    }
    .roadmap-body-container {
        min-height: 100vh;
        background: var(--f);
        padding: 1.75rem 1.5rem 6.125rem;
    }
    .roadmap-list-container {
        margin-top: 1.5rem;
        position: relative;
    }
    .roadmap-item-container {
        padding: 1.6875rem 1.75rem 1.5rem 1.5rem;
        background: var(--d);
        border-radius: 0.625rem;
        margin-bottom: 1rem;
        width: 100%;
    }
    .roadmap-top-border {
        width: 100%;
        height: 0.375rem;
        border-top-right-radius: 0.625rem;
        border-top-left-radius: 0.625rem;
        position: absolute;
        background: red;
        z-index: 10;
    }
    .roadmap-planned-border {
        background: var(--i);
    }
    .roadmap-inProgress-border {
        background: var(--a);
    }
    .roadmap-live-border {
        background: var(--j);
    }
    h1 {
        font-size: 1.125rem;
        color: var(--d);
        font-weight: 700;
        letter-spacing: -0.0112rem;
        margin: 2.5rem 0 1rem 0!important;
        transition: 0.25s;
    }
    h2 {
        font-size: 0.8125rem;
        color: var(--p);
        font-weight: 700;
    }
    h3 {
        font-size: 0.8125rem;
        font-weight: 700;
        letter-spacing: -0.0112rem;
        color: var(--g);
        margin: 0;
    }
    h4 {
        font-size: 1.125rem;
        color: var(--g);
        font-weight: 700;
        letter-spacing: -0.0156rem;
        margin: 0!important;
    }
    h5 {
        font-size: 0.8125rem;
        margin: 0.5rem 0 0 0!important;
        color: var(--h);
        font-weight: 400;
    }
    p {
        font-size: 0.8125rem;
        color: var(--d);
        font-weight: 700;
        letter-spacing: -0.0112rem;
        transition: 0.25s;
        margin: 0 0 0 0.9375rem!important;
    }
    p:hover {
        text-decoration: underline;
    }
    .heading {
        height: 3.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.35;
        width: 33%;
        border-bottom: 0.25rem transparent solid;
        cursor: pointer;
        transition: 0.25s;
    }
    .heading-active {
        opacity: 1;
    }
    .heading-planned {
        border-bottom: 0.25rem var(--i) solid;
    }
    .heading-in-progress {
        border-bottom: 0.25rem var(--a) solid;
    }
    .heading-live {
        border-bottom: 0.25rem var(--j) solid;
    }
    .go-back-feedback-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0rem 1.5rem 0;
        position: relative;
        height: 2.5rem;
    }
    .back-arrow-container {
        display: flex;
        align-items: center;
        height: 3rem;
        cursor: pointer;
        position: absolute;
    }
    .back-arrow-icon {
        background-image: url('../assets/shared/icon-arrow-down-white.svg');
        width: 0.625rem;
        height: 0.4375rem;
        transform: rotate(90deg);
    }
    .tablet {
        display: none;
    }
    .tablet-list-column {
        display: none;
        flex: 1;
    }
    .roadmap-click-area-1 {
        position: absolute;
        height: 70%;
        top: 0rem;
        left: 0rem;
        width: 100%;
        z-index: 0;
        cursor: pointer;
    }
    .roadmap-click-area-2 {
        position: absolute;
        height: 67%;
        top: 4rem;
        left: 5.75rem;
        width: 87%;
        z-index: 0;
        cursor: pointer;
    }
    @media(min-width: 768px) {
        .roadmap-main-container {
            background: var(--f);
            padding: 3.5rem 2.4375rem 5.9375rem;     
        }
        .roadmap-header-container {
            border-radius: 0.625rem;
            height: 7.0625rem;
            padding: 0 2rem 0;
        }
        .roadmap-body-container {
            padding: 0rem 0rem 0rem;
        }
        .roadmap-list-container {
            display: flex;
            margin-top: 2rem;
        }
        .roadmap-item-container {
            padding: 1.875rem 1.25rem 1.5rem;
        }
        .tablet-list-column {
            display: flex;
            flex-direction: column;
        }
        .back-roadmap-container {
            display: flex;
            align-items: flex-start;
            flex-direction: column;
        }
        .mobile {
            display: none;
        }
        h1 {
            font-size: 1.5rem;
            margin: 3!important;
        }
        h2 {
            font-size: 0.875rem;
        }
        h4 {
            font-size: 0.875rem;
        }
        h5 {
            margin-bottom: 1.5rem!important;
            font-size: 0.875rem;
        }
        p {
            font-size: 0.875rem;
            margin: 0 0 0 0.8125rem!important;
        }
        .tablet {
            display: flex;
        }
        .roadmap-tablet-gap {
            margin-left: 0.625rem;
        }
        @media(min-width: 1200px) {
            .roadmap-main-container {
                padding: 4.875rem 11.459% 11.1875rem;
            }
            .roadmap-item-container {
                padding: 2.125rem 2rem 2rem;
                margin-bottom: 1.5rem;
            }
            .roadmap-tablet-gap {
                margin-left: 0.625rem;
            }
            .roadmap-tablet-gap {
                margin-left: 1.875rem;
            }
            h4 {
                font-size: 1.125rem;
            }
            h5 {
                font-size: 1rem;
                margin-bottom: 2rem!important;
            }
            .roadmap-list-container {
                justify-content: space-between;
            }
        }
    }
</style>