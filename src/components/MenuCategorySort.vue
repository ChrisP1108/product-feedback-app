<template>
    <div class="menu-section-container container-padding">
        <div class="menu-sort-row w-100">
            <div @click="setSortCategory('all')" 
                :class="[sortEval('all') ? 'active' : 'inactive', 
                'button w-25']">
                <h1>All</h1>
            </div>
            <div @click="setSortCategory('ui')" 
                :class="[sortEval('ui') ? 'active' : 'inactive', 
                'button w-25']">
                <h1>UI</h1>
            </div>    
            <div @click="setSortCategory('ux')" 
                :class="[sortEval('ux') ? 'active' : 'inactive', 
                'button w-25']">
                <h1>UX</h1>
            </div> 
            <div class="w-25"></div>
        </div>
        <div class="menu-sort-row margin-md-top">
            <div @click="setSortCategory('enhancement')" 
                :class="[sortEval('enhancement') ? 'active' : 'inactive', 
                'button w-100']">
                <h1>Enhancement</h1>
            </div>
            <div @click="setSortCategory('bug')" 
                :class="[sortEval('bug') ? 'active' : 'inactive', 
                'button w-50']">
                <h1>Bug</h1>
            </div>    
        </div>
        <div class="menu-sort-row margin-md-top">
            <div @click="setSortCategory('feature')" 
                :class="[sortEval('feature') ? 'active' : 'inactive', 
                'button w-50']">
                <h1>Feature</h1>
            </div> 
        </div>
    </div>
</template>

<script>

export default {
    name: 'MenuCategorySort',
    methods: {
        sortEval(value) {
            return this.$store.state.sortCategory === value ? true : false;
        },
        setSortCategory(value) {
            this.$store.commit('setSortCategory', value);
            this.$store.commit('setList');
            if (this.$store.state.response === 'mobile') {
                this.$store.commit('toggleMobileMenu', !this.$store.state.toggleMobileMenu);
            }   
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
    .button:hover {
        background: var(--s);
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
    .active:hover {
        background: var(--b)!important;
    }
    .menu-sort-row {
        display: flex;
        justify-content: space-between;
    }
    .container-padding {
        padding: 1.5rem 1.5rem 2.25rem;
    }

    @media(min-width: 768px) {
        .menu-section-container {
            background: var(--d);
            border-radius: 0.625rem;
            margin-left: 0.625rem;
            width: 33%;
        }
        .margin-md-top {
            margin-top: 0.875rem;
        }
    }

    @media(min-width: 1200px) {
        .menu-section-container {
            width: 100%;
            margin: 0;
            height: 10.375rem;
            margin-bottom: 1.5rem;
        }
    }
</style>