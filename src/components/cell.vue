<template>
  <div class="cell">
    <router-link :to="link">
      <div :class="['cell-box', 'clearfix', {'no-border': hideBorder, 'has-avatar': !!avatar}]">
        <div :class="['cell-l', {'has-avatar': !!avatar}]">
          <img :src="iconUrl" class="cell-icon" v-show="iconUrl" alt="">
          <span :class="['text', {'margin-left-0': !iconUrl}]">{{text}}</span>
        </div>
        <div :class="['cell-r', {'right-0': !more, 'has-avatar': !!avatar}]">
          <span class="text" v-show="desc">{{desc}}</span>
          <span class="badg" v-show="badg">{{badg}}</span>
          <span class="avatar" v-show="avatar"><img :src="avatar" alt=""></span>
          <img v-show="more" src="../assets/images/ic_back_right@2x.png" class="more" alt="">
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  props: {
    link: String,
    iconUrl: String,
    text: String,
    desc: String,
    badg: String,
    avatar: String,
    more: Boolean,
    hideBorder: Boolean,
  },
  data() {
    return {

    }
  },
  methods: {

  }
}

</script>
<style lang="scss" scoped>
.cell {
  position: relative;
  background: #fff;
  .cell-box {
    display: block;
    height: 88px;
    line-height: 88px;
    margin: 0 30px 0 30px;
    border-bottom: 1px solid #E2E2E2;
    /*no*/
    position: relative;
    box-sizing: border-box;
    &.has-avatar {
      height: 176px;
    }
    .cell-l {
      display: inline-block;
      float: left;
      height: 88px;
      vertical-align: middle;
      &.has-avatar {
        height: 176px;
        line-height: 176px;
      }
      .cell-icon {
        width: 40px;
        height: 40px;
        vertical-align: middle;
      }
      .text {
        display: inline-block;
        vertical-align: middle;
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #2E3141;
        letter-spacing: 0;
        line-height: 36.4px;
        margin-left: 20px;
        &.margin-left-0 {
          margin-left: 0;
        }
      }
    }
    .cell-r {
      position: absolute;
      top: 0;
      right: -10px;
      display: inline-block;
      height: 88px;
      vertical-align: middle;
      &.right-0 {
        right: 0;
      }
      &.has-avatar {
        height: 176px;
        line-height: 176px;
      }
      .text {
        display: inline-block;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #818B8F;
        letter-spacing: 0;
        text-align: right;
        line-height: 36.4px;
        vertical-align: middle; // margin-right: 10px;
      }
      .more {
        width: 50px;
        height: 50px;
        vertical-align: middle;
      }
      .badg {
        display: inline-block;
        color: #fff;
        height: 30px;
        font-size: 24px;
        line-height: 30px;
        text-align: center;
        padding-left: 10px;
        padding-right: 10px;
        background: #F05720;
        border-radius: 20px;
        vertical-align: middle;
      }
      .avatar {
        display: inline-block;
        width: 120px;
        height: 120px;
        border-radius: 120px;
        overflow: hidden;
        vertical-align: middle;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  & .no-border {
    border: none;
  }
}

</style>
