<!-- 个人中心-我的订单-我的买单 -->
<template>
  <div class="page">
    <div class="blank"></div>
    <div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <ul class="list-box">
          <li class="list" v-for="(item, index) in pageList" :key="index">
            <div class="box" @click="toDetail(item.orderNo, item.createDate)">
              <div class="box-content clearfix">
                <img class="box-logo" :src="item.shopLogo" />
                <div class="box-center">
                  <div class="box-shopname">{{item.shopName}}</div>
                  <div class="box-price">消费 <span class="color-151515">{{item.amount}}</span>元 实付 <span class="color-151515">{{item.realAmount}}</span>元</div>
                </div>
                <div :class="['box-status', {'order-state-1': item.orderState == 1, 'order-state-2': item.orderState == 2 || item.orderState == 3} ]">{{item.orderState | formatOrderState}}</div>
              </div>
              <div class="box-line"></div>
              <div class="box-footer">
                <div class="box-create-time">下单时间：2018-07-18 12:37:11</div>
                <div class="footer-btn-group clearfix">
                  <div class="footer-btn" @click.stop="cancelOrder(item.orderNo)" v-show="item.orderState == 1">取消</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </mt-loadmore>
      <div class="no-more" v-show="allLoaded">没有更多了</div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { Loadmore, MessageBox } from 'mint-ui';
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
export default {
  data() {
    return {
      searchCondition: { //分页属性
        pageNum: 1,
        pageRow: 10
      },
      pageList: [],
      allLoaded: false,
      scrollMode: "auto" //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
    }
  },
  components: {
    'mt-loadmore': Loadmore
  },
  created() {
    this.loadPageList();
  },
  methods: {
    loadTop() {
      this.searchCondition.pageNum = 1;
      this.loadPageList();
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      this.more();
      this.$refs.loadmore.onBottomLoaded();
    },
    loadPageList() {
      // 查询数据
      api.trade.getOrderBaseInfo(this.searchCondition).then((res) => {
        // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
        // TODO 模拟数据
        let list = res.data;
        this.isHaveMore(list.length > 0);
        this.pageList = list;
        this.$nextTick(function() {
          this.scrollMode = "touch";
        });
      });
    },
    more() {
      // 分页查询
      this.searchCondition.pageNum = parseInt(this.searchCondition.pageNum) + 1;
      api.trade.getOrderBaseInfo(this.searchCondition).then((res) => {
        let list = res.data;
        this.isHaveMore(list.length > 0);
        this.pageList = this.pageList.concat(list);
      });
    },
    isHaveMore(isHaveMore) {
      // 是否还有下一页，如果没有就禁止上拉刷新
      this.allLoaded = true; //true是禁止上拉加载
      if (isHaveMore) {
        this.allLoaded = false;
      }
    },
    toDetail(orderNo, createDate){
      this.$router.push({
        path: '/mine/orderDetail',
        query: {
          orderNo,
          createDate,
        }
      });
    },
    cancelOrder(orderNo) {
      MessageBox.confirm('确定要取消吗?').then(action => {
        if (action) {
          api.collection.cancelOrder({
            orderNo,
          }).then((res) => {
            this.loadTop();
          });
        }
      }).catch((err) => {

      });
    }
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
}

.blank {
  width: 100%;
  height: 20px;
  background: #F8F8FC;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 21;
}

.main-body {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 20px;
  overflow: auto;
  z-index: 10;
}

.list-box {
  width: 100%;
  .list {
    display: block;
    width: 100%;
    height: 247px;
    background: #FFF;
    overflow: hidden;
    margin-bottom: 20px;
    .box {
      margin: 0 auto;
      width: 690px;
      height: 247px;
      background: #FFF;
      .box-content {
        width: 100%;
        height: 158px;
        padding-top: 28px;
        padding-bottom: 30px;
        box-sizing: border-box;
        position: relative;
        .box-logo {
          display: inline-block;
          float: left;
          width: 100px;
          height: 100px;
          margin-right: 30px;
        }
        .box-status {
          position: absolute;
          top: 30px;
          right: 0;
          font-family: PingFangSC-Regular;
          font-size: 32px;
          color: #818B8F;
          letter-spacing: 0;
          text-align: right;
          line-height: 41.6px;
          &.order-state-1 {
            color: #F05720;
          }
          &.order-state-2 {
            color: #00B59F;
          }
        }
        .box-center {
          position: relative;
          width: 422px;
          height: 100px;
          display: inline-block;
          float: left;
          .box-shopname {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            font-family: PingFangSC-Medium;
            font-size: 32px;
            color: #2E3141;
            letter-spacing: 0;
            line-height: 41.6px;
            white-space: nowrap;
          }
          .box-price {
            font-family: PingFangSC-Regular;
            font-size: 28px;
            color: #818B8F;
            letter-spacing: 0;
            line-height: 36.4px;
            width: 560px;
            height: 36.4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            position: absolute;
            bottom: 0;
            left: 0;
            .color-151515 {
              color: #151515;
            }
          }
        }
      }
      .box-line {
        width: 100%;
        height: 1px;
        /*no*/
        background: #E2E2E2;
      }
      .box-footer {
        width: 100%;
        height: 88px;
        position: relative;
        .box-create-time {
          font-family: PingFangSC-Regular;
          font-size: 24px;
          color: #818B8F;
          letter-spacing: -0.58px;
          line-height: 88px;
        }
        .footer-btn-group {
          position: absolute;
          top: 0;
          right: 0;
          width: 50%;
          height: 88px;
          box-sizing: border-box;
          padding-top: 19px;
          padding-bottom: 19px;
          .footer-btn {
            display: inline-block;
            float: right;
            width: 120px;
            height: 50px;
            font-family: PingFangSC-Regular;
            font-size: 28px;
            color: #818B8F;
            letter-spacing: 0;
            text-align: center;
            line-height: 50px;
            border: 2px solid #818B8F;
            border-radius: 25px;
            box-sizing: border-box;
          }
        }
      }
    }
  }
}

.no-more {
  margin: 30px auto;
  width: 372px;
  height: 41.6px;
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #818B8F;
  letter-spacing: 0;
  text-align: center;
  line-height: 41.6px;
}

</style>
