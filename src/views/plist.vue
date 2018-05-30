<template>
  <div class="plist" :class="{'toggle_hide_margin_bottom':toggleHide ,'toggle_show_margin_bottom':!toggleHide}">
    <mt-cell :title="item.specialname" :label="String(item.playcount)" v-for="(item,index) in songList" :to="`/plist/info/${item.specialid}`" is-link :key="index">
      <img slot="icon" :src="item.imgurl.replace('{size}','400')" width="60" height="60">
    </mt-cell>
  </div>
</template>

<script type="text/javascript">
  import { Indicator } from 'mint-ui'
  import { mapGetters } from 'vuex';

  export default {
    data:() => ({
      songList:[],
    }),
    created(){
      this.getSongList();
    },
    computed: {
      ...mapGetters(['toggleHide'])
    },
    methods:{
      getSongList(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        this.$http.get('/proxy/plist/index&json=true').then(({data}) =>{
          this.songList = data.plist.list.info;
        }).then(() => {
          Indicator.close();
        })
      }
    },
  }
</script>

<style type="text/css">
  .toggle_show_margin_bottom{margin-bottom: 109px;}
  .toggle_hide_margin_bottom{margin-bottom: 48px;}
</style>