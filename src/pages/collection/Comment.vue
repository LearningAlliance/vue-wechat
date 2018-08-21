<template>
  <div class="page">
    <div class="remark-box">
      <textarea placeholder="想说的就写下来吧～ @某某" class="remark" rows="6" maxlength="140" v-model="remark"></textarea>
    </div>
    <div class="num-box">{{num}}/140</div>
    <div class="btn">发布</div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      remark: '',
    }
  },
  computed: {
    num() {
      return this.remark.length;
    }
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 50px 60px 0 60px;
  background: #FFF;
}

.remark-box {
  width: 100%;
  height: 250px;
  .remark {
    resize: none;
    width: 100%;
    border: none;
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #333;
    letter-spacing: 0;
    line-height: 41.6px;
  }
}

.num-box {
  width: 100%;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #C4CACD;
  letter-spacing: 0;
  text-align: right;
  line-height: 36.4px;
}

.btn {
  position: fixed;
  bottom: 120px;
  left: 50%;
  margin-left: -285px;
  width: 570px;
  height: 88px;
  background: #E2E2E2;
  border-radius: 44px;
  text-align: center;
  line-height: 88px;
  font-family: PingFangSC-Semibold;
font-size: 36px;
color: #FFFFFF;
letter-spacing: 0;
}

</style>
