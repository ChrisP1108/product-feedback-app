<template>
  <div class="feedback-container">
    <GoBack />
    <div class="section-container">
      <SuggestionItem :item="selectedFeedback" isRoadmap='false' />
    </div>
    <div class="section-container trans-fade">
      <h1>{{commentCounter(selectedFeedback.comments)}} Comments</h1>
      <div class="trans-fade" :key="comment.id" v-for="comment in selectedFeedback.comments">
        <Comment :comment="comment"/>
        <div v-if="('replies' in comment)" class="position-relative">
          <div class="reply-border"></div>
          <div :key="reply" v-for="reply in comment.replies" class="replies-container">
            <Comment :comment="reply"/>
            <div v-if="('replies' in reply)" class="position-relative">
              <div class="reply-border"></div>
              <div :key="subReply" v-for="subReply in reply.replies" class="replies-container">
                <Comment :comment="subReply" />
              </div>
            </div>
          </div>
        </div>
        <div :class="[lastComment(comment) && 'comment-bottom-border']"></div>
      </div>
    </div>
    <div class="section-container trans-fade">
      <AddComment />
    </div>
  </div>
</template>

<script>
import SuggestionItem from '../components/SuggestionItem.vue';
import Comment from '../components/Comment';
import AddComment from '../components/AddComment';
import GoBack from '../components/GoBack';

  export default {
    name: 'FeedbackDetails',
    components: {
      SuggestionItem,
      Comment,
      AddComment,
      GoBack
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
  .background {
    width: 100%;
    height: 100%;
    position: relative;
    transition: 0.25s;
    z-index: 1;
    background-color: var(--f);
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