<template>
  <div v-show="showDetailPlayer">
    <div class="detail_player" :style="{backgroundImage:`url(${audio.imgUrl})`}"></div>
    <div class="detail_player"
         :style="{backgroundImage:`url(${audio.imgUrl})`,'filter': 'blur(5px)'}"></div>
    <div class="detail_player-content">
      <div class="detail_player-title container">
        <span class="detail_player-back" @click="hideDetailPlayer"></span>
        <div class="detail_player_info" ref="detailPlayerInfo"><p :style="{ marginLeft : titleOffset + 'px'}">{{audio.title}}</p></div>
      </div>

      <div class="volume">
        <span class="iconfont" @click="toggleMuted" :class="{'icon-volume-zuixiaoyinliang' : !audioMuted,'icon-volume-guanbiyinliang' : audioMuted}"></span>
        <el-slider v-model="audioVolume" :min="0" :max="1" :step="0.01" style="width: 85%"  @change="changeAudioVolume" :format-tooltip="TooltipShowAudioVolume"></el-slider>
      </div>
      <div class="detail_player-img">
        <img :src="audio.imgUrl">
      </div>
      <div class="detail_player-lrc">
        <p class="no_songLrc" v-show="typeof songLrc == 'string'">{{songLrc}}</p>
        <div class="lrc-content" :style="{ marginTop : lrcOffset + 'px'}">
          <p  v-show="typeof songLrc != 'string'" v-for="(item, index) in songLrc" :key="item + index" :class="{ isSinginglrc: index == songLrcisSingingIndex }">  <!-- 所以要在player组件中timeupdate实时更新currentLength -->
            {{item.lrcContent}}
          </p>
        </div>
      </div>
      <div class="detail_player-range container">
        <span class="detail_player-time">{{audio.currentLength | time}}</span>
        <el-slider v-model="audio.currentLength" :min="0" :max="audio.songLength" style="width: 80%"  @change="changeCurrentLength" :format-tooltip="formmatTime"></el-slider>
        <span class="detail_player-time">{{audio.songLength | time}}</span>
      </div>
      <div class="detail_player-control player-padding">
        <i class="detail_player-btn play-prev player_btn-sm" @click="prev"></i>
        <i class="detail_player-btn play-play player_btn-lg" @click="toggleStatus" :class="{'play-pause':isPlay}"></i>
        <i class="detail_player-btn play-next player_btn-sm" @click="next"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'
import { untils } from '../mixins/'
import { formmatTime } from '@/utils/utils'

export default {
  mixins: [untils],
  mounted(){
    this.audioElement.volume = 0.1;
    this.syncVolumeBar();
  },
  data: () => ({
    audioVolume:0,  //当前音量
    audioMuted:false,  //是否静音
    cacheVolume:0,  //静音时缓存音量
    titleOffset:0,   //title偏移量
    titleOffsetTimer:null,  //计算title偏移量的setInterval
    recordingOffset: 0,  //记录偏移量，当然用tittleOffset也行，只不过这样更直观
  }),
  filters:{
    time(value){
      return formmatTime(value)
    }
  },
  computed:{
    ...mapGetters(['showDetailPlayer','audio','isPlay','listenCount', 'audioElement' ]),
    songLrc(){
      if (this.audio.lrc) {
        let songLrc = this.audio.lrc.split('\r\n')
        songLrc = songLrc.splice(0, songLrc.length - 1)
        songLrc = songLrc.map((item)=> {
          let time = item.substr(1, 5).split(':')  //分开分钟和秒
          let seconds = parseInt(time[0]) * 60 + parseInt(time[1])   //把分钟和秒换算成秒
          let lrcContent = item.substr(10)  //歌词部分
          return {
            seconds,
            lrcContent
          }
        })
        return songLrc;
      }
      else{
        return '很遗憾，没有得到此歌曲的歌词';
      }
    },
    songLrcisSingingIndex () {
      const time = parseInt(this.audio.currentLength)
      if (Array.isArray(this.songLrc)) {
        return this.getSongLrcIndex(time)
      }
    },
    lrcOffset(){
        const offset = (this.songLrcisSingingIndex - 2) * (-20)  //显示的第一行距离顶部的像素
        return offset
    },
  },
  watch:{
    //用了watch和nextTick即数据变化加DOM重新渲染
    //进入showDetailPlayer和切换歌曲都需要调用setTitleOffset
    showDetailPlayer: function () {  //需要监听showDetailPlayer是因为showDetailPlayer变化时会重新渲染title的DOM
      this.initSongTitle()
    },
    listenCount: function () {
      this.initSongTitle()
    },
  },
  methods:{
    initSongTitle(){
      this.titleOffset = 0
      this.$nextTick(function () {
        if (this.titleOffsetTimer == null) {
          this.setTitleOffset();
        }
        else{
          clearInterval(this.titleOffsetTimer);
          this.titleOffsetTimer = null;
          this.setTitleOffset();
        }
      })
    },
    getSongLrcIndex (time) {
      for (let i = 0, len = this.songLrc.length; i < len; i++) {
        if (i < len - 1) {
          if (time >= this.songLrc[i].seconds && time < this.songLrc[i + 1].seconds) {
            return i
          } else if (time < this.songLrc[0].seconds) {
            return 0
          }
        } else {
          return i
        }
      }
    },
    hideDetailPlayer(){
      this.$store.commit('showDetailPlayer',false);
    },
    changeCurrentLength(currentLength){
      this.$store.commit('setCurrent', true);
    },
    formmatTime(value){ //没有延时的拖动可以完成，延时个0.5s就不行了
      formmatTime(value)
    },
    //音量相关
    syncVolumeBar(value){
      if (value != undefined) {
        this.audioVolume = value;
      }
      else{
        this.audioVolume = this.audioElement.volume;
      }
    },
    changeAudioVolume(currentVolume){
      if (currentVolume) {
        this.audioElement.muted = false;
        this.audioMuted = false;
      }
      else{
        this.audioElement.muted = true;
        this.audioMuted = true;
      }
      this.audioElement.volume = currentVolume;
    },
    TooltipShowAudioVolume(value){
      return value * 100;
    },
    //静音
    toggleMuted(){
      if (!this.audioElement.muted){  //音量开
        this.cacheVolume = this.audioElement.volume;  //缓存音量
        this.audioElement.muted = true;  //静音
        this.syncVolumeBar(0); //同步音量条
      }
      else {
        this.audioElement.muted = false;
        this.syncVolumeBar(this.cacheVolume);
        this.cacheVolume = 0;
      }
        this.audioMuted = !this.audioMuted; //切换图标
    },
   setTitleOffset(){
      let clientWidth = this.$refs.detailPlayerInfo.clientWidth
      let scrollWidth = this.$refs.detailPlayerInfo.scrollWidth
      if (clientWidth < scrollWidth) {
        this.titleOffsetTimer = setInterval(() => {
          if (this.recordingOffset > scrollWidth) {
            this.titleOffset = 0;  //偏移够了，回原位
            this.recordingOffset = 0
          } else {
            this.titleOffset -= 1;
            this.recordingOffset += 1;
          }
        }, 20);
      }
    }
  },
}
</script>

<style type="text/css">
.detail_player{
  position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 1010; background-attachment: fixed; background-position: center;background-repeat: no-repeat;background-size: cover;
}
.detail_player-content{
  position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: 1010;background-color: rgba(0,0,0,.5);
}
.detail_player-title {
  position: relative; width: 100%;height: 43px;background: -webkit-linear-gradient(top,rgba(0,0,0,.6),rgba(0,0,0,0));margin-top: 51px;padding:0 2%; text-align: center; line-height: 43px; color: #fff;font-size: 18px;overflow: visible;
}
.detail_player-back{
  display: block;position: absolute;float: left; top: 0;left: 5px;width: 24px;height: 100%;background: url('../assets/images/goback_icon.png') no-repeat center;background-size: 60% 60%;
}
.detail_player_info{width: 90%;height:100%; float: right;}
.detail_player_info p{height: 100%;white-space:nowrap;}
.detail_player-img{
  width: 50%;margin: 30px auto ;
}
.detail_player-img img{width: 100%;}
.detail_player-lrc{
  width: 100%;height: 100px;line-height: 20px;margin-bottom: 20px;color: #fff;overflow: hidden;text-align: center;
}
.lrc-content{transition: all .5s;transform: translateZ(0)}
.lrc-content .disCurrentLrc:last-of-type{color: orange;}
.no_songLrc{margin:40px auto;font-size: 16px;}
.detail_player-time{
  display: block;float: left; width:10%;height: 38px;line-height: 38px;text-align: center;color: #fff;font-size: 12px;
}
.detail_player-time:nth-of-type(2){
  float: right;margin-top: -38px;
}
.el-slider{
  margin: 0 auto; padding: 0 10px;
}
.detail_player-control{margin-top: 20px;}
.player-padding{padding: 0 20%}
.detail_player-btn{display: block;width: 33.3%;float: left;height: 100px;}
.play-prev{background: url("../assets/images/play_prev.png") no-repeat;background-size: 60% auto;background-position: center}
.play-play{background: url("../assets/images/play_play.png") no-repeat;background-size: 80% auto;background-position: center}
.play-pause{background: url("../assets/images/play_pause.png") no-repeat;background-size: 80% auto;background-position: center}
.play-next{background: url("../assets/images/play_next.png") no-repeat;background-size: 60% auto;background-position: center}
.isSinginglrc{
  color:#19C2EF; font-size: 18px;
}
.volume{
  padding: 10px 5px 10px 15px;
}
.icon-volume-zuixiaoyinliang,.icon-volume-guanbiyinliang{
  float: left; display: block;padding: 0 5px; width: 20%;line-height: 38px;font-size: 25px;color: #fff;
}
.el-slider__runway,.el-slider__bar{
  height:3px;
}
.el-slider__runway{background-color: #807070;}
.el-slider__bar{background-color: #EDE4E4;}
</style>