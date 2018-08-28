<template>
  <div class="page">
    <!--     <div class="kind clearfix">
      <div :class="['kind-cell', {'active': kindActived == 0}]" @click="changeKind(0)">全部</div>
      <div :class="['kind-cell', {'active': kindActived == 1}]" @click="changeKind(1)">平台</div>
      <div :class="['kind-cell', {'active': kindActived == 2}]" @click="changeKind(2)">商家</div>
      <div :class="['kind-cell no-margin-right', {'active': kindActived == 3}]" @click="changeKind(3)">用户</div>
    </div> -->
    <div class="kind clearfix">
      <div v-for="(item, index) in kinds" :key="'kind' + index" :class="['kind-cell', {'active': kindActived == index, 'no-margin-right': kinds.length - 1 == index}]" @click="changeKind(index)">{{`${item.label}(${item.num})`}}</div>
    </div>
    <!-- <div class="list" @scroll="handleScroll"> -->
    <div class="list">
      <div class="cell with-shadow" v-for="(item, index) in list" :key="'list' + index">
      	
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
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
    }
  },
  mounted() {
    let { shopId } = this.$route.query;
    this.shopId = shopId;
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
      api.collection.qrySysZoneList({
        shopId: this.shopId,
        ...this.current,
        type: this.kinds[this.kindActived].type,
      }).then((res) => {
        let list = res.data;
        let count = 0;
        this.list = list;
        if (this.kinds[this.kindActived].type != 0) {
          return;
        }
        list.forEach((obj) => {
          if (obj.objType == 1) {
            this.kinds[3].num = obj.num;
          } else if (obj.objType == 2) {
            this.kinds[2].num = obj.num;
          } else if (obj.objType == 3) {
            this.kinds[1].num = obj.num;
          }
          count += obj.num;
        });
        this.kinds[0].num = count;
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
