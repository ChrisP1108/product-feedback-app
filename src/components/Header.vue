<template>
    <div id="header">
        <div class="header-container">
            <div @click="reload()" class="headings pointer">
                <h1>Frontend Mentor</h1>
                <h2>Feedback Board</h2>
            </div>
            <div v-if="!error" @click="mobileMenuToggle()"
                :class="[this.$store.state.toggleMobileMenu ? 
                'mobile-menu-active' : 'mobile-menu-inactive', 'pointer mobile-trans']">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    methods: {
        mobileMenuToggle() {
            this.$store.commit('toggleMobileMenu');
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'instant'
            });  
            this.$store.commit('toggleSortByDropdown', false);
        },
        reload() {
            window.location.reload();
        }
    },
    computed: {
        error() {
            return this.$store.state.data[0] === 'error' ? true : false
        }
    }
}
</script>

<style scoped>
    #header {
        background-image: linear-gradient(12deg, var(--m), var(--l), var(--k));
        position: fixed;
        width: 100%;
        z-index: 10;
    }
    .header-container {
        color: var(--d);
        height: 4.5rem;
        background-image: linear-gradient(to right, var(--n) 5%, transparent, var(--o) 99%);
        padding: 0rem 1.5rem 0rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
    }
    .headings {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 2.375rem;
    }
    h1 {
        font-size: 0.9375rem;
        font-weight: 700;
    }
    h2 {
        font-size: 0.8125rem;
        font-weight: 500;
        opacity: .8;
    }
    .mobile-trans {
        height: 100%;
        transition: 0.25s!important;
    }
    .mobile-menu-inactive {
        background-image: url('../assets/shared/mobile/icon-hamburger.svg');
        width: 1.25rem;
        height: 1.0625rem;
    }
    .mobile-menu-active {
        background-image: url('../assets/shared/mobile/icon-close.svg');
        width: 1.125rem;
        height: 1.0625rem;
    }
</style>
