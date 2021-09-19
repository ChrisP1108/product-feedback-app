<template>
  <div class="feedback-detail-container">
    <div class="go-back-feedback-container">
      <div @click="goBackHome()" class="back-arrow-container">
        <div class="back-arrow-icon"></div>
        <p>Go Back</p>
      </div>
      <div @click="toggleFeedbackEdit()"
          class="edit-feedback-button">
              <h2>Edit Feedback</h2>
      </div>
    </div>
    <div class="section-container">
      <SuggestionItem :item="selectedFeedback"/>
    </div>
    <div class="section-container">
      <h1>{{commentCounter(selectedFeedback.comments)}} Comments</h1>
      <div :key="comment.id" v-for="comment in selectedFeedback.comments">
        <Comment :comment="comment"/>
        <div v-if="('replies' in comment)" class="position-relative">
          <div class="reply-border"></div>
          <div :key="reply" v-for="reply in comment.replies" class="replies-container">
            <Comment :comment="reply"/>
          </div>
        </div>
        <div :class="[lastComment(comment) && 'comment-bottom-border']"></div>
      </div>
    </div>
    <div class="section-container">
      <AddComment />
    </div>
  </div>
</template>

<script>
import SuggestionItem from '../components/SuggestionItem.vue';
import Comment from '../components/Comment';
import AddComment from '../components/AddComment';

  export default {
    name: 'FeedbackDetails',
    components: {
      SuggestionItem,
      Comment,
      AddComment
    },
    computed: {
      selectedFeedback() {
        return (this.$store.state.feedbackSelect)
      }
    },
    methods: {
      toggleFeedbackEdit() {
        console.log('Hello');
      },
      goBackHome() {
        this.$router.push('/');
      },
      commentCounter(comment) {
          let tally = 0;
          if (!comment) {
              return 0;
          }
          comment.forEach((item) => {
              tally++;
              if ('replies' in item) {
                  item.replies.forEach(() => {
                      tally++;
                  });
              }
          });
          return tally;
      },
      lastComment(comment) {
        const comments = this.selectedFeedback.comments.slice()
        const last = comments.pop();
        if (comment === last) {
          return false
        } else {
          return true
        }
      },
    }
  }
</script>

<style scoped>
  h1 {
    font-size: 1.125rem;
    color: var(--g);
    font-weight: 700;
    letter-spacing: -0.0112rem;
    margin: 0 0 1.875rem!important;
    transition: 0.25s;
  }
  p {
    font-size: 0.8125rem;
    color: var(--h);
    font-weight: 700;
    letter-spacing: -0.0112rem;
    transition: 0.25s;
    margin: 0 0 0 0.9375rem;
  }
  .feedback-detail-container {
    z-index: 1;
    /* background: var(--f); */
    background: lightgray;
    padding-top: 1.5rem;
    height: 100%;
    min-height: 41.6875rem!important;
  }
  .go-back-feedback-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0rem 1.5rem 0;
    position: relative;
    height: 2.5rem;
  }
  .back-arrow-container {
    display: flex;
    align-items: center;
    position: absolute;
    height: 3rem;
    cursor: pointer;
  }
  .back-arrow-icon {
    background-image: url('../assets/shared/icon-arrow-left.svg');
    width: 0.4375rem;
    height: 0.625rem;
  }
  .section-container {
    padding: 1.6875rem 1.75rem 1.5rem 1.5rem;
    margin: 1.5rem;
    background: var(--d);
    border-radius: 0.625rem;
    margin-bottom: 1rem;
  }
  .background {
    width: 100%;
    height: 100%;
    position: relative;
    transition: 0.25s;
    z-index: 1;
    background-color: var(--f);
  }
  .edit-feedback-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 1rem 0;
    height: 2.5rem;
    width: 7.75rem;
    background: var(--b);
    border-radius: 0.625rem;
    cursor: pointer;
    transition: 0.25s;
    position: absolute;
    left: 100%;
    transform: translateX(-100%);
  }
  .edit-feedback-button:hover {
    background: var(--u);
  }
  h2 {
    font-size: 0.8125rem;
    color: var(--p);
    font-weight: 700;
  }
  .comment-bottom-border {
    margin: 1.5rem 0 1.5rem;
    border-bottom: 0.0625rem var(--v) solid;
  }
  .replies-container {
    margin-top: 1.5rem!important;
    padding-left: 1.5rem!important;
  }
  .reply-border {
    position: absolute;
    border-left: 0.0625rem var(--h) solid;
    height: 59%;
    left: 0rem;
  }
</style>