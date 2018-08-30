<!-- 彩蛋详情-底部按钮 -->
<template>
  <div class="footer" v-if="visible">
    <div class="btn-group clearfix">
      <div class="btn-left" @click="back">继续开彩蛋</div>
      <div class="btn-right" @click="goShopDetail">返回商家</div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    visible: {
      required: true,
      default: false,
    },
    shopId: {
      required: true,
    }
  },
  data() {
    return {}
  },
  methods: {
    back() {
      history.back();
    },
    goShopDetail() {
      this.$router.push({
        path: '/collection/shopDetail',
        query: {
          shopId: this.shopId,
        },
      });
    },
  }
}

</script>
<style scoped lang="scss">
.footer {
  padding-top: 120px;
  padding-bottom: 120px;
  width: 100%;
  height: 68px;
  background: #FFF;
  .btn-group {
    margin: 0 auto;
    width: 474px;
    height: 100%;
    .btn-left {
      display: inline-block;
      width: 260px;
      float: left;
      font-family: PingFangSC-Semibold;
      font-size: 32px;
      color: #FFFFFF;
      letter-spacing: 0;
      text-align: center;
      line-height: 68px;
      background: #F05720;
      border-radius: 34px;
    }
    .btn-right {
      display: inline-block;
      width: 194px;
      float: right;
      font-family: PingFangSC-Semibold;
      font-size: 32px;
      color: #818B8F;
      letter-spacing: 0;
      text-align: center;
      line-height: 62px;
      box-sizing: border-box;
      border: 3px solid #818B8F;
      border-radius: 34px;
    }
  }
}

</style>
