import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import PlaygroundPoint from './views/PlaygroundPoint.vue'
import PlaygroundLine from './views/PlaygroundLine.vue'
import EmptyMessage from './views/EmptyMessage.vue'

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
      path: '/playgroundpoint',
      name: 'PlaygroundPoint',
      component: PlaygroundPoint
    },
    {
      path: '/playgroundline',
      name: 'PlaygroundLine',
      component: PlaygroundLine
    },
    {
      path: '/about',
      name: 'about',
      component: EmptyMessage
    }
  ]
})
