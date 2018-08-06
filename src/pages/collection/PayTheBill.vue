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
    <div class="section">
      <div class="section-cell line clearfix">
        <div class="cell-left">
          <span class="label">满100减20</span>
        </div>
        <div class="cell-right">
          <span class="value orange">-40元</span>
        </div>
      </div>
      <div class="section-cell clearfix">
        <div class="cell-left">
          <span class="label">代金券</span>
        </div>
        <div class="cell-right">
          <div class="icon-right-box">
            <i class="icon-right"></i>
          </div>
          <span class="value">未使用</span>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="section-cell clearfix">
        <div class="cell-left">
          <span class="label">赠送养老金</span>
          <div class="icon-left-box">
            <i class="icon-left"></i>
          </div>
        </div>
        <div class="cell-right">
          <span class="value orange">8元</span>
        </div>
      </div>
    </div>
    <div class="blank"></div>
    <div class="footer clearfix">
      <div class="footer-label">合计</div>
      <div class="footer-price">494元</div>
      <div class="footer-btn">确认支付</div>
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
    changeHasPrice() {
      this.hasPrice = !this.hasPrice;
    }
  },
}

</script>
<style scoped lang="scss">
.blank {
  width: 100%;
  height: 140px;
}

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
}

.section {
  margin-top: 38px;
  width: 100%;
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 30px;
  background: #FFF;
  .section-cell {
    width: 100%;
    box-sizing: border-box;
    height: 88px;
    position: relative;
    &.line {
      border-bottom: 1px solid #E2E2E2;
      /*no*/
    }
    .cell-left {
      display: inline-block;
      float: left;
      .label {
        display: inline-block;
        float: left;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #2E3141;
        letter-spacing: 0;
        line-height: 88px;
      }
      .icon-left-box {
        display: inline-block;
        float: left;
        width: 50px;
        height: 88px;
        position: relative;
        .icon-left {
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -15px;
          margin-left: -15px;
          width: 50px;
          height: 30px;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-image: url('../../assets/images/img_youli.png');
        }
      }
    }
    .cell-right {
      display: inline-block;
      float: right;
      .value {
        display: inline-block;
        float: right;
        font-family: PingFangSC-Regular;
        letter-spacing: 0;
        text-align: right;
        line-height: 88px;
        font-size: 28px;
        color: #818B8F;
        &.orange {
          color: #F05720;
        }
      }
      .icon-right-box {
        float: right;
        display: inline-block;
        width: 32px;
        height: 88px;
        position: relative;
        .icon-right {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 32px;
          height: 32px;
          margin-left: -16px;
          margin-top: -16px;
          display: inline-block;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-image: url('../../assets/images/ic_back_right@2x.png');
        }
      }
    }
  }
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px;
  background: #FFF;
  .footer-label {
    display: inline-block;
    float: left;
    font-family: PingFangSC-Medium;
    font-size: 32px;
    color: #818B8F;
    margin-left: 30px;
    letter-spacing: 0;
    line-height: 120px;
  }
  .footer-price {
    display: inline-block;
    float: left;
    margin-left: 10px;
    font-family: PingFangSC-Medium;
    font-size: 48px;
    color: #00001D;
    letter-spacing: 0;
    line-height: 120px;
  }
  .footer-btn {
    display: inline-block;
    float: right;
    margin-top: 16px;
    margin-right: 30px;
    width: 270px;
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
}

</style>
