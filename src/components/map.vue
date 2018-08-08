<template>
  <div class="amap-page-container">
    <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center" :zoom="zoom" v-if="!!center" :events="events">
      <el-amap-circle-marker v-for="(marker, index) in markers" :center="marker.center" :radius="marker.radius" :fill-color="marker.fillColor" :stroke-weight="marker.strokeWeight" :stroke-color="marker.strokeColor" :stroke-opacity="marker.strokeOpacity" :fill-opacity="marker.fillOpacity" :events="marker.events" :key="'amap1' + index"></el-amap-circle-marker>
    </el-amap>
    <el-amap vid="amap" :plugin="plugin" class="amap-demo" :zoom="zoom" :events="events" v-else>
      <el-amap-circle-marker v-for="(marker, index) in markers" :center="marker.center" :radius="marker.radius" :fill-color="marker.fillColor" :stroke-weight="marker.strokeWeight" :stroke-color="marker.strokeColor" :stroke-opacity="marker.strokeOpacity" :fill-opacity="marker.fillOpacity" :events="marker.events" :key="'amap2' + index"></el-amap-circle-marker>
    </el-amap>
    <div class="toolbar">
    </div>
    <div class="address">
      {{address}}
    </div>
    <p>longitude: {{longitude}}</p>
    <p>latitude: {{latitude}}</p>
    <p>formattedAddress: {{formattedAddress}}</p>
  </div>
</template>
<style>
.amap-demo {
  height: 300px;
}

.address {
  margin-top: 50px;
}

</style>
<script>
import { mapGetters } from 'vuex'
import { AMapManager } from 'vue-amap';
export default {
  data() {
    let self = this;
    return {
      // center: null,
      center: null,
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
          // var geocoder = new AMap.Geocoder({
          //   radius: 1000,
          //   extensions: "all"
          // });
          // geocoder.getAddress(self.center, function(status, result) {
          //   console.log('getAddress:', status, result);
          //   if (status === 'complete' && result.info === 'OK') {
          //     self.address = result.regeocode.formattedAddress;
          //   } 
          // });



          // var geolocation = new AMap.Geolocation({
          //   // 是否使用高精度定位，默认：true
          //   enableHighAccuracy: true,
          //   // 设置定位超时时间，默认：无穷大
          //   timeout: 10000,
          //   // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          //   buttonOffset: new AMap.Pixel(10, 20),
          //   //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          //   zoomToAccuracy: true,
          //   //  定位按钮的排放位置,  RB表示右下
          //   buttonPosition: 'RB'
          // })

          // geolocation.getCurrentPosition()
          // AMap.event.addListener(geolocation, 'complete', onComplete)
          // AMap.event.addListener(geolocation, 'error', onError)

          // function onComplete(data) {
          //   // data是具体的定位信息
          //   // console.log('具体信息:' + JSON.stringify(data));
          //   // _.alert(data.formattedAddress);
          //   console.log('console in demo', data);
          //   // this.setFormattedAddress(data.formattedAddress);
          // }

          // function onError(err) {
          //   // 定位出错
          //   console.log(err.message);
          // }


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
  mounted() {
    var self = this;
    if (!!self.longitude && !!self.latitude) {
      self.center = [self.longitude, self.latitude];
      self.lng = self.longitude;
      self.lat = self.latitude;
      self.loaded = true;
    }
  },
  computed: {
    ...mapGetters([
      'longitude',
      'latitude',
      'formattedAddress',
    ]),
    newCenter() {
      if (!!this.longitude && !!this.latitude) {
        this.setCurrent(this.longitude, this.latitude);
        return [this.longitude, this.latitude]
      }
    }
  },
  watch: {
    newCenter(val, oldVal) {
      this.center = val;
      this.$nextTick();
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
  },
};

</script>
