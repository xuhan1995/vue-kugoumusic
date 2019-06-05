<template>
  <div class="header">
    <head-logo />
    <rank-head v-if="head.toggle" :title="head.title" :cStyle="head.style" />
    <head-nav v-else/>
  </div>
</template>

<script type="text/javascript">
  import headLogo from './headLogo';
  import headNav from './headNav';
  import rankHead from './rankHead';
  import { mapGetters } from 'vuex';
  export default {
    computed:{
      ...mapGetters(['head'])  //用这种方式获取store的getters中的数据,与下面等价
      // head(){
      //   return this.$store.getters.head;
      // }
    },
    components:{
      'head-logo':headLogo,
      'head-nav': headNav,
      'rank-head': rankHead,
    }
  }
</script>
