<template>
  <div>
      <!-- 搜索框 -->
      <div class="search_panel">
        <el-autocomplete
          class="inline_input"
          v-model="inputValue"
          :fetch-suggestions="querySearch"
          placeholder="歌手/歌名/拼音"
          :trigger-on-focus="false"
          @select="selectDataList"
          :select-when-unmatched="true"
          prefix-icon="el-icon-search"
        >
          <i slot="suffix" class="el-input__icon el-icon-close" v-show="inputValue" @click="clearInput"></i>
          <div slot-scope="{ item }">{{ item.filename }}</div>
        </el-autocomplete>
         <el-button type="success" style="background-color:#2ba2fa;" @click="search">搜索</el-button>
      </div>
      <!-- 热歌列表 -->
      <div class="hot_list" v-if="!togglePanel">
        <div class="hot_list_title">最近热门</div>
          <mt-cell v-for="(hotTitle,index) in hotList" :title="hotTitle.keyword" :key="index" @click.native="replaceInputValue(hotTitle)">
          </mt-cell>
      </div>
      <!-- 搜索得到歌单 -->
      <div class="song_list" v-else>
        <div class="total_result">
          共有{{total}}条搜索结果
        </div>
        <mt-cell v-for="(song,index) in songList" :title="song.filename" :key="index" @click.native="playAudio(index)">
          <img src="../assets/images/download_icon.png" width="20" height="20">
        </mt-cell>
      </div>
  </div>
</template>

<script type="text/javascript">
  import { Indicator } from 'mint-ui';
  import { untils } from '../mixins/';

  export default {
    mixins:[untils],
    data: () => ({
      togglePanel:false,
      inputValue:'',
      total:0,
      hotList:[],  //一开始显示热门歌单
      songList:[],  //inputValue不为空时显示songList
    }),
    created(){
      this.getHotList();
    },
    methods:{
      //获取热门列表的函数
      getHotList(){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        this.$http.get('/aproxy/api/v3/search/hot?format=json&plat=0&count=30').then(({data}) =>{
          this.hotList = data.data.info;
        }).then(() => {
          Indicator.close();
        })
      },
      //实时搜索框相关逻辑
      querySearch(queryString,cb){
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        this.$http.get('/aproxy/api/v3/search/song?format=json&keyword=' + queryString + '&page=1&pagesize=10&showtype=1').then(({data}) =>{
          this.songList = data.data.info;
          if (this.inputValue) {
            jq('div.el-autocomplete-suggestion').show();
            cb(this.songList);
          }
          else{
            jq('div.el-autocomplete-suggestion').hide();
          }
        }).catch(error => {console.log(error);}).then(() => {
          Indicator.close();
        })
      },
      selectDataList(item){
        if (item.hasOwnProperty('value')) {
          if (item.value) {
            this.inputValue = item.value;
            this.search();
          }
          else{
            this.togglePanel = false;
          }
        }
        else{
          this.inputValue = item.filename;
          this.search();
        }
      },
      clearInput(){
        this.inputValue = '';
      },
      search(){
        if (this.inputValue) {
          Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
          this.$http.get('/aproxy/api/v3/search/song?format=json&keyword=' + this.inputValue + '&page=1&pagesize=200&showtype=1').then(({data}) =>{
          this.songList = data.data.info;
          this.total = data.data.total;
          this.togglePanel = true;
        }).catch(error => {console.log(error);}).then(() => {
          Indicator.close();
        })
        }
        else{
          this.togglePanel = false;
        }
      },
      //hotTitle的点击事件
      replaceInputValue(hotTitle){  //将搜索框中内容换成点击的hotTitle
        this.inputValue = hotTitle.keyword;
        this.search();
      }
    }
  }
</script>

<style type="text/css">
.search_panel{
    height: 55px;margin-top: 94px; padding: 10px;background-color: #fbfbfb;
}
.inline_input{
  float: left;width: 80%; height: 100%;
}
.el-input__inner{
  height: 35px;
}
.el-button{float: right; width:18%; height: 35px;}
/*.el-button--success{background-color: #2ba2fa; border-color: #2ba2fa;}*/
.hot_list{margin-bottom: 109px;}
.hot_list_title,.total_result {padding: 10px;color: deepskyblue}
.song_list{margin-bottom: 109px;}
.total_result{padding: 5px 10px;background-color: #e1e1e1;color: #484848;}
.mint-cell-title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}   /*限制单行显示*/
.mint-cell-text{font-size: 15px;}
</style>