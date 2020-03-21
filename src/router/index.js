import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../views/Landing.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Tasks from '../views/Tasks.vue'
import store from '../store'


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
    component:Login,
    meta:{
      guest:true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component:Register,
    meta:{
      guest:true
    }
  },
  {
    path:'/tasks',
    name:'Tasks',
    component:Tasks,
    meta:{
      requires_auth:true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  if (to.matched.some(record=>record.meta.requires_auth)){
    if(!store.getters.loggedIn){ //if we are not logged in lets redirect to the login
      next({
        name:'Login'
      })
    }else{
      next()
    }
  } else if(to.matched.some(record=>record.meta.guest)){
    if (store.getters.loggedIn){ //if logged in redirect tot the tasks
      next({name:'Tasks'})
    }else{
      next()
    }
  }else{
    next()
  }
})

export default router
