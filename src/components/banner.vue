<template>
  <div class="banner-box">
    <div v-if="list.length > 1" :class="['banner', {'first-banner': index == 0, 'last-banner': index == list.length - 1}]" v-for="(item, index) in list" @click="toUrl(item.url)">
      <img class="banner-img with-shadow" :src="item.img" />
    </div>
    <div class="banner only-one" v-else @click="toUrl(list[0].url)">
    	<img class="banner-img with-shadow" :src="list[0].img" />
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      list: [
      {
        "desc": "水上乐园",
        "img": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533207455626&di=6f6cb1d383718c6b29b8f087ca2a5453&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fback_pic%2F00%2F04%2F27%2F49%2F80bb0f440cd934b893bbcf3e07bc096a.jpg",
        "url": "/userServer/index.html"
      }
      , {
        "desc": "水上乐园",
        "img": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533207455626&di=6f6cb1d383718c6b29b8f087ca2a5453&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fback_pic%2F00%2F04%2F27%2F49%2F80bb0f440cd934b893bbcf3e07bc096a.jpg",
        "url": "/userServer/index.html"
      }, {
        "desc": "水上乐园",
        "img": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533207455626&di=6f6cb1d383718c6b29b8f087ca2a5453&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fback_pic%2F00%2F04%2F27%2F49%2F80bb0f440cd934b893bbcf3e07bc096a.jpg",
        "url": "/userServer/index.html"
      }, {
        "desc": "水上乐园",
        "img": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533207455626&di=6f6cb1d383718c6b29b8f087ca2a5453&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fback_pic%2F00%2F04%2F27%2F49%2F80bb0f440cd934b893bbcf3e07bc096a.jpg",
        "url": "/userServer/index.html"
      }, 
      ]
    }
  },
  methods: {
    toUrl(url) {
      this.$router.push(url);
    }
  }
}

</script>
<style scoped lang="scss">
::-webkit-scrollbar {
  display: none
}

.banner-box {
  width: 100%;
  height: 360px;
  display: box;
  display: -webkit-box;
  overflow-x: scroll;
  padding-top: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  background: #fff;
  .banner {
    width: 650px;
    height: 320px;
    padding-left: 15px;
    padding-right: 15px;
    &.only-one{
    	margin: 0 auto;
    }
    &.first-banner {
      width: 665px;
      padding-left: 30px;
    }
    &.last-banner {
      width: 665px;
      padding-right: 30px;
    }
    .banner-img {
      display: block;
      border-radius: 12px;
      overflow: hidden;
      width: 100%;
      height: 100%;
    }
  }
}

</style>
