import Vue from 'vue'
import Router from 'vue-router'
import newSongs from '../views/newSongs'
import search from '../views/search'
import rank from '../views/rank'
import rankInfo from '../views/rankInfo'
import plist from '../views/plist'
import plistInfo from '../views/plistInfo'


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
  {
    path: '/rank/info/:id',
    component: rankInfo,
  },
  {
    path: '/plist',
    component: plist,
  },
  {
    path: '/plist/info/:id',
    component: plistInfo,
  },
  ]
})
