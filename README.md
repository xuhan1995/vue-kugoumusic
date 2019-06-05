# vue-kugoumusic
vue全家桶仿酷狗音乐

## 技术栈
1. Vue全家桶(vue,vue-router,vuex)
2. axios(http)
3. element-ui
4. [接口地址](https://github.com/ecitlm/Kugou-api)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 预览图
![2](https://github.com/xuhan1995/vue-kugoumusic/raw/master/screenshot/newSongs.png)
![2](https://github.com/xuhan1995/vue-kugoumusic/raw/master/screenshot/rank.png)
![2](https://github.com/xuhan1995/vue-kugoumusic/raw/master/screenshot/rankInfo.png)
![2](https://github.com/xuhan1995/vue-kugoumusic/raw/master/screenshot/plist.png)
![2](https://github.com/xuhan1995/vue-kugoumusic/raw/master/screenshot/plistInfo.png)
![2](https://github.com/xuhan1995/vue-kugoumusic/raw/master/screenshot/singer.png)
![2](https://github.com/xuhan1995/vue-kugoumusic/raw/master/screenshot/singerList.png)
![2](https://github.com/xuhan1995/vue-kugoumusic/raw/master/screenshot/singerInfo.png)
![2](https://github.com/xuhan1995/vue-kugoumusic/raw/master/screenshot/search.png)

## 已完成功能
1. 新歌（轮播图、歌单）
2. 排行（排行榜、榜单详情）
3. 歌单（歌单、歌单详情）
4. 歌手（歌手分类、分类列表、歌手歌单及介绍）
5. 搜索（带自动补全的搜索框、热门列表、搜索列表）
6. 播放器（显示歌名、歌手、播放/暂停、下一首）
7. 详情播放器（音量条、静音/取消静音、歌词随进度滚动、正在唱的歌词高亮、可改变进度的进度条、上一首、下一首、暂停/播放按钮、顶部歌曲信息长于屏幕宽度时滚动）

## 待完成功能
1. 歌单列表播放、随机播放、单曲循环
2. 收藏歌单
3. 拖动歌词改变播放进度
...

## 存在的问题或bug
1. 音量没有和手机系统音量同步

2. 拖拽进度条时间过长则不会改变进度

4. 手机测试时ui有问题，没有做兼容处理