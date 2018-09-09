<template>
  <div class="page">
    <div class="list">
      <div class="cell">
        <div class="cell-top" @click.stop="toShopDetail">
          <div class="cell-logo">
            <img :src="'' || require('../../assets/images/icon_shop_default.png')" />
          </div>
          <div class="cell-content">
            <div class="shop-name">快乐肥宅茶武林店</div>
            <div class="shop-desc">去过 <span class="black">12次</span> 消费 <span class="black">86.00元</span></div>
          </div>
          <div class="line"></div>
        </div>
        <div class="cell-footer">
          <div class="footer-desc">美食 黄龙商圈</div>
          <div class="footer-btn" @click.stop="recommend">推荐这家</div>
        </div>
      </div>
    </div>
    <div class="no-more" v-show="!hasMore">没有更多了</div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      hasMore: true,
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.hasMore = false;
    },
    recommend() {
      // 测试
      this.$router.push({
        path: '/earning/aShareDetail',
        query: {
          shopId: 1,
        },
      });
    },
    toShopDetail() {
      this.$router.push({
        path: '/collection/shopDetail',
        query: {
          shopId: 1,
        },
      });
    },
  },
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background: #F8F8FC;
}

.no-more {
  margin: 0 auto;
  padding-top: 30px;
  padding-bottom: 30px;
  width: 100%;
  height: 41.6px;
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #818B8F;
  letter-spacing: 0;
  text-align: center;
  line-height: 41.6px;
  background: #F8F8FC;
}

.list {
  width: 100%;
}

.cell {
  margin-top: 20px;
  width: 100%;
  height: 247px;
  background: #FFF;
  .cell-footer {
    position: relative;
    width: 100%;
    height: 88px;
    box-sizing: border-box;
    padding-left: 30px;
    padding-right: 200px;
    .footer-desc {
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #818B8F;
      letter-spacing: -0.58px;
      line-height: 88px;
    }
    .footer-btn {
      position: absolute;
      top: 50%;
      right: 30px;
      margin-top: -25px;
      margin-left: -80px;
      box-sizing: border-box;
      width: 160px;
      height: 50px;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #F05720;
      letter-spacing: 0;
      text-align: center;
      line-height: 48px;
      border: 2px solid #F05720;
      border-radius: 25px;
    }
  }
  .cell-top {
    width: 100%;
    height: 158px;
    padding-left: 30px;
    padding-right: 30px;
    box-sizing: border-box;
    position: relative;
    .cell-logo {
      position: absolute;
      top: 30px;
      left: 30px;
      width: 100px;
      height: 100px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .line {
      width: 100%;
      height: 1px;
      /*no*/
      background: #E2E2E2;
    }
    .cell-content {
      padding-top: 30px;
      width: 100%;
      height: 100%;
      padding-left: 130px;
      box-sizing: border-box;
      .shop-desc {
        margin-top: 20px;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #818B8F;
        letter-spacing: 0;
        line-height: 36.4px;
        .black {
          color: #151515;
        }
      }
      .shop-name {
        font-family: PingFangSC-Medium;
        font-size: 32px;
        color: #2E3141;
        letter-spacing: 0;
        line-height: 41.6px;
      }
    }
  }
}

</style>
