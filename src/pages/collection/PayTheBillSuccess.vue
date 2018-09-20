<template>
  <div class="page">
    <div class="card">
      <div class="blank-60"></div>
      <div class="icon-pay-success"></div>
      <div class="price-box" v-if="order.realAmount != order.amount">{{order.realAmount | formatPrice}} <span class="price-amount">{{order.amount | formatPrice}}</span></div>
      <div class="price-box" v-else>{{order.realAmount | formatPrice}}</span>
      </div>
      <div class="card-desc">支付完成</div>
      <div class="card-btn-box clearfix">
        <div class="card-btn card-btn-left" @click="toComment">评价有礼</div>
        <div class="card-btn card-btn-right" @click="toShop">返回商家</div>
      </div>
    </div>
    <div class="card-2" v-if="coupons.length != 0">
      <!-- <div class="card-title">活动</div> -->
      <div class="card-title">支付领券</div>
    </div>
    <div class="coupon-list-box" v-if="coupons.length != 0">
      <div class="coupon-list clearfix">
        <div class="list-1" v-if="index % 3 == 0" v-for="(item, index) in coupons">
          <div class="cell">
            <div class="cell-name">{{item.name}}</div>
            <div class="cell-desc">{{item.desc}}</div>
            <div :class="['cell-state', {'state-1': item.state == 1}]" @click="doCoupon(index)">{{item.state == '0' ? '领取' : '去使用'}}</div>
          </div>
        </div>
        <div class="list-2" v-if="index % 3 == 1" v-for="(item, index) in coupons">
          <div class="cell">
            <div class="cell-name">{{item.name}}</div>
            <div class="cell-desc">{{item.desc}}</div>
            <div :class="['cell-state', {'state-1': item.state == 1}]" @click="doCoupon(index)">{{item.state == '0' ? '领取' : '去使用'}}</div>
          </div>
        </div>
        <div class="list-3" v-if="index % 3 == 2" v-for="(item, index) in coupons">
          <div class="cell">
            <div class="cell-name">{{item.name}}</div>
            <div class="cell-desc">{{item.desc}}</div>
            <div :class="['cell-state', {'state-1': item.state == 1}]" @click="doCoupon(index)">{{item.state == '0' ? '领取' : '去使用'}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import QRCode from 'qrcodejs2'
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
export default {
  data() {
    return {
      orderNo: null,
      createDate: null,
      order: {},
      coupons: {},
    }
  },
  mounted() {
    let { orderNo, createDate } = this.$route.query;
    this.orderNo = orderNo;
    this.createDate = createDate;
    this.getData();
    this.qryCommendCouponList();
  },
  methods: {
    getData() {
      api.collection.orderDetail({
        orderNo: this.orderNo,
        createDate: this.createDate,
      }).then((res) => {
        this.order = res.data[0];
      }).catch((err) => {});
      // api.collection.qryOrderMerCouponList({
      // 	orderNo: this.orderNo,
      // }).then((res) => {
      // 	console.log(res);
      // }).catch((err) => {});
    },
    qryCommendCouponList() {
      api.collection.qryCommendCouponList({
        orderNo: this.orderNo
      }).then((res) => {
        console.log(res);
        this.coupons = res.data;

        // TODO 测试数据 
        // this.coupons = [{
        //     "id": 1,
        //     "desc": "5折",
        //     "shopId": 2,
        //     "name": "5折优惠券",
        //     "state": 1
        //   },
        //   {
        //     "id": 1,
        //     "desc": "5折",
        //     "shopId": 2,
        //     "name": "5折优惠券",
        //     "state": 0
        //   },
        //   {
        //     "id": 1,
        //     "desc": "5折",
        //     "shopId": 2,
        //     "name": "5折优惠券",
        //     "state": 0
        //   },
        //   {
        //     "id": 1,
        //     "desc": "5折",
        //     "shopId": 2,
        //     "name": "5折优惠券",
        //     "state": 0
        //   },
        //   {
        //     "id": 1,
        //     "desc": "5折",
        //     "shopId": 2,
        //     "name": "5折优惠券",
        //     "state": 0
        //   },
        // ]
      }).catch((err) => {});
    },
    toShop() {
      this.$router.push({
        path: '/collection/shopDetail',
        query: {
          shopId: this.order.shopId,
        }
      })
    },
    toComment() {
      // 评价
      this.$router.push({
      	path: '/collection/commnetForPay',
      	query: {
      		orderNo: this.orderNo,
      	}
      })
    },
    doCoupon(index) {
      if (this.coupons[index].state == 0) {
        _.alert('TODO 领取');
      } else if (this.coupons[index].state == 1) {
        this.$router.push({
          path: '/collection/couponDetail',
          query: {
            couponId: this.coupons[index].id,
          }
        })
      }
    },
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  background: #F8F8FC;
}

.orange {
  color: #F05720;
}

.coupon-list-box{
	width: 100%;
	background: #FFF;
}
.coupon-list {
  margin: 0 auto;
  width: 730px;
  background: #FFF;
  padding-bottom: 30px;
  .list-1,
  .list-2,
  .list-3 {
    width: 33%;
    display: inline-block;
    float: left;
    .cell {
      margin: 0 auto;
      margin-bottom: 30px;
      width: 216px;
      height: 229px;
      box-sizing: border-box;
      padding-left: 20px;
      padding-right: 20px;
      border: 1px solid #E2E2E2;
      /*no*/
      border-radius: 4px;
      .cell-state {
        margin: 30px auto 0 auto;
        width: 118px;
        height: 44px;
        line-height: 44px;
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #FFFFFF;
        letter-spacing: 0;
        border: 1px solid #F05720;
        /*no*/
        background: #F05720;
        border-radius: 22.5px;
        &.state-1 {
          background: #FFF;
          color: #F05720;
        }
      }
      .cell-name {
        margin-top: 15px;
        margin-bottom: 15px;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #2E3141;
        letter-spacing: 0;
        line-height: 31.2px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .cell-desc {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        /* autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
        width: 176px;
        height: 62.4px;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #818B8F;
        letter-spacing: 0;
        line-height: 31.2px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal!important;
      }
    }
  }
}

.desc-box {
  margin: 40px auto 0 auto;
  width: 440px;
  height: 120px;
  background: #FAFAFA;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 20px 40px;
  .cell {
    font-family: PingFangSC-Regular;
    font-size: 28px;
    line-height: 28px;
    color: #2E3141;
    letter-spacing: 0;
    position: relative;
    &.margin-top {
      margin-top: 24px;
    }
    .cell-left {
      position: absolute;
      top: 0;
      left: 0;
    }
    .cell-right {
      width: 100%;
      padding-left: 40%;
      box-sizing: border-box;
    }
  }
}

.card-2 {
  width: 100%;
  margin-top: 20px;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 30px;
  padding-right: 30px;
  background: #FFF;
  box-sizing: border-box;
  .card-title {
    font-family: PingFangSC-Medium;
    font-size: 32px;
    color: #2E3141;
    letter-spacing: 0;
    line-height: 41.6px;
  }
}

.card {
  width: 100%;
  height: 492px;
  background: #FFF;
  .card-btn-box {
    margin: 0 auto;
    width: 570px;
    margin-top: 30.4px;
    .card-btn {
      display: inline-block;
      background: #F05720;
      border-radius: 34px;
      width: 260px;
      height: 68px;
      font-family: PingFangSC-Semibold;
      font-size: 32px;
      color: #FFFFFF;
      letter-spacing: 0;
      text-align: center;
      line-height: 68px;
      &.card-btn-left {
        float: left;
        border: 1px solid #F05720;
        /*no*/
      }
      &.card-btn-right {
        float: right;
        border: 1px solid #818B8F;
        /*no*/
        color: #818B8F;
        background: #FFF;
      }
    }
  }
  .card-desc {
    margin-top: 9.6px;
    font-family: PingFangSC-Medium;
    font-size: 32px;
    color: #2E3141;
    letter-spacing: 0;
    text-align: center;
    line-height: 41.6px;
  }
  .blank-60 {
    width: 100%;
    height: 60px;
  }
  .icon-pay-success {
    margin: 0 auto;
    width: 160px;
    height: 160px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../assets/images/img_paysuccess.png');
  }
  .price-box {
    margin-top: 30px;
    text-align: center;
    font-family: PingFangSC-Semibold;
    font-size: 48px;
    color: #F05720;
    letter-spacing: 0;
    text-align: center;
    line-height: 62.4px;
    .price-amount {
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
      line-height: 62.4px;
      text-decoration: line-through;
    }
  }
}

</style>
