<template>
  <div class="page">
    <div class="card-box">
      <div class="card with-shadow">
        <div class="card-desc clearfix">
          <div class="card-left">
            <div class="card-title">共分享推荐(条)</div>
            <div class="card-num ellipsis">12</div>
          </div>
          <div class="card-right">
            <div class="card-title">已获得奖励积分</div>
            <div class="card-num ellipsis">1542</div>
          </div>
        </div>
        <div class="card-btn" @click="toMoreShop">推荐更多收藏商家</div>
      </div>
    </div>
    <div class="section-title">
      <div class="section-title-text">正在获取奖励的推荐</div>
    </div>
    <div class="list">
      <div class="cell" @click="recommend">
        <div class="cell-title">肥宅快乐鸡西湖文化广场店</div>
        <div class="cell-content clearfix">
          <div class="cell-item">
            <div class="item-title">已打开(人)</div>
            <div class="item-num ellipsis">2</div>
          </div>
          <div class="vertical-line line-1"></div>
          <div class="cell-item">
            <div class="item-title">已消费(人)</div>
            <div class="item-num ellipsis">2</div>
          </div>
          <div class="vertical-line line-2"></div>
          <div class="cell-item">
            <div class="item-title">获得积分</div>
            <div class="item-num ellipsis orange">500</div>
          </div>
        </div>
      </div>
    </div>
    <div class="no-more" v-show="!hasMore">没有更多了</div>
  </div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
export default {
  data() {
    return {
      hasMore: true,
    }
  },
  computed: {
    ...mapGetters([
      'headerRightFun'
    ]),
  },
  watch: {
    headerRightFun(val, oldVal) {
      if (!!val) {
        this[val] && this[val]();
      }
    },
  },
  mounted() {
    this.getInfo();
    this.getList();
  },
  methods: {
    // 点击右上角规则
    toRule() {
      this.$store.dispatch('setHeaderRightFun', '');
      console.log('toRule');
    },
    getInfo() {
      // 获取上方信息
    },
    getList() {
      // 获取列表信息
      this.hasMore = false;
    },
    toMoreShop() {
      this.$router.push({
        path: '/earning/aShareShopList',
      });
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
  background: #FFF;
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 30px;
  .cell {
    width: 100%;
    height: 242px;
    padding-top: 30px;
    box-sizing: border-box;
    border-top: 1px solid #E2E2E2;
    position: relative;
    .cell-content {
      margin-top: 30px;
      position: relative;
      .vertical-line {
        position: absolute;
        top: 38.4px;
        width: 1px;
        /*no*/
        height: 80px;
        background: #E2E2E2;
        &.line-1 {
          left: 33%;
        }
        &.line-2 {
          left: 66%;
        }
      }
      .cell-item {
        display: inline-block;
        float: left;
        width: 33%;
        text-align: center;
        .item-title {
          font-family: PingFangSC-Regular;
          font-size: 28px;
          color: #818B8F;
          letter-spacing: 0;
          text-align: center;
          line-height: 42px;
        }
        .item-num {
          margin-top: 10px;
          font-family: PingFangSC-Semibold;
          font-size: 36px;
          color: #2E3141;
          letter-spacing: 0;
          text-align: center;
          line-height: 46.8px;
          &.orange {
            color: #F05720;
          }
        }
      }
    }
    .cell-title {
      width: 100%;
      height: 41.6px;
      box-sizing: border-box;
      padding-left: 70px;
      position: relative;
      font-family: PingFangSC-Semibold;
      font-size: 32px;
      color: #2E3141;
      line-height: 41.6px;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 40px;
        height: 50px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url('../../assets/images/ic_pickup.png');
      }
    }
  }
}

.section-title {
  background: #FFF;
  width: 100%;
  height: 89px;
  text-align: center;
  .section-title-text {
    display: inline-block;
    font-family: PingFangSC-Semibold;
    font-size: 32px;
    color: #2E3141;
    letter-spacing: 0;
    text-align: center;
    line-height: 89px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: 44px;
      left: -46px;
      display: block;
      width: 30px;
      height: 1px;
      /*no*/
      background: #2E3141;
    }
    &::after {
      content: '';
      position: absolute;
      top: 44px;
      right: -46px;
      display: block;
      width: 30px;
      height: 1px;
      /*no*/
      background: #2E3141;
    }
  }
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-box {
  background: #FFF;
  padding-top: 30px;
  padding-bottom: 30px;
}

.card {
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  width: 690px;
  height: 394px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url('../../assets/images/bg_ashare.png');
  .card-btn {
    width: 380px;
    height: 68px;
    margin: 61px auto 0 auto;
    border: 3px solid #F05720;
    border-radius: 34px;
    font-family: PingFangSC-Semibold;
    font-size: 32px;
    color: #F05720;
    letter-spacing: 0;
    text-align: center;
    line-height: 68px;
  }
  .card-desc {
    width: 100%;
    margin-top: 70px;
    .card-left {
      width: 50%;
      display: inline-block;
      float: left;
      text-align: center;
    }
    .card-right {
      width: 50%;
      display: inline-block;
      float: right;
      text-align: center;
    }
    .card-title {
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #818B8F;
      letter-spacing: 0;
      text-align: center;
      line-height: 42px;
    }
    .card-num {
      font-family: PingFangSC-Semibold;
      font-size: 64px;
      color: #F05720;
      letter-spacing: 0;
      text-align: center;
      line-height: 83.2px;
      margin-top: 10px;
    }
  }
}

</style>
