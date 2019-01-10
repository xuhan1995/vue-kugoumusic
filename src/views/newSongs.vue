<template>
  <div>
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item  v-for="(banner,index) in banners" :key="index">
        <a :href="banner.extra.tourl">
          <img :src="banner.imgurl" :title="banner.title">
        </a>
      </mt-swipe-item>
    </mt-swipe>

    <!-- 歌单songList -->
    <!-- mint的title和img会自适应，分居左右 -->
    <div :style="{'marginBottom' : (toggleHide ? '48px' : '109px')}" >
      <mt-cell v-for="(song,index) in songList" :title="song.filename" :key="index" @click.native="playAudio(index)">
        <img src="../assets/images/download_icon.png" width="20" height="20">
      </mt-cell>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { Indicator } from 'mint-ui';
  import { untils } from '../mixins/';
  import { mapGetters } from 'vuex';


  export default {
    mixins: [untils],  //minxins是一个外部模块，components,computed,methods都可以混入Vue实例中，有好多组件引用，而又不应放在store中时，用此方法;
    //是untils的升级版
    data: () => ({
      banners:[],
      songList:[]
    }),
    computed: {
      ...mapGetters(['audio','toggleHide'])
    },
    created(){  //渲染前调用
      this.getSongs();
    },
    methods:{
      getSongs(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        this.$http.get('/proxy/?json=true').then(({data}) =>{
          this.banners = data.banner;
          this.songList = data.data;
        }).then(() => {
          Indicator.close();
        })
      }
    }
  }
</script>

<style type="text/css">
  .main{
    margin-top: 94px;
  }
  .mint-cell{
    padding-left: 10px;
    min-height: 52px;
  }
  .mint-cell-wrapper{
    background-image: none;
    border-bottom: 1px solid #e8e8e8;
    font-size: 14px;
  }
  .mint-swipe {
    height: 39vw !important;
  }
  .mint-swipe-indicators {
    bottom: 5px !important;
  }
</style>