<template>
  <div id="app">
    <v-toast v-show="showToast"></v-toast>
    <v-alert v-show="showAlert"></v-alert>
    <v-loading v-show="loading"></v-loading>
    <v-header :title="title" :menu-display="menuDisplay" :back-display="backDisplay" :map-display="mapDisplay" :header-display="headerDisplay" :right-text="rightText" :fun-name="funName"></v-header>
    <div class="content" :class="{tabar: tabar, topbar: headerDisplay}">
      <transition name="slide-left">
        <router-view v-wechat-title="$route.meta.title"></router-view>
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
    this.wxConfig();
    let routeName = this.$route.path.split('/')[1];
    this.setRouteName(routeName || '');
    try {
      let code = _.getRequest('code');
      if (!!code) {
        api.common.getOpenIdByCode({ code, }).then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
        });
      }
    } catch (e) {

    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'routeChanged'
  },
  methods: {
    ...mapActions({ setNavState: 'setNavState', setRouteName: 'setRouteName' }),
    // 隐藏MenuSlide
    routeChanged() {
      this.setNavState(false);
      let routeName = this.$route.path.split('/')[1];
      this.setRouteName(routeName || '');
      this.wxConfig();
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
      const wx = this.$wechat;
      let appId = config.appid || '';
      let timestamp = config.timestamp || '';
      let nonceStr = config.noncestr || '';
      let signature = config.signature || '';
      let jsApiList = this.$route.meta.jsApiList || [];
      wx.config({
        debug: false,
        appId: appId,
        timestamp: timestamp,
        nonceStr: nonceStr,
        signature: signature,
        jsApiList: jsApiList,
      });
      wx.ready(function() {
        wx.checkJsApi({
          jsApiList: jsApiList,
          success: function(res) {
            let flag = true;
            if(typeof(res.checkResult) == 'string'){
              res.checkResult = JSON.parse(res.checkResult);
            }
            for (let key in res.checkResult) {
              if (!res.checkResult[key]) {
                flag = false;
              }
            }
            if (!flag) {
              _.alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
              return;
            }
          }
        });
        // 调用js-sdk
        if (jsApiList.indexOf('getLocation') > -1) {
          wx.getLocation({
            type: 'gcj02',
            success: function(res) {
              _.alert(JSON.stringify(res));
            },
            cancel: function(res) {
              _.alert('用户拒绝授权获取地理位置');
            }
          });
        }
      });
      wx.error(function(res) {
        console.log('wx.error:' + res);
        _.alert('wx.error:' + res.errMsg);
      });
    },
  },
  computed: {
    ...mapGetters([
      'loading',
      'showToast',
      'showAlert',
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
  }
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
    height: 100%;
    min-height: 100%;
    box-sizing: border-box;
    background: #F8F8FC;
    &.tabar {
      margin-bottom: 120px;
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
