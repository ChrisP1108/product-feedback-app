<template>
  <div class="feedback-detail-container">
    <h1>Test</h1>
    <div class="suggestion-item-container">
      <SuggestionItem :item="this.$store.state.feedbackSelect"/>
    </div>
  </div>
</template>

<script>
import SuggestionItem from '../components/SuggestionItem.vue'
  export default {
    name: 'FeedbackDetails',
    components: {
      SuggestionItem
    }
  }
</script>

<style scoped>
  .feedback-detail-container {
    z-index: 1;
    background: var(--f);
    height: 100%;
    min-height: 41.6875rem!important;
  }
  .suggestion-item-container {
    padding: 1.6875rem 1.75rem 1.5rem 1.5rem;
    margin: 1.5rem;
    background: var(--d);
    border-radius: 0.625rem;
    margin-bottom: 1rem;
    cursor: pointer;
  }
  .background {
    width: 100%;
    height: 100%;
    position: relative;
    transition: 0.25s;
    z-index: 1;
    background-color: var(--f);
  }
</style>