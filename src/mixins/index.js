module.exports = {
  'untils': {
    methods: {
      playAudio(index) {
        let hash = this.songList[index].hash;
        let info = {
          songList: this.songList,
          songIndex: index
        }
        this.$store.commit('setListInfo', info);  //不涉及异步用commit
        this.$store.dispatch('getSong', hash);    //涉及异步用dispatch0,用选中歌曲的hash值得到他的信息
        this.$store.commit('isPlay', true);    //开始播放啦！
      },
      toggleStatus(){
        if (this.isPlay) {
          jq('#audioPlay')[0].pause();
        }
        else{
          jq('#audioPlay')[0].play();
        }
        this.$store.commit('isPlay',!this.isPlay);
      },
      next(){
        this.$store.dispatch('next')
      },
      prev(){
        this.$store.dispatch('prev')
      }
    }
  },
}