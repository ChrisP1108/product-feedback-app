<template>
    <div :class="[this.$store.state.toggleMobileMenu ? 
            'menu-on' : 'menu-off', 'menuMain']">
        <MenuCategorySort />
        <MenuRoadmap />
    </div>
</template>

<script>
import MenuCategorySort from './MenuCategorySort'
import MenuRoadmap from './MenuRoadmap'

export default {
    name: 'MenuMain',
    components: {
        MenuCategorySort,
        MenuRoadmap
    }
}
</script>

<style scoped>
    .menuMain {
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 4.5rem;
        background-color: var(--f);
        left: 15%;
        width: 85%;
        height: 37.1875rem;
        transition: .25s!important;
    }
    .menu-off {
        transform: translateX(100%);
    }
    .menu-on {
        transform: translateX(0%);
    }
    .menu-section-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 11.125rem;
        margin-top: 1.5rem!important;
        width: 82.28%;
        background: var(--d); 
        border-radius: 0.625rem;
        position: relative;
    }
    .menu-sort-row {
        display: flex;
        justify-content: space-between;
    }

@media(min-width: 375px) {
    .menuMain {
        left: 28%;
        width: 72%;
    }
}
</style>
