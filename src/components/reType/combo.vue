<template>
  <div class="page">
    <div class="combo-title">获得核销套餐</div>
    <div class="combo-name">{{info.name}}</div>
    <div class="code-box">
      <img class="code" :src="'' || require('@/assets/images/img_qrcode_grey.png')" />
    </div>
    <div class="desc-box">
      <div class="cell clearfix">
        <div class="cell-left">核销串码</div>
        <div class="cell-right">1201855269871</div>
      </div>
      <div class="cell margin-top clearfix">
        <div class="cell-left">有效日期</div>
        <div class="cell-right">2018-11-30</div>
      </div>
    </div>
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

.combo-title {
  font-family: PingFangSC-Semibold;
  font-size: 32px;
  color: #F05720;
  letter-spacing: 0;
  text-align: center;
}

.combo-name {
  margin-top: 10px;
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #2E3141;
  letter-spacing: 0;
  text-align: center;
}

.code-box {
  margin: 50px auto;
  box-sizing: border-box;
  width: 236px;
  height: 236px;
  border: 1px solid #E2E2E2;
  /*no*/
  border-radius: 10px;
  padding: 13px;
  .code {
    width: 100%;
    height: 100%;
  }
}

.desc-box {
  margin: 40px auto 0 auto;
  width: 440px;
  height: 120px;
  background: #FAFAFA;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 20px 40px;
  .cell {
    font-family: PingFangSC-Regular;
    font-size: 28px;
    line-height: 28px;
    color: #2E3141;
    letter-spacing: 0;
    position: relative;
    &.margin-top{
    	margin-top: 24px;
    }
    .cell-left {
    	position: absolute;
    	top: 0;
    	left: 0;
    }
    .cell-right {
    	width: 100%;
    	padding-left: 40%;
    	box-sizing: border-box;
    }
  }
}

</style>
