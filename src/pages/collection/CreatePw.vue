<template>
  <div class="page">
    <div class="title">创建口令</div>
    <div class="desc">请输入6位数字生成口令，对方输入口令，即可领取彩蛋</div>
    <input ref="input" class="input-code" @keyup="handleInput($event)" v-model="value" id="code" name="code" type="tel" :maxlength="number" autocorrect="off" autocomplete="off" autocapitalize="off">
    <label for="code">
      <div class="code-box">
        <div :class="['code-cell', {'no-margin-right': number - 1 == index}]" v-for="(item, index) in number" :key="'code' + index">
          {{value[index] || '&nbsp;'}}
        </div>
      </div>
    </label>
    <div :class="['save', {'on': value.length == 6}]" @click="savePw">保存口令</div>
  </div>
</template>
<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['eggInfo']),
  },
  data() {
    return {
      value: '',
      number: 6,
    }
  },
  mounted() {
    this.value = this.eggInfo.pw || '';
  },
  methods: {
    ...mapActions({
      updateEggInfoByKey: 'updateEggInfoByKey',
    }),
    hideKeyboard() {
      // 输入完成隐藏键盘
      document.activeElement.blur() // ios隐藏键盘
      this.$refs.input.blur() // android隐藏键盘
    },
    handleSubmit() {
      this.$emit('input', this.value)
    },
    handleInput(e) {
      this.$refs.input.value = this.value
      if (this.value.length >= this.number) {
        this.hideKeyboard();
      }
      this.handleSubmit();
    },
    savePw() {
      this.updateEggInfoByKey({ 'pw': this.value });
      history.back();
    },
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  background: #FFF;
  box-sizing: border-box;
  padding-top: 10px;
}

.save {
  margin: 120px auto 0 auto;
  width: 570px;
  height: 88px;
  font-family: PingFangSC-Semibold;
  font-size: 36px;
  color: #FFFFFF;
  letter-spacing: 0;
  text-align: center;
  line-height: 88px;
  background: #E2E2E2;
  border-radius: 44px;
  &.on {
    background: #F05720;
  }
}

.input-code {
  position: absolute;
  left: -9999px;
  top: -99999px;
  width: 100px;
  height: 20px;
  opacity: 0;
  overflow: visible;
  z-index: -1;
}

.title {
  font-family: PingFangSC-Medium;
  font-size: 48px;
  color: #2E3141;
  letter-spacing: 0;
  text-align: center;
  line-height: 62.4px;
}

.desc {
  margin: 0 auto;
  width: 461px;
  margin-top: 30.6px;
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #C4CACD;
  letter-spacing: 0;
  text-align: center;
  line-height: 41.6px;
}

.code-box {
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  text-align: center;
  margin-top: 43px;
  .code-cell {
    display: inline-block;
    width: 86px;
    height: 100%;
    margin-right: 23px;
    box-sizing: border-box;
    border-bottom: 4px solid #E2E2E2;
    font-family: PingFangSC-Medium;
    font-size: 48px;
    color: #2E3141;
    letter-spacing: 0;
    text-align: center;
    line-height: 100px;
    &.no-margin-right {
      margin-right: 0;
    }
  }
}

</style>
