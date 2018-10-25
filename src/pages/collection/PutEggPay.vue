<!-- 放置彩蛋-付款 -->
<template>
  <div class="page">
    <div class="card">
      <div class="card-title">支付金额</div>
      <div class="card-price"><span class="currency">￥</span>{{Number(amount).toFixed(2)}}</div>
    </div>
    <div class="section-title">支付方式</div>
    <div class="box pay on">微信支付</div>
    <div class="pay-btn" @click="pay">确认支付</div>
  </div>
</template>
<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex'
import * as _ from '@/util/tool.js'
import api from '@/fetch/api.js'
export default {
  computed: {
    ...mapGetters(['eggInfo']),
  },
  filters: {
    formatPrice(price) {
      if (typeof price != 'number') {
        return '0.00';
      }
      return price.toFixed(2);
    }
  },
  data() {
    return {
      shopId: '',
      amount: '',
      orderNo: '',
      wxPayData: {},
    }
  },
  mounted() {
    let { amount, orderNo, shopId } = this.$route.query;
    this.amount = amount;
    this.orderNo = orderNo;
    this.shopId = shopId;
  },
  methods: {
    ...mapActions({
      saveEgg: 'saveEgg',
      updateEggInfoByKey: 'updateEggInfoByKey',
    }),
    pay() {
      // 付款成功后调用生成彩蛋
      api.collection.unifiedorder({
        // ip: '192.168.0.113',
        totalFee: this.amount,
        openId: localStorage.getItem('openId') || '',
        body: '放置彩蛋微信红包',
        orderNo: this.orderNo,
        notifyUrl: 'http://cs.juanzisc.com:9000/userServer/APIForZone',
      }).then((res) => {
        this.wxPayData = res.data;
        if (typeof WeixinJSBridge == "undefined") {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', this.wxPay, false);
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', this.wxPay);
            document.attachEvent('onWeixinJSBridgeReady', this.wxPay);
          }
        } else {
          this.wxPay();
        }
      }).catch((err) => {
        console.log(err);
      })
    },
    wxPay() {
      let { appId, timeStamp, nonceStr, package: wx_package, signType, paySign } = this.wxPayData;
      let shopId = this.shopId;
      var _this = this;
      WeixinJSBridge.invoke('getBrandWCPayRequest', {
          "appId": appId,
          "timeStamp": timeStamp,
          "nonceStr": nonceStr,
          "package": wx_package,
          "signType": signType,
          "paySign": paySign
        },
        function(res) {
          switch (res.err_msg) {
            case 'get_brand_wcpay_request:cancel':
              _.alert('用户取消支付！');
              break;
            case 'get_brand_wcpay_request:fail':
              _.alert(`支付失败！（${res.err_desc}`);
              break;
            case 'get_brand_wcpay_request:ok':
              _.alert('支付成功！');
              _this.$router.push({
                path: '/collection/placementSuccess',
                query: {
                  shopId,
                }
              });
              break;
            default:
              _.alert(JSON.stringify(res));
              break;
          }
        }
      );
    }
  },
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  background: #F8F8FC;
}

.pay-btn {
  margin: 120px auto 0 auto;
  width: 570px;
  height: 88px;
  background: #F05720;
  border-radius: 44px;
  font-family: PingFangSC-Semibold;
  font-size: 36px;
  color: #FFFFFF;
  letter-spacing: 0;
  text-align: center;
  line-height: 88px;
}

.box {
  width: 100%;
  height: 88px;
  box-sizing: border-box;
  padding-left: 100px;
  padding-right: 99px;
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #2E3141;
  letter-spacing: 0;
  line-height: 88px;
  background: #FFF;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    top: 50%;
    margin-top: -20px;
    left: 30px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  &.pay::before {
    background-image: url('../../assets/images/ic_wechatpay.png');
  }
  &::after {
    content: '';
    position: absolute;
    width: 35px;
    height: 35px;
    top: 50%;
    margin-top: -17.5px;
    right: 32px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../assets/images/ic_select_grey.png');
  }
  &.on::after {
    background-image: url('../../assets/images/ic_select.png');
  }
}

.section-title {
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #2E3141;
  letter-spacing: 0;
  line-height: 92px;
  height: 92px;
  width: 100%;
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 30px;
}

.card {
  width: 100%;
  height: 264px;
  background: #FFF;
  .card-title {
    padding-top: 60px;
    font-family: PingFangSC-Medium;
    font-size: 36px;
    color: #2E3141;
    letter-spacing: 0;
    line-height: 41.6px;
    text-align: center;
  }
  .card-price {
    margin-top: 30px;
    font-family: PingFangSC-Medium;
    font-size: 72px;
    color: #F05720;
    letter-spacing: 0;
    line-height: 72px;
    text-align: center;
    .currency {
      font-size: 36px;
    }
  }
}

</style>
