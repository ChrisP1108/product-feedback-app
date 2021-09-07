<template>
  <div class="home">
    <Header />
    <div v-if="this.$store.state.toggleMobileMenu" class="menuMain"> 
      <div class="trans-background"></div>
      <MenuMain />
    </div>
  </div>
</template>

<script>
import Header from '../components/Header';
import MenuMain from '../components/MenuMain';

export default {
  name: 'Home',
  components: {
    Header,
    MenuMain
  }
}
</script>

<style scoped>
  .home {
    margin: 0;
    position: relative;
  }
  .trans-background {
    background-color: var(--halfTrans);
    width: 100%;
    height: 100%;
    position: absolute;
    transition: 0.25s;
    z-index: 1;
  }
  .menuMain {
    height: 37.1875rem;
    transition: 0.5s;
  }
</style>
