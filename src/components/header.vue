<template>
  <!--   <div class="header" v-show="headerDisplay">
    <div class="header-icon" v-show="backDisplay" @click="goBack"><i class="icon left"></i></div>
    <div class="header-cont">
      <p>{{title}}</p>
    </div>
    <div class="header-icon" v-show="menuDisplay" @click="showBar"><i class="icon">&#xe634;</i></div>
    <div class="header-icon" v-show="mapDisplay" @click="getMap"><i class="icon map-icon">&#xe600;</i></div>
  </div> -->
  <div class="header" v-show="headerDisplay">
    <div class="header-icon" v-show="backDisplay" @click="goBack"><i class="icon goBack"></i></div>
    <div class="header-cont">
      <p>{{title}}</p>
    </div>
    <div class="header-right-text" v-show="!!rightText" @click="onRightClick">{{rightText}}</div>
  </div>
</template>
<script>
import * as types from '@/vuex/types.js';
export default {
  props: {
    title: String,
    menuDisplay: Boolean,
    backDisplay: Boolean,
    mapDisplay: Boolean,
    headerDisplay: Boolean,
    rightText: String,
    funName: String,
  },
  data() {
    return {

    }
  },
  methods: {
    goBack() {
      // this.$router.history.go(-1);
      window.history.back();
    },
    getMap() {
      alert('开发中')
    },
    showBar() {
      this.$store.dispatch('setNavState', true)
    },
    onRightClick() {
      // 设置header点击右键时调用的funName
      this.$store.dispatch('setHeaderRightFun', this.funName);
    }
  }
}

</script>
<style lang="scss" scoped>
.header {
  display: block;
  position: fixed;
  transform: translateZ(0);
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: #fff;
  overflow: hidden;
  z-index: 999;
  .header-icon {
    position: absolute;
    left: 20px;
    top: 25px;
    display: block;
    width: 50px;
    height: 50px;
    .icon {
      display: block;
      width: 50px;
      height: 50px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url(../assets/images/ic_back@2x.png);
    }
  }
  .header-cont {
    display: block;
    font-family: PingFangSC-Semibold;
    width: 100%;
    height: 100px;
    font-size: 36px;
    color: #2E3141;
    letter-spacing: 0;
    text-align: center;
    line-height: 100px;
  }
  .header-right-text {
    position: absolute;
    top: 0;
    right: 30px;
    height: 100px;
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #2E3141;
    letter-spacing: 0;
    text-align: right;
    line-height: 100px;
    padding-left: 30px;
  }
}

</style>
