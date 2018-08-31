<!-- 开彩蛋（兼验证口令） -->
<template>
  <div class="page" v-show="visible">
    <div class="modal" v-show="visible" @click="onClose"></div>
    <div class="validate-box with-shadow">
      <input ref="input" class="input-code" @keyup="handleInput($event)" v-model="value" id="code" name="code" type="tel" :maxlength="number" autocorrect="off" autocomplete="off" autocapitalize="off">
      <div class="header">请输入口令</div>
      <div class="desc">请输入6位正确的数字</div>
      <!-- <label for="code" @click="focusInput"> -->
      <label for="code">
        <div class="code-box">
          <div :class="['code-cell', {'no-margin-right': number - 1 == index}]" v-for="(item, index) in number" :key="'code' + index">
            {{value[index] || '&nbsp;'}}
          </div>
        </div>
      </label>
      <div class="err">{{errMsg}}</div>
      <div class="btn-box">
        <div class="btn" @click.stop="submit">确定</div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
export default {
  props: {
    onSuccess: {
      type: Function,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
    eggId: [String, Number],
  },
  data() {
    return {
      value: '',
      number: 6,
      errMsg: '',
    }
  },
  computed: {
    ...mapGetters([
      'longitude',
      'latitude',
    ]),
  },
  // mounted(){
  //   this.$nextTick(() => {
  //     setTimeout(() => {
  //        this.focusInput();
  //      }, 1000);
  //   });
  // },
  methods: {
    submit() {
      this.openSysZone();
    },
    focusInput(){
      this.$refs.input.focus();
    },
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
    openSysZone() {
      api.collection.openSysZone({
        lat: this.latitude,
        lon: this.longitude,
        pw: this.value,
        zoneId: this.eggId,
      }).then((res) => {
        this.errMsg = '';
        this.value = '';
        this.onSuccess(res.data.id);
      }).catch((err) => {
        this.errMsg = err.data.resultMsg;
      });
    }
  },
}

</script>
<style scoped lang="scss">
.page,
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.err {
  height: 31.2px;
  margin-top: 30px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #D93312;
  letter-spacing: 0;
  text-align: center;
  line-height: 31.2px;
}

.validate-box {
  position: fixed;
  width: 690px;
  height: 600px;
  z-index: 1002;
  top: 50%;
  left: 50%;
  margin-top: -300px;
  margin-left: -345px;
  background: #FFF;
  border-radius: 32px;
  .btn-box {
    margin-top: 58px;
    text-align: center;
    .btn {
      display: inline-block;
      width: 570px;
      height: 88px;
      line-height: 88px;
      font-family: PingFangSC-Semibold;
      font-size: 36px;
      color: #FFFFFF;
      letter-spacing: 0;
      text-align: center;
      background: #F05720;
      border-radius: 44px;
    }
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
  .header {
    margin-top: 60px;
    font-family: PingFangSC-Medium;
    font-size: 48px;
    color: #2E3141;
    letter-spacing: 0;
    text-align: center;
    line-height: 62.4px;
  }
  .desc {
    margin-top: 31.6px;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #C4CACD;
    letter-spacing: 0;
    text-align: center;
    line-height: 31.2px;
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

.modal {
  z-index: 1001;
}

</style>
