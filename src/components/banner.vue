<template>
  <banner-inner v-if="list.length > 0" :list="list"></banner-inner>
</template>
<script type="text/javascript">
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
import bannerInner from '@/components/bannerInner'
export default {
  props: {
    type: {
      required: true,
      default: 1, // 类型1首页2发现
    },
  },
  data() {
    return {
      list: [],
    }
  },
  mounted() {
    this.qryBannerList();
  },
  components: {
    'banner-inner': bannerInner,
  },
  methods: {
    toUrl(url) {
      if (!url) {
        return;
      }
      if (url.indexOf('http') > -1) {
        window.location.href = url;
      } else {
        this.$router.push(url);
      }
      // window.location.href = url;
    },
    qryBannerList() {
      api.discovery.qryBannerList({
        type: this.type,
      }).then((res) => {
        let banner = res.data;
        this.list = banner;
      }).catch((err) => {});
    },
  }
}

</script>
<style scoped lang="scss">
::-webkit-scrollbar {
  display: none
}

.swiper-container {
  width: 100%;
  height: 360px;
  margin: 0 auto; // padding-top: 20px;
  padding-bottom: 20px;
  background: #FFF;
}

.banner-img {
  width: 100%;
  height: 100%;
}


// .banner-box {
//   width: 100%;
//   height: 360px;
//   display: box;
//   display: -webkit-box;
//   overflow-x: scroll;
//   padding-top: 20px;
//   padding-bottom: 20px;
//   box-sizing: border-box;
//   -webkit-overflow-scrolling: touch;
//   background: #fff;
//   .banner {
//     width: 650px;
//     height: 320px;
//     padding-left: 15px;
//     padding-right: 15px;
//     &.only-one {
//       margin: 0 auto;
//     }
//     &.first-banner {
//       width: 665px;
//       padding-left: 30px;
//     }
//     &.last-banner {
//       width: 665px;
//       padding-right: 30px;
//     }
//     .banner-img {
//       display: block;
//       border-radius: 12px;
//       overflow: hidden;
//       width: 100%;
//       height: 100%;
//     }
//   }
// }

</style>
