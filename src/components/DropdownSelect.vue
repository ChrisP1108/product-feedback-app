<template>
    <div :class="[isOn ? 'fade-in' : 'fade-out', 'dropdown-container']">
        <div :key="item.index" v-for="item in list">
            <div @click="$emit('loaded', item.text)"
                :class="[lastItem(item) && 
                'borderbottom', 'dropdown-item']">
                    <h1>{{ capitalizer(item.text) }}</h1>
                <div :class="[item.selected 
                    ? 'icon-on' : 'icon-off']">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DropdownSelect',
        props: {
            list: Array,
            on: String
        },
        methods: {
            lastItem(item) {
                if (this.list.indexOf(item) + 1 !== this.list.length) {
                    return true
                } else return false   
            },
            capitalizer(item) {
                if (item === 'ux' || item === 'ui') {
                    return item.toUpperCase();
                } else {
                    return item.charAt(0).toUpperCase() + item.slice(1);
                }
            }
        },
        computed: {
            isOn() {
                return this.on === 'true' ? true : false;
            }
        }
    }
</script>

<style scoped>
    .dropdown-container {
        width: inherit;
        background: var(--d);
        position: absolute;
        top: 4.5rem;
        border-radius: 0.625rem;
        transform: rotateX(-90deg);
        top: -1rem;
        box-shadow: 0px 1px 10px lightgray;
        cursor: pointer;
        z-index: 10;
    }
    .fade-in {
        animation-name: modal-on;
        animation-duration: .5s;
        animation-fill-mode: forwards;
    }
    @keyframes modal-on {
        0% {display: block}
        1% {transform: rotateX(-90deg); top: -1rem}
        100% {transform: rotateX(0deg); top: 4.5rem}
    }
    .fade-out {
        animation-name: modal-off;
        animation-duration: .25s;
        animation-fill-mode: forwards;
    }
    @keyframes modal-off {
        0% {transform: rotateX(0deg); top: 4.5rem}
        99% {transform: rotateX(-90deg); top: -1rem}
        100% {display: none}
    }
    .dropdown-item {
        padding: 0 1.5rem 0;
        height: 2.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 10;
    }
    .dropdown-item:hover {
        background: inherit;
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
    .dropdown-item:hover h1{
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
    @media(min-width: 768px) {
        h1 {
            font-size: 1rem;
        }
        .dropdown-item {
            height: 3rem;
        }
    }
</style>