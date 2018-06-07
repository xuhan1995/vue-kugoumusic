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
        if (!this.isPlay) {  //暂停情况下点击下一首，切换到下一首是自动播放的，所以要把状态从暂停改成播放
          this.$store.commit('isPlay',true)
        }
        this.$store.dispatch('next');
      },
      prev(){
        if (!this.isPlay) {  //暂停情况下点击上一首，切换到上一首是自动播放的，所以要把状态从暂停改成播放
          this.$store.commit('isPlay',true)
        }
        this.$store.dispatch('prev');
      }
    }
  },
}