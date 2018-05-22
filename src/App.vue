<template>
  <div id="app">
    <Head />
    <div class="main">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <player-panel />
  </div>
</template>

<script>
  import Head from './components/header/head'
  import playerPanel from './components/playerPanel'
  export default {
    name: 'App',
    components:{
      Head,
      'player-panel': playerPanel,
    }
  }
  </script>

