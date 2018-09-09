<template>
  <div class="notfound">
    <div class="error"></div>
    <div class="etext">页面不存在~</div>
  </div>
</template>
<style lang="css" scoped>
.notfound {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 300px;
  margin-top: -150px;
  margin-left: -100px;
}

.error {
  width: 200px;
  height: 200px;
  margin: 0 auto 10px auto;
  background: url(../assets/images/error.png) no-repeat;
  background-size: 100% 100%;
}

.etext {
  font-family: PingFangSC-Semibold;
  font-size: 24px;
  color: #bfbfbf;
  letter-spacing: 0;
  text-align: center;
  line-height: 41.6px;
}

</style>
