// 保障金card
<template>
  <div class="card">
    <div class="desc">
      我的保障金(元)
    </div>
    <div class="amount">1000.00</div>
    <div class="card-footer">
      <div class="complete" v-if="!canUseSafeguard" @click="toComplate">
        完善身份信息后可用，去完善>>
      </div>
      <div class="box clearfix" v-else>
        <div class="cell left">
          <div class="btn" @click="toShop">兑换</div>
          <p>已兑换养老金100元</p>
        </div>
        <div class="cell right">
          <div class="btn no-bg" @click="toGive">转赠</div>
          <p>可转赠给亲友</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import * as _ from '@/util/tool.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    toComplate() {
      this.$router.push('/mine/safeguardComplete')
    },
    toShop(){
    	_.alert('TODO 跳转到兑换商城')
    },
    toGive(){
      this.$router.push('/mine/safeguardGive')
    }
  },
  computed: {
    ...mapGetters([
      'canUseSafeguard'
    ]),
  }
}

</script>
<style scoped lang="scss">
.card {
  width: 690px;
  height: 391px;
  margin: 0 auto;
  background: #FFFFFF;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.10);
  border-radius: 32px;
  overflow: hidden;
  .desc {
    width: 233px;
    height: 42px;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #818B8F;
    letter-spacing: 0;
    text-align: center;
    line-height: 42px;
    padding-top: 60px;
    margin: 0px auto 10px auto;
  }
  .amount {
    font-family: PingFangSC-Semibold;
    font-size: 64px;
    color: #F05720;
    letter-spacing: 0;
    text-align: center;
    line-height: 83.2px;
    height: 83.2px;
  }
  .card-footer {
    margin-top: 40.8px;
    width: 100%;
    .complete {
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
      text-align: center;
      line-height: 41.6px;
    }
    .box {
      width: 100%;
      height: 124.4px;
      .cell {
        width: 50%;
        text-align: center;
        &.left {
          width: 50%;
          float: left;
        }
        &.right {
          width: 50%;
          float: right;
        }
        .btn {
          display: inline-block;
          width: 180px;
          height: 68px;
          box-sizing: border-box;
          line-height: 62px;
          font-family: PingFangSC-Semibold;
          font-size: 32px;
          color: #F05720;
          letter-spacing: 0;
          text-align: center;
          background: #F05720;
          border-radius: 34px;
          border: 3px solid #F05720;
          color: #fff;
          &.no-bg {
            background: #fff;
            border: 3px solid #F05720;
            color: #F05720;
          }
        }
        p {
          margin-top: 20px;
          font-family: PingFangSC-Regular;
          font-size: 28px;
          color: #818B8F;
          letter-spacing: 0;
          text-align: center;
          line-height: 36.4px;
        }
      }
    }
  }
}

</style>
