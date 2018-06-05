<template>
  <div id="app">
    <Head />
    <div class="main">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <player-panel />
    <detail-player />
  </div>
</template>

<script>
  import Head from './components/header/head'
  import playerPanel from './components/playerPanel'
  import detailPlayer from './components/detailPlayer'

  export default {
    name: 'App',
    components:{
      Head,
      'player-panel': playerPanel,
      'detail-player': detailPlayer,
    },
    created(){
      //判断当前路由
      let routerPath = this.$router.history.current.path;
      this.setNav(routerPath)
    },
    methods:{
      setNav (routerPath) {
        if (routerPath.includes('/rank')) {
          this.$store.commit('setHeadNav','head-nav2');
        }
        else if (routerPath.includes('/plist')) {
          this.$store.commit('setHeadNav','head-nav3');
        }
        else if (routerPath.includes('/singer')) {
          this.$store.commit('setHeadNav','head-nav4');
        }
        else{
          this.$store.commit('setHeadNav','head-nav1');
        }
      }
    }
  }
  </script>

