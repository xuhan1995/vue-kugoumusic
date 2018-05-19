import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    head:{   //以下各项都是排行榜的项
      toggle:false,  //在新歌排行榜页面为true
      title:'',
      style: {'background': 'rgba(43,162,251,0)'},
    },
    showDetailPlayer:false,   //显示歌词面板
    headNav: 'head-nav1',  //一开始在第一个nav
  },
  getters:{
    headNav: state => state.headNav,
    head: state => state.head,
  },
  mutations:{
    showDetailPlayer: (state,flag) => {
      state.showDetailPlayer = flag;
    },
    setHeadNav: (state,currentNav) => {
      state.headNav = currentNav;
    },
  },
  actions:{

  },

})

export default store;
