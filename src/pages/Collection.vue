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
    <div class="kind">
      
    </div>
    <!-- <map-demo></map-demo> -->
    <!-- <my-map></my-map> -->
  </div>
</template>
<script type="text/javascript">
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
    // console.log(this.$route);
    let { keyWords } = this.$route.query;
    this.keyWords = keyWords || '';
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
    tabClick(num){
      this.tabOn = num;
    }
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  background: #F8F8FC;
  height: 100%;
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
      &.on{
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

.kind{
  position: fixed;
  top: 176px;
  left: 0;
  width: 100%;
  height: 110px;
  background: #F8F8FC;
  z-index: 999;
}

</style>
