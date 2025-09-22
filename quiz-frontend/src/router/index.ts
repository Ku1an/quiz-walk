import { createWebHistory , createRouter } from 'vue-router'

import LandingView from '../views/Landing.vue'
import PostQuizView from '@/views/PostQuiz.vue'
import PlayQuizView from '@/views/PlayQuiz.vue'
import SubmitQuizView from '@/views/SubmitQuiz.vue'
import LeaderboardView from '@/views/Leaderboard.vue'

const routes = [
  { path: '/', component: LandingView },
  { path: '/create', component: PostQuizView },
  { path: '/play', component: PlayQuizView },
  { path: '/play/:id', component: SubmitQuizView },
  { path: '/leaderboard/:id', component: LeaderboardView },

]

export const router = createRouter({
  history: createWebHistory (),
  routes,
})

