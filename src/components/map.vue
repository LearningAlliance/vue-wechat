<template>
  <div class="amap-page-container">
    <el-amap vid="amap" :plugin="plugin" class="amap-demo cs1111" :center="center" :zoom="zoom" v-if="!!longitude && !!latitude" :events="events">
      <el-amap-circle-marker v-for="(marker, index) in markers" :center="marker.center" :radius="marker.radius" :fill-color="marker.fillColor" :stroke-weight="marker.strokeWeight" :stroke-color="marker.strokeColor" :stroke-opacity="marker.strokeOpacity" :fill-opacity="marker.fillOpacity" :events="marker.events" :key="'amap1' + index"></el-amap-circle-marker>
      <el-amap-marker v-for="(marker, index) in shopMarkers" :icon="marker.icon" :title="marker.title" :key="'shopMarkers1' + index" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>
    </el-amap>
    <!--     <el-amap vid="amap" :plugin="plugin" class="amap-demo cs2222" :zoom="zoom" :events="events" v-else>
      <el-amap-circle-marker v-for="(marker, index) in markers" :center="marker.center" :radius="marker.radius" :fill-color="marker.fillColor" :stroke-weight="marker.strokeWeight" :stroke-color="marker.strokeColor" :stroke-opacity="marker.strokeOpacity" :fill-opacity="marker.fillOpacity" :events="marker.events" :key="'amap2' + index"></el-amap-circle-marker>
      <el-amap-marker v-for="(marker, index) in shopMarkers" :icon="marker.icon" :title="marker.title" :key="'shopMarkers2' + index" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>
    </el-amap> -->
    <!--     <div class="toolbar">
    </div>
    <div class="">
      {{address}}
    </div>
    <p>longitude: {{longitude}}</p>
    <p>latitude: {{latitude}}</p>
    <p>formattedAddress: {{formattedAddress}}</p> -->
    <div class="pos-box with-shadow" v-show="loaded " @click="toMyPos">
      <i class="icon-pos-my"></i>
    </div>
    <div class="list-box">
      <div :class="['cell', {'no-border': shopMarkers.length - 1 == index, 'selected': selectedIndex == index}]" v-for="(marker, index) in shopMarkers" @click="selectPos(index)">
        <i class="icon-pos" v-show="selectedIndex == index"></i>
        <div class="shopName">{{marker.shopName}}</div>
        <div class="address">{{marker.tradingArea}}</div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.amap-page-container {
  position: relative;
  width: 100%;
  height: 534px;
  .pos-box {
    position: absolute;
    background: #FFF;
    width: 45px;
    height: 45px;
    border-radius: 45px;
    overflow: hidden;
    bottom: 100px;
    left: 30px; // z-index: 999;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../assets/images/icon_pos_my.png');
  }
}

.list-box {
  width: 100%;
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 30px;
  background: #FFF;
  .cell {
    position: relative;
    height: 134px;
    overflow: hidden;
    padding-top: 30px;
    padding-bottom: 30px;
    box-sizing: border-box;
    border-bottom: 1px solid #C4CACD;
    /*no*/
    &.no-border {
      border: none;
    }
    &.selected {
      padding-left: 50px;
    }
    .icon-pos {
      position: absolute;
      width: 40px;
      height: 40px;
      top: 30px;
      left: 0;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url('../assets/images/ic_location.png');
    }
    .shopName {
      font-family: PingFangSC-Semibold;
      font-size: 32px;
      color: #2E3141;
      line-height: 41.6px;
    }
    .address {
      margin-top: 10px;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #818B8F;
      line-height: 31.2px;
    }
  }
}

</style>
<script>
import { mapGetters } from 'vuex'
import { AMapManager } from 'vue-amap';
export default {
  props: [
    'shopMarkers',
    // 'center',
    'longitude',
    'latitude',
  ],
  data() {
    let self = this;
    return {
      center: null,
      selectedIndex: -1,
      showPosMy: false,
      // center: [this.longitude, this.latitude],
      lng: 0,
      lat: 0,
      loaded: false,
      zoom: 12,
      markers: [],
      circles: [],
      groundimages: [],
      geocoder: null,
      address: null,
      events: {
        init: (o) => {
          self.showPosMy = true;
          self.loaded = true;
        },
      },
      plugin: [{
        pName: 'ToolBar',
        events: {
          init(instance) {
            // console.log(instance);
          }
        }
      }, {
        pName: 'Scale',
        events: {
          init(instance) {
            // console.log(instance);
          }
        }
      }, ]
    };
  },
  created() {
    this.center = [120.1421, 30.31974]; // 默认定位到北京 
  },
  mounted() {
    this.initPos();
  },
  computed: {
    ...mapGetters([
      // 'longitude',
      // 'latitude',
      // 'formattedAddress',
    ]),
  },
  watch: {
    shopMarkers(val, oldVal) {
      this.selectedIndex = -1;
      this.$set(this.center, 0, this.longitude);
      this.$set(this.center, 1, this.latitude);
    },
    longitude(val, oldVal) {
      if(!!val && !!this.latitude){
        this.initPos();
      }
    },
    latitude(val, oldVal) {
      if(!!val && !!this.longitude){
        this.initPos();
      }
    },
  },
  methods: {
    setCurrent(longitude, latitude) {
      let marker = {
        center: [longitude, latitude],
        radius: 9,
        fillColor: '#F05720',
        strokeColor: '#F05720',
        strokeOpacity: 0.2,
        strokeWeight: 16,
      };
      // this.markers.push(marker);
      this.markers = [marker];
    },
    selectPos(index) {
      this.selectedIndex = index;
      this.$set(this.center, 0, this.shopMarkers[index].position[0]);
      this.$set(this.center, 1, this.shopMarkers[index].position[1]);
    },
    toMyPos() {
      this.$set(this.center, 0, this.longitude);
      this.$set(this.center, 1, this.latitude);
    },
    initPos() {
      if (!!this.longitude && !!this.latitude) {
        this.$set(this.center, 0, this.longitude);
        this.$set(this.center, 1, this.latitude);
        this.setCurrent(this.longitude, this.latitude);
      }
    },
  },
};

</script>
