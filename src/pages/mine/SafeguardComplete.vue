<template>
  <div class="page">
    <div class="section">
      <div class="setcion-title">
        <p class="section-title-p">完善信息开通保障金账户</p>
      </div>
    </div>
    <div class="input-box">
      <div class="label">
        <p class="label-text">姓名</p>
      </div>
      <div class="value clearfix">
        <input type="text" class="input" placeholder="请输入您的姓名" v-model="userName" />
      </div>
      <div class="line-box">
        <div class="line"></div>
      </div>
    </div>
    <div class="input-box margin-top-20">
      <div class="label">
        <p class="label-text">身份证号</p>
      </div>
      <div class="value clearfix">
        <input type="text" class="input" placeholder="请输入您的身份证号" oninput="if(value.length>18)value=value.slice(0, 18)" v-model="idCard" onchange="if(value.length>18)value=value.slice(0, 18)" />
      </div>
      <div class="line-box">
        <div class="line"></div>
      </div>
    </div>
    <div class="input-box margin-top-20" @click="chooseBirth">
      <div class="label">
        <p class="label-text">生日</p>
      </div>
      <div class="value clearfix">
        <input type="text" class="input" placeholder="请选择您的出生年月日" v-model="birthday" disabled="" />
        <div class="btn-right"></div>
      </div>
      <div class="line-box">
        <div class="line"></div>
      </div>
    </div>
    <div class="err-box">
      <p class="err-text" v-show="!!resultMsg">{{resultMsg}}</p>
    </div>
    <div :class="['submit', {'canClick': userName.trim().length > 0 && idCard.trim().length == 18 && birthday.length > 0}]" @click="submit">提交</div>
    <mt-datetime-picker ref="picker" type="date" v-model="pickerValue" @confirm="handleConfirm" :startDate="startDate" :endDate="endDate">
    </mt-datetime-picker>
  </div>
</template>
<script type="text/javascript">
import * as _ from '@/util/tool.js'
import { DatetimePicker } from 'mint-ui';
import api from '@/fetch/api'
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      userName: '',
      idCard: '',
      birthday: '',
      pickerValue: '',
      resultMsg: '',
      startDate: '',
      endDate: ''
    }
  },
  components: {
    'mt-datetime-picker': DatetimePicker
  },
  created(){
  	this.pickerValue = new Date();
  	this.startDate = new Date('1899/01/01');
  	this.endDate = new Date();
  },
  methods: {
  	...mapActions({ setCanUseSafeguard: 'setCanUseSafeguard'}),
    submit() {
      let idCard = this.idCard.trim();
      let userName = this.userName.trim();
      if (userName.length == 0) {
        _.alert('请输入您的姓名');
        return;
      }
      if (idCard.length == 0) {
        _.alert('请输入身份证号后再进行后续操作');
        return;
      }
      if (!this.isCardNo(idCard)) {
        _.alert('输入的身份证号不合法,请检查后再试');
        return;
      }
      if(this.birthday.length == 0){
      	_.alert('请选择您的出生年月日');
      	return;
      }
      api.user.completeInfo({
      	idCard,
      	userName,
      }).then((res) => {
      	_.alert('保存成功');
      	this.setCanUseSafeguard(true);
      	this.$router.history.go(-1);
      }).catch();
    },
    chooseBirth() {
      if (this.showPicker) {
        this.$refs.picker.open();
      } else {
        this.$refs.picker.close();
      }
      this.showPicker = !this.showPicker;
    },
    isCardNo(card) {
      // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
      var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (reg.test(card) === false) {
        return false;
      }
      return true;
    },
    handleConfirm(val) {
      this.birthday = _.dateFormat(this.pickerValue, 'yyyy-MM-dd');
    }
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  min-height: 100%;
  background: #fff;
  box-sizing: border-box;
  overflow: hidden;
}

.margin-top-20 {
  margin-top: 20px;
}

.section {
  width: 100%;
  height: 122px;
  background: #fff;
  .setcion-title {
    width: 100%;
    height: 62.4px;
    padding-top: 10px;
    padding-bottom: 49.6px;
    .section-title-p {
      height: 62.4px;
      width: 100%;
      font-family: PingFangSC-Medium;
      font-size: 48px;
      color: #2E3141;
      letter-spacing: 0;
      line-height: 62.4px;
      padding-left: 50px;
    }
  }
}

.input-box {
  width: 100%;
  height: 194px;
  .label {
    padding-top: 29px;
    padding-left: 50px;
    .label-text {
      width: 100%;
      height: 41.6px;
      font-family: PingFangSC-Regular;
      font-size: 36px;
      color: #2E3141;
      letter-spacing: 0;
      line-height: 41.6px;
    }
  }
  .value {
    margin-top: 31.4px;
    width: 100%;
    height: 68px;
    box-sizing: border-box;
    padding-left: 50px;
    padding-right: 50px;
    margin-bottom: 22px;
    position: relative;
    .input {
      font-family: PingFangSC-Regular;
      font-size: 36px;
      color: #C4CACD;
      letter-spacing: 0;
      height: 68px;
      width: 100%;
      line-height: 68px;
      color: #2E3141;
      background: #fff;
    }
    .btn {
      float: right;
      height: 68px;
      line-height: 68px;
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
      padding-left: 33px;
      padding-right: 33px;
      border: 1px solid #E2E2E2;
      /*no*/
      border-radius: 34px;
    }
    .btn-right {
      position: absolute;
      top: 9px;
      right: 50px;
      width: 50px;
      height: 50px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url('../../assets/images/ic_nextarrow.png');
    }
  }
  .line-box {
    width: 100%;
    box-sizing: border-box;
    padding-left: 50px;
    padding-right: 50px;
    .line {
      width: 100%;
      height: 0;
      border-top: 1px solid #E2E2E2;
      /*no*/
    }
  }
}

.submit {
  margin: 60px auto 0 auto;
  width: 570px;
  height: 88px;
  line-height: 88px;
  background: #E2E2E2;
  border-radius: 44px;
  font-family: PingFangSC-Semibold;
  font-size: 36px;
  color: #FFFFFF;
  letter-spacing: 0;
  text-align: center;
  margin-bottom: 80px;
  &.canClick {
    background: #F05720;
  }
}

.err-box {
  width: 100%;
  height: 60px;
  padding-top: 18.2px;
  padding-left: 50px;
  box-sizing: border-box;
  .err-text {
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #D93312;
    letter-spacing: 0;
    line-height: 36.4px;
    height: 36.4px;
  }
}

</style>
