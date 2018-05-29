<template>
  <div class="rank" :class="{'toggle_hide_margin_bottom':toggleHide ,'toggle_show_margin_bottom':!toggleHide}">
    <mt-cell :title="item.rankname" v-for="(item,index) in rankList" :to="`/rank/info/${item.rankid}`" is-link :key="index">
      <img slot="icon" :src="item.imgurl.replace('{size}','400')" width="60" height="60">  <!-- 只有把size设置为400时img能正常显示 -->
    </mt-cell>
  </div>
</template>

<script type="text/javascript">
  import { Indicator } from 'mint-ui'
  import { mapGetters } from 'vuex';

  export default {
    data:() => ({
      rankList:[],
    }),
    created(){
      this.getRank();
    },
    computed: {
      ...mapGetters(['toggleHide'])
    },
    methods:{
      getRank(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        this.$http.get('/proxy/rank/list&json=true').then(({data}) =>{
          this.rankList = data.rank.list;
        }).then(() => {
          Indicator.close();
        })
      }
    },
  }
</script>

<style type="text/css" scoped>
  .rank .mint-cell-title img {margin-right: 10px;}
  .toggle_show_margin_bottom{margin-bottom: 109px;}
  .toggle_hide_margin_bottom{margin-bottom: 48px;}
</style>