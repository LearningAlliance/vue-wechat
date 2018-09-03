<template>
  <div>
    <div class="search-box clearfix">
      <div class="search-item" v-for="(item, index) in searchKinds" :key="'searchKind' + index">
        <div :class="['search-kind', {'on': selectSearchKindIndex == item.key}]" @click="clickSearchKind(item.key)">{{item.label.length > 4 ? (item.label).slice(0, 4) + '...' : item.label}}</div>
      </div>
    </div>
    <search-filter-kind v-show="showModal && selectSearchKindIndex == 'kind'" :close-modal="closeModal" :change-search="changeSearch"></search-filter-kind>
    <search-filter-sort v-show="showModal && selectSearchKindIndex == 'sort'" :close-modal="closeModal" :change-search="changeSearch"></search-filter-sort>
    <!-- <div class="modal" v-show="showModal" @click="closeModal"></div> -->
  </div>
</template>
<script type="text/javascript">
import searchFilterKind from '@/components/discovery/searchFilterKind'
import searchFilterSort from '@/components/discovery/searchFilterSort'
export default {
  props: {
    searchParams: {
      default: {},
      required: true,
      type: Object,
    },
    refresh: {
      type: Function,
    },
  },
  components: {
    'search-filter-kind': searchFilterKind,
    'search-filter-sort': searchFilterSort,
  },
  data() {
    return {
      searchKinds: [{
        label: '全部分类',
        key: 'kind',
        subType: null,
      }, {
        label: '附近',
        key: 'nearby',
      }, {
        label: '排序',
        key: 'sort',
      }, {
        label: '筛选',
        key: 'filter',
      }, ],
      selectSearchKindIndex: '',
      showModal: false,
    }
  },
  methods: {
    clickSearchKind(key) {
      if (this.selectSearchKindIndex == key) {
        this.selectSearchKindIndex = '';
        this.showModal = false;
        return;
      }
      this.selectSearchKindIndex = key;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectSearchKindIndex = '';
    },
    changeSearch(index, obj) {
      if (index == 0) {
        // 只用于修改subType部分
        this.searchKinds[0].label = obj.name;
        if (obj.id == 0) {
          this.searchKinds[0].subType = null;
          this.refresh({subType: null});
        } else {
          this.searchKinds[0].subType = obj.id;
          this.refresh({subType: obj.id});
        } 
      }
    },
  },
}

</script>
<style scoped lang="scss">
.modal {
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 997;
}

.search-box {
  width: 100%;
  height: 88px;
  background: #FFF;
  position: fixed;
  top: 100px;
  left: 0;
  z-index: 999;
  .search-item {
    width: 25%;
    height: 100%;
    display: inline-block;
    float: left;
    text-align: center;
    line-height: 88px; // margin-left: -45px;
    .search-kind {
      line-height: 88px;
      display: inline-block;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #2E3141;
      text-align: right;
      position: relative;
      &.on {
        color: #F05720;
      }
      &.on::after {
        background-image: url('../../assets/images/ic_findstore_angleup.png');
      }
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: -45px;
        margin-top: -20px;
        display: block;
        width: 40px;
        height: 40px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url('../../assets/images/ic_findstore_angledown.png');
      }
    }
  }
}

</style>
