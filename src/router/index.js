import Vue from 'vue'
import Router from 'vue-router'
import newSongs from '../views/newSongs'
import search from '../views/search'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/newSongs',
    component: newSongs,
    alias: '/'
  },
  {
    path: '/search',
    component: search,
  },
  ]
})
