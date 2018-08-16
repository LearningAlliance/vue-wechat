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
    <!-- TODO 缺少数据 -->
    <div class="section-4">
      <i class="icon-buy"></i>
      <div class="section-content">
        <div class="cell-header clearfix">
          <div class="title">买单</div>
          <div class="desc">返10%养老保障金</div>
        </div>
        <div class="cell-info">
          <div class="desc no-top">满100元立减5元 (周一至周五)</div>
          <div class="desc">满100元送小猪佩奇 (周一至周五)</div>
        </div>
      </div>
      <div class="btn" @click="payTheBill">买单</div>
    </div>
    <div class="section-4" v-if="eggNum > 0">
      <i class="icon-egg"></i>
      <div class="section-content">
        <div class="cell-header clearfix">
          <div class="title">本店有彩蛋<span class="orange">{{eggNum}}</span>个 </div>
        </div>
        <div class="cell-info">
          <div class="desc no-top">在该店内有效范围内开启</div>
        </div>
      </div>
      <div class="btn">开蛋</div>
      <div class="btn-desc">打开有惊喜</div>
    </div>
    <div class="vip-card" @click="toShopVipInfo" v-if="!!vipInfo.merLevelConfig.levelName">
      <div class="header">
        <div class="level">{{(vipInfo.merLevelConfig.levelName || '').toUpperCase()}}</div>
        <div class="shop-name">{{shopInfo.shopName}}</div>
      </div>
      <div class="cell-1">
        <div class="title">当前VIP权益</div>
        <div class="desc">{{vipInfo.merLevelConfig.levelDesc}}</div>
      </div>
      <div class="cell-2">
        <div class="title">{{(vipInfo.merLevelConfig.upgradeAmount || 0) | formatPrice}}元后升级可享</div>
        <div class="desc">{{vipInfo.nextmerLevelConfig.levelDesc}}</div>
      </div>
    </div>
    <div class="section-5" v-show="couponList.length > 0">
      <div class="header clearfix">
        <i class="icon-coupon"></i>
        <div class="title">优惠</div>
        <div class="desc">返{{shopInfo.pensionRate * 100}}%养老保障金</div>
      </div>
      <div class="blank"></div>
      <div class="list">
        <div :class="['cell', {'no-border': couponList.length - 1 == index}]" v-for="(item, index) in couponList" :key="'coupon' + index">
          <div class="coupon-img">
            <img :src="item.couponImg" />
          </div>
          <div class="cell-content">
            <div class="cell-shop-name">{{shopInfo.shopName}}</div>
            <div class="price">
              <span class="buy-price">{{item.buyPrice | formatPrice}}</span>
              <span class="coupon-price">{{item.couponPrice | formatPrice}}</span>
              <span class="discount">{{(item.buyPrice/item.couponPrice * 10).toFixed(1)}}折扣</span>
            </div>
            <div class="buy-btn" @click="buyCoupon(item.couponId)">购买</div>
            <div class="buy-num">{{item.couponNum - item.surplusNum}}人买过</div>
          </div>
        </div>
      </div>
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
      eggNum: 0, // 彩蛋数量
      stars: ['off', 'off', 'off', 'off', 'off'], // 评分列表
      vipInfo: {
        merLevelConfig: "",
        nextmerLevelConfig: "",
      },
      couponList: [],
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
    // 彩蛋数量 商家详情里有返回了
    // this.qrySysZoneCount();
    this.qryMerLevel();
    this.qryShopCoupon();
  },
  methods: {
    // 查询商家详情
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
        this.eggNum = res.data[0].zoneCount;
        this.stars = this.setStars(score);
      }).catch((err) => {});
    },
    // 商家彩蛋数量
    qrySysZoneCount() {
      api.collection.qrySysZoneCount({
        shopId: this.shopId,
        type: '2',
      }).then((res) => {
        let num = 0;
        let list = res.data;
        list.forEach((obj) => {
          if (obj.hasOwnProperty('type') && obj.type == '2') {
            num = obj.num;
          }
        })
        this.eggNum = num;
      }).catch((err) => {});
    },
    // 商铺会员等级信息
    qryMerLevel() {
      api.collection.qryMerLevel({
        shopId: this.shopId,
      }).then((res) => {
        this.vipInfo = res.data[0];
      }).catch((err) => {});
    },
    // 根据类型查询店铺优惠劵列表
    qryShopCoupon() {
      api.collection.qryShopCoupon({
        shopId: this.shopId,
        couponType: '3',
      }).then((res) => {
        this.couponList = res.data;
        console.log(res);
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
    toShopVipInfo() {
      this.$router.push({
        path: '/collection/shopVipInfo',
        query: {
          shopId: this.shopId,
        },
      });
    },
    buyCoupon(couponId) {
      this.$router.push({
        path: '/collection/couponDetail',
        query: {
          couponId,
        }
      });
    },
    payTheBill() {
      console.log('TODO 买单');
      this.$router.push({
        path: '/collection/payTheBill',
      });
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

.section-5 {
  margin-top: 20px;
  width: 100%;
  background: #FFF;
  box-sizing: border-box;
  padding-left: 30px;
  padding-top: 35px;
  padding-right: 30px;
  .list {
    width: 100%;
    background: #FFF;
    .cell {
      width: 100%;
      height: 160px;
      box-sizing: border-box;
      padding-top: 30px;
      padding-left: 120px;
      padding-right: 160px;
      position: relative;
      border-bottom: 1px solid #E2E2E2;
      /*no*/
      .buy-btn {
        position: absolute;
        top: 30px;
        right: 0;
        width: 140px;
        height: 50px;
        box-sizing: border-box;
        border: 3px solid #F05720;
        border-radius: 34px;
        font-family: PingFangSC-Semibold;
        font-size: 28px;
        color: #F05720;
        letter-spacing: 0;
        text-align: center;
        line-height: 44px;
      }
      .buy-num {
        position: absolute;
        top: 96px;
        right: 0;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #818B8F;
        letter-spacing: 0;
        text-align: right;
        line-height: 31.2px;
      }
      &.no-border {
        border: none;
      }
      .coupon-img {
        position: absolute;
        top: 30px;
        left: 0;
        width: 100px;
        height: 100px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .cell-content {
        width: 100%;
        .cell-shop-name {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-family: PingFangSC-Regular;
          font-size: 32px;
          color: #2E3141;
          letter-spacing: 0;
          line-height: 41.6px;
        }
        .price {
          margin-top: 19.4px;
          width: 100%;
          height: 36.4px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-family: PingFangSC-Semibold;
          font-size: 32px;
          color: #F05720;
          letter-spacing: 0;
          line-height: 36.4px;
          .buy-price {}
          .coupon-price {
            font-family: PingFangSC-Regular;
            font-size: 28px;
            color: #2E3141;
            letter-spacing: 0;
            line-height: 36.4px;
            text-decoration: line-through;
          }
          .discount {
            display: inline-block;
            height: 36.4px;
            font-family: PingFangSC-Regular;
            font-size: 22px;
            color: #FFFFFF;
            letter-spacing: -0.53px;
            text-align: center;
            line-height: 36.4px;
            background: #F05720;
            padding-left: 5px;
            padding-right: 5px;
          }
        }
      }
    }
  }
  .blank {
    width: 100%;
    height: 19px;
    background: #FFF;
  }
  .header {
    width: 100%;
    padding-left: 60px;
    height: 40px;
    box-sizing: border-box;
    position: relative;
    .icon-coupon {
      position: absolute;
      top: 0;
      left: 0;
      width: 40px;
      height: 40px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url('../../assets/images/ic_store_cheap.png');
    }
    .title {
      display: inline-block;
      float: left;

      font-family: PingFangSC-Medium;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
      line-height: 40px;
    }
    .desc {
      display: inline-block;
      float: left;
      margin-left: 10px;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #F05720;
      letter-spacing: 0;
      line-height: 40px;
    }
  }
}

.vip-card {
  margin: 30px auto 10px auto;
  width: 690px;
  height: 320px;
  box-sizing: border-box;
  padding-top: 30px;
  padding-left: 30px;
  padding-right: 30px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url('../../assets/images/icon_store_vip_bg.png');
  .header {
    width: 100%;
    height: 47px;
    position: relative;
    .level {
      position: absolute;
      top: 0;
      left: 0;
      width: 100px;
      height: 47px;
      font-family: PingFangSC-Semibold;
      font-size: 36px;
      color: #ECD9B7;
      letter-spacing: 0;
      text-align: center;
      line-height: 47px;
    }
    .shop-name {
      width: 100%;
      height: 47px;
      box-sizing: border-box;
      padding-left: 100px;
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #ECD9B7;
      letter-spacing: 0;
      text-align: right;
      line-height: 47px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .cell-1 {
    margin-top: 30px;
  }
  .cell-2 {
    margin-top: 20.8px;
  }
  .title {
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #ECD9B7;
    letter-spacing: 0;
    line-height: 36.4px;
  }
  .desc {
    margin-top: 10px;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #AEA189;
    letter-spacing: 0;
    line-height: 31.2px;
  }
}

.section-4 {
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  background: #FFF;
  margin-top: 20px;
  position: relative;
  .btn-desc {
    position: absolute;
    width: 140px;
    height: 31.2px;
    right: 30px;
    top: 108px;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #818B8F;
    letter-spacing: 0;
    text-align: center;
    line-height: 31.2px;
  }
  .btn {
    width: 140px;
    height: 68px;
    background: #F05720;
    border-radius: 34px;
    font-family: PingFangSC-Semibold;
    font-size: 32px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    line-height: 68px;
    box-sizing: border-box;
    position: absolute;
    top: 30px;
    right: 30px;
  }
  .icon-buy {
    position: absolute;
    top: 34px;
    left: 30px;
    width: 40px;
    height: 40px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../assets/images/ic_store_buy.png');
  }
  .icon-egg {
    position: absolute;
    top: 34px;
    left: 30px;
    width: 40px;
    height: 40px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../assets/images/ic_store_egg.png');
  }
  .section-content {
    width: 100%;
    box-sizing: border-box;
    padding-left: 60px;
    padding-right: 170px;
    .cell-header {
      width: 100%;
      height: 41.6px;
      .title {
        float: left;
        display: inline-block;
        font-family: PingFangSC-Medium;
        font-size: 32px;
        color: #2E3141;
        letter-spacing: 0;
        line-height: 41.6px;
        .orange {
          color: #F05720;
        }
      }
      .desc {
        margin-left: 10px;
        float: left;
        display: inline-block;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #F05720;
        letter-spacing: 0;
        line-height: 41.6px;
      }
    }
    .cell-info {
      width: 100%;
      margin-top: 22.4px;
      .desc {
        margin-top: 10.8px;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #818B8F;
        letter-spacing: 0;
        line-height: 31.2px;
        &.no-top {
          margin-top: 0;
        }
      }
    }
  }
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
