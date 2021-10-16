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
        <div :key="item.id" v-for="item in this.$store.state.list" 
        class="relative">
          <div class="suggestion-item-container">
            <SuggestionItem :item="item" isRoadmap='false' />
            <div @click="selectFeedback(item)" 
              class="suggestion-click-area-1">
            </div>
            <div @click="selectFeedback(item)" 
              class="suggestion-click-area-2">
            </div>
          </div>
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
    data() {
      return {
        voteClick: false
      }
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
    z-index: 0;
    margin: 2rem 1.5rem 2.4375rem;
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
    z-index: 2;
  }
  h1 {
    background: red;
  }
  .suggestion-click-area-1 {
    position: absolute;
    height: 70%;
    top: 0rem;
    left: 0rem;
    width: 100%;
    z-index: 0;
    cursor: pointer;
  }
  .suggestion-click-area-2 {
    position: absolute;
    height: 67%;
    top: 4rem;
    left: 5.75rem;
    width: 87%;
    z-index: 0;
    cursor: pointer;
  }
  .relative {
    position: relative;
  }
</style>
