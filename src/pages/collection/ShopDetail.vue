<!-- 店铺详情 -->
<template>
  <div class="page">
    <div class="top-bar clearfix">
      <i class="icon icon-back" @click="toBack"></i>
      <i class="icon icon-home" @click="toHome"></i>
      <span class="top-bar-desc">已特别关注</span>
      <i class="icon-attention"></i>
    </div>
    <div class="section-1">
      <div class="cell">
        <div class="cell-left">
          <div class="shop-name">{{shopInfo.shopName}}</div>
          <div class="score-box clearfix">
            <div class="star clearfix">
              <div v-for="(item, index) in stars" :class="['star-item', item]" track-by="index"></div>
            </div>
            <span class="score">综合{{shopInfo.score}}分</span>
          </div>
        </div>
        <div class="collect-btn">收藏该店</div>
      </div>
      <div class="other-info clearfix">
        <div class="avg-consume" v-show="!!shopInfo.avgConsume">人均消费 {{shopInfo.avgConsume}}元</div>
        <div class="collect-coupon" v-show="!!shopInfo.collectCoupon">
          <div class="text-1" v-show="shopInfo.collectCoupon.hasOwnProperty('couponPrice')">新客到店收藏领{{shopInfo.collectCoupon.couponPrice || ''}}元券</div>
          <div class="text-2" v-show="shopInfo.collectCoupon.hasOwnProperty('couponLimit')">(满{{shopInfo.collectCoupon.couponLimit || ''}}元可用)</div>
        </div>
      </div>
    </div>
    <div class="section-2 clearfix">
      <div class="cell first" v-if="!!shopInfo.shopVideo">
        视频
      </div>
      <div class="cell" v-if="!!shopInfo.mainImgUrl">
        <img class="image" :src="shopInfo.mainImgUrl" />
      </div>
      <!-- TODO -->
      <!--       <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div>
      <div class="cell"></div> -->
      <div class="cell-blank"></div>
    </div>
    <div class="line-box">
      <div class="line"></div>
    </div>
    <div class="section-3">
      <i class="icon-address"></i>
      <div class="shop-info">
        <div class="shop-address" @click="openLocation">{{shopInfo.shopAddress}}</div>
        <div class="shop-distance">距您{{shopInfo.distance | formatDistance}}</div>
      </div>
      <div class="line"></div>
      <i class="icon-tel" @click="makePhone(shopInfo.shopTel)"></i>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
export default {
  data() {
    return {
      shopInfo: {
        collectCoupon: {}
      },
      stars: ['off', 'off', 'off', 'off', 'off'], // 评分列表
    }
  },
  computed: {
    ...mapGetters([
      'longitude',
      'latitude',
    ]),
    getLocationOver() {
      return !!this.longitude && !!this.latitude;
    },
  },
  watch: {
    getLocationOver(val, oldVal) {
      if (val) {
        this.getShopDetail();
      }
    },
  },
  mounted() {
    let { shopId } = this.$route.query;
    this.shopId = shopId;
    if (!!this.longitude && !!this.latitude) {
      this.getShopDetail();
    }
  },
  methods: {
    getShopDetail() {
      api.collection.merShop({
        shopId: this.shopId,
        shopLon: this.longitude.toString(),
        shopLat: this.latitude.toString(),
      }).then((res) => {
        // let obj = {
        //   couponPrice: 200,
        //   couponLimit: 2000,
        // }
        // res.data[0].collectCoupon = obj;
        this.shopInfo = res.data[0];
        let score = res.data[0].score;
        this.stars = this.setStars(score);
      }).catch((err) => {});
    },
    openLocation() {
      const wx = this.$wechat;
      var self = this;
      wx.openLocation({
        latitude: self.shopInfo.shopLat, // 纬度，浮点数，范围为90 ~ -90
        longitude: self.shopInfo.shopLon, // 经度，浮点数，范围为180 ~ -180。
        name: self.shopInfo.shopName, // 位置名
        address: self.shopInfo.shopAddress, // 地址详情说明
        scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
      });
    },
    setStars(sc) {
      if (typeof(sc) == 'string') {
        sc = Number(sc);
      }
      let result = [];
      let score = sc * 10;
      let integer = Math.floor(score / 10);
      if (integer >= 5) {
        integer = 5;
      }
      let hasDecimal = (score % 10 < 10) && (score % 10 > 0);
      for (let i = 0; i < integer; i++) {
        result.push("on");
      }
      if (hasDecimal) {
        result.push("half");
      }
      while (result.length < 5) {
        result.push("off");
      }
      return result;
    },
    toBack() {
      this.$router.history.go(-1);
    },
    toHome() {
      this.$router.push({
        path: '/collection',
      });
    },
    makePhone(tel) {
      window.location.href = `tel:${tel}`;
    },
  },
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  min-height: 100%;
  box-sizing: border-box;
  background: #F8F8FC;
}

.section-3 {
  width: 100%; // height: 139px;
  box-sizing: border-box;
  padding: 30px;
  background: #FFF;
  position: relative;
  min-height: 139px;
  .line {
    position: absolute;
    background: #E2E2E2;
    width: 1px;
    /*no*/
    height: 50px;
    top: 44px;
    right: 140px;
  }
  .icon-tel {
    position: absolute;
    top: 49px;
    right: 50px;
    display: block;
    width: 40px;
    height: 40px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../assets/images/ic_store_phone.png');
  }
  .icon-address {
    position: absolute;
    display: block;
    width: 40px;
    height: 40px;
    top: 30px;
    let: 30px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../assets/images/ic_store_location.png');
  }
  .shop-info {
    width: 100%;
    box-sizing: border-box;
    padding-right: 140px;
    padding-left: 60px;
    .shop-address {
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
      line-height: 41.6px;
    }
    .shop-distance {
      margin-top: 5.4px;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #818B8F;
      letter-spacing: 0;
      line-height: 31.2px;
    }
  }
}

.line-box {
  width: 100%;
  height: 1px;
  /*no*/
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 30px;
  .line {
    width: 100%;
    height: 100%;
    background: #E2E2E2;
  }
}

.section-2 {
  width: 100%;
  height: 226px;
  background: #FFF;
  box-sizing: border-box;
  padding-top: 30px;
  padding-bottom: 50px;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  display: box;
  display: -webkit-box;
  background: #FFF;
  .cell {
    width: 180px;
    height: 146px;
    margin-left: 10px;
    margin-right: 10px;
    background: #F8F8FC;
    box-sizing: border-box;
    border-radius: 12px;
    overflow: hidden;
    &.first {
      margin-left: 30px;
    }
    .image {
      width: 100%;
      height: 100%;
    }
  }
  .cell-blank {
    width: 30px;
    height: 100%;
    background: #FFF;
  }
}

.section-1 {
  width: 100%;
  box-sizing: border-box;
  padding-top: 20px;
  padding-left: 30px;
  padding-right: 30px;
  background: #FFF;
  .other-info {
    margin-top: 30px;
    height: 77px;
    .avg-consume {
      display: inline-block;
      float: left;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #2E3141;
      letter-spacing: 0;
    }
    .collect-coupon {
      display: inline-block;
      float: right;
      .text-1 {
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #2E3141;
        letter-spacing: 0;
        text-align: right;
      }
      .text-2 {
        margin-top: 9.4px;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #818B8F;
        letter-spacing: 0;
        text-align: right;
        line-height: 31.2px;
      }
    }
  }
  .cell {
    width: 100%;
    min-height: 68px;
    position: relative;
    box-sizing: border-box;
    padding-right: 230px;
    .cell-left {
      .shop-name {
        font-family: PingFangSC-Semibold;
        font-size: 32px;
        color: #2E3141;
        line-height: 41.6px;
      }
      .score-box {
        width: 100%;
        margin-top: 11.4px;
        height: 40px;
        .star {
          display: inline-block;
          float: left;
          width: 200px;
          height: 40px;
          .star-item {
            display: inline-block;
            float: left;
            width: 40px;
            height: 40px;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            &.on {
              background-image: url('../../assets/images/ic_rate.png');
            }
            &.half {
              background-image: url('../../assets/images/ic_rate_halfgrey.png');
            }
            &.off {
              background-image: url('../../assets/images/ic_rate_grey.png');
            }
          }
        }
        .score {
          display: inline-block;
          float: left;
          margin-left: 20px;
          font-family: PingFangSC-Regular;
          font-size: 28px;
          color: #2E3141;
          letter-spacing: 0;
          line-height: 40px;
        }
      }
    }
    .collect-btn {
      position: absolute;
      top: 0;
      right: 0;
      width: 200px;
      height: 68px;
      box-sizing: border-box;
      border: 1px solid #C4CACD;
      /*no*/
      border-radius: 34px;
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
      text-align: center;
      line-height: 66px;
    }
  }
}

.top-bar {
  width: 100%;
  height: 100px;
  background: #FFF;
  box-sizing: border-box;
  padding: 25px 20px 25px 31px;
  display: block;
  position: relative;
  .icon {
    display: inline-block;
    float: left;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    &.icon-back {
      width: 50px;
      height: 50px;
      background-image: url('../../assets/images/ic_back@2x.png');
    }
    &.icon-home {
      position: absolute;
      top: 50%;
      margin-top: -19px;
      left: 80px;
      width: 38px;
      height: 34px;
      background-image: url('../../assets/images/icon_home.png');
    }
  }
  .icon-attention {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: inline-block;
    position: absolute;
    width: 100px;
    height: 100px;
    top: 0;
    right: 0;
    background-image: url('../../assets/images/ic_like.png');
  }
  .top-bar-desc {
    height: 100%;
    margin-right: 90px;
    float: right;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #2E3141;
    letter-spacing: 0;
    text-align: right;
    line-height: 50px;
  }
}

</style>
