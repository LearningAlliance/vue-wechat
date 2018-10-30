<!-- 我的彩蛋 -->
<!-- 个人中心-我的买单-优惠套餐 -->
<template>
  <div class="page">
    <div class="section-tab clearfix">
      <div class="tab-left">
        <div :class="['tab-item', {'active': activedTab == 'a'}]" @click="clickTab('a')">我放置的</div>
      </div>
      <div class="tab-right">
        <div :class="['tab-item', {'active': activedTab == 'b'}]" @click="clickTab('b')">我打开的</div>
      </div>
    </div>
    <div class="blank"></div>
    <div class="main-body" :style="{'-webkit-overflow-scrolling': scrollMode}">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <ul class="list-box">
          <li class="list" v-for="(item, index) in pageList" :key="index">
            <div class="box" @click="toDetail(item.id, item.state, item.shopId, item.expDay)">
              <p class="egg-info clearfix">
                {{item.reType | getReType}}彩蛋{{item.zoneType | getType}}
                <span :class="['egg-status', {'state-1': item.state == 1}]">{{item.state | formatReType}}</span>
              </p>
              <p class="egg-desc clearfix">
                {{item.createDate}}
                <span class="expDay" v-show="item.state == 1 && searchCondition.operType == 1">{{item.expDay}}天后消失</span>
                <span class="user-name" v-show="searchCondition.operType == 1 && item.userName">领取人: {{item.userName}}</span>
                <span class="user-name" v-show="searchCondition.operType == 2 && item.userName">放置人: {{item.userName}}</span>
              </p>
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
      activedTab: 'a',
      searchCondition: { //分页属性
        pageNum: 1,
        pageRow: 10,
        operType: 1, // 1-我放置的； 2-我收到的
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
  filters: {
    getType(key) {
      if (key == null || key == undefined) {
        return '';
      }
      switch (key) {
        case 1:
          return '-图文';
          break;
        case 2:
          return '-语音';
          break;
        case 3:
          return '-视频';
          break;
        default:
          return '';
          break;
      }
    },
    getReType(key) {
      if (key == null || key == undefined) {
        return '';
      }
      switch (key) {
        case 1:
          return '优惠券';
          break;
        case 2:
          return '碎片';
          break;
        case 3:
          return '代金券';
          break;
        case 4:
          return '红包';
          break;
        default:
          return '';
          break;
      }
    }
  },
  methods: {
    clickTab(tab) {
      this.activedTab = tab;
      if (tab == 'a') {
        this.searchCondition.operType = '1';
      } else if (tab == 'b') {
        this.searchCondition.operType = '2';
      }
      this.loadTop();
    },
    toDetail(id, state, shopId, expDay) {
      this.$router.push({
        path: state == 1 ? '/mine/eggShare' : '/collection/eggDetail',
        query: {
          id,
          shopId,
          expDay,
        }
      })
    },
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
      api.user.getMyeggs(this.searchCondition).then((res) => {
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
      api.user.getMyeggs(this.searchCondition).then((res) => {
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

.section-tab {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 88px;
  background: #fff;
  z-index: 99;
  .tab-left,
  .tab-right {
    display: inline-block;
    float: left;
    width: 50%;
    height: 88px;
    line-height: 88px;
    text-align: center;
    .tab-item {
      display: inline-block;
      width: 120px;
      height: 88px;
      box-sizing: border-box;
      &.active {
        border-bottom: 3px solid #F05720;
      }
    }
  }
}

.blank {
  width: 100%;
  height: 17px;
  background: #F8F8FC;
  position: absolute;
  top: 88px;
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
  padding-top: 105px;
  overflow: auto;
  z-index: 10;
}

.list-box {
  width: 100%;
  .list {
    display: block;
    width: 100%;
    overflow: hidden;
    .box {
      width: 690px;
      height: 194px;
      background: #FFFFFF;
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.10);
      border-radius: 12px;
      margin: 15px auto;
      padding: 50px 30px;
      box-sizing: border-box;
      .egg-info {
        height: 50px;
        font-family: PingFangSC-Medium;
        font-size: 32px;
        color: #2E3141;
        letter-spacing: 0;
        line-height: 50px;
        .egg-status {
          display: inline-block;
          height: 50px;
          float: right;
          font-family: PingFangSC-Regular;
          font-size: 32px;
          color: #818B8F;
          letter-spacing: 0;
          text-align: right;
          line-height: 50px;
          &.state-1 {
            border: 2px solid #F05720;
            border-radius: 25px;
            font-family: PingFangSC-Regular;
            font-size: 24px;
            color: #F05720;
            letter-spacing: -0.58px;
            text-align: center;
            line-height: 46px;
            box-sizing: border-box;
            width: 120px;
          }
        }
      }
      .egg-desc {
        margin-top: 20px;
        height: 32px;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #818B8F;
        letter-spacing: 0;
        line-height: 32px;
        .expDay,
        .user-name {
          display: inline-block;
          float: right;
          line-height: 32px;
          font-family: PingFangSC-Regular;
          font-size: 24px;
          color: #818B8F;
          letter-spacing: -0.58px;
          max-width: 50%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
