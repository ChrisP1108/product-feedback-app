<template>
    <div class="menu-section-container container-padding">
        <div class="roadmap-header">
            <h1>Roadmap</h1>
            <h2 @click="toggleRoadmap">View</h2>
        </div>
        <div class="roadmap-list">
            <div class="roadmap-item-row">
                <div class="roadmap-row-section">
                    <div class="dot dot-planned"></div>
                    <p>Planned</p>
                </div>
                <div class="roadmap-row-section">
                    <h3>{{ roadmap.planned.length }}</h3>
                </div>
            </div>
            <div class="roadmap-item-row">
                <div class="roadmap-row-section">
                    <div class="dot dot-inprogress"></div>
                    <p>In-Progress</p>
                </div>
                <div class="roadmap-row-section">
                    <h3>{{ roadmap.inProgress.length }}</h3>
                </div>
            </div>
            <div class="roadmap-item-row">
                <div class="roadmap-row-section">
                    <div class="dot dot-live"></div>
                    <p>Live</p>
                </div>
                <div class="roadmap-row-section">
                    <h3>{{ roadmap.live.length }}</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MenuRoadmap',
    methods: {
        toggleRoadmap() {
            this.$store.commit('toggleMobileMenu', false);
            this.$router.push('/roadmap');
        }
    },
    computed: {
        roadmap() {
            return (this.$store.state.roadmap);
        }
    }
}
</script>

<style scoped>
    h1 {
        font-size: 1.125rem;
        color: var(--g);
        font-weight: 700;
        letter-spacing: -0.0156rem;
    }
    h2 {
        font-size: 0.8125rem;
        font-weight: 700;
        color: var(--b);
        text-decoration: underline;
        cursor: pointer;
        transition: 0.25s;
        position: absolute;
        padding: 1rem!important;
        left: 100%;
        transform: translateX(-75%);
    }
    h2:hover {
        color: var(--t);
    }
    h3 {
        margin: 0;
        font-size: 1rem;
        font-weight: 700;
        color: var(--h);
    }
    p {
        margin: 0 0 0 1rem;
        font-size: 1rem;
        color: var(--h);
    }
    .roadmap-header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
    }
    .roadmap-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 4.875rem;
    }
    .roadmap-item-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    .roadmap-row-section {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .dot {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
    }
    .dot-planned {
        background-color: var(--i);
    }
    .dot-inprogress {
        background-color: var(--a);
    }
    .dot-live {
        background-color: var(--j);
    }
    .container-padding {
        padding: 1.5rem 1.5rem 1.875rem;
    }

    @media(min-width: 768px) {
        .menu-section-container {
            background: var(--d);
            border-radius: 0.625rem;
            margin-left: 0.625rem;
            width: 33%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .margin-md-top {
            margin-top: 0.875rem;
        }
    }
</style>
