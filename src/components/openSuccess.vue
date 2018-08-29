<!-- 彩蛋详情-打开成功遮罩 -->
<template>
  <div class="modal" v-if="visible" @click="closeModal">
    <div class="icon-success"></div>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    visible: {
      required: true,
      default: false,
    },
    closeModal: {
    	type: Function,
    },
  },
}

</script>
<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
  .icon-success {
    position: absolute;
    width: 388px;
    height: 328px;
    top: 50%;
    left: 50%;
    margin-top: -164px;
    margin-left: -194px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../assets/images/img_eggdetail_open.png');
  }
}

</style>
