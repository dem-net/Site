import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import PlaygroundPoint from './views/PlaygroundPoint.vue'
import PlaygroundLine from './views/PlaygroundLine.vue'
import Playground3DGpx from './views/Playground3DGpx.vue'
import Playground3D from './views/Playground3D.vue'
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
      path: '/playground_3dgpx',
      name: 'Playground3dGpx',
      component: Playground3DGpx
    },
    {
      path: '/playground_3d',
      name: 'Playground3D',
      component: Playground3D
    },
    {
      path: '/about',
      name: 'about',
      component: EmptyMessage
    }
  ]
})
