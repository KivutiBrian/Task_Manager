import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../views/Landing.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Tasks from '../views/Tasks.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/about',
    name: 'About',
    component:About
  },
  {
    path: '/login',
    name: 'Login',
    component:Login
  },
  {
    path: '/register',
    name: 'Register',
    component:Register
  },
  {
    path:'/tasks',
    name:'Tasks',
    component:Tasks
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
