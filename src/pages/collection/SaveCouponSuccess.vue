<template>
  <div class="page">
    <div class="card">
      <div class="blank-60"></div>
      <div class="icon-pay-success"></div>
      <div class="price-box" v-if="order.realAmount != order.amount">{{order.realAmount | formatPrice}} <span class="price-amount">{{order.amount | formatPrice}}</span></div>
      <div class="price-box" v-else>{{order.realAmount | formatPrice}}</span>
      </div>
      <div class="card-desc">支付完成</div>
      <div class="card-btn" @click="toShop">返回商家</div>
    </div>
    <div class="card-2">
      <div class="card-title">获得保障金<span class="orange">{{order.ensureAmount}}</span>，核销成功后即可到账</div>
      <div class="code-box">
        <div id="qrcode" class="code" ref="qrcode"></div>
      </div>
      <div class="desc-box">
        <div class="cell clearfix">
          <div class="cell-left">核销串码</div>
          <div class="cell-right">{{coupons.couponCode || ''}}</div>
        </div>
        <div class="cell margin-top clearfix">
          <div class="cell-left">有效日期</div>
          <div class="cell-right">{{!!coupons.expDate ? coupons.expDate.substring(0, 10) : ''}}</div>
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
  },
  methods: {
    getData() {
      api.collection.orderDetail({
        orderNo: this.orderNo,
        createDate: this.createDate,
      }).then((res) => {
        this.order = res.data[0];
        this.coupons = this.order.coupons;
        this.qrCode(this.order.twoBarCode);
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
    qrCode(url) {
      let { clientWidth, clientHeight } = this.$refs.qrcode;
      this.qrcode = new QRCode(this.$refs.qrcode, {
        // text: `http://cs-shop.juanzisc.com/merServer/index.html#/verificationConfirm?couponCode=${code}&userId=${userId}`,
        text: url,
        width: clientWidth,
        height: clientHeight,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    }
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  background: #F8F8FC;
}

.orange{
	color: #F05720;
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
  padding-top: 50px;
  padding-bottom: 116px;
  padding-left: 30px;
  padding-right: 30px;
  background: #FFF;
  box-sizing: border-box;
  .card-title {
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #2E3141;
    letter-spacing: 0;
    text-align: center;
    line-height: 36.4px;
  }
  .code-box {
    margin: 50px auto;
    box-sizing: border-box;
    width: 236px;
    height: 236px;
    border: 1px solid #E2E2E2;
    /*no*/
    border-radius: 10px;
    padding: 13px;
    .code {
      width: 100%;
      height: 100%;
    }
  }
}

.card {
  width: 100%;
  height: 492px;
  background: #FFF;
  .card-btn {
    margin: 0 auto;
    margin-top: 30.4px;
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
