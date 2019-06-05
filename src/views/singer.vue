<template>
  <div class="container" :class="{'toggle_hide_margin_bottom':toggleHide ,'toggle_show_margin_bottom':!toggleHide}">
    <div class="cell-group"><div class="cell-item" @click="goRouter(88)">热门歌手</div></div>

    <div class="cell-group">
      <div class="cell-item" @click="goRouter(1)">华语男歌手</div>
      <div class="cell-item" @click="goRouter(2)">华语女歌手</div>
      <div class="cell-item" @click="goRouter(3)">华语组合</div>
    </div>

    <div class="cell-group">
      <div class="cell-item" @click="goRouter(4)">日韩男歌手</div>
      <div class="cell-item" @click="goRouter(5)">日韩女歌手</div>
      <div class="cell-item" @click="goRouter(6)">日韩组合</div>
    </div>

    <div class="cell-group">
      <div class="cell-item" @click="goRouter(7)">欧美男歌手</div>
      <div class="cell-item" @click="goRouter(8)">欧美女歌手</div>
      <div class="cell-item" @click="goRouter(9)">欧美组合</div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { mapGetters } from 'vuex';

  export default{
    computed:{
      ...mapGetters(['toggleHide']),
    },
    methods:{
      goRouter(id){
        this.$router.push({path: `/singer/list/${id}`})
      }
    }
  }
</script>

<style type="text/css">
  .toggle_show_margin_bottom{margin-bottom: 109px;}
  .toggle_hide_margin_bottom{margin-bottom: 48px;}
</style>