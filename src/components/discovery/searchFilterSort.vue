<template>
  <div class="box">
    <div class="list clearfix">
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
    return {}
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
  height: 500px;
  background: #FFF;
}

.close-btn {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}

</style>
