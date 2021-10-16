import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import FeedbackDetails from '../views/FeedbackDetails.vue'
import NewFeedback from '../views/NewFeedback.vue'
import EditFeedback from '../views/EditFeedback.vue'
import Roadmap from '../views/Roadmap.vue'

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
  },
  {
    path: '/roadmap',
    name: 'Roadmap',
    component: Roadmap
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router