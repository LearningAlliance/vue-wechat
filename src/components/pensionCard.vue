<template>
  <div class="section">
  	<i class="help"></i>
    <p class="p-1">昨日收益(元)</p>
    <p class="p-2">1.02</p>
    <p class="p-3">2018-06-01</p>
    <div class="box clearfix">
      <div class="left">
        <p class="label">总余额(元)</p>
        <p class="value">3620.00</p>
      </div>
      <div class="right">
        <p class="label">累计收益(元)</p>
        <p class="value">3620.00</p>
      </div>
    </div>
    <div class="blank"></div>
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
  height: 427px;
  background: #FFF;
  position: relative;
  z-index: 21;
  .blank{
  	position: absolute;
  	bottom: 0;
  	left: 0;
  	width: 100%;
  	height: 20px;
  	background: #F8F8FC;
  }
  .help{
  	position: absolute;
  	width: 40px;
  	height: 40px;
  	top: 31px;
  	right: 30px;
  	background-size: 100% 100%;
  	background-repeat: no-repeat;
  	background-image: url('../assets/images/ic_question.png');
  }
  .p-1 {
    width: 100%;
    height: 42px;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #818B8F;
    letter-spacing: 0;
    text-align: center;
    line-height: 42px;
    padding-top: 60px;
  }
  .p-2 {
    width: 100%;
    height: 83.2px;
    line-height: 83.2px;
    padding-top: 10px;
    font-family: PingFangSC-Semibold;
    font-size: 64px;
    color: #F05720;
    letter-spacing: 0;
    text-align: center;
  }
  .p-3 {
    padding-top: 0.8px;
    width: 100%;
    height: 42px;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #C4CACD;
    letter-spacing: 0;
    line-height: 42px;
    text-align: center;
  }
  .box {
    margin-top: 40px;
    width: 100%;
    height: 98.8px;
    .left,
    .right {
      display: inline-block;
      float: left;
      width: 50%;
      height: 100%;
      text-align: center;
      .label {
        width: 100%;
        height: 42px;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #818B8F;
        letter-spacing: 0;
        text-align: center;
        line-height: 42px;
      }
      .value {
        width: 100%;
        height: 46.8px;
        padding-top: 10px;
        font-family: PingFangSC-Semibold;
        font-size: 36px;
        color: #2E3141;
        letter-spacing: 0;
        text-align: center;
        line-height: 46.8px;
      }
    }
  }
}

</style>
