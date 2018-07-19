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
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    menuDisplay: Boolean,
    backDisplay: Boolean,
    mapDisplay: Boolean,
    headerDisplay: Boolean,
  },
  data() {
    return {

    }
  },
  methods: {
    goBack() {
      window.history.back()
    },
    getMap() {
      alert('开发中')
    },
    showBar() {
      this.$store.dispatch('setNavState', true)
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
  .header-icon {
    position: absolute;
    left: 20px;
    top: 25px;
    display: block;
    width: 50px;
    height: 50px;
    .icon{
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
}

</style>
