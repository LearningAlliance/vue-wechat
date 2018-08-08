<template>
  <div class="amap-page-container">
    <el-amap vid="amapDemo" :center="center" :amap-manager="amapManager" :zoom="zoom" :events="events" class="amap-demo">
    </el-amap>
    <div class="toolbar">
      <button @click="add">add marker</button>
    </div>
  </div>
</template>
<style>
.amap-page-container {
  width: 100%;
  height: 600px;
}

</style>
<script>
import { mapGetters } from 'vuex'
import VueAMap from 'vue-amap';
let amapManager = new VueAMap.AMapManager();
let center = null;
export default {
  data() {
    return {
      zoom: 12,
      // center: [],
      amapManager,
      events: {
        init(o) {
          let marker = new AMap.Marker({
            position: center
          });

          marker.setMap(o);
        }
      }
    };
  },
  computed: {
    ...mapGetters([
      'longitude',
      'latitude'
    ]) ,
    center(){
      return [];
      center = [this.longitude, this.latitude];
      return [this.longitude, this.latitude]
    }
  },
  mounted() {
    this.center[0] = this.longitude;
    this.center[1] = this.latitude;
  },
  watch: {
    center: function(val, oldVal){
      if(oldVal.length == 0){
        this.add();
      }
    }
  },
  methods: {
    add() {
      let o = amapManager.getMap();
      let marker = new AMap.Marker({
        position: [this.longitude, this.latitude]
      });
      marker.setMap(o);
    }
  }
};

</script>
