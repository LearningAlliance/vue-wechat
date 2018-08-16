<template>
  <div class="page">
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
    <div class="activity-list" v-show="tabOn == 'tab2'" ref="tab2List" @scroll="handleScroll">
      <div class="common-list">
        <div class="common-cell" v-for="(item, index) in collectionListForAct" :key="'collectionListForAct' + index">
          <div :class="['common-box', {'no-border': collectionListForAct.length - 1 == index}]">
            <div class="box-left">
              <img class="coupon-img" :src="item.couponImg" />
            </div>
            <div class="box-right">
              <div class="shop-name">{{item.merShop[0].shopName || ''}}</div>
              <div class="coupon-name">{{item.couponName}}</div>
              <div class="other-info">{{item.merShop[0].tradingArea || ''}} 距{{item.merShop[0].distance | formatDistance}}</div>
              <div class="price">
                <span class="buy-price">{{item.buyPrice | formatPrice}}</span>
                <span class="coupon-price">{{item.couponPrice | formatPrice}}</span>
                <span class="discount">{{(item.buyPrice/item.couponPrice * 10).toFixed(1)}}折扣</span>
              </div>
              <div class="buy-btn" @click.stop="toBuy(item.couponId)">购买</div>
            </div>
          </div>
        </div>
      </div>
      <div class="recomment-list-title" v-show="showRecommendListForAct">没有更多收藏店铺，已为您推荐</div>
      <div class="common-list">
        <div class="common-cell" v-for="(item, index) in recommendListForAct" :key="'recommendListForAct' + index">
          <div :class="['common-box', {'no-border': recommendListForAct.length - 1 == index}]">
            <div class="box-left">
              <img class="coupon-img" :src="item.couponImg" />
            </div>
            <div class="box-right">
              <div class="shop-name">{{item.merShop[0].shopName || ''}}</div>
              <div class="coupon-name">{{item.couponName}}</div>
              <div class="other-info">{{item.merShop[0].tradingArea || ''}} 距{{item.merShop[0].distance | formatDistance}}</div>
              <div class="price">
                <span class="buy-price">{{item.buyPrice | formatPrice}}</span>
                <span class="coupon-price">{{item.couponPrice | formatPrice}}</span>
                <span class="discount">{{(item.buyPrice/item.couponPrice * 10).toFixed(1)}}折扣</span>
              </div>
              <div class="buy-btn" @click.stop="toBuy(item.couponId)">购买</div>
            </div>
          </div>
        </div>
        <div class="no-more" v-show="allLoadedForAct">没有更多了</div>
      </div>
    </div>
    <div class="shop-list" v-show="tabOn == 'tab1'" ref="tab1List"  @scroll="handleScroll">
      <div class="common-list collecttion-list">
        <div :class="['common-cell', {'animated flipInY': index == 0 && firstLoad, 'reverse': item.reverse}]" v-for="(item, index) in collectionList" :key="'collection' + index" @click.stop="toShopDetail(item.shopId)">
          <div :class="['front-side with-shadow', {'bg-1': index % 3 == 0, 'bg-2': index % 3 == 1,'bg-3': index % 3 == 2, 'hidden': item.reverse}]">
            <div class="icon-egg" v-show="item.zoneCount > 0"></div>
            <div :class="['icon-collect', {'collect-tag': item.state == 1}]"></div>
            <div class="cell-header">
              <div class="cell-logo">
                <img class="cell-logo-img" :src="item.shopLogo" />
              </div>
              <div class="cell-content">
                <div class="cell-shop-name">{{item.shopName}}</div>
                <div class="cell-shop-info">
                  <span class="text">去过{{item.consumeNums}}次</span>
                  <span class="text">{{item.tradingArea}}</span>
                  <span class="text">距您{{item.distance | formatDistanceCN}}</span>
                </div>
              </div>
            </div>
            <div class="tag-info clearfix">
              <span class="tag-cell" v-if="item.hasOwnProperty('merLevelConfig')">{{item.merLevelConfig.levelName.toUpperCase()}}</span>
              <span class="tag-cell" v-show="item.zoneCount > 0">彩蛋</span>
              <span class="tag-cell" v-show="item.pensionRate">返{{item.pensionRate * 100}}%保金</span>
              <span class="tag-cell" v-show="typeof(item.cashCoupon) == 'object' && item.cashCoupon.activityType == 10">满减</span>
              <span class="tag-cell" v-show="typeof(item.cashCoupon) == 'object' && item.cashCoupon.activityType == 11">满送</span>
              <span class="tag-cell">套餐</span>
            </div>
            <div class="cell-footer-btn" @click.stop="showDiscounts(index)">查看优惠</div>
          </div>
          <div :class="['reverse-side with-shadow', {'bg-1': index % 3 == 0, 'bg-2': index % 3 == 1,'bg-3': index % 3 == 2, 'hidden': !item.reverse}]">
            <div class="icon-egg" v-show="item.zoneCount > 0"></div>
            <div class="cell-content">
              <div class="cell-shop-name">{{item.shopName}}</div>
              <div class="height-10"></div>
              <div class="cell-item" v-if="item.hasOwnProperty('merLevelConfig')">
                <div class="label">{{item.merLevelConfig.levelName.toUpperCase()}}</div>
                <div class="desc">{{item.merLevelConfig.levelDesc}}</div>
              </div>
              <div class="cell-item" v-if="item.pensionRate">
                <div class="label">返金</div>
                <div class="desc">消费返{{item.pensionRate * 100}}%保障金</div>
              </div>
              <div class="cell-item" v-if="(typeof(item.cashCoupon) == 'object' && item.cashCoupon.activityType == 10) || typeof(item.cashCoupon) == 'object' && item.cashCoupon.activityType == 11">
                <span class="label" v-show="typeof(item.cashCoupon) == 'object' && item.cashCoupon.activityType == 10">满减</span>
                <span class="label" v-show="typeof(item.cashCoupon) == 'object' && item.cashCoupon.activityType == 11">满送</span>
                <div class="desc"></div>
              </div>
              <div class="cell-item" v-if="typeof(item.coupon) == 'object' && item.coupon.hasOwnProperty('couponName')">
                <div class="label">套餐</div>
                <div class="desc">{{item.coupon.couponName || ''}}</div>
              </div>
            </div>
            <div class="cell-footer-btn" @click.stop="showDiscounts(index)">回到正面</div>
          </div>
        </div>
      </div>
      <div class="recomment-list-title" v-show="showRecommendList">没有更多收藏店铺，已为您推荐</div>
      <div class="common-list recommend-list">
        <div :class="['common-cell', {'reverse': item.reverse}]" v-for="(item, index) in recommendList" :key="'recommend' + index" @click.stop="toShopDetail(item.shopId)">
          <div :class="['front-side with-shadow', {'bg-1': index % 3 == 0, 'bg-2': index % 3 == 1,'bg-3': index % 3 == 2, 'hidden': item.reverse}]">
            <div class="icon-egg" v-show="item.zoneCount > 0"></div>
            <!-- <div :class="['icon-collect', {'collect-tag': item.state == 1}]"></div> -->
            <div class="cell-header">
              <div class="cell-logo">
                <img class="cell-logo-img" :src="item.mainImgUrl" />
              </div>
              <div class="cell-content">
                <div class="cell-shop-name">{{item.shopName}}</div>
                <div class="cell-shop-info">
                  <span class="text">去过{{item.consumeNums}}次</span>
                  <span class="text">{{item.tradingArea}}</span>
                  <span class="text">距您{{item.distance | formatDistanceCN}}</span>
                </div>
              </div>
            </div>
            <div class="tag-info clearfix">
              <span class="tag-cell" v-if="item.hasOwnProperty('merLevelConfig')">{{item.merLevelConfig.levelName.toUpperCase()}}</span>
              <span class="tag-cell" v-show="item.zoneCount > 0">彩蛋</span>
              <span class="tag-cell" v-show="item.pensionRate">返{{item.pensionRate * 100}}%保金</span>
              <span class="tag-cell" v-show="typeof(item.cashCoupon) == 'object' && item.cashCoupon.activityType == 10">满减</span>
              <span class="tag-cell" v-show="typeof(item.cashCoupon) == 'object' && item.cashCoupon.activityType == 11">满送</span>
              <span class="tag-cell">套餐</span>
            </div>
            <div class="cell-footer-btn" @click.stop="showDiscounts2(index)">查看优惠</div>
          </div>
          <div :class="['reverse-side with-shadow', {'bg-1': index % 3 == 0, 'bg-2': index % 3 == 1,'bg-3': index % 3 == 2, 'hidden': !item.reverse}]">
            <div class="icon-egg" v-show="item.zoneCount > 0"></div>
            <div class="cell-content">
              <div class="cell-shop-name">{{item.shopName}}</div>
              <div class="height-10"></div>
              <div class="cell-item" v-if="item.hasOwnProperty('merLevelConfig')">
                <div class="label">{{item.merLevelConfig.levelName.toUpperCase()}}</div>
                <div class="desc">{{item.merLevelConfig.levelDesc}}</div>
              </div>
              <div class="cell-item" v-if="item.pensionRate">
                <div class="label">返金</div>
                <div class="desc">消费返{{item.pensionRate * 100}}%保障金</div>
              </div>
              <div class="cell-item" v-if="(typeof(item.cashCoupon) == 'object' && item.cashCoupon.activityType == 10) || typeof(item.cashCoupon) == 'object' && item.cashCoupon.activityType == 11">
                <span class="label" v-show="typeof(item.cashCoupon) == 'object' && item.cashCoupon.activityType == 10">满减</span>
                <span class="label" v-show="typeof(item.cashCoupon) == 'object' && item.cashCoupon.activityType == 11">满送</span>
                <div class="desc"></div>
              </div>
              <div class="cell-item" v-if="typeof(item.coupon) == 'object' && item.coupon.hasOwnProperty('couponName')">
                <div class="label">套餐</div>
                <div class="desc">{{item.coupon.couponName || ''}}</div>
              </div>
            </div>
            <div class="cell-footer-btn" @click.stop="showDiscounts2(index)">回到正面</div>
          </div>
        </div>
        <div class="no-more" v-show="allLoaded">没有更多了</div>
      </div>
    </div>
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
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
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
      showRecommendList: false,
      recommendList: [],
      firstLoad: true,
      pageRowForRec: 5, // 常去部分的
      pageNumForRec: 1, // 常去部分的
      pageRowFroAct: 5, // 有活动部分的
      pageNumForAct: 1, // 有活动部分的
      // range: 20000,
      allLoaded: false,
      allLoadedForAct: false,
      shopMainType: 1, // 显示的大类
      collectionListForAct: [],
      recommendListForAct: [],
      showRecommendListForAct: false,
    }
  },
  deactivated() {
    // 离开页面时
    let scroll = 0;
    if (this.tabOn == 'tab1') {
      scroll = this.$refs.tab1List.scrollTop;
    } else if (this.tabOn == 'tab2') {
      scroll = this.$refs.tab2List.scrollTop;
    }
    sessionStorage.setItem('scroll', scroll);
  },
  activated() {
    // 再次进入到缓存的页面时 需要keep-live
    let scroll = sessionStorage.getItem('scroll');
    if (this.tabOn == 'tab1') {
      this.$refs.tab1List.scrollTop = parseInt(scroll);
    } else if (this.tabOn == 'tab2') {
      this.$refs.tab2List.scrollTop = parseInt(scroll);
    }
    // TODO点击收藏 取消收藏后刷新列表页面
    // if (!!this.longitude && !!this.latitude) {
    //   this.getShops();
    //   this.getActivities();
    // }
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
    getLocationOver() {
      return !!this.longitude && !!this.latitude;
    }
  },
  created() {
    this.$store.dispatch('setLoadingState', true);
    let { keyWords } = this.$route.query;
    this.keyWords = keyWords || '';
    this.getKinds();
  },
  mounted() {
    if (!!this.longitude && !!this.latitude) {
      this.getShops();
      this.getActivities();
    }
  },
  watch: {
    getLocationOver(val, oldVal) {
      if (val) {
        this.getShops();
      }
    },
  },
  methods: {
    toSearch() {
      this.$router.push('/collection/search');
    },
    toMapSearch() {
      this.$router.push('/collection/mapSearch');
    },
    tabClick(num) {
      this.tabOn = num;
      this.showAll = false;
      this.selectedKindId = '';
      this.pageNumForAct = 1;
      this.pageNumForRec = 1;
      if (num == 'tab1') {
        this.getShops();
      } else if (num == 'tab2') {
        this.getActivities();
      }
    },
    compare(x, y) { //比较函数
      if (x.sort < y.sort) {
        return -1;
      } else if (x.sort > y.sort) {
        return 1;
      } else {
        return 0;
      }
    },
    getKinds() {
      api.collection.qryShopTypeList({ id: null }).then((res) => {
        let obj = { name: '全部', id: '', sort: 0 };
        res.data.unshift(obj);
        this.kinds = res.data.sort(this.compare);
      }).catch((err) => {
        console.log(err);
      }).then(() => {
        this.$store.dispatch('setLoadingState', true);
      });
    },
    changeKind(id) {
      this.collectionList = [];
      this.recommendList = [];
      if (!id) {
        this.shopMainType = 1;
      } else {
        this.shopMainType = id;
      }
      this.selectedKindId = id;
      this.showAll = false;
      if (this.tabOn == 'tab1') {
        this.pageNumForRec = 1;
        this.$nextTick(() => {
          this.getShops();
        });
      } else if (this.tabOn == 'tab2') {
        this.pageNumForAct = 1;
        this.$nextTick(() => {
          this.getActivities();
        });
      }

    },
    showAllKinds() {
      this.showAll = true;
    },
    closeShade() {
      this.showAll = false;
    },
    handleScroll() {
      // console.log(this.$refs.tab1List.scrollTop, this.$refs.tab1List.offsetHeight, this.$refs.tab1List.scrollHeight, this.$refs.tab1List.offsetTop);
      let element = null;
      if(this.tabOn == 'tab1'){
        element = this.$refs.tab1List;
      }else if(this.tabOn == 'tab2'){
        element = this.$refs.tab2List;
      }
      // console.log(element.scrollTop, element.offsetHeight, element.scrollHeight);
      if (element.scrollTop + element.offsetHeight >= element.scrollHeight) {
        if (this.tabOn == 'tab1') {
          this.loadMore();
        } else if (this.tabOn == 'tab2') {
          this.loadMoreForAct();
        }
      }
    },
    // 常去收藏店铺
    getShops() {
      api.collection.qryMyCollect({
        pageNum: 1,
        pageRow: 10000,
        shopLon: this.longitude.toString(),
        shopLat: this.latitude.toString(),
        // shopLon: '120.082565',
        // shopLat: '30.200684',
        range: '10000',
        shopMainType: this.shopMainType.toString(),
        keyWords: this.keyWords || '',
      }).then((res) => {
        if (!res.hasOwnProperty('data') || res.data.length <= 10) {
          this.showRecommendList = true;
          this.getRecommendList();
        }
        if (!res.hasOwnProperty('data')) {
          return;
        }
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
    // 有活动部分
    getActivities() {
      api.collection.qryMerCouponActivity({
        pageNum: 1,
        pageRow: 10000,
        shopLon: this.longitude.toString(),
        shopLat: this.latitude.toString(),
      }).then((res) => {
        // console.log(res);
        // if (!res.hasOwnProperty('data') || res.data.length <= 10) {
        //   this.showRecommendListForAct = true;
        //   this.getActivitiesRec();
        // }
        if (!res.hasOwnProperty('data')) {
          this.getActivitiesRec();
          return;
        }
        this.collectionListForAct = res.data;
        this.getActivitiesRec();
      }).catch((err) => {});
    },
    // 有活动部分-推荐
    getActivitiesRec() {
      this.showRecommendListForAct = true;
      api.collection.qryMerCouponHot({
        pageNum: this.pageNumForAct,
        pageRow: this.pageRowFroAct,
        shopLon: this.longitude.toString(),
        shopLat: this.latitude.toString(),
        range: '20000',
      }).then((res) => {
        if (res.data.length < this.pageRowFroAct) {
          this.allLoadedForAct = true;
        }
        this.recommendListForAct = this.pageNumForAct == 1 ? res.data : this.recommendListForAct.concat(res.data);
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
    },
    showDiscounts2(index) {
      this.$nextTick(() => {
        // console.log(index);
        let item = this.recommendList[index];
        // console.log(item);
        if (item.reverse) {
          item.reverse = false;
        } else {
          item.reverse = true;
        }
        this.$set(this.recommendList, index, item);
      });
    },
    getRecommendList() {
      api.collection.hotShop({
        pageNum: this.pageNumForRec,
        pageRow: this.pageRowForRec,
        shopLon: this.longitude.toString(),
        shopLat: this.latitude.toString(),
        range: '20000',
        isHot: '-1',
      }).then((res) => {
        // todo 测试数据
        if (!res.hasOwnProperty('data') || res.data.length == 0) {
          _.alert('没有更多了');
          this.allLoaded = true;
          return;
        }
        res.data.forEach((obj) => {
          obj.reverse = false;
        });
        if (res.data.length < this.pageRowForRec) {
          this.allLoaded = true;
        }
        this.recommendList = this.pageNumForRec == 1 ? res.data : this.recommendList.concat(res.data);
      }).catch((err) => {});
    },
    loadMore() {
      if (this.allLoaded || this.recommendList.length == 0) {
        return;
      }
      this.pageNumForRec++;
      this.$nextTick(() => {
        this.getRecommendList();
      });
    },
    loadMoreForAct() {
      if (this.allLoadedForAct || this.recommendListForAct.length == 0) {
        return;
      }
      this.pageNumForAct++;
      this.$nextTick(() => {
        this.getActivitiesRec();
      });
    },
    toShopDetail(shopId) {
      this.$router.push({
        path: '/collection/shopDetail',
        query: {
          shopId,
        }
      });
    },
    toBuy(couponId) {
      this.$router.push({
        path: '/collection/couponDetail',
        query: {
          couponId,
        }
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

.activity-list {
  width: 100%; // height: 100%; // overflow: scroll;
  min-height: 100%;
  padding-top: 286px;
  box-sizing: border-box;
  .recomment-list-title {
    margin-top: 50px;
    margin-bottom: 30px;
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #2E3141;
    text-align: center;
    line-height: 41.6px;
  }
  .common-list {
    width: 100%;
    background: #FFF;
    .common-cell {
      margin: 0 auto;
      width: 750px;
      height: 260px;
      padding: 30px;
      box-sizing: border-box;
      .common-box {
        width: 100%;
        height: 100%;
        position: relative;
        &::after {
          content: '';
          width: 690px;
          height: 0px;
          border-top: 1px solid #C4CACD;
          /*no*/
          position: absolute;
          bottom: -30px;
          left: 0;
        }
        &.no-border::after {
          border: none;
        }
        .box-left {
          position: absolute;
          top: 0;
          left: 0;
          width: 200px;
          height: 200px;
          .coupon-img {
            width: 100%;
            height: 100%;
          }
        }
        .box-right {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          padding-left: 231px;
          .shop-name {
            font-family: PingFangSC-Semibold;
            font-size: 32px;
            color: #2E3141;
            line-height: 41.6px;
          }
          .coupon-name {
            margin-top: 20.8px;
            opacity: 0.8;
            font-family: PingFangSC-Regular;
            font-size: 24px;
            color: #2E3141;
            line-height: 31.2px;
          }
          .other-info {
            margin-top: 10.8px;
            opacity: 0.8;
            font-family: PingFangSC-Regular;
            font-size: 24px;
            color: #2E3141;
            line-height: 31.2px;
          }
          .price {
            margin-top: 30.8px;
            width: 100%;
            height: 36.4px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-family: PingFangSC-Semibold;
            font-size: 32px;
            color: #F05720;
            letter-spacing: 0;
            line-height: 36.4px;
            .buy-price {}
            .coupon-price {
              font-family: PingFangSC-Regular;
              font-size: 28px;
              color: #2E3141;
              letter-spacing: 0;
              line-height: 36.4px;
              text-decoration: line-through;
            }
            .discount {
              display: inline-block;
              height: 36.4px;
              font-family: PingFangSC-Regular;
              font-size: 22px;
              color: #FFFFFF;
              letter-spacing: -0.53px;
              text-align: center;
              line-height: 36.4px;
              background: #F05720;
              padding-left: 5px;
              padding-right: 5px;
            }
          }
          .buy-btn {
            display: block;
            position: absolute;
            width: 140px;
            height: 50px;
            box-sizing: border-box;
            bottom: 0;
            right: 0;
            border: 3px solid #F05720;
            border-radius: 34px;
            font-family: PingFangSC-Semibold;
            font-size: 28px;
            color: #F05720;
            letter-spacing: 0;
            text-align: center;
            line-height: 44px;
          }
        }
      }
    }
  }
}

.shop-list, .activity-list{
  height: 100%;
  overflow: scroll;
}

.shop-list {
  width: 100%; // height: 100%; // overflow: scroll;
  min-height: 100%;
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
    .no-more {
      padding-top: 0;
    }
    &.recommend-list {
      margin-top: 30px;
    }
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
        .icon-egg {
          position: absolute;
          width: 95px;
          height: 105px;
          top: 0;
          left: 0;
          z-index: 11;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-image: url('../assets/images/img_eggtag.png');
        }
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
          background-image: url('../assets/images/ic_like_grey.png');
          &.collect-tag {
            background-image: url('../assets/images/ic_like.png');
          }
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
        .tag-info {
          margin-top: 20px;
          width: 100%;
          height: 40px;
          overflow: hidden;
          .tag-cell {
            display: inline-block;
            float: left;
            margin-right: 10px;
            height: 40px;
            box-sizing: border-box;
            border: 1px solid #FFFFFF;
            /*no*/
            border-radius: 25px;
            line-height: 24px;
            font-family: PingFangSC-Regular;
            font-size: 24px;
            padding-top: 6px;
            padding-left: 15px;
            padding-right: 15px;
            color: #FFFFFF;
          }
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
        background-image: url('../assets/images/bg_background.png') !important;
        .cell-content {
          width: 100%;
          height: 100%;
          padding-top: 30px;
          padding-left: 30px;
          padding-right: 30px;
          box-sizing: border-box;
          .cell-shop-name {
            width: 540px;
            height: 46.8px;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0 auto;
            white-space: nowrap;
            text-align: center;
            font-family: PingFangSC-Semibold;
            font-size: 36px;
            color: #FFFFFF;
            line-height: 46.8px;
          }
          .height-10 {
            height: 10px;
          }
          .cell-item {
            width: 100%;
            height: 40px;
            position: relative;
            padding-left: 90px;
            box-sizing: border-box;
            margin-top: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .label {
              display: inline-block;
              position: absolute;
              box-sizing: border-box;
              top: 0;
              left: 0;
              width: 80px;
              height: 40px;
              font-family: PingFangSC-Regular;
              font-size: 24px;
              line-height: 38px;
              text-align: center;
              color: #FFFFFF;
              border: 1px solid #fff;
              /*no*/
              border-radius: 25px;
            }
            .desc {
              display: inline-block;
              font-family: PingFangSC-Regular;
              font-size: 28px;
              color: #C4CACD;
              letter-spacing: 0;
              line-height: 40px;
            }
          }
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
    }
  }
}

</style>
