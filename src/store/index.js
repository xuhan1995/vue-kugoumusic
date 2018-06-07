import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    head:{   //以下各项都是排行榜的项
      toggle:false,  //在rankInfo页面为true
      title:'',
      style: {'background': 'rgba(43,162,251,0)'},
    },
    audio:{  //audio只是选中的歌曲信息，不是歌单信息
      songUrl: '',  //歌曲url，在audio中播放用这个
      imgUrl: 'http://m.kugou.com/v3/static/images/index/logo_kugou.png',
      title: '',
      singer: '',
      currentLength: 0,    //已播放的时长
      songLength: 0,      //歌曲长度 进度条有用
      currentFlag: false   //是否改变了播放进度
    },
    showDetailPlayer:false,   //显示歌词面板,这里叫详细播放器
    headNav: 'head-nav1',  //一开始在第一个nav
    songListInfo:{  //储存了newSongs页歌单信息和选中歌的index
      songList: [],
      songIndex: -1
    },
    audioLoadding:false, //歌曲加载中
    listenCount:0, //听了几首歌
    showPlayer:false,  //是否能允许detailPlayer，只有首次进入不允许，因为没放歌，detailPlayer，啥都没有
    isPlay:false,  //是否正在播放
    toggleHide: false,  //面板隐藏和显示一个上三角一个下三角的flag
  },
  getters:{
    headNav: state => state.headNav,
    head: state => state.head,
    audio: state => state.audio,
    audioLoadding: state => state.audioLoadding,
    showPlayer: state => state.showPlayer,
    isPlay: state => state.isPlay,
    showDetailPlayer: state => state.showDetailPlayer,
    listenCount: state => state.listenCount,
    toggleHide: state => state.toggleHide,
  },
  mutations:{
    showDetailPlayer: (state,flag) => {
      state.showDetailPlayer = flag;
    },
    setHeadNav: (state,currentNav) => {
      state.headNav = currentNav;
    },
    //newSongs页
    setListInfo: (state,info) => {
      state.songListInfo = {...(state.songListInfo),...info};
    },
    toggleAudioLoadding:(state,flag) => {
      state.audioLoadding = flag;
    },
    setAudio: (state,audio) => {  //把选中的歌曲并入state的audio
      if (!state.listenCount) {
        state.showPlayer = true  //首次进入应用时不可打开播放详情
      }
      state.listenCount++
      state.audio = {...(state.audio), ...audio}  //相当于object.assign
    },
    //player页
    setCurret: (state,flag) => {   //改变了播放进度
      state.audio.currentFlag = flag;
    },
    setAudioTime: (state,time) => {
      state.audio.currentLength = time;
    },
    isPlay: (state,flag) => {
      state.isPlay = flag;
    },
    toggleHide:(state,flag) => {
      state.toggleHide = flag;
    },
    //rankInfo页
    showHead:(state,flag) => {
      state.head.toggle = flag;
    },
    setHeadTitle:(state,title) => {
      state.head.title = title;
    },
    setHeadStyle:(state,style) => {
      state.head.style = style;
    },
    resetHeadStyle:(state) => {
      state.head.style = {'background': 'rgba(43,162,251,0)'};
    },
  },
  actions:{
    getSong({commit, state}, hash){
      commit('toggleAudioLoadding',true);  //让下面Player的图标显示加载
      axios.get(`/bproxy/yy/index.php?r=play/getdata&hash=${hash}`).then(({data}) => {
        data = data.data;
        const songUrl = data.play_url
        const imgUrl = data.img
        const title = data.audio_name
        const songLength = data.timelength / 1000
        const singer = data.author_name
        const currentLength = 0
        const lrc = data.lyrics
        const audio = {songUrl, imgUrl, title, singer, songLength, currentLength,lrc};
        commit('setAudio',audio);
        commit('toggleAudioLoadding',false);  //让下面Player的图标加载完成
      })
    },
    next({dispatch,state}){
      let songList = state.songListInfo.songList;
      if (state.songListInfo.songIndex == songList.length - 1) {
        state.songListInfo.songIndex = 0;
      }
      else{
        state.songListInfo.songIndex++;
      }
      let hash = songList[state.songListInfo.songIndex].hash;
      dispatch('getSong',hash);   //传递选中歌曲信息用hash值
    },
    prev({dispatch,state}){
      let songList = state.songListInfo.songList;
      if (state.songListInfo.songIndex == 0) {
        state.songListInfo.songIndex = songList.length - 1;
      }
      else{
        state.songListInfo.songIndex--;
      }
      let hash = songList[state.songListInfo.songIndex].hash;
      dispatch('getSong',hash);   //传递选中歌曲信息用hash值
    }
  },

})

export default store;
