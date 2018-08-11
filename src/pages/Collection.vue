<template>
  <div class="page" @scroll="handleScroll">
    <div class="header clearfix">
      <i class="icon icon-loc" @click="toMapSearch"></i>
      <p class="loc-text" v-show="formattedAddress" @click="toMapSearch">{{formattedAddress}}</p>
      <p class="loc-text" v-show="!formattedAddress" @click="toMapSearch">定位中...</p>
      <i class="icon icon-down" @click="toMapSearch"></i>
      <div class="search-box" @click="toSearch">
        <div class="search-placeholder clearfix" v-show="!keyWords">
          <i class="icon-search"></i>
          <span class="icon-search-desc">查找我的收藏</span>
        </div>
        <input class="search-input" disabled="true" type="text" v-model="keyWords" />
      </div>
    </div>
    <div class="tab clearfix">
      <div class="tab-left">
        <div :class="['tab-cell', {'on': tabOn == 'tab1'}]" @click="tabClick('tab1')">常去</div>
      </div>
      <div class="tab-right">
        <div :class="['tab-cell', {'on': tabOn == 'tab2'}]" @click="tabClick('tab2')">有活动</div>
      </div>
    </div>
    <div :class="['kind', {'show-all': showAll}]">
      <div :class="['kind-cell', {'active': selectedKindId == item.id}]" v-for="(item, index) in kinds" :key="'kind' + index" @click="changeKind(item.id)" v-if="index <= 3">{{item.name}}</div>
      <div class="kind-cell icon-down" @click="showAllKinds" v-show="!showAll">更多</div>
      <br v-show="!showAll" />
      <div :class="['kind-cell', {'active': selectedKindId == item.id}]" v-for="(item, index) in kinds" :key="'kind' + index" @click="changeKind(item.id)" v-if="index >= 4">{{item.name}}</div>
    </div>
    <div class="kind-shade" v-show="showAll" @click="closeShade"></div>
    <div class="shop-list">
      <div class="common-list collecttion-list">
        <div :class="['common-cell', {'animated flipInY': index == 0 && firstLoad, 'reverse': item.reverse}]" v-for="(item, index) in collectionList">
          <div :class="['front-side with-shadow', {'bg-1': index % 3 == 0, 'bg-2': index % 3 == 1,'bg-3': index % 3 == 2, 'hidden': item.reverse}]">
            <div class="icon-collect"></div>
            <div class="cell-header">
              <div class="cell-logo">
                <img class="cell-logo-img" :src="item.shopLogo" />
              </div>
              <div class="cell-content">
                <div class="cell-shop-name">{{item.shopName}}</div>
                <div class="cell-shop-info">
                  <span class="text">去过{{item.consumeNums}}次</span>
                  <span class="text">{{item.tradingArea}}</span>
                  <span class="text">距您{{item.distance}}米</span>
                </div>
              </div>
            </div>
            <div class="cell-tag">
              <div class="tag-info"></div>
            </div>
            <div class="cell-footer-btn" @click="showDiscounts(index)">查看优惠</div>
          </div>
          <div :class="['reverse-side with-shadow', {'bg-1': index % 3 == 0, 'bg-2': index % 3 == 1,'bg-3': index % 3 == 2, 'hidden': !item.reverse}]">
            <div class="cell-footer-btn" @click="showDiscounts(index)">回到正面</div>
          </div>
        </div>
      </div>
      <div class="recomment-list-title">没有更多收藏店铺，已为您推荐</div>
      <div class="recommend-list"></div>
    </div>
    <!-- <map-demo></map-demo> -->
    <!-- <my-map></my-map> -->
  </div>
</template>
<script type="text/javascript">
import { Indicator } from 'mint-ui';
import mapDemo from '@/components/mapDemo.vue'
import map from '@/components/map.vue'
import { mapGetters } from 'vuex'
import api from '../fetch/api.js'
export default {
  data() {
    return {
      tabOn: 'tab1',
      keyWords: '',
      map: null,
      kinds: [],
      selectedKindId: '',
      showAll: false,
      collectionList: [],
      recommendList: [],
      firstLoad: true,
    }
  },
  components: {
    'map-demo': mapDemo,
    'my-map': map,
  },
  computed: {
    ...mapGetters([
      'longitude',
      'latitude',
      'formattedAddress', // 详细地址
    ]),
    hasLocation() {
      let flag = !!this.longitude && !!this.latitude;
      if (flag) {
        this.getAddress();
      }
      return flag;
    }
  },
  created() {
    // TODO 测试数据
    localStorage.setItem('token', '9314c6f9-11be-40fa-be0f-580d7f9baf36');
    localStorage.setItem('uid', '1');
    // Indicator.open();
    this.$store.dispatch('setLoadingState', true);
    // console.log(this.$route);
    let { keyWords } = this.$route.query;
    this.keyWords = keyWords || '';
    this.getKinds();
  },
  mounted() {
    if (!!this.longitude && !!this.latitude) {
      // this.$store.dispatch('setLoadingState', false);
      this.getShops();
    }
  },
  watch: {
    longitude(val, oldVal) {
      if (!!val && !!this.latitude) {
        // Indicator.close();
        // this.$store.dispatch('setLoadingState', false);
        this.getShops();
      }
    },
    latitude(val, oldVal) {
      if (!!val && !!this.longitude) {
        // Indicator.close();
        // this.$store.dispatch('setLoadingState', false);
        this.getShops();
      }
    },
  },
  methods: {
    toSearch() {
      this.$router.push('/collection/search');
    },
    getAddress() {
      // api.common.getAddress({ lon: this.longitude, lat: this.latitude }).then((res) => {
      //   console.log(res);
      //   // TODO 地址设置
      // }).catch((err) => {
      //   console.log(err);
      // });
    },
    toMapSearch() {
      this.$router.push('/collection/mapSearch');
    },
    tabClick(num) {
      this.tabOn = num;
      this.showAll = false;
      this.selectedKindId = '';
    },
    getKinds() {
      api.collection.qryShopTypeList({ id: null }).then((res) => {
        let obj = { name: '全部', id: '' };
        res.data.unshift(obj);
        this.kinds = res.data;
      }).catch((err) => {
        console.log(err);
      }).then(() => {
        this.$store.dispatch('setLoadingState', true);
      });
    },
    changeKind(id) {
      this.selectedKindId = id;
      this.showAll = false;
    },
    showAllKinds() {
      this.showAll = true;
    },
    closeShade() {
      this.showAll = false;
    },
    handleScroll() {
      // console.log(this.$el.scrollTop, this.$el.offsetHeight, this.$el.scrollHeight);
      if (this.$el.scrollTop + this.$el.offsetHeight >= this.$el.scrollHeight) {
        this.loadMore();
      }
    },
    loadMore() {
      console.log('loadMore');
    },
    // 常去收藏店铺
    getShops() {
      api.collection.qryMyCollect({
        pageNum: 1,
        pageRow: 10000,
        // shopLon: this.longitude.toString(),
        // shopLat: this.latitude.toString(),
        shopLon: '120.082565',
        shopLat: '30.200684',
        range: '100000',
        // shopMainTypes: '1',
        keyWords: this.keyWords || '',
      }).then((res) => {
        res.data.forEach((obj) => {
          obj.reverse = false;
        });
        this.collectionList = res.data;
        // dom更新的1s后 动画完成，去掉效果
        this.$nextTick(() => {
          setTimeout(() => {
            this.firstLoad = false;
          }, 1000);
        });
      }).catch((err) => {});
    },
    showDiscounts(index) {
      this.firstLoad = false;
      this.$nextTick(() => {
        let item = this.collectionList[index];
        if (item.reverse) {
          item.reverse = false;
        } else {
          item.reverse = true;
        }
        this.$set(this.collectionList, index, item);
      });
    }
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
}

.header {
  width: 100%;
  height: 88px;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 30px;
  padding-top: 14px;
  padding-bottom: 14px;
  background: #FFF;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  .icon {
    display: inline-block;
    float: left;
    width: 40px;
    height: 40px;
    margin-top: 10px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    &.icon-loc {
      background-image: url('../assets/images/ic_location.png');
      margin-right: 5px;
    }
    &.icon-down {
      margin-left: 5px;
      background-image: url('../assets/images/ic_angledown.png');
      margin-right: 5px;
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
    width: 470px;
    height: 60px;
    line-height: 60px;
    background: #F8F8FC;
    border-radius: 30px;
    position: absolute;
    top: 15px;
    right: 30px;
    .search-placeholder {
      position: absolute;
      width: 231px;
      height: 60px;
      box-sizing: border-box;
      padding-top: 10px;
      padding-bottom: 10px;
      top: 50%;
      left: 50%;
      margin-top: -30px;
      margin-left: -115.5px;
      vertical-align: middle;
      .icon-search {
        display: inline-block;
        float: left;
        width: 40px;
        height: 40px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url('../assets/images/ic_search.png');
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

.tab {
  position: fixed;
  top: 88px;
  left: 0;
  width: 100%;
  height: 88px;
  background: #FFF;
  z-index: 999;
  .tab-left,
  .tab-right {
    display: inline-block;
    width: 50%;
    height: 88px;
    text-align: center;
    .tab-cell {
      height: 88px;
      display: inline-block;
      font-family: PingFangSC-Semibold;
      font-size: 36px;
      color: #2E3141;
      letter-spacing: 0;
      text-align: center;
      line-height: 88px;
      padding-left: 20px;
      padding-right: 20px;
      box-sizing: border-box;
      &.on {
        border-bottom: 6px solid #F05720;
      }
    }
  }
  .tab-left {
    float: left;
  }
  .tab-right {
    float: right;
  }
}

.kind-shade {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.55);
  z-index: 990;
}

.kind {
  position: fixed;
  top: 176px;
  left: 0;
  width: 100%;
  height: 110px;
  background: #F8F8FC;
  z-index: 999;
  overflow: hidden;
  box-sizing: border-box;
  padding: 30px;
  &.show-all {
    background: #FFF;
    height: 265px;
    overflow: scroll;
    .kind-cell {
      border-color: #E2E2E2;
    }
  }
  .kind-cell {
    margin-bottom: 30px;
    margin-right: 20px;
    font-family: PingFangSC-Regular;
    display: inline-block;
    height: 50px;
    line-height: 44px;
    text-align: center;
    padding-left: 22px;
    padding-right: 22px;
    background: #FFFFFF;
    border: 3px solid #FFFFFF;
    box-sizing: border-box;
    border-radius: 25px;
    font-size: 28px;
    letter-spacing: 0;
    color: #2E3141;
    position: relative;
    &.icon-down {
      padding-right: 52px;
      margin-right: 0;
    }
    &.icon-down::after {
      content: '';
      position: absolute;
      width: 40px;
      height: 40px;
      top: 2px;
      right: 10px;
      display: block;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url('../assets/images/ic_angledown.png');
    }
    &.active {
      color: #F05720;
      border-color: #F05720;
    }
  }
}

.shop-list {
  width: 100%;
  height: 100%; // overflow: scroll;
  padding-top: 286px;
  box-sizing: border-box;
  .recomment-list-title {
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #2E3141;
    text-align: center;
    line-height: 41.6px;
  }
  .common-list {
    width: 100%;
    .common-cell {
      margin: 0 auto 30px auto;
      border-radius: 35px;
      width: 690px;
      height: 360px;
      position: relative;
      transform-style: preserve-3d;
      -webkit-transform-style: preserve-3d;
      transition: all ease 1s;
      -webkit-transition: all ease 1s;
      &.reverse {
        transition: all ease 1s;
        -webkit-transition: all ease 1s;
        transform: perspective(400px) rotateY(180deg);
        -webkit-transform: perspective(400px) rotateY(180deg);
      }
      .reverse-side,
      .front-side {
        display: block;
        opacity: 1;
        position: absolute;
        top: 0;
        left: 0;
        width: 690px;
        height: 360px;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
        /* Chrome 和 Safari */
        -moz-backface-visibility: hidden;
        /* Firefox */
        -ms-backface-visibility: hidden;
        border-radius: 35px;
        overflow: hidden;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        transition: all ease 1s;
        -webkit-transition: all ease 1s;
        &.hidden {
          // display: none;
          opacity: 0;
          transition: all ease 1s;
          -webkit-transition: all ease 1s;
        }
        &.bg-1 {
          background-image: url('../assets/images/bg_foodcard.png');
        }
        &.bg-2 {
          background-image: url('../assets/images/bg_beautycard.png');
        }
        &.bg-3 {
          background-image: url('../assets/images/bg_entertainmentcard.png');
        }
      }

      .front-side {
        box-sizing: border-box;
        padding: 40px 30px 20px 30px;
        .icon-collect {
          display: block;
          width: 50px;
          height: 50px;
          position: absolute;
          top: 30px;
          right: 30px;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-image: url('../assets/images/ic_like.png');
        }
        .cell-header {
          width: 100%;
          height: 146px;
          overflow: hidden;
          position: relative;
          .cell-logo {
            position: absolute;
            top: 0;
            left: 0;
            width: 146px;
            height: 146px;
            border-radius: 12px;
            overflow: hidden;
            .cell-logo-img {
              width: 100%;
              height: 100%;
            }
          }
          .cell-content {
            width: 100%;
            height: 146px;
            box-sizing: border-box;
            padding-left: 166px;
            padding-top: 25px;
            .cell-shop-name {
              width: 414px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-family: PingFangSC-Semibold;
              font-size: 36px;
              color: #FFFFFF;
              line-height: 46.8px;
            }
            .cell-shop-info {
              margin-top: 10.8px;
              opacity: 0.8;
              font-family: PingFangSC-Regular;
              font-size: 24px;
              color: #FFFFFF;
              line-height: 31.2px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .cell-tag {
          margin-top: 20px;
          width: 100%;
          height: 40px;
        }
        .cell-footer-btn {
          display: inline-block;
          position: absolute;
          bottom: 35.4px;
          right: 46px;
          margin-top: 37px;
          height: 41.6px;
          font-family: PingFangSC-Regular;
          font-size: 32px;
          color: #FFFFFF;
          letter-spacing: 0;
          text-align: center;
          line-height: 41.6px;
          &::after {
            content: '';
            display: block;
            width: 40px;
            height: 40px;
            position: absolute;
            top: 0;
            right: -40px;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-image: url('../assets/images/ic_angleright.png');
          }
        }
      }

      .reverse-side {
        transform: rotateY(180deg);
        -webkit-transform: rotateY(180deg);
        .cell-footer-btn {
          display: inline-block;
          position: absolute;
          bottom: 35.4px;
          right: 46px;
          margin-top: 37px;
          height: 41.6px;
          font-family: PingFangSC-Regular;
          font-size: 32px;
          color: #FFFFFF;
          letter-spacing: 0;
          text-align: center;
          line-height: 41.6px;
          &::after {
            content: '';
            display: block;
            width: 40px;
            height: 40px;
            position: absolute;
            top: 0;
            right: -40px;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-image: url('../assets/images/ic_angleright.png');
          }
        }
      }
    }
  }
}

</style>
