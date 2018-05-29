<template>
  <div class="rank-info-content" :class="{'toggle_hide_margin_bottom':toggleHide ,'toggle_show_margin_bottom':!toggleHide}">
    <div class="rank-banner-wrap" :style="{'backgroundImage':'url('+ imgurl +')'}">
      <div class="rank-status container">
        <p>
          {{updateTime}}
        </p>
      </div>
    </div>

    <div class="rank-info-list">
      <mt-cell :title="song.filename" v-for="(song,index) in songList" :key="index" @click.native="playAudio(index)">
        <!-- 前三带圈圈，颜色不同 -->
        <span class="rank-index" :class="{'rank-list-good' : index < 3 ,'rank-list-first' : index == 0,'rank-list-second' : index == 1,'rank-list-third' : index == 2}">{{index + 1}}</span>
        <img src="../assets/images/download_icon.png" width="20" height="20">
      </mt-cell>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { Indicator } from 'mint-ui'
  import { untils } from '../mixins/'
  import { mapGetters } from 'vuex';

  export default {
    mixins: [untils],
    data: ()=> ({
      imgurl: '',
      songList: [],
      opacity:0,  //head不透明度
    }),
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showHead',true);
        vm.getList();
        window.onscroll = () => {
          vm.opacity = window.scrollY / 200;
          vm.$store.commit('setHeadStyle',{background: `rgba(43,162,251,${vm.opacity})`})  //模板字符串
        }
      })
    },
    beforeRouteLeave (to, from , next) {
      this.$store.commit('showHead',false);
      window.onscroll = null;
      next();
    },
    mounted(){
      window.onscroll = () => {
        vm.opacity = window.scrollY / 200;
        vm.$store.commit('setHeadStyle',{background: `rgba(43,162,251,${vm.opacity})`})
      }
    },
    computed:{
      ...mapGetters(['toggleHide']),
      updateTime(){
        let time = new Date();
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let date = time.getDate();
        if (month < 10) {
          month = '0' + month;
        }
        if (date < 10) {
          date = '0' + updateTime;
        }
        return `上次更新时间：${year}-${month}-${date}`  //模板字符串
      }
    },
    methods:{
      getList(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        let id = this.$route.params.id;
        this.$http.get( `/proxy/rank/info/?rankid=${id}&page=1&json=true`).then(({data}) =>{
          const {info,songs} = data;
          const {banner7url,rankname} = info;
          const {list} = songs;
          this.imgurl = banner7url.replace('{size}','400');
          this.songList = list;
          this.$store.commit('setHeadTitle',rankname);
        }).then(() => {
          Indicator.close();
        })
      },
    },

  }
</script>

<style type="text/css">
  .rank-list-good {
    display: inline-block;
    padding: 2px 8px;
    left: 12px !important;
    border-radius: 8px;
    color: #fff;
    margin-top: 3px !important;
  }

  .rank-list-first {
    background-color: #E80000;
  }

  .rank-list-second {
    background-color: #FF7200;
  }

  .rank-list-third {
    background-color: #F8B300;
  }
  .mint-cell-title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}   /*限制单行显示*/
  .toggle_show_margin_bottom{margin-bottom: 109px;}
  .toggle_hide_margin_bottom{margin-bottom: 48px;}
</style>