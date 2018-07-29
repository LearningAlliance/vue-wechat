<!-- 个人中心-我的买单-优惠套餐 -->
<template>
  <div class="page">
    <div class="section">
      <div class="section-body">
        <div class="section-header clearfix">
          <img class="shop-logo" :src="myOrder.shopLogo" />
          <div class="shop-name">{{myOrder.shopName}}</div>
          <div class="shop-right-icon"></div>
          <div :class="['box-status', {'order-state-1': myOrder.orderState == 1, 'order-state-2': myOrder.orderState == 2 || myOrder.orderState == 3} ]">{{myOrder.orderState | formatOrderState}}</div>
        </div>
        <div class="line"></div>
        <div class="section-content">
          <p class="section-box clearfix">
            订单编号
            <span class="section-value">{{myOrder.orderNo}}</span>
          </p>
          <p class="section-box margin-top-30 clearfix">
            下单时间
            <span class="section-value">{{createDate}}</span>
          </p>
        </div>
      </div>
    </div>
    <div class="section-2">
      <div class="section-body-2">
        <div class="section-content-2 clearfix">
          消费金额
          <span class="section-value">{{Number((myOrder.amount || 0)/100).toFixed(2)}}元</span>
        </div>
        <div class="line"></div>
        <div class="section-content-3">
          <p class="section-p clearfix">
            代金券
            <span class="section-value">-{{Number((myOrder.cashPrice || 0)/100).toFixed(2)}}元</span>
          </p>
          <p class="section-p margin-top-28 clearfix">
            满减
            <span class="section-value">-{{Number((myOrder.activityPrice || 0)/100).toFixed(2)}}元</span>
          </p>
<!--           <p class="section-p margin-top-28 clearfix">
            优惠金额
            <span class="section-value">-{{Number(myOrder.discountAmount/100).toFixed(2)}}元</span>
          </p> -->
        </div>
        <div class="line"></div>
        <div class="section-content-4 clearfix">
          实付
          <span class="section-value price-text">{{Number((myOrder.realAmount || 0)/100).toFixed(2)}}元</span>
        </div>
      </div>
    </div>
    <div class="footer" v-show="myOrder.orderState == 1">
      <div class="footer-btns clearfix">
        <div class="btn pay-btn" @click="payOrder">去支付</div>
        <div class="btn cancel-btn" @click="cancelOrder">取消</div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { Loadmore, MessageBox } from 'mint-ui';
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
export default {
  props: ['myOrder', 'coupons', 'orderDetail', 'myOrderNo', 'createDate'],
  data() {
    return {
      // order: {
      //  coupons: null,
      //  orderDetail: null,
      // },
    }
  },
  created() {
    // console.log(this.coupons, this.orderDetail);
  },
  methods: {
    payOrder() {
      _.alert('TODO 支付');
    },
    cancelOrder() {
      _.alert('TODO 取消支付');
    }
  }
}

</script>
<style scoped lang="scss">
.section {
  margin-top: 20px;
  width: 100%;
  height: 273px;
  background: #FFF;
  .section-body {
    width: 690px;
    height: 273px;
    margin: 0 auto;
    box-sizing: border-box;
    overflow: hidden;
    .section-header {
      width: 100%;
      height: 108px;
      box-sizing: border-box;
      padding-top: 30px;
      padding-bottom: 30px;
      position: relative;
      .shop-logo {
        display: inline-block;
        float: left;
        width: 48px;
        height: 48px;
        margin-right: 20px;
      }
      .shop-name {
        display: inline-block;
        float: left;
        height: 48px;
        line-height: 48px;
        font-family: PingFangSC-Medium;
        font-size: 32px;
        color: #2E3141;
        letter-spacing: 0;
        max-width: 420px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 10px;
      }
      .shop-right-icon {
        display: inline-block;
        float: left;
        width: 48px;
        height: 48px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url('../assets/images/ic_back_right@2x.png');
      }
      .box-status {
        position: absolute;
        top: 33px;
        right: 0;
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #818B8F;
        letter-spacing: 0;
        text-align: right;
        line-height: 41.6px;
        &.order-state-1 {
          color: #F05720;
        }
        &.order-state-2 {
          color: #00B59F;
        }
      }
    }
    .line {
      width: 100%;
      height: 1px;
      /*no*/
      background: #E2E2E2;
    }
    .section-content {
      width: 100%;
      height: 164px;
      box-sizing: border-box;
      padding-top: 30px;
      padding-bottom: 30px;
      .section-box {
        width: 100%;
        height: 36.4px;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #2E3141;
        letter-spacing: 0;
        line-height: 36.4px;
        &.margin-top-30 {
          margin-top: 30.6px;
        }
        .section-value {
          display: inline-block;
          float: right;
          font-family: PingFangSC-Regular;
          font-size: 28px;
          color: #818B8F;
          letter-spacing: 0;
          text-align: right;
          line-height: 36.4px;
        }
      }
    }
  }
}

.margin-top-28 {
  margin-top: 28.6px;
}

.section-2 {
  margin-top: 20px;
  background: #FFF;
  width: 100%;
  height: 342px;
  .section-body-2 {
    width: 690px;
    margin: 0 auto;
    height: 342px;
    overflow: hidden;
    .line {
      width: 100%;
      height: 1px;
      /*no*/
      background: #E2E2E2;
    }
    .section-content-2 {
      width: 100%;
      height: 88px;
      box-sizing: border-box;
      padding-top: 26px;
      padding-bottom: 26px;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #2E3141;
      letter-spacing: 0;
      line-height: 36px;
      .section-value {
        display: inline-block;
        float: right;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #2E3141;
        letter-spacing: 0;
        text-align: right;
        line-height: 36px;
        &.price-text {
          font-family: PingFangSC-Semibold;
          font-size: 32px;
          color: #F05720;
          letter-spacing: 0;
          text-align: right;
          line-height: 46.8px;
        }
      }
    }
    .section-content-3 {
      width: 100%;
      height: 164px;
      box-sizing: border-box;
      padding-top: 32px;
      padding-bottom: 30.6px;
      .section-p {
        height: 36.4px;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #2E3141;
        letter-spacing: 0;
        line-height: 36.4px;
        .section-value {
          display: inline-block;
          float: right;
          font-family: PingFangSC-Regular;
          font-size: 28px;
          color: #F05720;
          letter-spacing: 0;
          text-align: right;
          line-height: 36px;
        }
      }
    }
    .section-content-4 {
      width: 100%;
      height: 88px;
      padding-top: 25px;
      padding-bottom: 26.6px;
      box-sizing: border-box;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #2E3141;
      letter-spacing: 0;
      line-height: 36.4px;
      .section-value {
        display: inline-block;
        float: right;
        font-family: PingFangSC-Semibold;
        font-size: 32px;
        color: #F05720;
        letter-spacing: 0;
        text-align: right;
        line-height: 36.4px;
      }
    }
  }
}

.footer {
  width: 100%;
  height: 120px;
  background: #FFF;
  position: fixed;
  bottom: 0;
  left: 0;
  padding-top: 26px;
  padding-bottom: 26px;
  box-sizing: border-box;
  .footer-btns {
    width: 690px;
    height: 68px;
    margin: 0 auto;
    .btn {
      height: 68px;
      line-height: 68px;
      display: inline-block;
      font-family: PingFangSC-Semibold;
      letter-spacing: 0;
      text-align: center;
      font-size: 32px;
      float: right;
      margin-left: 30px;
      box-sizing: border-box;
      &.pay-btn {
        width: 260px;
        background: #F05720;
        border-radius: 34px;
        color: #FFF;
      }
      &.cancel-btn {
        width: 180px;
        border: 3px solid #818B8F;
        border-radius: 34px;
        color: #818B8F;
      }
    }
  }
}

</style>
