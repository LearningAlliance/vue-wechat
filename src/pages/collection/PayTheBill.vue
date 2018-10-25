<template>
  <div class="page">
    <p class="shop-name">{{shopInfo.shopName || ''}}</p>
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
      <div class="section-cell line clearfix" v-if="payActNum != 0">
        <div class="cell-left">
          <span class="label">{{payActName}}</span>
        </div>
        <div class="cell-right">
          <span class="value orange">-{{discount}}元</span>
        </div>
      </div>

<!--       <div class="section-cell line clearfix" v-for="(item, index) in payActAll" v-if="payActAll.length > 0 && item.activityType == 10">
        <div class="cell-left">
          <span class="label">{{`满${item.couponLimit}元减${item.couponPrice}元`}}</span>
        </div>
        <div class="cell-right">
          <span class="value orange"></span>
        </div>
      </div> -->

      <div class="section-cell clearfix" @click="toUseCoupons">
        <div class="cell-left">
          <span class="label">代金券</span>
        </div>
        <div class="cell-right">
          <div class="icon-right-box">
            <i class="icon-right"></i>
          </div>
          <span class="value">{{payInfo.couponName}}</span>
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
          <span class="value orange">{{pensionAmount}}元</span>
        </div>
      </div>
    </div>
    <div class="blank"></div>
    <div class="footer clearfix">
      <div class="footer-label">合计</div>
      <div class="footer-price">{{total}}元</div>
      <div class="footer-btn" @click="toPay">确认支付</div>
    </div>
  </div>
</template>
<script type="text/javascript">
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      shopId: null,
      amount: null,
      hasPrice: null, // 是否有不参与优惠的金额， 默认没有
      price: null,
      payAct: {}, // 买单活动
      payActName: '',
      payActNum: 0,
      discount: 0, // 扣减金额
      couponLimit: 0, //满减限制
      pensionRate: 0, // 养老金比例
      shopInfo: {}, // 店铺详情
      payActAll: [], // 全部的买单活动
    }
  },
  mounted() {
    if(!_.isWx() && !sessionStorage.getItem('userAliId')){
      if(this.$route.query.hasOwnProperty('auth_code')){
        // 获取 userAliId
        let auth_code = _.getRequest('auth_code');
        api.common.getOpenIdByCode({ auth_code, }).then((res) => {
          let { userAliId } = res.data[0]; // userAliId
          sessionStorage.setItem('userAliId', userAliId);
          if (!userAliId) {
            return;
          }
          // TODO 后续这边可能用于手机绑定
          // api.common.wxLogin({ userAliId, }).then((res) => {
          //   console.log('wxLogin:', res);
          //   // return;
          //   // let token = res.data[0].token;
          //   let userid = res.data[0].userId;
          //   // localStorage.setItem('token', token);
          //   sessionStorage.setItem('userIdForAli', userid);
          // }).catch((err) => {
          //   console.log(err);
          // })
        }).catch((err) => {
          console.log(err);
        });
      } else{
        var newUrl = `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2017090608587613&scope=auth_base&redirect_uri=${encodeURIComponent(location.href)}`;
        console.log(newUrl);
        location.href = newUrl;
      }
    }
    let { amount = null, price = null, hasPrice = true } = this.payInfo;
    this.amount = amount;
    this.price = price;
    this.hasPrice = hasPrice;
    let { shopId } = this.$route.query;
    this.shopId = shopId;
    this.getPayAct();
    this.getShopDetail();
  },
  computed: {
    ...mapGetters([
      'payInfo',
    ]),
    total() {
      return (Number(this.amount) - Number(this.discount)).toFixed(2);
    },
    // 赠送养老金
    pensionAmount() {
      return ((Number(this.amount)) * Number(this.pensionRate)).toFixed(2);
    }
  },
  watch: {
    amount(newVal, oldVal) {
      this.updatePayInfoByKey({ amount: newVal });
      this.updatePayAct();
      if (newVal - this.price >= this.couponLimit) {
        this.discount = this.payActNum;
      } else {
        this.discount = 0;
      }
    },
    price(newVal, oldVal) {
      this.updatePayInfoByKey({ price: newVal });
      this.updatePayAct();
      if (this.amount - newVal >= this.couponLimit) {
        this.discount = this.payActNum;
      } else {
        this.discount = 0;
      }
    }
  },
  methods: {
    ...mapActions({
      setPayInfo: 'setPayInfo',
      clearPayINfo: 'clearPayINfo',
      updatePayInfoByKey: 'updatePayInfoByKey',
    }),
    updatePayAct(){
      if(this.payActAll.length > 0){
        let payFee = 0; // 实际支付金额
        if(this.hasPrice){
          payFee = this.amount - this.price > 0 ? this.amount - this.price : 0;
        }else {
          payFee = this.amount;
        }
        let len = this.payActAll.length;
        for(let i = 0; i < len; i++){
          if(this.payActAll[i].activityType != 10){
            continue;
          }
          if(i == 0 && payFee >= this.payActAll[0].couponLimit){
            this.payAct = this.payActAll[0];
          }else if(payFee < this.payActAll[i].couponLimit && !!this.payActAll[i + 1] && payFee >= this.payActAll[i + 1].couponLimit){
            this.payAct = this.payActAll[i + 1];
          }
        }
        this.payActName = `满${this.payAct.couponLimit}元减${this.payAct.couponPrice}元`;
        this.couponLimit = Number(this.payAct.couponLimit);
        this.payActNum = Number(this.payAct.couponPrice);
      }
    },
    changeHasPrice() {
      this.hasPrice = !this.hasPrice;
    },
    toUseCoupons() {
      this.updatePayInfoByKey({
        amount: this.amount,
        price: this.price,
        hasPrice: this.hasPrice,
        total: this.total,
      });
      this.$router.push({
        path: '/collection/useCoupons',
        query: {
          shopId: this.shopId,
        }
      });
    },
    // 获取买单活动
    getPayAct() {
      api.collection.qryShopCoupon({
        shopId: this.shopId,
        couponType: '2',
      }).then((res) => {
        this.payActAll = res.data.length > 0 ? res.data : [];
        let payAct = res.data.length > 0 ? res.data[res.data.length - 1] : {};
        this.payAct = payAct;
        if (payAct.activityType == 10) {
          this.payActName = `满${payAct.couponLimit}元减${payAct.couponPrice}元`;
          this.couponLimit = Number(payAct.couponLimit);
          this.payActNum = Number(payAct.couponPrice);
        }
      }).catch((err) => {});
    },
    getShopDetail() {
      api.collection.merShop({
        shopId: this.shopId,
      }).then((res) => {
        this.pensionRate = res.data[0].pensionRate || 0;
        this.shopInfo = res.data[0];
      }).catch((err) => {});
    },
    toPay() {
      if (this.amount <= 0 || !this.amount) {
        _.alert('请先输入订单金额');
        return;
      }
      var postData = {
        amount: this.total,
        shopId: this.shopId,
      };
      if(!_.isWx()){
        // postData.aliUserid = sessionStorage.getItem('userIdForAli') || '';
        postData.aliUserid = sessionStorage.getItem('userAliId') || '';
      }
      if (this.hasPrice && this.price > 0) {
        postData.price = this.price;
      }
      if (!!this.couponId) {
        postData.couponId = this.payInfo.couponId;
      }
      api.collection.saveOrderBaseInfo(postData).then((res) => {
        this.clearPayINfo();
        let { createDate, orderNo, url } = res.data;
        // _.alert('支付逻辑todo, 假装支付完成');
        // location.href = 'https://ibsbjstar.ccb.com.cn/CCBIS/QR?QRCODE=CCB9980005524947325807371';
        location.href = url;
        return;
        // TODO 支付完成跳转逻辑
        this.$router.push({
          path: '/collection/payTheBillSuccess',
          query: {
            createDate,
            orderNo,
          },
        });
      }).catch((err) => {})
    },
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
    &.no-price {
      background-image: url('../../assets/images/ic_select_grey.png');
    }
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
          background-image: url('../../assets/images/img_zengsong.png');
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
