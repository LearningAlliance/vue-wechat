<template>
  <div class="page">
    <div class="chip-title">获得夺宝碎片1个</div>
    <div class="chip-name">{{info.name}}</div>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    info: {
      required: true, 
      type: Object,
      default: {},
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
  margin-top: 50px;
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 30px;
}

.chip-title {
  font-family: PingFangSC-Semibold;
  font-size: 32px;
  color: #F05720;
  letter-spacing: 0;
  text-align: center;
}

.chip-name {
  margin-top: 10px;
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #2E3141;
  letter-spacing: 0;
  text-align: center;
}

</style>
