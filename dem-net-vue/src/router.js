import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Playground from './views/Playground.vue'
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/playground',
      name: 'playground',
      component: Playground
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
