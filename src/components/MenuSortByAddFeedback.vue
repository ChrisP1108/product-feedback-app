<template>
    <div class="sortby-feedback-container">
        <div @click="toggleSortByDropdown()"
            class="sortby-select-container">
            <h1>Sort by : <span>{{sortBySelected}}</span></h1>
            <div :class="[sortByDropdown && 'sortby-arrow-icon-active'
                , 'sortby-arrow-icon']"></div>
            <DropdownSelect @clicked="setSortBy" v-if="sortByDropdown" :list="sortByList" />
        </div>
        <div @click="toggleAddFeedback()"
            class="add-feedback-button">
                <h2>+ Add Feedback</h2>
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
    .add-feedback-button {
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
    .add-feedback-button:hover {
        background: var(--q);
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
    h2 {
        font-size: 0.8125rem;
        color: var(--p);
        font-weight: 700;
    }
</style>
