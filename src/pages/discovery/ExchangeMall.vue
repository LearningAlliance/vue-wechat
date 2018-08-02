<!-- 发现-兑换商城 -->
<template>
  <div class="page">
    <banner></banner>
    <div class="big-box">
      <div class="box">
        <div class="box-left">
          <p class="box-title">保障金(元)</p>
          <p class="box-content">{{accountSafeGuard}}</p>
          <div class="box-btn">保障金兑成积分</div>
        </div>
        <div class="box-right">
          <p class="box-title">积分</p>
          <P class="box-content">{{accountCredits}}</P>
          <div class="box-btn">保障金兑成养老金</div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="card with-shadow">
        <div class="card-left">
          <img class="card-img" src="../../assets/images/img_changecoin_change.png" />
        </div>
        <div class="card-right">
          <p class="card-title">积分兑换商城</p>
          <p class="card-desc">积分可兑换各种类品好物，应有尽有</p>
          <div class="card-right-link clearfix">
            <i class="icon-right"></i>
            <span class="text-right">进入</span>
          </div>
        </div>
      </div>
    </div>
    <div class="no-more">更多兑换敬请期待</div>
  </div>
</template>
<script type="text/javascript">
import banner from '@/components/banner'
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
export default {
  data() {
    return {
      accountSafeGuard: 0,
      accountCredits: 0,
    }
  },
  components: {
    'banner': banner,
  },
  created() {
    this.getAccountSafeGuard();
    this.getAccountCredits();
  },
  methods: {
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
<style scoped lang="scss">
.big-box {
  padding-top: 40px;
  width: 100%;
  height: 277px;
  background: #fff;
  .box {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    .box-left,
    .box-right {
      text-align: center;
    }
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
      color: #2E3141;
      letter-spacing: 0;
      text-align: center;
      line-height: 46.8px;
    }
    .box-btn {
      display: inline-block;
      margin-top: 30.2px;
      width: 290px;
      height: 68px;
      font-family: PingFangSC-Semibold;
      background: #F05720;
      border-radius: 34px;
      font-size: 32px;
      color: #FFFFFF;
      letter-spacing: 0;
      text-align: center;
      line-height: 68px;
    }
  }
}

.section {
  width: 100%;
  .card {
    margin: 30px auto 0 auto;
    background: #fff;
    width: 690px;
    height: 220px;
    border-radius: 12px;
    position: relative;
    .card-left {
      width: 149px;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      .card-img {
        width: 88px;
        height: 88px;
        display: block;
        position: absolute;
        top: 62px;
        left: 30px;
      }
    }
    .card-right {
      width: 100%;
      height: 100%;
      padding-top: 50px;
      box-sizing: border-box;
      padding-left: 149px;
      .card-title {
        font-family: PingFangSC-Medium;
        font-size: 36px;
        height: 50px;
        line-height: 50px;
        color: #2E3141;
        letter-spacing: 0;
      }
      .card-desc {
        margin-top: 33px;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #818B8F;
        letter-spacing: 0;
        line-height: 36.4px;
        height: 36.4px;
      }
      .card-right-link {
        position: absolute;
        top: 50px;
        right: 30px;
        height: 36.4px;
        .text-right {
          font-family: PingFangSC-Regular;
          font-size: 28px;
          color: #818B8F;
          letter-spacing: 0;
          text-align: right;
          line-height: 36.4px;
          display: inline-block;
          float: right;
          margin-right: 5px;
        }
        .icon-right {
          display: inline-block;
          float: right;
          width: 36.4px;
          height: 36.4px;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-image: url('../../assets/images/ic_back_right@2x.png');
        }
      }
    }
  }
}

.no-more {
  margin-top: 30px;
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #818B8F;
  text-align: center;
  line-height: 41.6px;
}

</style>
