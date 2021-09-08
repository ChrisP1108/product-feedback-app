<template>
    <div :class="[this.$store.state.toggleMobileMenu ? 
            '' : 'menu-on', 'menuMain']">
        <MenuCategorySort />
        <div class="menu-section-container"></div>
    </div>
</template>

<script>
import MenuCategorySort from './MenuCategorySort'

export default {
    name: 'MenuMain',
    components: {
        MenuCategorySort
    },
    methods: {

    }
}
</script>

<style scoped>
    .menuMain {
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        background-color: var(--f);
        left: 28%;
        width: 72%;
        height: 37.1875rem;
        transition: .25s;
    }
    .menu-on {
        transform: translateX(100%);
        transition: 0.25s;
    }
    .menu-section-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 11.125rem;
        margin-top: 1.5rem!important;
        width: 82.28%;
        padding: 1.5rem 1.5rem 2.25rem;
        /* background: var(--d); */
        background: gray;
        border-radius: 0.625rem;
        position: relative;
    }
</style>
