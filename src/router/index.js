import Vue from 'vue'
import Router from 'vue-router'
import newSongs from '../views/newSongs'
import search from '../views/search'
import rank from '../views/rank'

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
    {
    path: '/rank',
    component: rank,
  },
  ]
})
