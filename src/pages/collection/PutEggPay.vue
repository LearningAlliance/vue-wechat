<!-- 放置彩蛋-付款 -->
<template>
  <div class="page">
    <div class="card">
      <div class="card-title">支付金额</div>
      <div class="card-price"><span class="currency">￥</span>{{eggInfo.amount | formatPrice}}</div>
    </div>
    <div class="section-title">支付方式</div>
    <div class="box pay on">微信支付</div>
    <div class="pay-btn" @click="pay">确认支付</div>
  </div>
</template>
<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex'
import * as _ from '@/util/tool.js'
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
    return {}
  },
  methods: {
  	pay(){
  		_.alert('支付todo');
  		// 付款成功后调用生成彩蛋 TODO
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
