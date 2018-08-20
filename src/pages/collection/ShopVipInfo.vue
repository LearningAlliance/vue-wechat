<template>
  <div class="page">
    <div class="vip-card" v-if="!!vipInfo.merLevelConfig.levelName">
      <div class="header">
        <div class="level">{{(vipInfo.merLevelConfig.levelName || '').toUpperCase()}}</div>
        <div class="top">顶级</div>
        <div class="shop-name">{{shopInfo.shopName}}</div>
      </div>
      <div class="cell-1">
        <div class="title">当前VIP权益</div>
        <div class="desc-1">买单{{vipInfo.merLevelConfig.levelRate * 100}}折  同享</div>
        <div class="desc-2">{{vipInfo.merLevelConfig.levelDesc}}</div>
      </div>
    </div>
    <div class="vip-box-all" v-if="!!vipInfo.allmerLevelConfig">
      <div class="title">VIP规则与权益</div>
      <div v-for="(item, index) in vipInfo.allmerLevelConfig" :key="'all' + index">
        <div class="vip-box">
          <div class="vip-level">
            <span class="text-golden">{{item.levelName.toUpperCase()}}  </span>累计消费 <span class="text-golden">{{item.upgradeAmount | formatPriceWithoutUnit}}元</span>
            <span class="top" v-if="vipInfo.allmerLevelConfig.length == item.levelGrade">顶级</span>
          </div>
          <div class="vip-desc">权益 买单{{item.levelRate * 100}}折 同享 &nbsp;&nbsp;&nbsp;{{item.levelDesc}}</div>
        </div>
        <i class="icon-down" v-if="vipInfo.allmerLevelConfig.length - 1 !== index"></i>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
export default {
  data() {
    return {
      vipInfo: {
        merLevelConfig: "",
        nextmerLevelConfig: "",
        allmerLevelConfig: [],
      },
    }
  },
  mounted() {
    let { shopId } = this.$route.query;
    this.shopId = shopId;
    this.qryMerLevel();
  },
  methods: {
    // 商铺会员等级信息
    qryMerLevel() {
      api.collection.qryMerLevel({
        shopId: this.shopId,
      }).then((res) => {
        this.vipInfo = res.data[0];
      }).catch((err) => {});
    },
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  min-height: 100%;
  box-sizing: border-box;
  background: #F8F8FC;
  padding-top: 40px;
}

.vip-box-all {
  width: 670px;
  margin: 30px auto;
  box-sizing: border-box;
  background: #F7F5F1;
  border: 1px solid #F1DFC0;
  /*no*/
  border-radius: 16px;
  padding-top: 47px;
  padding-bottom: 60px;
  text-align: center;
  .icon-down {
    display: block;
    margin: 0 auto;
    width: 20px;
    height: 40px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../assets/images/icon_vip_down.png');
  }
  .vip-box {
    width: 90%;
    margin: 0 auto 0 auto;
    box-sizing: border-box;
    padding-top: 30px;
    padding-bottom: 30px;
    text-align: center;
    .vip-level {
      position: relative;
      display: inline-block;
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
      line-height: 41.6px;
      .top {
        display: inline-block;
        top: 0;
        right: -95px;
        position: absolute;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #B2883C;
        width: 80px;
        height: 40px;
        text-align: center;
        border: 1px solid #B38934;
        /*no*/
        line-height: 38px;
        border-radius: 25px;
      }
      .text-golden {
        color: #B2883C;
      }
    }
    .vip-desc {
      margin-top: 20.4px;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #2E3141;
      letter-spacing: 0;
      line-height: 36.4px;
    }
  }
  .title {
    display: inline-block;
    font-family: PingFangSC-Semibold;
    font-size: 36px;
    color: #2E3141;
    letter-spacing: 0;
    text-align: center;
    line-height: 46.8px;
    position: relative;
    margin-bottom: 4.2px;
    &::before,
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      width: 39px;
      height: 21px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
    &::before {
      top: 50%;
      margin-top: -11px;
      left: -45px;
      background-image: url('../../assets/images/icon_vip_left.png');
    }
    &::after {
      top: 50%;
      margin-top: -11px;
      right: -45px;
      background-image: url('../../assets/images/icon_vip_right.png');
    }
  }
}

.vip-card {
  margin: 0 auto;
  width: 670px;
  height: 320px;
  box-sizing: border-box;
  padding-top: 50px;
  padding-left: 30px;
  padding-right: 30px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url('../../assets/images/icon_store_vip_bg.png');
  .header {
    width: 100%;
    height: 47px;
    position: relative;
    .top {
      position: absolute;
      top: 0;
      left: 110.5px;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #ECD9B7;
      width: 80px;
      height: 40px;
      text-align: center;
      border: 1px solid #B38934;
      /*no*/
      line-height: 38px;
      border-radius: 25px;
    }
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
      padding-left: 195.5px;
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
    margin-top: 52px;
  }
  .title {
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #ECD9B7;
    letter-spacing: 0;
    line-height: 36.4px;
  }
  .desc-1 {
    margin-top: 10px;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #AEA189;
    letter-spacing: 0;
    line-height: 31.2px;
  }
  .desc-2 {
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #AEA189;
    letter-spacing: 0;
    line-height: 31.2px;
  }
}

</style>
