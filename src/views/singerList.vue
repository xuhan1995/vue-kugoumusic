<template>
  <div class="singer_list" :class="{'toggle_hide_margin_bottom':toggleHide ,'toggle_show_margin_bottom':!toggleHide}">
    <mt-cell :title="singer.singername" v-for="(singer,index) in singers" :to="`/singer/info/${singer.singerid}`" is-link :key="index">
      <img slot="icon" :src="singer.imgurl.replace('{size}','400')" width="60" height="60">
    </mt-cell>
  </div>
</template>

<script type="text/javascript">
  import { Indicator } from 'mint-ui'
  import { mapGetters } from 'vuex';

  export default {
    data:() => ({
      singers:[],
    }),
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showHead',true);
        vm.$store.commit('setHeadStyle',{'background': '#2CA2F9'});
        vm.getSinger();
      })
    },
    beforeRouteLeave (to, from , next) {
      this.$store.commit('showHead',false);
      this.$store.commit('resetHeadStyle');
      next();
    },
    computed: {
      ...mapGetters(['toggleHide'])
    },
    methods:{
      getSinger(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        let id = this.$route.params.id;
        this.$http.get(`/proxy/singer/list/${id}?json=true`).then(({data}) =>{
          const {classname,singers} = data;
          this.singers = singers.list.info;
          this.$store.commit('setHeadTitle',classname);
        }).then(() => {
          Indicator.close();
        })
      }
    },
  }
</script>

<style type="text/css">
  .singer_list .mint-cell-title img {
    margin-right: 10px
  }
  .toggle_show_margin_bottom{margin-bottom: 109px;}
  .toggle_hide_margin_bottom{margin-bottom: 48px;}
</style>