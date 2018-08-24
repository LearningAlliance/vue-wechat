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
    }
  },
  mounted() {
    let { couponId } = this.$route.query;
    this.couponId = couponId;
    this.getDetail(couponId);
  },
  methods: {
    getDetail(couponId) {
      api.collection.merCouponDetail({
        couponId,
      }).then((res) => {
        this.couponInfo = res.data[0];
        if(this.couponInfo.surplusNum == 0){
          this.num = 0;
          _.alert('已售完');
        }else{
          this.num = 1;
        }
      }).catch((err) => {});
    },
    plus(){
      if(this.num < this.couponInfo.surplusNum){
        this.num++;
      }else{
        _.alert('没有更多了~');
      }
    },
    minus(){
      if(this.num >= 1){
        this.num --;
      }else {
        _.alert('不能再更少了~');
      }
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
    height: 88px;
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
    }
    .cell-right {
      display: inline-block;
      float: right;
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
      text-align: right;
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

</style>
