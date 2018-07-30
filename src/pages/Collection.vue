<template>
  <div class="page">
    <div class="header clearfix">
      <i class="icon icon-loc"></i>
      <p class="loc-text">当前地理位置</p>
      <i class="icon icon-down"></i>
      <div class="search-box" @click="toSearch">
        <div class="search-placeholder clearfix" v-show="!keyWords">
          <i class="icon-search"></i>
          <span class="icon-search-desc">查找我的收藏</span>
        </div>
        <input class="search-input" disabled="true" type="text" v-model="keyWords" />
      </div>
    </div>
    <div class="tab"></div>
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
    toSearch(){
      console.log(this.keyWords);
      this.$router.push('/collection/search');
    },
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  background: #F8F8FC;
  height: 100%;
}

.header {
  width: 100%;
  height: 88px;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 30px;
  padding-top: 14px;
  padding-bottom: 14px;
  background: #FFF;
  .icon {
    display: inline-block;
    float: left;
    width: 40px;
    height: 40px;
    margin-top: 10px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    &.icon-loc {
      background-image: url('../assets/images/ic_location.png');
      margin-right: 5px;
    }
    &.icon-down {
      margin-left: 5px;
      background-image: url('../assets/images/ic_angledown.png');
      margin-right: 5px;
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
    float: left;
    width: 470px;
    height: 60px;
    line-height: 60px;
    background: #F8F8FC;
    border-radius: 30px;
    position: relative;
    .search-placeholder {
      position: absolute;
      width: 231px;
      height: 60px;
      box-sizing: border-box;
      padding-top: 10px;
      padding-bottom: 10px;
      top: 50%;
      left: 50%;
      margin-top: -30px;
      margin-left: -115.5px;
      vertical-align: middle;
      .icon-search {
        display: inline-block;
        float: left;
        width: 40px;
        height: 40px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url('../assets/images/ic_search.png');
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
      width: 100%;
      height: 100%;
      background: #F8F8FC;
      border-radius: 30px;
      box-sizing: border-box;
      padding-left: 50px;
      padding-right: 50px; 
      text-align: center;
    }
  }
}

</style>
