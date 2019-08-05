import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ComponentBasics from './views/ComponentBasics.vue'
import ComponentEvents from './views/ComponentEvents.vue'
import ConditionalRendering from './views/ConditionalRendering.vue'
import NetworkFetch from './views/NetworkFetch.vue'
import ListProducts from './components/ListProducts.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      props: {
        pageName: "Vue Advanced Features",
        type: "List"
      }
    },
    {
      path: '/componentBasics',
      name: 'Component Basics',
      component: ComponentBasics
    },
    {
      path: '/componentEvents',
      name: 'Component Communication',
      component: ComponentEvents
    },    
    {
      path: '/conditionalRendering',
      name: 'Conditional Rendering',
      component: ConditionalRendering
    },
    {
      path: '/networkFetch',
      name: 'Network Fetch',
      component: NetworkFetch
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/listProducts',
      name: 'Products Demo',
      component: ListProducts
    },
  ]
})
