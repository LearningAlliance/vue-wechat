<!-- 兑换商城-兑换成功 -->
<template>
  <div class="page">
    <div class="box">
      <img src="../../assets/images/img_success.png" />
      <p class="text">兑换成功</p>
      <p class="text-2">恭喜你，养老金 <span class="color-orange">+100</span>元</p>
    </div>
    <div class="btn-group clearfix">
      <div class="btn-show">查看养老金</div>
      <div class="btn-back">返回</div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {}
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  min-height: 100%;
  background: #fff;
  box-sizing: border-box;
  overflow: hidden;
  .box {
    width: 100%;
    img {
      display: block;
      width: 159.8px;
      height: 159.8px;
      margin: 60.1px auto 30.1px auto;
    }
    .text {
      margin-top: 30.1px;
      font-family: PingFangSC-Semibold;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
      text-align: center;
      line-height: 41.6px;
    }
    .text-2 {
      margin-top: 31.2px;
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
      text-align: center;
      line-height: 41.6px;
    }
    .color-orange {
      color: #F05720;
    }
  }
  .btn-group {
    width: 494px;
    height: 68px;
    margin: 120.6px auto 100px auto;
    .btn-show {
      display: inline-block;
      float: left;
      width: 260px;
      height: 68px;
      background: #F05720;
      border-radius: 34px;
      font-family: PingFangSC-Semibold;
      font-size: 32px;
      color: #FFFFFF;
      letter-spacing: 0;
      text-align: center;
      line-height: 68px;
    }
    .btn-back {
      display: inline-block;
      float: right;
      border: 3px solid #818B8F;
      border-radius: 34px;
      width: 194px;
      height: 68px;
      box-sizing: border-box;
      font-family: PingFangSC-Semibold;
      font-size: 32px;
      color: #818B8F;
      letter-spacing: 0;
      text-align: center;
      line-height: 62px;
    }
  }
}

</style>
