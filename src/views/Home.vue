<template>
  <div class="home">
    <Header />
    <div :class="[this.$store.state.toggleMobileMenu 
      ? 'trans-background' : 'reg-background'
      , 'background']"> 
    </div>
    <MenuSortByAddFeedback />
    <div class="suggestion-list-container">
      <SuggestionItem />
    </div>
    <MenuMain />
  </div>
</template>

<script>
import Header from '../components/Header';
import MenuMain from '../components/MenuMain';
import MenuSortByAddFeedback from '../components/MenuSortByAddFeedback';
import SuggestionItem from '../components/SuggestionItem';

export default {
  name: 'Home',
  components: {
    Header,
    MenuMain,
    MenuSortByAddFeedback,
    SuggestionItem
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
  .suggestion-list-container {
    z-index: 1;
    margin: 2rem 1.5rem 2.4375rem;
  }
  .background {
    width: 100%;
    height: 100%;
    position: relative;
    transition: 0.25s;
    z-index: 1;
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
