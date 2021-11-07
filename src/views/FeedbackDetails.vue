<template>
  <div class="feedback-container">
    <GoBack />
    <div class="section-container">
      <SuggestionItem :item="selectedFeedback" isRoadmap='false' />
    </div>
    <div class="section-container trans-fade">
      <h1>{{commentCounter(selectedFeedback.comments)}} Comments</h1>
      <div class="trans-fade" :key="comment.id" v-for="comment in selectedFeedback.comments">
        <Comment :comment="comment" type="comment" />
        <div v-if="('replies' in comment)" class="position-relative reply-top-gap">
          <div :key="index" v-for="(reply, index) in comment.replies" class="replies-container">
            <Comment :comment="reply" :type="index !== comment.replies.length - 1 ? 'reply' : 'last'" />
            <div v-if="('replies' in reply)" class="position-relative">
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
    border-bottom: 0.0625rem var(--bb) solid;
  }
  .replies-container {
    margin-top: 1.5rem!important;
    padding-left: 1.5rem!important;
    height: 100%;
  }
  @media(min-width: 768px) {
    .comment-bottom-border {
      margin: 2rem 0 2rem;
    }
    .reply-top-gap {
      margin-top: 2rem!important
    }
    .replies-container {
      padding-left: 2.8125rem!important;
    }
  }
  @media(min-width: 1200px) {
    .feedback-container {
      padding: 5rem 23% 4.5625rem;
    }
  }
</style>