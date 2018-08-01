<!-- 赚赚首页-用户信息 -->
<template>
  <div class="section">
    <div class="card">
      <div class="card-box">
        <div class="avatar">
          <img v-bind:src="userInfo.userHead" />
        </div>
        <div class="user-name">
          <span>{{userInfo.userNick}}</span>
        </div>
        <div class="box">
          <div class="box-left" @click="toSafeGuard">
            <p class="box-title">累计获得积分</p>
            <p class="box-content">{{accountCredits}}</p>
          </div>
          <div class="box-right">
            <p class="box-title">累计获得保障金(元)</p>
            <P class="box-content">{{accountSafeGuard}}</P>
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
  created() {
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
    getAccountSafeGuard() {
      api.user.getAccountSafeGuard().then((res) => {
        let item = res.data[0];
        // this.accountSafeGuard = !!item.amount ? item.amount.toFixed(2) : 0;
        this.accountSafeGuard = !!item.amount ? item.amount : 0;
      });
    },
    getAccountCredits() {
      api.user.getAccountCredits().then((res) => {
        let item = res.data[0];
        this.accountCredits = item.amount || 0;
      });
    }
  }
}

</script>
<style lang="scss" scoped>
.section {
  width: 100%;
  height: 411px;
  background: #fff;
  .card {
    margin: 0 auto;
    position: relative;
    width: 750px;
    height: 411px;
    overflow: hidden;
    .card-box {
      position: relative;
      width: 750px;
      height: 411px;
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
        padding-top: 30px;
        margin: 0 auto 10px auto;
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
      }
      .box {
        width: 100%;
        margin-top: 50.4px;
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
          line-height: 42px;
        }
        .box-content {
          margin-top: 10.6px;
          font-family: PingFangSC-Semibold;
          font-size: 36px;
          color: #F05720;
          letter-spacing: 0;
          text-align: center;
          line-height: 46.8px;
        }
      }
    }
  }
}

</style>
