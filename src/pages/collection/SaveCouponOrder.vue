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
        <div class="cell-right">{{num}}</div>
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
        <div class="cell-right"></div>
      </div>
    </div>
    <div class="section margin-top-20">
      <div class="cell">
        <div class="cell-left">手机号码</div>
        <div class="cell-right"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
export default {
  data() {
    return {
      couponInfo: {},
      num: 1,
    }
  },
  computed: {
    couponTotalPrice() {
      return this.num * this.couponInfo.couponPrice;
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
      &.orange {
        color: #F05720;
      }
    }
  }
}

</style>
