<template>
  <div class="page">
    <!--     <div class="kind clearfix">
      <div :class="['kind-cell', {'active': kindActived == 0}]" @click="changeKind(0)">全部</div>
      <div :class="['kind-cell', {'active': kindActived == 1}]" @click="changeKind(1)">平台</div>
      <div :class="['kind-cell', {'active': kindActived == 2}]" @click="changeKind(2)">商家</div>
      <div :class="['kind-cell no-margin-right', {'active': kindActived == 3}]" @click="changeKind(3)">用户</div>
    </div> -->
    <div class="kind clearfix">
      <div v-for="(item, index) in kinds" v-show="item.num != 0 || index == 0" :key="'kind' + index" :class="['kind-cell', {'active': kindActived == index, 'no-margin-right': kinds.length - 1 == index}]" @click="changeKind(index)">{{`${item.label}(${item.num})`}}</div>
    </div>
    <!-- <div class="list" @scroll="handleScroll"> -->
    <div class="list">
      <div class="cell with-shadow" v-for="(item, index) in list" :key="'list' + index" @click.stop="openEgg(item.id, item.openType, item.state, item.num)">
        <div class="open-btn" v-if="item.state == 1">打开</div>
        <div class="open-time" v-if="item.state == 0">
          <div class="open-time-text">{{item.eff}}</div>
          <div class="open-time-desc">后可打开</div>
        </div>
        <div class="open-no" v-if="item.state == 2">已领空</div>
        <div class="cell-header clearfix">
          <div class="cell-name">{{item.type | filterType}}</div>
          <div :class="['cell-obj-type', {'obj-type-1': item.objType == 1, 'obj-type-2': item.objType == 2, 'obj-type-3': item.objType == 3}]">{{item.objType | filterObjType}}</div>
        </div>
        <div :class="['cell-num', {'has-name': !!item.userNike}]">
          有效期余 <span>{{item.exp}}天</span><span v-if="item.objType == 2 || item.objType == 3"> 数量余 <span>{{item.num}}个</span></span>
          <div class="cell-user-nick" v-if="!!item.userNike">放置人：{{item.userNike}}</div>
        </div>
        <div class="cell-line"></div>
        <div class="cell-desc">开启条件：{{item.openType | filterOpenType}}</div>
      </div>
      <div class="no-more">没有更多了</div>
    </div>
    <validate-egg :egg-id="eggId" :on-success="validateSuccess" :on-close="closeValidateEgg" :visible="showValidateEgg"></validate-egg>
  </div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import validateEgg from '@/components/validateEgg';
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
export default {
  data() {
    return {
      shopId: null,
      kinds: [{
        label: '全部',
        type: 0,
        num: 0,
      }, {
        label: '平台',
        type: 3,
        num: 0,
      }, {
        label: '商家',
        type: 2,
        num: 0,
      }, {
        label: '用户',
        type: 1,
        num: 0,
      }],
      kindActived: 0,
      current: {
        pageNum: 1,
        pageRow: 10000000,
      },
      list: [],
      showValidateEgg: false,
      eggId: null,
    }
  },
  components: {
    'validate-egg': validateEgg,
  },
  computed: {
    ...mapGetters([
      'longitude',
      'latitude',
    ]),
  },
  mounted() {
    let { shopId } = this.$route.query;
    this.shopId = shopId;
    this.qrySysZoneList();
  },
  filters: {
    filterType(type) {
      if (!type) {
        return '';
      }
      if (type == 1) {
        return '活动彩蛋';
      } else if (type == 2) {
        return '红包彩蛋';
      } else if (type == 3) {
        return '视频彩蛋';
      }
    },
    filterObjType(objType) {
      if (!objType) {
        return '';
      }
      if (objType == 1) {
        return '个人';
      } else if (objType == 2) {
        return '商家'
      } else if (objType == 3) {
        return '平台';
      }
    },
    filterOpenType(openType) {
      if (!openType) {
        return '';
      }
      if (openType == 1) {
        return '本店当天任意消费';
      } else if (openType == 2) {
        return '口令';
      } else if (openType == 3) {
        return '本店当天任意消费，扫商家激活';
      }
    }
  },
  deactivated() { // leave page
    this.qrySysZoneList();
  },
  methods: {
    changeKind(index) {
      this.kindActived = index;
      this.current.pageNum = 1;
      this.list = [];
      this.$nextTick(() => {
        this.qrySysZoneList();
      });
    },
    // handleScroll() {
    //   let element = null;
    //   if (element.scrollTop + element.offsetHeight >= element.scrollHeight) {
    //     this.loadMore();
    //   }
    // },
    // loadMore() {
    //   console.log('loadMore');
    // },
    qrySysZoneList() {
      api.collection.qrySysZoneCount({
        shopId: this.shopId,
      }).then((res) => {
        let list = res.data;
        let count = 0;
        // if (this.kinds[this.kindActived].type != 0) {
        //   return;
        // }
        list.forEach((obj) => {
          if (obj.type == 1) {
            this.kinds[3].num = obj.num;
          } else if (obj.type == 2) {
            this.kinds[2].num = obj.num;
          } else if (obj.type == 3) {
            this.kinds[1].num = obj.num;
          }
          count += obj.num;
        });
        this.kinds[0].num = count;
      }).catch((err) => {});

      api.collection.qrySysZoneList({
        shopId: this.shopId,
        ...this.current,
        type: this.kinds[this.kindActived].type,
      }).then((res) => {
        let list = res.data;
        this.list = list;
      }).catch((err) => {});
    },
    openEgg(id, openType, state, num) {
      if (state == 2 || num == 0) {
        _.alert('已领空');
        return;
      }
      if (openType == 2) { // 需要口令验证后跳转
        this.eggId = id;
        this.showValidateEgg = true;
      } else {
        // 直接打开彩蛋后跳转
        this.openSysZone(id);
      }
    },
    toEggDetail(id) {
      this.$router.push({
        path: '/collection/eggDetail',
        query: {
          id,
          shopId: this.shopId,
          success: true,
        },
      });
    },
    validateSuccess(eggId) { // 验证成功
      this.showValidateEgg = false;
      this.qrySysZoneList();
      this.toEggDetail(eggId);
    },
    closeValidateEgg() { // 关闭遮罩
      this.showValidateEgg = false;
    },
    openSysZone(eggId) { // 打开
      api.collection.openSysZone({
        lat: this.latitude,
        lon: this.longitude,
        // pw: this.value,
        zoneId: eggId,
      }).then((res) => {
        let id = res.data.id;
        this.qrySysZoneList();
        this.toEggDetail(id);
      }).catch((err) => {});
    }
  },
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  background: #F8F8FC;
}

.list {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding-top: 110px;
  .no-more {
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #818B8F;
    letter-spacing: 0;
    text-align: center;
    line-height: 41.6px;
    margin-bottom: 30px;
  }
  .cell {
    margin: 0 auto 30px auto;
    width: 690px;
    height: 220px;
    background: #FFF;
    border-radius: 16px;
    overflow: hidden;
    box-sizing: border-box;
    padding-left: 30px;
    padding-right: 30px;
    position: relative;
    .open-no {
      position: absolute;
      top: 30px;
      right: 30px;
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #818B8F;
      letter-spacing: 0;
      text-align: right;
      line-height: 41.6px;
    }
    .open-time {
      position: absolute;
      top: 30px;
      right: 30px;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #F05720;
      letter-spacing: -0.58px;
      text-align: center;
      line-height: 36px;
      .open-time-desc {
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #330000;
        letter-spacing: -0.58px;
        text-align: right;
        line-height: 36px;
      }
    }
    .open-btn {
      position: absolute;
      top: 30px;
      right: 30px;
      font-family: PingFangSC-Regular;
      border: 2px solid #F05720;
      border-radius: 25px;
      padding: 6px 32px;
      font-size: 28px;
      color: #F05720;
      letter-spacing: 0;
      text-align: right;
      line-height: 36.4px;
    }
    .cell-desc {
      margin-top: 14px;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #818B8F;
      letter-spacing: -0.58px;
      line-height: 31.2px;
    }
    .cell-line {
      margin-top: 31px;
      width: 100%;
      height: 1px;
      /*no*/
      background: #E2E2E2;
    }
    .cell-header {
      margin-top: 30px;
      height: 42px;
      .cell-name {
        display: inline-block;
        float: left;
        font-family: PingFangSC-Medium;
        font-size: 32px;
        color: #2E3141;
        letter-spacing: 0;
        line-height: 41.6px;
      }
      .cell-obj-type {
        height: 30px;
        margin-top: 6px;
        margin-left: 20px;
        display: inline-block;
        float: left;
        font-family: PingFangSC-Regular;
        font-size: 22px;
        color: #FFFFFF;
        letter-spacing: -0.53px;
        text-align: center;
        line-height: 31.2px;
        padding: 1px 7px;
        border-radius: 2px;
        &.obj-type-1 {
          background: #FFB512;
        }
        &.obj-type-2 {
          background: #00B59F;
        }
        &.obj-type-3 {
          background: #F05720;
        }
      }
    }
    .cell-num {
      margin-top: 20px;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #818B8F;
      letter-spacing: 0;
      line-height: 36.4px;
      span {
        color: #151515;
      }
      &.has-name {
        box-sizing: border-box;
        width: 100%;
        padding-right: 50%;
        position: relative;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .cell-user-nick {
        position: absolute;
        top: 0;
        right: 0;
        width: 48%;
        height: 100%;
        text-align: right;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

.kind {
  width: 100%; // height: 110px;
  box-sizing: border-box;
  padding: 30px;
  position: fixed;
  z-index: 99;
  top: 100px;
  left: 0;
  background: #F8F8FC;
  .kind-cell {
    display: inline-block;
    margin-right: 20px; // margin-bottom: 20px;
    padding: 5px 24px;
    box-sizing: border-box;
    color: #2E3141;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    letter-spacing: 0;
    text-align: center;
    line-height: 34px;
    border: 3px solid #FFF;
    border-radius: 25px;
    background: #FFF;
    &.active {
      color: #F05720;
      border: 3px solid #F05720;
    }
    &.no-margin-right {
      margin-right: 0;
    }
  }
}

</style>
