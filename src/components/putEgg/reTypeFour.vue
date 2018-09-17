<!-- 微信红包 -->
<template>
  <div class="page">
    <div class="blank"></div>
    <div class="input-box">
      <div class="input-label">金额</div>
      <input class="input" type="number" v-model.number="amount" />
      <div class="input-unit">元</div>
    </div>
    <div class="amount-box"><span class="currency">￥</span>{{amount | formatPrice}}</div>
    <div class="amount-box-desc">您要放入的红包金额</div>
    <div :class="['submit-btn', {'on': !!amount && amount > 0}]" @click="next">生成</div>
    <div class="btn-desc">3天之内未被领取自动退回微信</div>
  </div>
</template>
<script type="text/javascript">
import * as _ from '@/util/tool.js'
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['eggInfo']),
  },
  data() {
    return {
      amount: null,
    }
  },
  watch: {
    amount(newVal, oldVal) {
      if (newVal > 10000) {
        this.amount = 10000;
        _.alert('已达到最大金额~');
      }
    }
  },
  filters: {
    formatPrice(price) {
      if (typeof price != 'number') {
        return '0.00';
      }
      return price.toFixed(2);
    }
  },
  mounted() {
    this.amount = this.eggInfo.amount;
    let { shopId } = this.$route.query;
    this.shopId = shopId;
  },
  methods: {
    ...mapActions({
      saveEgg: 'saveEgg',
      updateEggInfoByKey: 'updateEggInfoByKey',
    }),
    next() {
      if (!!this.amount && this.amount > 0) {
        this.updateEggInfoByKey({ amount: this.amount });
        this.$router.push({
          path: '/collection/putEggPay',
          query: {
            shopId: this.shopId,
          }
        })
      }
    }
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  background: #FFF;
}

.btn-desc {
  margin-top: 20px;
  width: 100%;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #818B8F;
  letter-spacing: 0;
  text-align: center;
  line-height: 41.6px;
}

.submit-btn {
  margin: 120px auto 80px auto;
  width: 570px;
  height: 88px;
  border-radius: 44px;
  font-family: PingFangSC-Semibold;
  font-size: 36px;
  color: #FFFFFF;
  letter-spacing: 0;
  text-align: center;
  line-height: 88px;
  background: #E2E2E2;
  &.on {
    background: #F05720;
  }
}

.amount-box-desc {
  margin: 27px auto 0 auto;
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #C4CACD;
  letter-spacing: 0;
  text-align: center;
  line-height: 31.2px;
}

.amount-box {
  margin: 100px auto 0 auto;
  width: 100%;
  height: 72px;
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

.input-box {
  margin: 0 auto;
  width: 690px;
  height: 120px;
  box-sizing: border-box;
  padding-left: 133px;
  padding-right: 133px;
  background: #FAFAFA;
  border-radius: 10px;
  position: relative;
  .input-label {
    position: absolute;
    width: 133px;
    height: 100%;
    top: 0;
    left: 0;
    font-family: PingFangSC-Medium;
    font-size: 36px;
    color: #2E3141;
    letter-spacing: 0;
    line-height: 120px;
    text-indent: 30px;
  }
  .input-unit {
    position: absolute;
    width: 133px;
    height: 100%;
    top: 0;
    right: 0;
    font-family: PingFangSC-Medium;
    font-size: 36px;
    color: #2E3141;
    letter-spacing: 0;
    line-height: 120px;
    text-align: center;
  }
  .input {
    width: 100%;
    height: 100%;
    background: #FAFAFA;
    font-family: PingFangSC-Medium;
    font-size: 36px;
    color: #333646;
    letter-spacing: 0;
    line-height: 120px;
    text-align: right;
  }
}

.blank {
  width: 100%;
  height: 60px;
  background: #FFF;
}

</style>
