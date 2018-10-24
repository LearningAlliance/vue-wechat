<!-- reType = 4 -->
<template>
  <div class="page">
    <div class="title">获得红包</div>
    <div class="amount"><span class="currency">￥</span><span class="price">{{info.price || 0}}</span></div>
    <!-- <div class="desc">系统已自动通过微信零钱发放</div> -->
    <div class="desc">系统已自动存入保障金中</div>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    info: {
      required: true,
      type: Object,
      default: {},
    }
  },
  data() {
    return {}
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  margin-top: 50px;
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 30px;
}

.title {
  font-family: PingFangSC-Semibold;
  font-size: 32px;
  color: #F05720;
  letter-spacing: 0;
  text-align: center;
}

.amount {
  margin-top: 20px;
  width: 100%;
  height: 100px;
  text-align: center;
  .currency {
    display: inline-block;
    font-family: PingFangSC-Regular;
    font-size: 36px;
    color: #F05720;
    letter-spacing: 0;
    line-height: 100px;
  }
  .price {
    display: inline-block;
    font-family: PingFangSC-Medium;
    font-size: 72px;
    color: #F05720;
    letter-spacing: 0;
    line-height: 100px;
  }
}

.desc {
  margin-top: 11px;
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #818B8F;
  letter-spacing: 0;
  text-align: center;
  line-height: 31.2px;
}

</style>
