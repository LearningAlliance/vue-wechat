<template>
  <div class="box">
    <div class="list clearfix">
      <div :class="['cell', {'on': item.value == sort, 'no-border': list.length - 1 == index}]" v-for="(item, index) in list" :key="index" @click="changeSort(index)">
        {{item.name}}
      </div>
    </div>
    <div class="close-btn" @click="closeModal"></div>
  </div>
</template>
<script type="text/javascript">
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
      list: [
        { value: '1', name: '智能排序' },
        { value: '2', name: '离我最近' },
        { value: '3', name: '评分最高' },
        { value: '4', name: '人均从高到低' },
        { value: '5', name: '人均从低到高' },
      ],
      sort: 1,
    }
  },
  methods: {
    changeSort(index){
      this.sort = this.list[index].value;
      this.changeSearch(3, {sort: this.sort});
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
  // height: 504px;
  background: #FFF;
  box-sizing: border-box;
  overflow: hidden;
  padding-left: 30px;
  padding-right: 30px;
  .cell {
    height: 100px;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #2E3141;
    line-height: 100px;
    border-bottom: 1px solid #E2E2E2;
    /*no*/
    &.on {
      color: #F05720;
    }
    &.no-border{
      border: none;
    }
  }
}

.close-btn {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}

</style>
