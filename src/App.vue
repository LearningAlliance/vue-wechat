<template>
  <div id="app">
    <v-toast v-show="showToast"></v-toast>
    <v-alert v-show="showAlert"></v-alert>
    <v-loading v-show="loading"></v-loading>
    <v-header :title="title" :menu-display="menuDisplay" :back-display="backDisplay" :map-display="mapDisplay" :header-display="headerDisplay" :right-text="rightText" :fun-name="funName"></v-header>
    <div class="content" :class="{tabar: tabar, topbar: headerDisplay}">
      <transition name="slide-left">
        <!-- 暂时只缓存收藏首页 -->
        <keep-alive>
          <router-view v-wechat-title="$route.meta.title" v-if="keepAlive"></router-view>
        </keep-alive>
      </transition>
      <transition name="slide-left">
        <router-view v-wechat-title="$route.meta.title" v-if="!keepAlive"></router-view>
      </transition>
    </div>
    <v-tabar></v-tabar> 
    <v-sidebar></v-sidebar>
  </div>
</template>
<script>
import tabar from '@/components/tabar'
import header from '@/components/header'
import sidebar from '@/components/sidebar'
import toast from '@/components/toast'
import alert from '@/components/alert'
import loading from '@/components/loading'
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
import VueAMap from 'vue-amap';
import { lazyAMapApiLoaderInstance } from 'vue-amap';

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',
  components: {
    'v-tabar': tabar,
    'v-header': header,
    'v-sidebar': sidebar,
    'v-toast': toast,
    'v-alert': alert,
    'v-loading': loading,
  },
  data() {
    return {

    }
  },
  created() {
    let routeName = this.$route.path.split('/')[1];
    this.setRouteName(routeName || '');
    try {
      let code = _.getRequest('code');
      if (!!code && !localStorage.getItem('token') && !localStorage.getItem('uid')) {
        api.common.getOpenIdByCode({ code, }).then((res) => {
          // console.log(res);
          let { userWecharId } = res.data[0]; //openid
          if (!userWecharId) {
            return;
          }
          api.common.wxLogin({ userWecharId, }).then((res) => {
            // console.log('getToken:', res);
            let token = res.data[0].token;
            let userid = res.data[0].userId;
            localStorage.setItem('token', token);
            localStorage.setItem('uid', userid);
          }).catch((err) => {
            console.log(err);
          })
        }).catch((err) => {
          console.log(err);
        });
      }
    } catch (e) {

    }
    try {
      if (_.isWx()) {
        this.wxConfig();
      } else {
        this.pcConfig();
      }
    } catch (e) {

    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'routeChanged'
  },
  methods: {
    ...mapActions({ setNavState: 'setNavState', setRouteName: 'setRouteName', setLatitude: 'setLatitude', setLongitude: 'setLongitude', setFormattedAddress: 'setFormattedAddress', setLatitude: 'setLatitude', setLongitude: 'setLongitude' }),
    // 隐藏MenuSlide
    routeChanged() {
      this.setNavState(false);
      let routeName = this.$route.path.split('/')[1];
      this.setRouteName(routeName || '');
      try {
        if (_.isWx()) {
          this.wxConfig();
        } else {
          this.pcConfig();
        }
      } catch (e) {

      }
    },
    // 通过高德api获取地址信息
    getLocationByAMap() {
      var self = this;
      if (!!self.longitude && !!self.latitude) {
        self.getAddress(self.longitude, self.latitude);
        return;
      }
      lazyAMapApiLoaderInstance.load().then(() => {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: 'RB'
        })

        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete)
        AMap.event.addListener(geolocation, 'error', onError)

        function onComplete(data) {
          // console.log('定位完成', data);
          // data是具体的定位信息
          self.setFormattedAddress(data.formattedAddress || '未定位');
          // lng、lat
          self.setLatitude(data.position.lat);
          self.setLongitude(data.position.lng);
        }

        function onError(err) {
          // console.log('定位失败', err);
          // 定位出错
          self.setFormattedAddress('定位失败');
          _.alert('定位出错，可刷新页面进行重新定位');
          // _.alert(err.message);
        }
      });
    },
    getAddress(longitude, latitude) {
      var self = this;
      lazyAMapApiLoaderInstance.load().then(() => {
        var geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: "all"
        });
        geocoder.getAddress([longitude, latitude], function(status, result) {
          // console.log('getAddress:', status, result);
          if (status === 'complete' && result.info === 'OK') {
            self.address = result.regeocode.formattedAddress;
            self.setFormattedAddress(result.regeocode.formattedAddress);
          }
        });
      });
    },
    pcConfig() { // 方便测试时使用的兼容浏览器的方法
      var self = this;
      let getLocation = this.$route.meta.getLocation || false;
      if (getLocation) {
        self.getLocationByAMap();
      }
    },
    wxConfig() {
      let { wxConfig, jsApiList } = this.$route.meta;
      if (!wxConfig) {
        return;
      }
      api.common.getWxConfig().then((res) => {
        this.doConfig(res.data[0]);
      }).catch((err) => {
        console.log(err);
      });
    },
    doConfig(config) {
      var self = this;
      const wx = this.$wechat;
      let appId = config.appid || '';
      let timestamp = config.timestamp || '';
      let nonceStr = config.noncestr || '';
      let signature = config.signature || '';
      let jsApiList = this.$route.meta.jsApiList || [];
      let getLocation = this.$route.meta.getLocation || false;
      let hasAudio = this.$route.meta.hasAudio || false;
      let AudioIndex = this.$route.meta.AudioIndex || 0;
      wx.config({
        // debug: process.env.NODE_ENV == "development" ? true : false,
        debug: false,
        appId: appId,
        timestamp: timestamp,
        nonceStr: nonceStr,
        signature: signature,
        jsApiList: jsApiList,
      });
      wx.ready(function() {
        if(hasAudio){
          // console.log(docoument)
          document.getElementsByTagName('Audio')[AudioIndex].play();
        }
        // wx.checkJsApi({
        //   jsApiList: jsApiList,
        //   success: function(res) {
        //     let flag = true;
        //     if (typeof(res.checkResult) == 'string') {
        //       res.checkResult = JSON.parse(res.checkResult);
        //     }
        //     for (let key in res.checkResult) {
        //       if (!res.checkResult[key]) {
        //         flag = false;
        //       }
        //     }
        //     if (!flag) {
        //       _.alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
        //       return;
        //     }
        //   }
        // });
        // 调用js-sdk
        if (getLocation) {
          wx.getLocation({
            type: 'gcj02',
            success: function(res) {
              // _.alert(JSON.stringify(res));
              self.setLatitude(res.latitude);
              self.setLongitude(res.longitude);
              self.getAddress(res.longitude, res.latitude);
              // api.common.getAddress({ lon: this.longitude, lat: this.latitude }).then((res) => {
              //   console.log(res);
              //   // TODO 地址设置
              // }).catch((err) => {
              //   console.log(err);
              // });
            },
            cancel: function(res) {
              _.alert('用户拒绝授权获取地理位置,尝试使用浏览器定位...');
              self.getLocationByAMap();
            }
          });
        }
      });
      wx.error(function(res) {
        // console.log('wx.error:' + res.errMsg);
        if (getLocation) {
          self.getLocationByAMap();
        }
      });
    },
  },
  computed: {
    ...mapGetters([
      'loading',
      'showToast',
      'showAlert',
      'longitude',
      'latitude',
    ]),
    title() {
      let {
        subTitle
      } = this.$route.meta;
      if (!!subTitle) {
        return subTitle
      }
    },
    tabar() {
      // todo 暂时不显示底部栏，后续显示条件变更
      let { showTabar } = this.$route.meta;
      return !!showTabar ? showTabar : false;
    },
    headerDisplay() {
      let {
        subTitle
      } = this.$route.meta;
      return !!subTitle;
    },
    keepAlive() {
      return !!this.$route.meta.keepAlive;
    },
    menuDisplay() {
      return false;
      let {
        subTitle
      } = this.$route.meta;
      return !!subTitle;
      // if (this.$route.path.split('/')[1] == 'home') {
      //   return false
      // }
      // return this.$route.path.split('/').length > 2 ? false : true
    },
    backDisplay() {
      let {
        subTitle
      } = this.$route.meta;
      return !!subTitle;
      // return this.$route.path.split('/').length > 2 ? true : false
    },
    rightText() {
      let { rightText } = this.$route.meta;
      return !!rightText ? rightText : '';
    },
    funName() {
      let { funName } = this.$route.meta;
      return !!funName ? funName : '';
    },
    mapDisplay() {
      // TODO 默认不显示右边定位按钮
      return false;
      if (this.$route.path.split('/')[1] == 'home') {
        return true
      }
      return false
    }
  },
}

</script>
<style lang="scss">
@font-face {
  font-family: 'icon';
  /* project id 172436 */
  src: url('//at.alicdn.com/t/font_w71lovnj7adobt9.eot');
  src: url('//at.alicdn.com/t/font_w71lovnj7adobt9.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_w71lovnj7adobt9.woff') format('woff'),
  url('//at.alicdn.com/t/font_w71lovnj7adobt9.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_w71lovnj7adobt9.svg#iconfont') format('svg');
}

// @font-face {
//   font-family: PingFang-SC-Semibold;
//   src: url("../../fonts/PingFang-SC-Semibold.ttf");
// }
// @font-face {
//   font-family: PingFangSC-Regular;
//   src: url("../../fonts/PingFang_Regular.otf");
// }
// * {
//   font-family: PingFangSC-Medium, sans-serif;
// }
.icon {
  font-family: "icon" !important;
  font-size: 18px;
  font-style: normal;
  color: #ffffff;
}

html,
body {
  height: 100%;
  background: #F8F8FC;
}

::-webkit-scrollbar {
  display: none
}

a.active {
  text-decoration: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  background: #F8F8FC;
  .content {
    height: 100%; //为了能够保存keepalive的组件位置 而去掉
    min-height: 100%;
    box-sizing: border-box;
    background: #F8F8FC;
    &.tabar {
      padding-bottom: 100px;
    }
    &.topbar {
      padding-top: 100px;
    }
  } //渐变动效
  .slide-left-enter-active,
  .slide-left-leave-active {
    transition: all .1s ease-in;
    opacity: 1;
  }
  .slide-left-enter,
  .slide-left-leave-active {
    opacity: 0;
  } //左滑动效
  // .slide-left-enter-active {
  //   animation: slideLeft .3s;
  // }
}

.with-shadow {
  -moz-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

input[type=search]::-webkit-search-cancel-button {
  -webkit-appearance: none; //此处只是去掉默认的小×
}

input[type=number] {
  -moz-appearance: textfield;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}


.clearfix:after {
  display: block;
  content: '';
  clear: both;
  visibility: hidden;
}

@keyframes slideLeft {
  from {
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

</style>
