<!-- 个人中心-我的订单-我的买单 -->
<template>
  <div class="page">
    <div class="blank"></div>
    <div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <ul class="list-box">
          <li class="list" v-for="(item, index) in pageList">
            <div class="box">
              <div class="box-content clearfix">
                <img class="box-logo" src="http://p-shop.jfb315.cn/uploadfiles/shop/2016/01/24/2016012408051593.jpg" />
                <div class="box-center">
                  <div class="box-shopname">快乐肥宅茶武林店</div>
                  <div class="box-price">消费 <span class="color-151515">120.5</span>元 实付 <span class="color-151515">86</span>元</div>
                </div>
                <div class="box-status">待支付</div>
              </div>
              <div class="box-line"></div>
              <div class="box-footer"></div>
            </div>
          </li>
        </ul>
      </mt-loadmore>
      <div class="no-more" v-show="allLoaded">没有更多了</div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { Loadmore } from 'mint-ui';
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
      api.user.getOrderBaseInfo(this.searchCondition).then((res) => {
        // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
        // TODO 模拟数据
        let list = res.data;
        this.isHaveMore(list.length > 0);
        this.pageList = this.getData(list);
        this.$nextTick(function() {
          this.scrollMode = "touch";
        });
      });
    },
    more() {
      // 分页查询
      this.searchCondition.pageNum = parseInt(this.searchCondition.pageNum) + 1;
      api.user.getOrderBaseInfo(this.searchCondition).then((res) => {
        let list = res.data;
        this.isHaveMore(list.length > 0);
        this.pageList = this.pageList.concat(this.getData(list));
      });
    },
    isHaveMore(isHaveMore) {
      // 是否还有下一页，如果没有就禁止上拉刷新
      this.allLoaded = true; //true是禁止上拉加载
      if (isHaveMore) {
        this.allLoaded = false;
      }
    },
    getData(list) {
      // 获取数据
      let arr = [];
      for (let i = 0, len = list.length; i < len; i++) {
        let item = list[i];
        let obj = {};
        obj.phone = item.phone;
        obj.amount = item.amount;
        obj.time = item.createDate;
        if (item.type == 1) {
          obj.desc = '账户收益';
        } else if (item.type == 2) {
          obj.desc = '兑换养老金';
        } else if (item.type == 3) {
          obj.desc = '保障金转赠';
        }
        obj.balance = item.balance;
        arr.push(obj);
      }
      return arr;
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
        .box-logo {
          display: inline-block;
          float: left;
          width: 100px;
          height: 100px;
          margin-right: 30px;
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
