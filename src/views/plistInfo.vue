<template>
  <div class="rank-info-content plist-info" :class="{'toggle_hide_margin_bottom':toggleHide ,'toggle_show_margin_bottom':!toggleHide}">
    <div class="rank-banner-wrap" :style="{backgroundImage:`url(${imgurl})`}">
      <div class="rank-status container">
        <el-tag style="marginLeft:5px" v-for="(tag,index) in info.tags" :key="index">{{tag.tagname}}</el-tag>
      </div>
    </div>
    <div class="plist-desp">
      <p class="plist-desp-p" :class="{ 'plist-desp-hide' : hideIntro}">
        <span style="display: block">{{info.intro}}</span>
        <span v-show="!hideIntro" class="createdBy">--by--{{info.nickname}}</span>
      </p>
      <img src="../assets/images/close_icon.png" class="plist-desp-icon" @click="toggleIntro" v-if="hideIntro">
      <img src="../assets/images/open_icon.png" class="plist-desp-icon" @click="toggleIntro" v-else>
    </div>

    <div class="plist-desp-bottom" style="width: 100%;height: 5px;background-color: #f1f1f1"></div>

    <div class="rank-info-list">
      <mt-cell :title="song.filename" v-for="(song,index) in songList" :key="index" @click.native="playAudio(index)">
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
      opacity:0,
      info:{},
      imgurl:'',
      songList:[],
      hideIntro:true,
    }),
    //通过路由的before钩子解除router-view缓存限制，否则只会显示第一次的rankInfo（生命周期不会触发）    
    beforeRouteEnter (to, from, next) {
      next(vm => {
        window.scrollTo(0,0)
        vm.hideIntro = true
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
    computed:{
      ...mapGetters(['toggleHide']),
    },
    methods:{
      getList(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        let id = this.$route.params.id;
        this.$http.get( `/proxy/plist/list/${id}?json=true`).then(({data}) =>{
          const {info,list} = data;
          this.info = info.list;
          this.songList = list.list.info;
          this.imgurl = this.info.imgurl.replace('{size}','400');
          this.$store.commit('setHeadTitle',this.info.specialname);
        }).then(() => {
          Indicator.close();
        })
      },
      toggleIntro(){
        this.hideIntro = !this.hideIntro;
      }
    },

  }
</script>

<style type="text/css">
  .rank-banner-wrap {
    height: 250px;
    background-size: 100%
  }
  span.el-tag{color: #0BEAFB; background-color: rgba(64,158,255,0.3);}
  .createdBy{display: block;text-align: right;color: deepskyblue}
  .mint-cell-title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}   /*限制单行显示*/
  .toggle_show_margin_bottom{margin-bottom: 109px;}
  .toggle_hide_margin_bottom{margin-bottom: 48px;}
</style>