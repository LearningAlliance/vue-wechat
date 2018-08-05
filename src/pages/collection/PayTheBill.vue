<template>
  <div class="page">
    <p class="shop-name">快乐肥宅茶武林店</p>
    <div class="amount-box">
      <div class="amount-label">订单金额(元)</div>
      <input type="number" class="amount" v-model.number="amount" placeholder="请与收银员确认金额" />
    </div>
    <div class="choice-box clearfix" @click="changeHasPrice">
      <div :class="['icon-choice', {'has-price': hasPrice, 'no-price': !hasPrice}]"></div>
      <div class="choice-desc">有不参加活动的金额，如酒水，套餐</div>
    </div>
    <div class="amount-box" v-show="hasPrice">
      <div class="amount-label">不参与活动金额(元)</div>
      <input type="number" class="amount" v-model.number="price" placeholder="请与收银员确认金额" />
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      amount: null,
      hasPrice: true, // 是否有不参与优惠的金额， 默认没有
      price: null,
    }
  },
  methods: {
    changeHasPrice(){
      this.hasPrice = !this.hasPrice;
    }
  },
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  min-height: 100%;
  background: #f8f8fc;
  box-sizing: border-box;
  overflow: hidden;
}

.shop-name {
  margin-top: 30px;
  width: 100%;
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 30px;
  font-family: PingFangSC-Medium;
  font-size: 32px;
  color: #2E3141;
  letter-spacing: 0;
  line-height: 41.6px;
  text-align: center;
}

.amount-box {
  width: 690px;
  height: 88px;
  background: #FFFFFF;
  border: 1px solid #E2E2E2;
  /*no*/
  border-radius: 12px; // box-sizing: border-box;
  margin: 30.4px auto 0 auto;
  position: relative;
  .amount-label {
    position: absolute;
    top: 0;
    left: 30px;
    width: 250px;
    height: 88px;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #2E3141;
    letter-spacing: 0;
    line-height: 88px;
  }
  .amount {
    position: absolute;
    top: 0;
    right: 30px;
    width: 334px;
    height: 88px;
    font-family: PingFangSC-Medium;
    font-size: 36px;
    color: #2E3141;
    letter-spacing: 0;
    text-align: right;
    color: #2E3141;
  }
}

.choice-box {
  width: 690px;
  height: 35px;
  margin: 35px auto 0 auto;
  .icon-choice {
    float: left;
    display: inline-block;
    width: 35px;
    height: 35px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin-right: 12px;
    &.has-price {
      background-image: url('../../assets/images/ic_select.png');
    }
    &.no-price {}
  }
  .choice-desc {
    float: left;
    display: inline-block;
    height: 35px;
    line-height: 35px;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #818B8F;
    letter-spacing: 0;
  }
}

input.amount::-webkit-input-placeholder {
  font-size: 28px;
  color: #C4CACD;
  line-height: 88px;
}

</style>
