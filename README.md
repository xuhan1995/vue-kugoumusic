# vue-kugoumusic
vue全家桶仿酷狗音乐

> 自学完Vue仿写的酷狗音乐项目，参考了[地址在这里](https://github.com/lavyun/vue-demo-kugou)，因为时间有限，用了其中的部分css，其余都重写了一遍，改变了一些实现方式，添加了一些功能。

## 技术栈
1. Vue全家桶(vue,vue-router,vuex)
2. axios(http)
3. jquery
4. mint-ui
5. element-ui
6. iconfont
7. [接口地址](https://github.com/ecitlm/Kugou-api)

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
1. MV
2. 下载，现在图标只是个摆设
3. 拖动歌词改变播放进度
...

## 存在的问题或bug
1. 音量没有和手机系统音量同步

2. newSongs路由点击banners音乐停止播放，因为是进入了新的url

3. 拖拽进度条时间过长则不会改变进度，现在用的是饿了吗组件的v-change指令

4. 手机测试时ui有问题，因为写得时候device选择的iphone8Plus，很多地方都是用px写的，用小米5sPlus测试问题很大

5. 在任意路由刷新后顶部navbar都显示在newSongs（即主页），应该显示在对应位置
