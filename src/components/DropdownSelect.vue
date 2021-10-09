<template>
    <div class="dropdown-container">
        <div :key="item.index" v-for="item in list">
            <div @click="$emit('clicked', item.text)"
                :class="[lastItem(item) && 
                'borderbottom', 'dropdown-item']">
                    <h1>{{ item.text }}</h1>
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
            list: Array
        },
        methods: {
            lastItem(item) {
                if (this.list.indexOf(item) + 1 !== this.list.length) {
                    return true
                } else return false   
            }
        }
    }
</script>

<style scoped>
    .dropdown-container {
        width: 50%;
        background: var(--d);
        position: absolute;
        top: 4.5rem;
        height: 10rem;
        border-radius: 0.625rem;
        box-shadow: 5px 10px 20px lightgray;
        animation-name: modal-on;
        animation-duration: .5s;
        animation-fill-mode: forwards;
        cursor: pointer;
    }
    @keyframes modal-on {
        from {transform: rotateX(-90deg); top: -1rem}
        to {transform: rotateX(0deg); top: 4.5rem;}
    }
    .dropdown-item {
        padding: 0 1.5rem 0;
        height: 2.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
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
</style>