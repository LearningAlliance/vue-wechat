<template>
  <div class="page" @scroll="handleScroll()">
    <div class="header clearfix">
      <div class="icon icon-back" @click="back()"></div>
      <div class="search-box" @click="toSearch">
        <div class="search-placeholder clearfix" v-show="!searchParams.remark">
          <i class="icon-search"></i>
          <span class="icon-search-desc">搜索商家名、品类等关键词</span>
        </div>
        <input class="search-input" disabled="true" type="text" v-model="searchParams.remark" />
      </div>
    </div>
    <div class="header-filter">
      <search-filter :search-params="searchParams" :refresh="refresh"></search-filter>
    </div>
    <div class="shop-list">
      <div class="shop-card" v-for="(item, index) in shopList" :key="'shop' + index" @click="toShop(item.id)">
        <div class="card-title">
          <div class="title-content">{{item.notice || '暂无公告'}}</div>
          <div class="rate-box clearfix">
            <span class="rate-text">{{Number(item.point).toFixed(1)}}</span>
            <i class="icon-rate"></i>
          </div>
        </div>
        <div class="line"></div>
        <div class="card-content">
          <div class="card-img">
            <img :src="item.logo || require('../../assets/images/icon_shop_default.png')" />
          </div>
          <div class="card-content-right">
            <div class="shop-title">
              <div class="shop-name">{{item.name}}</div>
              <div class="shop-distance">距{{item.distance | formatDistance }}</div>
            </div>
            <div class="shop-desc">
              <!-- 快餐简餐 黄龙商圈 -->
              {{item.hasOwnProperty('coupon') && item.coupon.length > 0 ? item.coupon[0].name : ''}}
            </div>
            <div class="shop-tags clearfix">
              <div class="shop-tag">返{{item.rate }}%保障金</div>
              <div class="shop-tag" v-if="item.zone == 1">有彩蛋惊喜</div>
            </div>
          </div>
        </div>
        <div class="card-footer" v-if="shopList[index].hasOwnProperty('coupon')">
          <div class="coupon-name" v-for="(item2, index2) in shopList[index].coupon">{{item2.name}}</div>
        </div>
        <div class="card-blank" v-if="shopList[index].hasOwnProperty('coupon') && shopList[index].coupon.length > 0"></div>
      </div>
    </div>
    <div class="no-more" v-show="!hasMore">没有更多了</div>
  </div>
</template>
<script type="text/javascript">
import searchFilter from '@/components/discovery/searchFilter'
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      hasMore: true,
      shopList: [],
      searchParams: {
        distance: 10000,
        price: "",
        sort: "",
        remark: '', // keyWords
        subType: null,
        name: '', // 商圈名
        type: '',
        pageRow: 20,
        pageNum: 1,
      },
    }
  },
  computed: {
    ...mapGetters([
      'longitude',
      'latitude',
    ]),
    getLocationOver() {
      return !!this.longitude && !!this.latitude;
    },
  },
  components: {
    'search-filter': searchFilter,
  },
  mounted() {
    let { keyWords = '' } = this.$route.query;
    this.searchParams.remark = keyWords;
    if (!!this.latitude && !!this.longitude) {
      this.getData(this.searchParams);
    }
  },
  watch: {
    getLocationOver(val, oldVal) {
      if (val) {
        this.getData(this.searchParams);
      }
    },
  },
  methods: {
    handleScroll() {
      if (this.$el.scrollTop + this.$el.offsetHeight >= this.$el.scrollHeight) {
        this.loadMore();
      }
    },
    toSearch() {
      this.$router.replace('/discovery/search');
    },
    back() {
      history.back();
    },
    refresh(params) {
      // console.log({ ...this.searchParams, ...params });
      this.searchParams.pageNum = 1;
      this.searchParams = { ...this.searchParams, ...params };
      this.getData(this.searchParams);
    },
    getData(params) {
      // console.log('调用接口');
      api.discovery.qryShopList({
        lat: this.latitude,
        lon: this.longitude,
        ...params
      }).then((res) => {
        // console.log(res);
        let { data = [] } = res;
        this.hasMore = data.length == this.searchParams.pageRow;
        this.shopList = this.searchParams.pageNum == 1 ? data : this.shopList.concat(data);
      }).catch((err) => {});
    },
    loadMore() {
      if (!this.hasMore) {
        return;
      }
      this.searchParams.pageNum++;
      this.getData(this.searchParams);
      // console.log('loadMore');
    },
    toShop(id) {
      this.$router.push({
        path: '/collection/shopDetail',
        query: {
          shopId: id,
        },
      });
    },
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  background: #F8F8FC;
  height: 100%;
  overflow: scroll;
  box-sizing: border-box;
  z-index: 1;
}

.no-more {
  margin: 30px auto 0 auto;
  padding-bottom: 30px;
  width: 372px;
  height: 41.6px;
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #818B8F;
  letter-spacing: 0;
  text-align: center;
  line-height: 41.6px;
}


.shop-list {
  width: 100%;
  margin-top: 188px;
  box-sizing: border-box;
  padding-top: 10px;
  z-index: 1;
  .shop-card {
    width: 100%;
    margin-bottom: 30px;
    background: #FFF;
    box-sizing: border-box;
    padding-left: 30px;
    padding-right: 30px;
    .card-content {
      width: 100%;
      height: 206px;
      background: #FFF;
      position: relative;
      box-sizing: border-box;
      padding-left: 176px;
      .card-content-right {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-top: 30px;
        .shop-tags {
          margin-top: 15.8px;
          width: 100%;
          overflow: hidden;
          height: 45px;
          .shop-tag {
            display: inline-block;
            float: left;
            margin-right: 10px;
            border: 1px solid #F05720;
            /*no*/
            border-radius: 25px;
            margin-bottom: 5px;
            padding-left: 10px;
            padding-right: 10px;
            font-family: PingFangSC-Regular;
            font-size: 24px;
            color: #F05720;
            text-align: center;
            line-height: 40px;
          }
        }
        .shop-title {
          position: relative;
          width: 100%;
          height: 41.6px;
          box-sizing: border-box;
          padding-right: 130px;
          .shop-name {
            font-family: PingFangSC-Semibold;
            font-size: 32px;
            color: #2E3141;
            line-height: 41.6px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .shop-distance {
            position: absolute;
            top: 0;
            right: 0;
            opacity: 0.8;
            font-family: PingFangSC-Regular;
            font-size: 24px;
            color: #2E3141;
            text-align: right;
            line-height: 41.6px;
          }
        }
        .shop-desc {
          margin-top: 12px;
          height: 31.2px;
          font-family: PingFangSC-Regular;
          font-size: 24px;
          color: #2E3141;
          line-height: 31.2px;
        }
      }
      .card-img {
        position: absolute;
        top: 30px;
        left: 0;
        width: 146px;
        height: 146px;
        overflow: hidden;
        border-radius: 12px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .line {
      width: 100%;
      height: 1px;
      /*no*/
      background: #C4CACD;
    }
    .card-blank {
      width: 100%;
      height: 30px;
    }
    .card-footer {
      // margin-top: 10px;
      .coupon-name {
        height: 42px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #818B8F;
        line-height: 42px;
      }
    }
    .card-title {
      width: 100%;
      height: 60px;
      box-sizing: border-box;
      padding-left: 60px;
      padding-right: 130px;
      position: relative;
      &::before{
        content: '';
        position: absolute;
        top: 15px;
        left: 0;
        width: 34px;
        height: 30px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url('../../assets/images/icon_notice.png');
      }
      .title-content {
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #818B8F;
        line-height: 60px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .rate-box {
        position: absolute;
        right: 30px;
        top: 0;
        width: 100px;
        height: 60px;
        .icon-rate {
          display: inline-block;
          float: right;
          margin-top: 10px;
          width: 40px;
          height: 40px;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-image: url('../../assets/images/ic_rate.png');
        }
        .rate-text {
          display: inline-block;
          float: right;
          font-family: PingFangSC-Semibold;
          font-size: 32px;
          color: #F05720;
          text-align: right;
          line-height: 60px;
          margin-left: 5px;
        }
      }
    }
  }
}

.header-filter {
  width: 100%;
  height: 88px;
  position: fixed;
  top: 100px;
  left: 0;
  z-index: 999;
}

.header {
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  padding-left: 90px;
  padding-right: 70px;
  padding-top: 20px;
  padding-bottom: 20px;
  background: #FFF;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  .icon {
    position: absolute;
    top: 25px;
    left: 20px;
    width: 50px;
    height: 50px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    &.icon-back {
      background-image: url('../../assets/images/ic_back@2x.png');
    }
  }
  .loc-text {
    display: inline-block;
    float: left;
    width: 143px;
    height: 60px;
    line-height: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #2E3141;
    letter-spacing: 0;
    white-space: nowrap;
  }
  .search-box {
    display: inline-block;
    width: 590px;
    height: 60px;
    line-height: 60px;
    background: #F8F8FC;
    border-radius: 30px;
    position: absolute;
    top: 20px;
    right: 70px;
    .search-placeholder {
      position: absolute;
      width: 390px;
      height: 60px;
      box-sizing: border-box;
      padding-top: 10px;
      padding-bottom: 10px;
      top: 50%;
      left: 50%;
      margin-top: -30px;
      margin-left: -195px;
      vertical-align: middle;
      .icon-search {
        display: inline-block;
        float: left;
        width: 40px;
        height: 40px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url('../..//assets/images/ic_search.png');
        margin-right: 9px;
      }
      .icon-search-desc {
        display: inline-block;
        float: left;
        height: 40px;
        line-height: 40px;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #C4CACD;
        letter-spacing: 0;
      }
    }
    .search-input {
      width: 470px;
      height: 100%;
      background: #F8F8FC;
      border-radius: 30px;
      box-sizing: border-box;
      padding-left: 50px;
      padding-right: 50px;
      text-align: left;
    }
  }
}

</style>
