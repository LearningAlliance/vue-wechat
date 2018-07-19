<template>
  <div class="toast">
    <div class="mask"></div>
    <div class="toast-wrap">
      <div>
        <i class="icon" v-show="success">&#xe848;</i>
        <i class="icon" v-show="fail">&#xe62d;</i>
      </div>
      <div class="text-box">
        <p class="text">
          {{toastMsg}}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {

    }
  },
  computed: mapState({
    success: state => state.com.showSuccess,
    fail: state => state.com.showFail,
    toastMsg: state => state.com.toastMsg
  })
}

</script>
<style lang="scss" scoped>
.toast {
  z-index: 100;
  .toast-wrap {
    position: fixed;
    width: 280px;
    height: 280px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 15px;
    background: rgba(0, 0, 0, 0.7);
    display: block;
    text-align: center;
    z-index: 1002;
    .icon {
      display: block;
      margin-top: 80px;
      font-size: 80px;
    }
    .text-box {
      margin-top: 32px;
      margin-left: 10px;
      width: 270px;
      height: 54px;/*no*/
      overflow: hidden;
      .text {
        width: 260px;
        height: 80px;
        font-size: 14px;
        line-height: 18px;/*no*/
        color: #fff;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .mask {
    position: fixed;
    width: 100%;
    margin: 0 auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1001;
    background: rgba(0, 0, 0, .6);
  }
}

</style>
