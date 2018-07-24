<template>
  <div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
      <ul class="list-box">
        <li class="list" v-for="(item, index) in pageList">
          <div :class="['box', {'no-border': index == 0}]">
            <div class="cell-1">
              <p class="phone">接收手机号 {{item.phone}}</p>
              <span class="amount">{{item.amount}}元</span>
            </div>
            <div class="cell-2 margin-top">
              <p class="time">{{item.time}}</p>
              <span class="desc">{{item.desc}}</span>
            </div>
          </div>
        </li>
      </ul>
    </mt-loadmore>
    <div class="no-more" v-show="allLoaded">没有更多了</div>
  </div>
</template>
<script>
import { Loadmore } from 'mint-ui';
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
export default {
  data: function() {
    return {
      searchCondition: { //分页属性
        pageNo: "1",
        pageSize: "10"
      },
      pageList: [],
      allLoaded: false,
      scrollMode: "auto" //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
    }
  },
  components: {
    'mt-loadmore': Loadmore
  },
  mounted() {
    this.loadPageList(); //初次访问查询列表
  },
  methods: {
    loadTop() {
      this.loadPageList();
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
      this.more();
      this.$refs.loadmore.onBottomLoaded();
    },
    loadPageList() {
      // 查询数据
      // api.user.getGivenList(this.searchCondition).then(data => {
      // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
      // TODO 模拟数据
      this.isHaveMore(true);
      this.pageList = this.getData();
      this.$nextTick(function() {
        this.scrollMode = "touch";
      });
      // });
    },
    more() {
      // 分页查询
      this.searchCondition.pageNo = parseInt(this.searchCondition.pageNo) + 1;
      // api.user.getGivenList(this.searchCondition).then(data => {
      this.pageList = this.pageList.concat(this.getData());
      this.isHaveMore(false);
      // });
    },
    isHaveMore(isHaveMore) {
      // 是否还有下一页，如果没有就禁止上拉刷新
      this.allLoaded = true; //true是禁止上拉加载
      if (isHaveMore) {
        this.allLoaded = false;
      }
    },
    getData() {
      // 获取假数据
      let arr = [];
      for (let i = 0; i < 10; i++) {
        let obj = {};
        obj.phone = '18868195887';
        obj.amount = (Math.random() * 100).toFixed(2);
        obj.time = _.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss');
        obj.desc = '保障金';
        arr.push(obj);
      }
      console.log(arr);
      return arr;
    }
  }
}

</script>
<style scoped lang="scss">
.list-box {
  margin-top: 20px;
  width: 100%;
  background: #fff;
  .list {
    display: block;
    width: 100%;
    .box {
      margin: 0 auto;
      width: 690px;
      height: 144px;
      border-top: 1px solid #E2E2E2;
      padding-top: 30px;
      box-sizing: border-box;
      /*no*/
      .cell-1 {
        margin: 0 auto 0 auto;
        width: 690px;
        height: 41.6px;
        position: relative;
        .phone,
        .amount {
          font-family: PingFangSC-Regular;
          font-size: 32px;
          color: #333333;
          letter-spacing: 0;
          line-height: 41.6px;
        }
        .amount {
          position: absolute;
          top: 0;
          right: 0;
        }
      }
      .cell-2 {
        width: 690px;
        height: 41.6px;
        margin: 0 auto;
        position: relative;
        &.margin-top {
          margin-top: 10.4px;
        }
        .time,
        .desc {
          font-family: PingFangSC-Regular;
          font-size: 24px;
          color: #818B8F;
          letter-spacing: -0.58px;
          line-height: 31.2px;
        }
        .desc {
          position: absolute;
          top: 0;
          right: 0;
        }
      }
      &.no-border {
        border: none;
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
