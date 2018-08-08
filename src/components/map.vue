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
  </div>
</template>
<style>
.amap-demo {
  height: 300px;
}
.address{
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
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
          });
          geocoder.getAddress(self.center, function(status, result) {
            console.log('getAddress:', status, result);
            if (status === 'complete' && result.info === 'OK') {
              self.address = result.regeocode.formattedAddress;
            } 
          });
        },
      },
      plugin: [
        // {
        //   pName: 'Geolocation',
        //   events: {
        //     init(o) {
        //       if (!!self.longitude && !!self.latitude) {
        //         self.center = [self.longitude, self.latitude];
        //         self.lng = self.longitude;
        //         self.lat = self.latitude;
        //         self.loaded = true;
        //         self.$nextTick();
        //         return;
        //       }
        //       // o 是高德地图定位插件实例
        //       // o.getCurrentPosition((status, result) => {
        //       //   if (result && result.position) {
        //       //     self.lng = result.position.lng;
        //       //     self.lat = result.position.lat;
        //       //     console.log(status, result);
        //       //     self.center = [self.lng, self.lat];
        //       //     self.loaded = true;
        //       //     self.$nextTick();
        //       //   }
        //       // });
        //     }
        //   }
        // }, 
        {
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
        }, 
      ]
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
      'latitude'
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
      this.markers.push(marker);
    },
  },
};

</script>
