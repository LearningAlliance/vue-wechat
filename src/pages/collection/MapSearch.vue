<template>
  <div class="page">
    <div class="search-box">
      <i class="icon-back" @click="back"></i>
      <div class="input-box">
        <i class="icon-search"></i>
        <input class="input-search" ref="search" type="search" @keyup.enter="search" placeholder="搜索地点" v-model="keyWords" />
      </div>
    </div>
    <my-map :shop-markers="shopMarkers" :longitude="longitude" :latitude="latitude"></my-map>
  </div>
</template>
<script type="text/javascript">
import map from '@/components/map.vue'
import * as _ from '@/util/tool.js'
import api from '@/fetch/api.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      keyWords: '',
      shopMarkers: [],
      // [{
      //   position: [121.5273285, 31.21515044],
      //   title: '...',
      // }, ]
    }
  },
  components: {
    'my-map': map,
  },
  computed: {
    ...mapGetters([
      'longitude',
      'latitude',
      'formattedAddress',
    ]),
    canGetShops() {
      return this.longitude && this.latitude;
    }
  },
  watch: {
    canGetShops(val, oldVal) {
      if (val) {
        // this.center = [this.longitude, this.latitude];
        this.getShops();
      }
    },
  },
  methods: {
    search() {
      this.getShops();
      console.log(this.$refs.search);
      this.$refs.search.blur();
    },
    back() {
      window.history.back();
    },
    getShops() {
      api.collection.qryMyCollect({
        pageNum: 1,
        pageRow: 10000,
        shopLon: '120.082565',
        shopLat: '30.200684',
        range: '10000',
        // shopMainTypes: '1',
        keyWords: this.keyWords || '',
      }).then((res) => {
        console.log(res);
        let shopMarkers = [];
        res.data.forEach((obj) => {
          let o = {};
          o.position = [obj.shopLon, obj.shopLat];
          o.title = obj.shopName;
          o.shopName = obj.shopName;
          o.tradingArea = obj.tradingArea;
          shopMarkers.push(o);
        })
        this.shopMarkers = shopMarkers;
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
  min-height: 100%;
  background: #f8f8fc;
  box-sizing: border-box;
  overflow: hidden;
}

.search-box {
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  padding: 20px 80px;
  background: #FFF;
  position: relative;
  .icon-back {
    width: 50px;
    height: 50px;
    position: absolute;
    display: block;
    top: 25px;
    left: 20px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../assets/images/ic_back@2x.png');
  }
  .input-box {
    width: 100%;
    height: 100%;
    background: #F8F8FC;
    border-radius: 30px;
    overflow: hidden;
    position: relative;
    .icon-search {
      position: absolute;
      width: 34px;
      height: 34px;
      top: 13px;
      left: 30px;
      display: block;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url('../../assets/images/ic_search.png');
    }
    .input-search {
      width: 100%;
      height: 100%;
      text-indent: 94px;
      background: #F8F8FC;
      border-radius: 30px;
      overflow: hidden;
      &::-webkit-input-placeholder {
        color: #C4CACD;
      }
    }
  }
}

</style>
