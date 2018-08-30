<template>
  <div class="page">
    <div class="amount"><span class="currency">￥</span><span class="price">{{info.price || 0}}</span></div>
    <div class="limit">满{{info.amount}}可用</div>
    <div class="box">
      <div class="line"></div>
      <div class="cell clearfix">
        <div class="cell-left">代金券名称</div>
        <div class="cell-right">{{info.name}}</div>
      </div>
      <div class="line"></div>
      <div class="cell height-170 clearfix">
        <div class="cell-left">有效日期</div>
        <div class="cell-right height-170">
          <p class="cell-right-p">{{info.effDate}}</p>
          <p class="cell-right-p">至{{info.expDate}}</p>
        </div>
      </div>
      <div class="line"></div>
      <div class="cell clearfix">
        <div class="cell-left">使用说明</div>
        <div class="cell-right">满{{info.amount}}可用</div>
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

.box {
  margin-top: 50px;
  width: 100%;
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 30px;
  .line {
    width: 100%;
    height: 1px;
    /*no*/
    background: #E2E2E2;
  }
  .cell {
    width: 100%;
    height: 102px;
    &.height-170 {
      height: 170px;
    }
    .cell-left {
      display: inline-block;
      float: left;
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
      line-height: 102px;
    }
    .cell-right {
      width: 450px;
      display: inline-block;
      float: right;
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
      text-align: right;
      line-height: 102px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &.height-170 {
        height: 170px;
        box-sizing: border-box;
        padding-top: 43.4px;
      }
      .cell-right-p {
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #2E3141;
        letter-spacing: 0;
        text-align: right;
        line-height: 41.6px;
      }
    }
  }
}

.amount {
  width: 100%;
  height: 72px;
  text-align: center;
  .currency {
    display: inline-block;
    font-family: PingFangSC-Regular;
    font-size: 36px;
    color: #F05720;
    letter-spacing: 0;
    line-height: 72px;
  }
  .price {
    display: inline-block;
    font-family: PingFangSC-Medium;
    font-size: 72px;
    color: #F05720;
    letter-spacing: 0;
    line-height: 72px;
  }
}

.limit {
  margin-top: 11px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #2E3141;
  letter-spacing: 0;
  text-align: center;
  line-height: 36.4px;
}

</style>
