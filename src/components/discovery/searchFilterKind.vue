<template>
  <div class="box">
    <div class="list clearfix">
      <div class="list-left">
        <div :class="['main-kind', {'on': selectKind == item.id}]" v-for="(item, index) in kinds" :key="'kind' + index" @click="changeKind(index)">{{item.name}}</div>
      </div>
      <div class="list-right">
        <div :class="['sub-kind', {'on': selectSubKind == item.id}]" v-for="(item, index) in subKinds" @click="changeSubKind(index)" :key="'subKind' + index">{{item.name}}</div>
      </div>
    </div>
    <div class="close-btn" @click="closeModal"></div>
  </div>
</template>
<script type="text/javascript">
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
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
      defaultSubKinds: [{ id: 0, name: '全部分类', sort: 0 }],
      kinds: [{ id: 0, name: '全部', sort: 0 }],
      subKinds: [{ id: 0, name: '全部分类', sort: 0 }],
      selectKind: 0,
      selectSubKind: 0,
    }
  },
  mounted() {
    this.qryShopTypeList(null);
  },
  methods: {
    qryShopTypeList(id) {
      api.collection.qryShopTypeList({ id, }).then((res) => {
        this.kinds = this.kinds.concat(res.data.sort(this.compare));
      }).catch((err) => {})
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
    getSubKindById(id) {
      api.collection.qryShopTypeList({ id, }).then((res) => {
        this.subKinds = res.data.sort(this.compare);
      }).catch((err) => {})
    },
    changeKind(index) {
      this.selectKind = this.kinds[index].id;
      if (this.selectKind == 0) {
        this.subKinds = this.defaultSubKinds;
        return;
      }
      this.getSubKindById(this.selectKind);
    },
    changeSubKind(index){
      this.selectSubKind = this.subKinds[index].id;
      this.changeSearch(0, this.subKinds[index]);
      this.closeModal();
    },
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
      &.on{
        color: #F05720;
      }
    }
  }
}

.close-btn {
  width: 100%;
  height: 100px;
  background: rgba(0, 0, 0, 0.3);
}

</style>
