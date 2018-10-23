<template>
  <div class="page">
    <div class="blank"></div>
    <div class="section">
      <div class="cell clearfix">
        <div class="cell-left">{{couponInfo.couponName}}</div>
        <div class="cell-right">{{couponInfo.couponPrice | formatPrice}}</div>
      </div>
      <div class="line-box">
        <div class="line"></div>
      </div>
      <div class="cell clearfix">
        <div class="cell-left">数量</div>
        <div class="cell-right clearfix">
          <i class="icon-num icon-plus" @click="plus"></i><span class="num-text">{{num}}</span><i class="icon-num icon-minus" @click="minus"></i>
        </div>
      </div>
      <div class="line-box">
        <div class="line"></div>
      </div>
      <div class="cell clearfix">
        <div class="cell-left">小计</div>
        <div class="cell-right orange">{{couponTotalPrice | formatPrice}}</div>
      </div>
    </div>
    <div class="section margin-top-20">
      <div class="cell">
        <div class="cell-left">VIP折扣</div>
        <div class="cell-right orange">{{totalDiscount | formatPrice}}</div>
      </div>
    </div>
    <div class="section margin-top-20">
      <div class="cell">
        <div class="cell-left">手机号码</div>
        <!-- <div class="cell-right">{{userInfo.userPhone}}</div> -->
        <div class="cell-right">
          <input type="tel" class="input" v-model="userInfo.userPhone" maxlength="11" />
        </div>
      </div>
    </div>
    <div class="footer clearfix">
      <div class="footer-label">合计</div>
      <div class="footer-price">{{totalFee | formatPrice}}</div>
      <div class="footer-btn" @click="pay">去支付</div>
    </div>
  </div>
</template>
<script type="text/javascript">
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      couponInfo: {},
      num: 0,
      merId: null,
    }
  },
  created() {
    api.user.getUserInfo().then((res) => {
      let userInfo = res.data[0];
      this.$store.dispatch('setUserInfo', userInfo);
    }).catch((err) => {
      console.log(err);
    });
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
    couponTotalPrice() { // 原价的总和
      return this.num * this.couponInfo.couponPrice;
    },
    totalDiscount() {
      return (this.couponInfo.buyPrice - this.couponInfo.couponPrice) * this.num;
    },
    totalFee() {
      return (this.couponInfo.buyPrice * this.num);
    },
  },
  mounted() {
    let { couponId, merId } = this.$route.query;
    this.couponId = couponId;
    this.merId = merId;
    this.getDetail(couponId);
  },
  methods: {
    getDetail(couponId) {
      api.collection.merCouponDetail({
        couponId,
      }).then((res) => {
        this.couponInfo = res.data[0];
        if (this.couponInfo.surplusNum == 0) {
          this.num = 0;
          _.alert('已售完');
        } else {
          this.num = 1;
        }
      }).catch((err) => {});
    },
    plus() {
      if (this.num < this.couponInfo.surplusNum) {
        this.num++;
      } else {
        _.alert('没有更多了~');
      }
    },
    minus() {
      if (this.num >= 1) {
        this.num--;
      } else {
        _.alert('不能再更少了~');
      }
    },
    pay() {
      if (this.couponInfo.surplusNum == 0) {
        this.num = 0;
        _.alert('已售完');
        return;
      }
      if (this.num == 0) {
        _.alert('数量不能为0');
        return;
      }
      if(this.userInfo.userPhone.length != 11){
        _.alert('请输入完整的手机号后再进行提交');
        return;
      }
      api.collection.saveCouponOrder({
        buyNums: this.num,
        merId: this.merId,
        couponId: this.couponId,
      }).then((res) => {
        let params = res.data;
        _.alert('购买成功， todo 支付逻辑， 假装支付成功');
        setTimeout(() => {
          this.$router.push({
            path: '/collection/saveCouponSuccess',
            query: params,
          })
        }, 1000);
      }).catch((err) => {});
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

.blank {
  width: 100%;
  height: 20px;
  background: #F8F8FC;
}

.section {
  background: #FFF;
  &.margin-top-20 {
    margin-top: 20px;
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
  .cell {
    position: relative;
    width: 100%;
    min-height: 88px;
    box-sizing: border-box;
    padding-top: 19px;
    padding-left: 30px;
    padding-right: 30px;
    line-height: 50px;
    .cell-left {
      display: inline-block;
      float: left;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #2E3141;
      letter-spacing: 0;
      width: 70%;
    }
    .cell-right {
      display: inline-block;
      float: right;
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
      text-align: right;
      width: 30%;
      .num-text {
        display: inline-block;
        float: right;
        margin-left: 28px;
        margin-right: 28px;
      }
      .icon-num {
        display: inline-block;
        width: 50px;
        height: 50px;
        float: right;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        &.icon-minus {
          background-image: url('../../assets/images/ic_minus.png');
        }
        &.icon-plus {
          background-image: url('../../assets/images/ic_plus.png');
        }
      }
      .input {
        width: 100%;
        height: 100%;
        border: none;
        font-size: 32px;
        line-height: 50px;
        text-align: right;
      }
      &.orange {
        color: #F05720;
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
