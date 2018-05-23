<template>
  <div v-show="showDetailPlayer">
    <div class="detail_player" :style="{backgroundImage:`url(${audio.imgUrl})`}"></div>
    <div class="detail_player"
         :style="{backgroundImage:`url(${audio.imgUrl})`,filter: 'blur(5px)', '-webkit-filter':'blur(5px)'}"></div>
    <div class="detail_player-content">
      <div class="detail_player-title container">
        <span class="detail_player-back" @click="hideDetailPlayer"></span>
        {{audio.title}}
      </div>
      <div class="detail_player-img">
        <img :src="audio.imgUrl">
      </div>
      <div class="detail_player-lrc">
        <div class="lrc-content" :style="{ marginTop : lrcOffset + 'px'}">
          <p v-for="(item,index) in songLrc" :class="{ underCurrentlrc : item.seconds >= audio.currentLength , isSinginglrc: index == isSinging(index)}">  <!-- 所以要在player组件中timeupdate实时更新currentLength -->
            {{item.lrcContent}}
          </p>
        </div>
      </div>
      <div class="detail_player-range container">
        <span class="detail_player-time">{{audio.currentLength | time}}</span>
        <mt-range v-model="audio.currentLength" :min="0" :max="audio.songLength" :step="10" :bar-height="3" style="width: 80%" @click.native="rangeChange($event)" ></mt-range>  <!-- @mousedown.native="rangeMousedown" -->
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
    ...mapGetters(['showDetailPlayer','audio','isPlay' ]),
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
        //这里是没得到歌词的处理
      }
    },
    lrcOffset(){
      if (this.songLrc != null) {
        let offset = (this.songLrc.length - jq('.underCurrentlrc').length - 2) * (-20)  //显示的第一行距离顶部的像素
        return this.audio.currentLength + offset - this.audio.currentLength
      }
    },
  },
  methods:{
    hideDetailPlayer(){
      this.$store.commit('showDetailPlayer',false);
      console.log(this.songLrc);
    },
    rangeChange(e){
      let offset = e.offsetX;
      let rangeWidth = (document.documentElement.clientWidth - 20) * 0.8 - 20;
      let clickLength = offset / rangeWidth * this.audio.songLength;
      if (offset < rangeWidth) {
        //改变播放进度，先传值到store（改变的是currentLength），再由store传到Player组件，由Player的change改变
        this.$store.commit('setAudioTime',clickLength);
        this.$store.commit('setCurret',true);
      }
    },
    isSinging(index){ //天哪，谁告诉我为什么放computed就不行，现在认为是computed不能传参
      let currentLength = parseInt(this.audio.currentLength);
      if (currentLength > this.songLrc[index].seconds && currentLength < this.songLrc[index + 1].seconds) {
        return index;
      }
    },
    // rangeMousedown(){
    //   this.ifClick = true;
    // }
  },
}
</script>

<style type="text/css">
.isSinginglrc{
  color:#19C2EF;
  font-size: 16px;
}
</style>