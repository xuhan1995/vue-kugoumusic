import Vue from 'vue'
import Router from 'vue-router'
import newSongs from '../views/newSongs'
import search from '../views/search'
import rank from '../views/rank'
import rankInfo from '../views/rankInfo'
import plist from '../views/plist'
import plistInfo from '../views/plistInfo'
import singer from '../views/singer'
import singerList from '../views/singerList'
import singerInfo from '../views/singerInfo'


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
  {
    path: '/singer',
    component: singer,
  },
  {
    path: '/singer/list/:id',
    component: singerList,
  },
  {
    path: '/singer/info/:id',
    component: singerInfo,
  },
  ]
})
