<template>
  <div class="header-nav">
    <mt-navbar v-model="headNav" class="container">
      <mt-tab-item id="head-nav1">新歌</mt-tab-item>
      <mt-tab-item id="head-nav2">排行</mt-tab-item>
      <mt-tab-item id="head-nav3">歌单</mt-tab-item>
      <mt-tab-item id="head-nav4">歌手</mt-tab-item>
    </mt-navbar>
  </div>
</template>

<script type="text/javascript">
  export default {
    computed:{
      headNav:{
        get() {
          return this.$store.getters.headNav
        },
        set(id) {
          const index = id.substr(-1);
          this.$store.commit('setHeadNav',id);
          this.goRouter(Number(index));
        }
      },
    },
    methods:{
      goRouter (index) {
        switch (index) {
          case 1:
            this.$router.push({path: '/'});
            break;
          case 2:
            this.$router.push({path: '/rank'});
            break;
          case 3:
            this.$router.push({path: '/plist'});
            break;
          case 4:
            this.$router.push({path: '/singer'});
            break;
        }
      }
    }
  }
</script>

<style>
  .header-nav{
    position: fixed;
    top: 51px;
    left: 0;
    width: 100%;
    z-index: 1000;
    border-bottom: 1px solid #e4e4e4;
  }
  .container{
    width: 100%;
    padding: 0 10px;
    overflow: hidden;
  }
  a{text-decoration: none !important;}
  .mint-navbar .mint-tab-item.is-selected{margin-bottom: 0}
  .mint-tab-item {
    padding: 12px 0 !important;
  }

  .mint-tab-item-label {
    font-size: 16px !important;
  }

</style>