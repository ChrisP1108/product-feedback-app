<template>
    <div class="menu-section-container container-padding">
        <div class="menu-sort-row w-100">
            <div @click="setSortCategory('All')" 
                :class="[sortEval('All') ? 'active' : 'inactive', 
                'button w-25']">
                <h1>All</h1>
            </div>
            <div @click="setSortCategory('UI')" 
                :class="[sortEval('UI') ? 'active' : 'inactive', 
                'button w-25']">
                <h1>UI</h1>
            </div>    
            <div @click="setSortCategory('UX')" 
                :class="[sortEval('UX') ? 'active' : 'inactive', 
                'button w-25']">
                <h1>UX</h1>
            </div> 
            <div class="w-25"></div>
        </div>
        <div class="menu-sort-row">
            <div @click="setSortCategory('Enhancement')" 
                :class="[sortEval('Enhancement') ? 'active' : 'inactive', 
                'button w-100']">
                <h1>Enhancement</h1>
            </div>
            <div @click="setSortCategory('Bug')" 
                :class="[sortEval('Bug') ? 'active' : 'inactive', 
                'button w-50']">
                <h1>Bug</h1>
            </div>    
        </div>
        <div class="menu-sort-row">
            <div @click="setSortCategory('Feature')" 
                :class="[sortEval('Feature') ? 'active' : 'inactive', 
                'button w-50']">
                <h1>Feature</h1>
            </div> 
        </div>
    </div>
</template>

<script>

export default {
    name: 'MenuCategorySort',
    components: {

    },
    methods: {
        sortEval(value) {
            return this.$store.state.sortCategory === value ? true : false;
        },
        setSortCategory(value) {
            this.$store.commit('setSortCategory', value);
        }
    }
}
</script>

<style scoped>
    .button {
        display: flex;
        justify-content: center;
        border-radius: 0.625rem;
        align-items: center;
        padding: 0 1rem 0;
        height: 1.875rem;
        cursor: pointer;
        margin-right: 0.5rem;
        transition: 0.25s;
    }
    .button h1 {
        font-size: 0.8125rem;
        font-weight: 600;
    }
    .inactive {
        background: var(--e);
        color: var(--b);
    }
    .active {
        background: var(--b);
        color: var(--d);
    }
    .menu-sort-row {
        display: flex;
        justify-content: space-between;
    }
    .container-padding {
        padding: 1.5rem 1.5rem 2.25rem;
    }
</style>