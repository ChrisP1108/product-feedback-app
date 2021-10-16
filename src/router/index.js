import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import FeedbackDetails from '../views/FeedbackDetails.vue'
import NewFeedback from '../views/NewFeedback.vue'
import EditFeedback from '../views/EditFeedback.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/feedback/details/:id',
    name: 'FeedbackDetails',
    component: FeedbackDetails
  },
  {
    path: '/feedback/new',
    name: 'NewFeedback',
    component: NewFeedback
  },
  {
    path: '/feedback/edit/:id',
    name: 'EditFeedback',
    component: EditFeedback
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router