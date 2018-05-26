<template>
  <div>
      <div class="search_panel">
        <el-autocomplete
          class="inline-input"
          v-model="inputValue"
          :fetch-suggestions="querySearch"
          placeholder="歌手/歌名/拼音"
          :trigger-on-focus="false"
          @select="selectDataList"
          prefix-icon="el-icon-search"
        >
          <i slot="suffix" class="el-input__icon el-icon-close" v-show="inputValue" @click="clearInput"></i>
          <div slot-scope="{ item }">{{ item.filename }}</div>
        </el-autocomplete>
        <el-button type="success">搜索</el-button>
      </div>

<!--       <div class="hot-list">
        <div class="hot-list-title">最近热门</div>
          <mt-cell v-for="(song,index) in hotList" :title="song.filename" :key="index" @click.native="playAudio(index)">
              <img src="../assets/images/download_icon.png" width="20" height="20">
          </mt-cell>
      </div> -->
  </div>
</template>

<script type="text/javascript">
  import { Indicator } from 'mint-ui';
  import { untils } from '../mixins/';
  import { mapGetters } from 'vuex';

  export default {
    data: () => ({
      inputValue:'',
      searchResult:[],
      total:0,
      hotList:[],
    }),
    methods:{
      querySearch(queryString,cb){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        this.$http.get('/aproxy/api/v3/search/song?format=json&keyword=' + queryString + '&page=1&pagesize=20&showtype=1').then(({data}) =>{
          this.searchResult = data.data.info
          cb(this.searchResult);
        }).catch(error => {console.log(error);}).then(() => {
          Indicator.close();
        })
      },
      selectDataList(item){
        this.inputValue = item.filename;
      },
      clearInput(){
        this.inputValue = '';
      },
    }
  }
</script>

<style type="text/css">

</style>