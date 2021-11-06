<template>
    <div class="sortby-feedback-container">
        <div class="suggestion-sort-container">
            <div class="suggestion-icon"></div>
            <h3 class="tablet">{{`${roadmapList.suggestion.length} Suggestions`}}</h3>
            <div @click="toggleSortByDropdown()"
                class="sortby-select-container">
                <h1>Sort by : <span>{{sortBySelected}}</span></h1>
                <div :class="[sortByDropdown && 'sortby-arrow-icon-active'
                    , 'sortby-arrow-icon']"></div>
                <div class="sortby-dropdown">
                    <DropdownSelect @loaded="setSortBy" on="true" v-if="sortByDropdown" :list="sortByList" />
                </div>
            </div>
        </div>
        <div @click="toggleAddFeedback()"
            class="button-format add-feedback-button">
                <h2 class="button-text">+ Add Feedback</h2>
        </div>
    </div>
</template>

<script>
    import DropdownSelect from './DropdownSelect';

    export default {
        name: 'MenuSortByAddFeedback',
        components: {
            DropdownSelect
        },
        data() {
            return {
                sortByList: [
                    {
                        text: 'Most Upvotes',
                        selected: false
                    },
                    {
                        text: 'Least Upvotes',
                        selected: false
                    },
                    {
                        text: 'Most Comments',
                        selected: false
                    },
                    {
                        text: 'Least Comments',
                        selected: false
                    }
                ]
            }
        },
        computed: {
            sortByDropdown() {
                return (this.$store.state.toggleSortByDropdown)
            },
            sortBySelected() {
                return (this.$store.state.sortBy)
            },
            roadmapList() {
                return this.$store.state.roadmap;
            }
        },
        methods: {
            toggleAddFeedback() {
                this.$router.push('/feedback/new');
            },
            toggleSortByDropdown() {
                this.$store.commit('toggleSortByDropdown', !this.sortByDropdown);
                this.$store.commit('setList');
            },
            isSelected() {
                for (let i = 0; i < this.sortByList.length; i++) {
                    if (this.sortByList[i].text === this.$store.state.sortBy) {
                        this.sortByList[i].selected = true;
                    } else {
                        this.sortByList[i].selected = false;
                    }
                }
            },
            setSortBy(item) {
                this.$store.commit('setSortBy', item);
                this.isSelected();
            },
        },
        created() {
            this.isSelected();
        }
    }
</script>

<style scoped>
    .sortby-feedback-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        height: 3.5rem;
        width: 100%;
        padding: 0 1.5rem 0;
        background: var(--c);
        z-index: 0;
        margin-top: 4.5rem;
        z-index: 1;
    }
    .sortby-select-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        height: 100%;
    }
    .sortby-select-container:hover h1 {
        opacity: 0.75;
    }
    .sortby-arrow-icon {
        background-image: url('../assets/shared/icon-arrow-down-white.svg');
        width: 0.625rem;
        height: 0.4375rem;
        margin-left: 0.4375rem;
        transition: 0.5s;
    }
    .sortby-arrow-icon-active {
        transform: rotateX(-180deg);
    }
    h1 {
        font-size: 0.8125rem;
        color: var(--p);
        font-weight: 400;
        transition: 0.25s;
    }
    h1 span {
        font-weight: 700;
    }
    h3 {
        color: var(--d);
        font-weight: 700;
        font-size: 1.125rem;
        letter-spacing: -0.0156rem;
        margin: 0 2.375rem 0 1rem;
    }
    .sortby-dropdown {
        width: 72%;
        position: absolute;
        top: 0rem;
    }
    .suggestion-icon {
        display: none;
    }
    .suggestion-sort-container {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .tablet {
        display: none;
    }
    @media(min-width: 768px) {
        .sortby-feedback-container {
            border-radius: 0.625rem;
            height: 4.5rem;
            margin-top: 2.5rem;
            padding: 0 0.75rem 0 1.5rem;
        }
        h1 {
            font-size: 0.875rem;
        }
        .suggestion-icon {
            display: block;
            background-image: url('../assets/suggestions/icon-suggestions.svg');
            width: 1.4375rem;
            height: 1.5rem;
        }
        .tablet {
            display: block;
        }
        .sortby-dropdown {
            width: 50%;
            position: absolute;
            top: 1rem;
        }

    }
</style>
