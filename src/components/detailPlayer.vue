<template>
  <div v-show="showDetailPlayer">
    <div class="detail_player" :style="{backgroundImage:`url(${audio.imgUrl})`}"></div>
    <div class="detail_player"
         :style="{backgroundImage:`url(${audio.imgUrl})`,filter: 'blur(5px)', '-webkit-filter':'blur(5px)'}"></div>
    <div class="detail_player-content">
      <div class="detail_player-title container">
        <span class="detail_player-back" @click="hideDetailPlayer"></span>
        <div class="detail_player_info"><p :style="{ marginLeft : titleOffset + 'px'}">{{audio.title}}</p></div>
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
          <p  v-show="typeof songLrc != 'string'" v-for="(item,index) in songLrc" :key="item + index" :class="{ underCurrentlrc : item.seconds >= audio.currentLength , isSinginglrc: index == isSinging(index)}">  <!-- 所以要在player组件中timeupdate实时更新currentLength -->
            {{item.lrcContent}}
          </p>
        </div>
      </div>
      <div class="detail_player-range container">
        <span class="detail_player-time">{{audio.currentLength | time}}</span>
        <!-- <mt-range v-model="audio.currentLength" :min="0" :max="audio.songLength" :step="10" :bar-height="3" style="width: 80%" @click.native="rangeChange($event)" ></mt-range> -->
        <el-slider v-model="audio.currentLength" :min="0" :max="audio.songLength" style="width: 80%"  @change="change" :format-tooltip="TooltipShowCurrentLength"></el-slider>
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

export default {
  mixins: [untils],
  data: () => ({
    audioVolume:0,  //当前音量
    audioMuted:false,  //是否静音
    cacheVolume:0,  //静音时缓存音量
    titleOffset:0,   //title偏移量
    titleOffsetTimer:null,  //计算title偏移量的setInterval
  }),
  filters:{
    time(value){
      let seconds = Math.floor(value);
      let minute = Math.floor(seconds / 60);
      if (minute < 10) {
        minute = '0' + minute;
      }
      let second = seconds % 60;
      if (second < 10) {
        second = '0' + second;
      }
      return minute + ':' + second;
    }
  },
  computed:{
    ...mapGetters(['showDetailPlayer','audio','isPlay','listenCount' ]),
    songLrc(){
      if (this.audio.lrc) {
        let songLrc = this.audio.lrc.split('\r\n')
        songLrc = songLrc.splice(0, songLrc.length - 1)
        songLrc = songLrc.map((item)=> {  //每一句歌词都返回一个包含事件和歌词的对象
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
    lrcOffset(){
      if (this.songLrc != null) {
        let offset = (this.songLrc.length - jq('.underCurrentlrc').length - 3) * (-20)  //显示的第一行距离顶部的像素
        return this.audio.currentLength + offset - this.audio.currentLength
      }
    },
  },
  mounted(){
    console.log(this.$refs.audioPlay);
    jq('#audioPlay')[0].volume = 0.1;
    this.getAudioVolume();
  },
  watch:{
    //用了watch和nextTick即数据变化加DOM重新渲染
    showDetailPlayer: function () {  //需要监听showDetailPlayer是因为showDetailPlayer变化时会重新渲染title的DOM
      this.$nextTick(function () {  //进入setTitleOffset需要确保setInterval是空的
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
    listenCount: function () {
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
  },
  methods:{
    hideDetailPlayer(){
      this.$store.commit('showDetailPlayer',false);
    },
    isSinging(index){ //天哪，谁告诉我为什么放computed就不行，现在认为是computed不能传参
      let currentLength = parseInt(this.audio.currentLength);
      if (index < this.songLrc.length - 1) {  //除最后一句，在此句开始时间和下句开始时间的区间，高亮
        if (currentLength > this.songLrc[index].seconds && currentLength < this.songLrc[index + 1].seconds) {
          return index;
        }
      }
      else {  //针对最后一句，时间>最后一句开始时间，高亮
        if (currentLength >= this.songLrc[this.songLrc.length - 1].seconds) {
          return index;
        }
      }
    },
    change(currentLength){
      this.$store.commit('setAudioTime',currentLength);
      this.$store.commit('setCurrent',true);
    },
    TooltipShowCurrentLength(value){ //没有延时的拖动可以完成，延时个0.5s就不行了
      let seconds = value;
      let minute = Math.floor(seconds / 60);
      if (minute < 10) {
        minute = '0' + minute;
      }
      let second = seconds % 60;
      if (second < 10) {
        second = '0' + second;
      }
      return minute + ':' + second;
    },
    //音量相关
    getAudioVolume(value){  //computed还不能用jquery
      if (value != undefined) {
        this.audioVolume = value;
      }
      else{
        this.audioVolume = jq('#audioPlay')[0].volume;
      }
    },
    changeAudioVolume(currentVolume){
      if (currentVolume) {  //不是静音要同时改变两个状态
        jq('#audioPlay')[0].muted = false;
        this.audioMuted = false;
      }
      else{  //同理
        jq('#audioPlay')[0].muted = true;
        this.audioMuted = true;
      }
      jq('#audioPlay')[0].volume = currentVolume;
    },
    TooltipShowAudioVolume(value){
      return value * 100;
    },
    //静音
    toggleMuted(){
      if (!jq('#audioPlay')[0].muted){  //音量开
        this.cacheVolume = jq('#audioPlay')[0].volume;  //缓存音量
        jq('#audioPlay')[0].muted = true;  //静音
        this.getAudioVolume(0); //同步音量条
      }
      else {
        jq('#audioPlay')[0].muted = false;
        this.getAudioVolume(this.cacheVolume);
        this.cacheVolume = 0;
      }
        this.audioMuted = !this.audioMuted;
    },
   setTitleOffset(){
      let clientWidth = jq('.detail_player_info')[0].clientWidth
      let scrollWidth = jq('.detail_player_info')[0].scrollWidth
      if (clientWidth < scrollWidth) {
        let recordingOffset = 0;  //记录偏移量，当然用tittleOffset也行，只不过这样更直观
        this.titleOffsetTimer = setInterval(() => {
            if (recordingOffset > scrollWidth) {
              this.titleOffset = 0;  //偏移够了，回原位
              recordingOffset = 0
            }
            else{
              this.titleOffset -= 1;
              recordingOffset += 1;
            }
        },20);
      }
      else{  //短title别忘了把偏移量变回去，不然指不定出现在哪
        this.titleOffset = 0;
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