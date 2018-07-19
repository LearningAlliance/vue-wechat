<template>
  <div id="app">
    <v-toast v-show="showToast"></v-toast>
    <v-alert v-show="showAlert"></v-alert>
    <v-loading v-show="loading"></v-loading>
    <v-header :title="title" :menu-display="menuDisplay" :back-display="backDisplay" :map-display="mapDisplay" :header-display="headerDisplay"></v-header>
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
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'hideMenuSlide'
  },
  methods: {
    ...mapActions({ setNavState: 'setNavState' }),
    // 隐藏MenuSlide
    hideMenuSlide() {
      this.setNavState(false)
    }
  },
  computed: {
    ...mapGetters([
      'loading',
      'showToast',
      'showAlert'
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
      return false;
      return this.$route.path.split('/').length > 2 ? false : true
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
    background: #F8F8FC;
  }
  .topbar {
    padding-top: 100px;
  }
  .tabar {
    padding-bottom: 120px;
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
