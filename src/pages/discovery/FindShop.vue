<template>
  <div class="page">
    <div class="header clearfix">
      <div class="icon icon-back" @click="back()"></div>
      <div class="search-box" @click="toSearch">
        <div class="search-placeholder clearfix" v-show="!keyWords">
          <i class="icon-search"></i>
          <span class="icon-search-desc">搜索商家名、品类等关键词</span>
        </div>
        <input class="search-input" disabled="true" type="text" v-model="keyWords" />
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      keyWords: '',
    }
  },
  methods: {
    toSearch() {
      this.$router.replace('/discovery/search');
    },
    back() {
      history.back();
    },
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  background: #F8F8FC;
  height: 100%;
  overflow: scroll;
  box-sizing: border-box;
}

.header {
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  padding-left: 90px;
  padding-right: 70px;
  padding-top: 20px;
  padding-bottom: 20px;
  background: #FFF;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  .icon {
    position: absolute;
    top: 25px;
    left: 20px;
    width: 50px;
    height: 50px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    &.icon-back {
      background-image: url('../../assets/images/ic_back@2x.png');
    }
  }
  .loc-text {
    display: inline-block;
    float: left;
    width: 143px;
    height: 60px;
    line-height: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #2E3141;
    letter-spacing: 0;
    white-space: nowrap;
  }
  .search-box {
    display: inline-block;
    width: 590px;
    height: 60px;
    line-height: 60px;
    background: #F8F8FC;
    border-radius: 30px;
    position: absolute;
    top: 20px;
    right: 70px;
    .search-placeholder {
      position: absolute;
      width: 390px;
      height: 60px;
      box-sizing: border-box;
      padding-top: 10px;
      padding-bottom: 10px;
      top: 50%;
      left: 50%;
      margin-top: -30px;
      margin-left: -195px;
      vertical-align: middle;
      .icon-search {
        display: inline-block;
        float: left;
        width: 40px;
        height: 40px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url('../..//assets/images/ic_search.png');
        margin-right: 9px;
      }
      .icon-search-desc {
        display: inline-block;
        float: left;
        height: 40px;
        line-height: 40px;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #C4CACD;
        letter-spacing: 0;
      }
    }
    .search-input {
      width: 470px;
      height: 100%;
      background: #F8F8FC;
      border-radius: 30px;
      box-sizing: border-box;
      padding-left: 50px;
      padding-right: 50px;
      text-align: left;
    }
  }
}

</style>
