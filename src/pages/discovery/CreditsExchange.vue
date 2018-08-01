<!-- 兑换商城-保障金兑积分 -->
<template>
  <div class="page">
    <div class="section">
      <div class="box">
        <div class="cell" v-for="(item, index) in list">
          <p class="text-1">{{item.safeguard}}保障金</p>
          <p class="text-2">兑换{{item.credits}}积分</p>
        </div>
        <div class="cell">
          <p class="text-3">其他金额</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      list: [{
          safeguard: 10,
          credits: 1000,
        },
        {
          safeguard: 20,
          credits: 2000,
        },
        {
          safeguard: 50,
          credits: 5000,
        },
        {
          safeguard: 100,
          credits: 10000,
        },
        {
          safeguard: 200,
          credits: 20000,
        },
      ]
    }
  }
}

</script>
<style scoped lang="scss">
.page {
  padding-top: 20px;
  .section {
    width: 100%;
    height: 448px;
    background: #FFF;
    .box {
      width: 750px;
      margin: 0 auto;
      .cell {
        width: 210px;
        height: 120px;
        text-align: center;
        display: inline-block;
        float: left;
        margin-top: 30px;
        margin-left: 30px;
        box-sizing: border-box;
        border: 2px solid #C4CACD;/*no*/
        border-radius: 12px;
        .text-1 {
          margin-top: 18px;
          font-family: PingFangSC-Regular;
          font-size: 32px;
          color: #2E3141;
          letter-spacing: 0;
          text-align: center;
          line-height: 41.6px;
        }
        .text-2 {
          margin-top: 10.4px;
          font-family: PingFangSC-Regular;
          font-size: 28px;
          color: #818B8F;
          letter-spacing: 0;
          text-align: center;
          line-height: 36.4px;
        }
        .text-3 {
          font-family: PingFangSC-Regular;
          font-size: 32px;
          color: #2E3141;
          letter-spacing: 0;
          text-align: center;
          line-height: 114px;
        }
      }
    }
  }
}

</style>
