import Vue from 'vue'
import Router from 'vue-router'
import newSongs from '../views/newSongs'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/newSongs',
    component: newSongs,
    alias: '/'
  },
  ]
})
