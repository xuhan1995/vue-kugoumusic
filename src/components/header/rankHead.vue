<template>
  <div class="rank-head container" :style="cStyle" id="transparent-header">
    <a class="rank-head-back" @click="routerBack"></a>  <!-- 回退左三角 -->
    {{title}}
  </div>
</template>

<script type="text/javascript">
  export default {
    props:['cStyle','title'],
    methods:{
      routerBack(){
        this.$router.go(-1);
      }
    }
  }
</script>