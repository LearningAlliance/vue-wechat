<!-- 我的代金券 -->
<template>
  <div class="page">
    <div class="blank"></div>
    <div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <ul class="list-box">
          <li class="list" v-for="(item, index) in pageList">
            <div class="box with-shadow">
              <div class="box-content clearfix">
                <img class="box-logo" :src="item.shopLogo" />
                <div class="box-center">
                  <div class="box-shopname">{{item.shopName}}</div>
                  <div class="box-price clearfix">有效期至：{{item.expDate.slice(0,10)}}</div>
                </div>
                <span class="box-price-other">{{item.couponName}}</span>
                <p class="box-status"><span class="currency">￥</span>{{Number(item.couponPrice).toFixed(2)}}</p>
              </div>
              <!-- <div class="box-line"></div> -->
              <div class="box-footer">
                <div class="box-create-time">{{item.couponRule}}</div>
              </div>
            </div>
          </li>
        </ul>
      </mt-loadmore>
      <div class="no-more" v-show="allLoaded">没有更多了</div>
      <div class="show-invalid" @click="toInvalid">查看已失效的代金券</div>
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
    toInvalid(){
    	this.$router.push('/mine/invalidVoucher');
    },
    loadPageList() {
      // 查询数据
      api.user.getVoucher(this.searchCondition).then((res) => {
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
      api.user.getVoucher(this.searchCondition).then((res) => {
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
    toDetail(orderNo, createDate) {
      this.$router.push({
        path: '/mine/orderDetail',
        query: {
          orderNo,
          createDate,
        }
      });
    },
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
    height: 234px; // background: #FFF;
    overflow: hidden;
    margin-bottom: 20px;
    .box {
      margin: 0 auto;
      width: 690px;
      height: 234px;
      background: #FFF;
      padding-left: 40px;
      padding-right: 34px;
      box-sizing: border-box;
      border-radius: 12px;
      overflow: hidden;
      background-image: url('../../assets/images/ic_voucher_bg.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      .box-content {
        width: 100%;
        height: 174px;
        padding-top: 40px;
        padding-bottom: 34px;
        box-sizing: border-box;
        position: relative;
        .box-price-other {
          display: inline-block;
          position: absolute;
          bottom: 36.8px;
          right: 0;
          font-family: PingFangSC-Regular;
          font-size: 24px;
          color: #2E3141;
          letter-spacing: 0;
          text-align: center;
          line-height: 31.2px;
        }
        .box-logo {
          display: inline-block;
          float: left;
          width: 100px;
          height: 100px;
          margin-right: 30px;
        }
        .box-status {
          position: absolute;
          top: 43px;
          right: 0;
          height: 63px;
          line-height: 63px;
          color: #F05720;
          font-family: PingFangSC-Regular;
          font-size: 48px;
          color: #F05720;
          letter-spacing: 0;
          text-align: center;
          line-height: 63px;
          .currency {
            font-size: 32px;
          }
        }
        .box-center {
          position: relative;
          width: 422px;
          height: 100px;
          display: inline-block;
          float: left;
          position: relative;
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
            font-size: 24px;
            color: #818B8F;
            line-height: 36.4px;
            height: 36.4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            position: absolute;
            bottom: 0;
            left: 0;
            font-family: PingFangSC-Regular;
            letter-spacing: -0.58px;
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
        height: 64px;
        position: relative;
        .box-create-time {
          font-family: PingFangSC-Regular;
          font-size: 24px;
          color: #818B8F;
          letter-spacing: -0.58px;
          line-height: 64px;
        }
        .footer-btn-group {
          position: absolute;
          top: 0;
          right: 0;
          width: 50%;
          height: 64px;
          box-sizing: border-box;
          padding-top: 14px;
          padding-bottom: 14px;
          .footer-btn {
            display: inline-block;
            float: right;
            width: 120px;
            height: 32px;
            font-family: PingFangSC-Regular;
            font-size: 28px;
            color: #818B8F;
            letter-spacing: 0;
            text-align: center;
            line-height: 32px;
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

.show-invalid {
  margin: 20px auto;
  text-align: center;
  width: 100%;
  height: 32px;
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #818B8F;
  letter-spacing: 0;
  line-height: 32px;
}

</style>
