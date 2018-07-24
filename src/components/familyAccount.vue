<template>
  <div class="section">
    <div class="header">
      <p class="title">亲情账户 </p>
      <span class="icon-label">管理</span>
      <span class="icon-right"></span>
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
.section {
  width: 100%;
  background: #fff;
  .header {
    width: 690px;
    height: 88px;
    margin: 0 auto;
    border-bottom: 1px solid #E2E2E2;
    position: relative;
    /*no*/
    .title {
      font-family: PingFangSC-Semibold;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
      text-align: center;
      line-height: 88px;
    }
    .icon-label {
      display: block;
      position: absolute;
      width: 147px;
      height: 88px;
      top: 0;
      right: 60px;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #818B8F;
      letter-spacing: 0;
      text-align: right;
      line-height: 88px;
    }
    .icon-right {
      display: block;
      position: absolute;
      width: 50px;
      height: 50px;
      top: 50%;
      right: 0;
      margin-top: -25px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url('../assets/images/ic_nextarrow.png');
    }
  }
}

</style>
