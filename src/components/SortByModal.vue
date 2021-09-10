<template>
    <div class="sortby-modal-container">
        <div @click="setSortBy('Most Upvotes')"
            class="sortby-modal-item borderbottom">
                <h1>Most Upvotes</h1>
            <div :class="[sortEval('Most Upvotes') 
                ? 'icon-on' : 'icon-off']"></div>
        </div>
        <div @click="setSortBy('Least Upvotes')"
            class="sortby-modal-item borderbottom">
                <h1>Least Upvotes</h1>
            <div :class="[sortEval('Least Upvotes') 
                ? 'icon-on' : 'icon-off']"></div>
        </div>
        <div @click="setSortBy('Most Comments')"
            class="sortby-modal-item borderbottom">
                <h1>Most Comments</h1>
            <div :class="[sortEval('Most Comments') 
                ? 'icon-on' : 'icon-off']"></div>
        </div>
        <div @click="setSortBy('Least Comments')"
            class="sortby-modal-item">
                <h1>Least Comments</h1>
            <div :class="[sortEval('Least Comments') 
                ? 'icon-on' : 'icon-off']"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SortByModal',
        methods: {
            sortEval(value) {
                return this.$store.state.sortBy === value 
                    ? true : false;
            },
            setSortBy(value) {
                this.$store.commit('setSortBy', value);
                console.log(this.$store.state.sortBy)
            }
        }
    }
</script>

<style scoped>
    .sortby-modal-container {
        width: 50%;
        background: var(--d);
        position: absolute;
        top: 4.5rem;
        height: 10rem;
        border-radius: 0.625rem;
        animation-name: modal-on;
        animation-duration: .5s;
        animation-fill-mode: forwards;
    }
    @keyframes modal-on {
        from {transform: rotateX(-90deg); top: -1rem}
        to {transform: rotateX(0deg); top: 4.5rem;}
    }
    .sortby-modal-item {
        padding: 0 1.5rem 0;
        height: 2.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .borderbottom {
        border-bottom: 1px var(--r) solid;
    }
    h1 {
        font-size: 0.8125rem;
        color: var(--h);
        font-weight: 400;
        transition: 0.25s;
    }
    .sortby-modal-item:hover h1{
        color: var(--a);
    }
    h1:hover {
        color: var(--a);
    }
    .icon-off {
        width: 0.8125rem;
        height: 0.6875rem;
        background-image: transparent;
    }
    .icon-on {
        width: 0.8125rem;
        height: 0.6875rem;
        background-image: url('../assets/shared/icon-check.svg');
    }
</style>
