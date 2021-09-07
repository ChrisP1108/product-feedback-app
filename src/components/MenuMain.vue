<template>
    <div className="menuMain">
        <h1>Hello</h1>
    </div>
</template>

<script>
export default {
    name: 'MenuMain'
}
</script>

<style scoped>
    .menuMain {
        z-index: 2;
        position: absolute;
        background-color: var(--f);
        left: 28%;
        width: 100%;
    }
    h1 {
        color: red;
    }
</style>
