<template>
  <div class="page">
    <div class="section">
      <div class="setcion-title">
        <p class="section-title-p">修改手机</p>
      </div>
    </div>
    <div class="input-box">
      <div class="label">
        <p class="label-text">手机号</p>
      </div>
      <div class="value clearfix">
        <input type="text" class="input" placeholder="请输入新的手机号" oninput="if(value.length>11)value=value.slice(0, 11)" v-model="userPhone" onchange="if(value.length>11)value=value.slice(0, 11)"/>
        <div class="btn" @click="getVerifyCode">获取验证码</div>
      </div>
      <div class="line-box">
        <div class="line"></div>
      </div>
    </div>
    <div class="input-box margin-top-20">
      <div class="label">
        <p class="label-text">验证码</p>
      </div>
      <div class="value clearfix">
        <input type="text" class="input" placeholder="请输入验证码" oninput="if(value.length>4)value=value.slice(0, 4)" v-model="verifyCode" onchange="if(value.length>4)value=value.slice(0, 4)"/>
      </div>
      <div class="line-box">
        <div class="line"></div>
      </div>
    </div>
    <div :class="['submit', {'canClick': userPhone.length == 11 && verifyCode.length == 4}]" @click="submit">提交</div>
  </div>
</template>
<script type="text/javascript">
import * as _ from '@/util/tool.js'
import api from '@/fetch/api'

export default {
  data() {
    return {
    	userPhone: '',
    	verifyCode: '',
    }
  },
  methods: {
  	getVerifyCode(){
  		if(this.userPhone.length != 11){
  			_.alert('请先输入完整的手机号');
  			return;
  		}
  		api.user.getVerifyCode({
  			userPhone: this.userPhone
  		}).then((res) => {
  			_.alert('验证码已发送，请注意查收');
  		}).catch((err) => {
  			console.log(err);
  		});
  	},
  	submit(){
  		if(this.userPhone.length != 11){
  			_.alert('请输入完整的手机号');
  			return;
  		}
  		if(this.verifyCode.length != 4){
  			_.alert('请输入完整的验证码');
  			return;
  		}
  		api.user.updateMobile({
  			userPhone: this.userPhone,
  			verifyCode: this.verifyCode
  		}).then((res) => {
  			_.alert('修改成功');
  			// 默认返回了个人信息 则可以使用dispatch 更改全局的用户信息
  			this.$store.dispatch('setUserInfo', res.data[0]);
  			// 清空输入的信息
  			this.userPhone = '';
  			this.verifyCode = '';
  			this.$router.history.go(-1);
  		})
  	}
  }
}

</script>
<style scoped lang="scss">
.page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 100%;
  z-index: 1;
  background: #fff;
  padding-top: 100px;
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
    .input {
      font-family: PingFangSC-Regular;
      font-size: 36px;
      color: #C4CACD;
      letter-spacing: 0;
      height: 68px;
      width: 300px;
      line-height: 68px;
      color: #2E3141;
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
  margin: 141px auto 0 auto;
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
  &.canClick{
  	background: #F05720;
  }
}

</style>
