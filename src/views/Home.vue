<template>
  <div class="home">
    <Header />
    <div :class="[this.$store.state.toggleMobileMenu 
      ? 'trans-background' : 'reg-background'
      , 'background']"> 
    </div>
    <div class="home-body-container">
        <h1>Info Testing 1 2 3</h1>
    </div>
    <MenuMain />
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
    height: 40rem;
    overflow: hidden;
  }
  .home-body-container {
    z-index: 1;
  }
  .background {
    width: 100%;
    height: 100%;
    position: relative;
    transition: 0.25s;
    z-index: 0;
    background-color: var(--f);
  }
  .reg-background {
    background-color: var(--f);
    position: absolute; 
    z-index: -1;
  }
  .trans-background {
    background-color: var(--halfTrans);
    position: absolute; 
  }
  h1 {
    background: red;
  }
</style>
