import { createWebHistory , createRouter } from 'vue-router'

import LandingView from '../views/Landing.vue'
import PostQuizView from '@/views/PostQuiz.vue'

const routes = [
  { path: '/', component: LandingView },
  { path: '/create', component: PostQuizView },
]

export const router = createRouter({
  history: createWebHistory (),
  routes,
})

