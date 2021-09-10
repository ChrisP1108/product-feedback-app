<template>
    <div class="sortby-feedback-container">
        <div @click="toggleSortByModal()"
            class="sortby-select-container">
            <h1>Sort by : <span>{{this.$store.state.sortBy}}</span></h1>
            <div :class="[sortByModal && 'sortby-arrow-icon-active'
                , 'sortby-arrow-icon']"></div>
            <SortByModal v-if="sortByModal" />
        </div>
        <div @click="toggleAddFeedback()"
            class="add-feedback-button">
                <h2>+ Add Feedback</h2>
            </div>
    </div>
</template>

<script>
    import SortByModal from './SortByModal';

    export default {
        name: 'MenuSortByAddFeedback',
        components: {
            SortByModal
        },
        computed: {
            sortByModal() {
                return (this.$store.state.toggleSortByModal)
            }
        },
        methods: {
            toggleAddFeedback() {
                console.log('Add Feedback Toggled');
            },
            toggleSortByModal() {
                this.$store.commit('toggleSortByModal');
            }
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
    }
    .sortby-select-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        height: 100%;
    }
    .sortby-arrow-icon {
        background-image: url('../assets/shared/icon-arrow-down.svg');
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
    h1:hover {
        opacity: 0.75;
    }
    h2 {
        font-size: 0.8125rem;
        color: var(--p);
        font-weight: 700;
    }
</style>
