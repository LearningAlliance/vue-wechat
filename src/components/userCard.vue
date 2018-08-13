<template>
  <div class="section">
    <div class="card">
      <div class="card-box">
        <div class="sign-in-box">已签到</div>
        <div class="avatar">
          <img v-bind:src="userInfo.userHead" />
        </div>
        <div class="user-name">
          <span>{{userInfo.userNick}}</span>
          <i :class="['user-sex-hidden', userSex]"></i>
        </div>
        <div class="level">
          <div class="level-box">
            <span class="level-text">青铜会员</span>
          </div>
        </div>
        <div class="box">
          <div class="box-left" @click="toSafeGuard">
            <p class="box-title">保障金(元)</p>
            <p class="box-content">{{accountSafeGuard}}</p>
          </div>
          <div class="box-right">
            <p class="box-title">积分</p>
            <P class="box-content">{{accountCredits}}</P>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
export default {
  props: {

  },
  data() {
    return {
      accountSafeGuard: 0,
      accountCredits: 0,
    }
  },
  created(){
    this.getAccountSafeGuard();
    this.getAccountCredits();
  },
  computed: {
    ...mapGetters([
      'loginStatus',
      'userInfo'
    ]),
    userSex() {
      let value = this.userInfo.userSex;
      if (value == '1') {
        return 'male';
      } else if (value == '0') {
        return 'female';
      }
      return '';
    }
  },
  methods: {
    toSafeGuard() {
      this.$router.push('/mine/safeguard');
    },
    getAccountSafeGuard(){
      api.user.getAccountSafeGuard().then((res) => {
        let item = res.data[0];
        this.accountSafeGuard = !!item.amount ? item.amount.toFixed(2) : 0;
      }).catch((err) => {});
    },
    getAccountCredits(){
      api.user.getAccountCredits().then((res) => {
        let item = res.data[0];
        this.accountCredits = item.amount || 0;
      }).catch((err) => {});
    }
  }
}

</script>
<style lang="scss" scoped>
.section {
  width: 100%;
  height: 526px;
  background: #fff;
  .card {
    margin: 5px auto;
    position: relative;
    width: 730px;
    height: 516px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../assets/images/bg_my_topframe.png');
    .card-box {
      position: absolute;
      top: 20px;
      left: 20px;
      width: 690px;
      height: 476px;
      .sign-in-box {
        position: absolute;
        top: 206px;
        right: 0;
        width: 130px;
        height: 50px;
        background: #F05720;
        border-radius: 25px 0 0 25px;
        color: #fff;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        line-height: 50px;
        text-align: center;
      }
      .avatar {
        width: 150px;
        height: 150px;
        margin: 40px auto 20px auto;
        img {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 100%;
        }
      }
      .user-name {
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #2E3141;
        letter-spacing: 0;
        text-align: center;
        line-height: 41.6px;
        .user-sex-hidden {
          display: none;
          width: 40px;
          height: 40px;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          vertical-align: text-bottom;
          &.male {
            display: inline-block;
            background-image: url('../assets/images/ic_male.png');
          }
          &.female {
            display: inline-block;
            background-image: url('../assets/images/ic_female.png');
          }
        }
      }
      .level {
        width: 100%;
        height: 40px;
        margin-top: 10.4px;
        font-family: PingFangSC-Regular;
        text-align: center;
        .level-box {
          display: inline-block;
          text-align: center;
          height: 40px;
          border: 2px solid #AF957E;
          border-radius: 25px;
          box-sizing: border-box;
          .level-text {
            display: inline-block;
            font-family: PingFangSC-Regular;
            font-size: 24px;
            color: #AF957E;
            line-height: 40px;
            padding: 0 22px 0 22px;
          }
        }
      }
      .box {
        width: 100%;
        margin-top: 40px;
        position: relative;
        text-align: center;
        .box-left {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
        }
        .box-right {
          position: absolute;
          top: 0;
          right: 0;
          width: 50%;
        }
        .box-title {
          font-family: PingFangSC-Regular;
          font-size: 28px;
          color: #818B8F;
          letter-spacing: 0;
          text-align: center;
          line-height: 36.4px;
        }
        .box-content {
          margin-top: 10.6px;
          font-family: PingFangSC-Semibold;
          font-size: 36px;
          color: #2E3141;
          letter-spacing: 0;
          text-align: center;
          line-height: 46.8px;
        }
      }
    }
  }
}

</style>
