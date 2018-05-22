<template>
  <div class="logo-container">
    <div class="head-logo" @click="newSongsRouter">
      <a href="#">
        <img src="http://m.kugou.com/v3/static/images/index/logo.png">
      </a>
    </div>
    <div class="head-search" @click="searchRouter">
      <img src="http://m.kugou.com/v3/static/images/index/search.png">
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    methods:{
      searchRouter(){
        this.$store.commit('showDetailPlayer',false);  //关闭播放面板
        this.$router.push({ path : '/search'});
      },
      newSongsRouter(){
        this.$store.commit('showDetailPlayer',false);
        this.$router.push({ path : '/'});
      }
    }
  }
</script>

<style type="text/css">
  .logo-container{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 51px;
    padding: 10px;
    z-index: 1050;
    background-color: #2CA2F9;
    overflow: hidden;
  }
  .head-logo{
    float: left;
    height: 100%;  /*这个并把img的height也改成100%可以让图像自适应*/
  }
  .head-logo img{
    height: 100%;
  }
  .head-search{
    float: right;
    height: 31px;
    padding: 3px 0;
  }
  .head-search img{
    height: 100%;
  }
</style>