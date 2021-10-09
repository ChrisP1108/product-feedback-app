<template>
  <div class="home">
    <Header />
    <div :class="[this.$store.state.toggleMobileMenu 
      ? 'trans-background' : 'reg-background'
      , 'background']"> 
    </div>
    <MenuSortByAddFeedback />
    <div class="suggestion-list-container">
      <div v-if="!data" class="page-loading-container">
        <PageLoader />
      </div>
      <div v-if="data">
        <div @click="selectFeedback(item)"
          :key="item.id" v-for="item in this.$store.state.list" 
          class="suggestion-item-container">
            <SuggestionItem :item="item" />
        </div>
      </div>
    </div>
    <MenuMain />
  </div>
</template>

<script>
  import Header from '../components/Header';
  import MenuMain from '../components/MenuMain';
  import MenuSortByAddFeedback from '../components/MenuSortByAddFeedback';
  import SuggestionItem from '../components/SuggestionItem';
  import PageLoader from '../components/PageLoader';

  export default {
    name: 'Home',
    components: {
      Header,
      MenuMain,
      MenuSortByAddFeedback,
      SuggestionItem,
      PageLoader
    },
    computed: {
      data() {
        return this.$store.state.data[0] === 'loading' ? false : true
      }
    },
    methods: {
      selectFeedback(feedback) {
        this.$store.commit('setFeedbackSelect', feedback);
        this.$store.commit('toggleSortByDropdown', false);
        this.$router.push(`/feedback/details/${this.$store.state.feedbackSelect.id}`);
      }
    }
  }
</script>

<style scoped>
  .home {
    margin: 0;
    position: relative;
    height: 100%;
    overflow-y: hidden;
    overflow-x: hidden;
    min-height: 41.6875rem;
  }
  .suggestion-list-container {
    z-index: 1;
    margin: 2rem 1.5rem 2.4375rem;
  }
  .suggestion-item-container {
    padding: 1.6875rem 1.75rem 1.5rem 1.5rem;
    background: var(--d);
    border-radius: 0.625rem;
    margin-bottom: 1rem;
    cursor: pointer;
  }
  .page-loading-container {
    width: 100%;
    height: 30rem;
    display: flex;
    justify-content: center;
    align-items: center;
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
