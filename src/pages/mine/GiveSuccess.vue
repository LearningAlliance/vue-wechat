<template>
  <div class="page">
    <div class="box">
      <img src="../../assets/images/img_success.png" />
      <p>转赠成功</p>
    </div>
    <div class="box-2">
      <p class="info clearfix">
        <span class="left">保障金</span>
        <span class="right">{{amount}}元</span>
      </p>
      <p class="info clearfix">
        <span class="left">接受账号</span>
        <span class="right">{{phone}}元</span>
      </p>
    </div>
    <div class="btn" @click="back">返回</div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      amount: '',
      phone: '',
    }
  },
  created() {
    let { amount, phone } = this.$route.query;
    this.amount = amount || '';
    this.phone = phone || '';
  },
  methods:{
  	back(){
  		this.$router.history.go(-1);
  	}
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
      width: 160px;
      height: 160px;
      margin: 60px auto 30px auto;
    }
    p {
      font-family: PingFangSC-Semibold;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
      text-align: center;
      line-height: 41.6px;
      margin-bottom: 60px;
    }
  }
  .box-2 {
    width: 690px;
    height: 164px;
    border-top: 1px solid #E2E2E2;
    /*no*/
    border-bottom: 1px solid #E2E2E2;
    /*no*/
    margin: 0 auto;
    padding-top: 30px;
    box-sizing: border-box;
    .info {
      width: 100%;
      height: 36.4px;
      line-height: 36.4px;
      margin-bottom: 30px;
      .left {
        display: inline-block;
        float: left;
        width: 112px;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #2E3141;
        letter-spacing: 0;
        line-height: 36.4px;
      }
      .right {
        display: inline-block;
        width: 285px;
        float: right;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #818B8F;
        letter-spacing: 0;
        text-align: right;
        line-height: 36.4px;
      }
    }
  }
  .btn {
    margin: 120px auto 0 auto;
    width: 570px;
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
