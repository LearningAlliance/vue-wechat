<template>
  <div class="page">
    <div class="remark">{{remark}}</div>
    <div class="">图片TODO</div>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    remark: {
      default: '',
    }
  },
  data() {
    return {}
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  margin-top: 40px;
}

.remark {
  width: 100%;
  box-sizing: border-box;
  padding-left: 60px;
  padding-right: 60px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #2E3141;
  letter-spacing: 0;
  line-height: 1.4;
}

</style>
