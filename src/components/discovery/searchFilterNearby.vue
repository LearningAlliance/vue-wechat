<template>
  <div class="box">
    <div class="list clearfix">
      <div class="list-left">
        <div :class="['main-kind', {'on': dataLeftIndex == index}]" v-for="(item, index) in dataLeft" :key="'kind' + index" @click="changeKind(index)">{{item.name}}</div>
      </div>
      <div class="list-right">
        <div :class="['sub-kind', {'on': dataRightIndex == index}]" v-for="(item, index) in dataRight" @click="changeSubKind(index)" :key="'subKind' + index">{{item.name}}</div>
      </div>
    </div>
    <div class="" <div class="close-btn" @click="closeModal"></div>
  </div>
</template>
<script type="text/javascript">
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
import { mapGetters } from 'vuex'
export default {
  props: {
    closeModal: {
      type: Function,
    },
    changeSearch: {
      type: Function,
    },
  },
  data() {
    return {
      dataLeft: [{ id: 0, name: '附近', sort: 0 }],
      subKinds: [{ id: 0, name: '500米', value: 500, sort: 0 }, { id: 0, name: '1公里', value: 1000, sort: 1 }, { id: 0, name: '2公里', value: 2000, sort: 2 }, { id: 0, name: '3公里', value: 3000, sort: 3 }, { id: 0, name: '5公里', value: 5000, sort: 4 }],
      distance: 10000,
      businessAreas: [], // 商圈信息
      dataRight: [],
      defaultDataRight: [
        { id: 0, name: '500米', value: 500, sort: 0 },
        { id: 1, name: '1公里', value: 1000, sort: 1 },
        { id: 2, name: '2公里', value: 2000, sort: 2 },
        { id: 3, name: '3公里', value: 3000, sor: 3 },
        { id: 4, name: '5公里', value: 5000, sort: 4 },
        { id: 5, name: '10公里', value: 10000, sort: 5 },
      ],
      dataLeftIndex: 0,
      dataRightIndex: 0
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
  watch: {
    getLocationOver(val, oldVal) {
      if (val) {
        this.getData();
      }
    },
  },
  mounted() {
    if (!!this.latitude && !!this.longitude) {
      this.getData();
    }
    this.dataRight = this.defaultDataRight;
  },
  methods: {
    // 获取附近信息
    getData() {
      api.discovery.getAddress({
        lat: this.latitude,
        lon: this.longitude,
      }).then((res) => {
        var t;
        try {
          let { areaItem = [] } = res.data;
          this.dataLeft = this.dataLeft.concat(areaItem);
          // let { businessAreas = [], adcode = "330100", citycode = "0571" } = res.regeocode.addressComponent;
          // t = businessAreas;
          // api.discovery.qrySysOrganizeList({
          //   // id: adcode
          //   id: 330100
          // }).then((res) => {
          //   this.dataLeft = this.dataLeft.concat(res.data);
          // }).catch((err) => {
          //   console.log('Error in qrySysOrganizeList:' + err);
          // })
        } catch (e) {
          t = [];
        }
        this.businessAreas = t;
      }).catch((err) => {});
    },
    qrySysOrganizeList(params) {
      let { id = null, name = '' } = params;
      api.discovery.qrySysOrganizeList({
        id,
      }).then((res) => {
        if (res.data.length == 0) {
          this.dataRight = [params];
        } else {
          this.dataRight = res.data;
        }
      }).catch((err) => {
        console.log('Error in qrySysOrganizeList:' + err);
      })
    },
    changeKind(index) {
      if (this.dataLeftIndex == index) {
        return;
      }
      this.dataLeftIndex = index;
      if (index == 0) {
        // 修改的为附近
        this.dataRight = this.defaultDataRight;
      } else {
        this.qrySysOrganizeList(this.dataLeft[index])
      }
    },
    changeSubKind(index, value) {
      this.dataRightIndex = index;
      if (this.dataLeftIndex == 0) {
        //附近时，修改distance
        this.changeSearch(1, { distance: this.dataRight[index].value });
        this.closeModal();
      } else {
        // 修改商圈信息时
        this.changeSearch(2, { name: this.dataRight[index].name });
        this.closeModal();
      }
    }
  }
}

</script>
<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  position: fixed;
  box-sizing: border-box;
  padding-top: 88px;
  padding-bottom: 200px;
  z-index: 998;
  overflow: hidden;
}

.list {
  width: 100%;
  height: 100%;
  background: #FFF;
  .list-left {
    display: inline-block;
    float: left;
    width: 44%;
    height: 100%;
    overflow: scroll;
    background: #F8F8FC;
    .main-kind {
      height: 100px;
      box-sizing: border-box;
      padding-left: 50px;
      padding-right: 50px;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #2E3141;
      line-height: 100px;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &.on {
        color: #F05720;
        background: #FFF;
      }
    }
  }
  .list-right {
    display: inline-block;
    float: left;
    width: 56%;
    height: 100%;
    overflow: scroll;
    background: #FFF;
    .sub-kind {
      width: 100%;
      height: 100px;
      font-family: PingFangSC-Regular;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      box-sizing: border-box;
      text-align: left;
      padding-left: 50px;
      padding-right: 50px;
      font-size: 28px;
      color: #2E3141;
      line-height: 100px;
      &.on {
        color: #F05720;
      }
    }
  }
}

.close-btn {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}

</style>
