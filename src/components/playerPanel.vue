<template>
  <div class="audio-view" :class="{'audio_panel_hide' : toggleHide}">
    <div class="audio-panel-control" @click="togglePanel" :class="{'toggleContral' : toggleHide}">    <!-- toggleContral是圆圈里的上拉和划下 -->
      <mt-spinner type="fading-circle" :size="27" v-show="audioLoadding"></mt-spinner>
    </div>
    <!-- audio_panel_hide类是把playerPanel隐藏 -->
    <audio :src="audio.songUrl" autoplay ref="audioPlay" @timeupdate="change" @ended="next"></audio>
    <div class="audio-panel">
      <img class="player-img" :src="audio.imgUrl" @click="showDetailPlayer">
      <div class="player-status" @click="showDetailPlayer">
        <p class="player-title ellipsis">{{audio.title}}</p>
        <p class="player-singer ellipsis">{{audio.singer}}</p>
      </div>
      <div class="player-controls">
        <span class="player-Play" @click="toggleStatus" :class="{'player-Pause':isPlay}"></span>  <!-- 正在播放应该显示暂停图标 -->
        <span class="player-nextSong" @click="next"></span>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { mapGetters } from 'vuex'
  import { untils } from '../mixins/'

  export default {
    mixins: [untils],
    mounted(){
      this.$store.commit('setAudioElement', this.$refs.audioPlay)
    },
    computed:{
      ...mapGetters(['audio','audioLoadding','showPlayer','isPlay','toggleHide','audioElement'])
    },
    methods:{
      togglePanel(){
        let toggleHide = !this.toggleHide;
        this.$store.commit('toggleHide',toggleHide);
      },
      change(){
        let time = this.audioElement.currentTime;  //当前播放时间
        if (this.audio.currentFlag) {   //如果人为地改变了播放进度
          this.audioElement.currentTime = this.audio.currentLength;
          this.$store.commit('setCurrent',false);
        }
        else{
          this.$store.commit('recordAudioTime',time);
        }
      },
      showDetailPlayer(){
       if (this.showPlayer) {
         this.$store.commit('showDetailPlayer',true)
       }
      },
    }
  }
</script>

<style type="text/css">
.audio-view{  /*面板整体（包括隐藏的圆圈）仍然用fixed布局*/
  position: fixed;bottom: -1px;left: 0;width: 100%;transition: all 0.5s;
}
.audio-view .mint-spinner-snake{background-color: #000;margin:4px}
/*未隐藏，下三角*/
.audio-panel-control{
  width: 35px;height: 35px;border-radius: 50%;background: rgba(0,0,0,.8) url("../assets/images/close_icon.png") no-repeat center;background-size: 25px;margin-left: 10px;margin-bottom: 10px;overflow: hidden
}
/*隐藏后，正三角*/
.toggleContral{background: rgba(0,0,0,.8) url("../assets/images/open_icon.png") no-repeat center;background-size: 25px !important;}
.audio-panel{
  z-index: 999;width: 100%;height: 64px;background-color: rgba(0,0,0,0.8);padding: 7px;overflow: hidden;
}
.player-img{
  height: 100%;float: left;border-radius: 2px;
}
.player-status{
  float:left;width: 50%;height: 100%;margin-left: 3%;padding:5px;color: #fff;
}
.player-title{width: 100%;font-size: 16px;overflow: hidden;display: block;max-height: 20px;}
.player-singer{display: block;height: 50%;width: 100%;color: #c4c4c4;padding-top: 2px}
.player-controls{
  width: 30%;height: 100%;float: right;
}
.player-controls span{
  display: block;width: 50%;height: 100%;float: left;
}
.player-Play{
  background: url("../assets/images/play_icon.png") no-repeat center;background-size:auto 70%;
}
.player-Pause{background: url("../assets/images/pause_icon.png") no-repeat center;background-size:auto 70%;}
.player-nextSong{background: url("../assets/images/next_icon.png") no-repeat center;background-size:auto 70%;}
/*隐藏面板,此类是加在audio-view即最外层div上的，而audio-view的position是fixed所以改变他的bottom*/
.audio_panel_hide{
  bottom:-64px;
}

.mint-navbar .mint-tab-item.is-selected{margin-bottom: 0}
</style>