<template>
  <div class="page">
    <div class="switch-section">
      <div class="switch-box clearfix">
        <div class="switch-label">是否开启赠送到账通知</div>
        <div class="switch-btn">
          <mt-switch v-model="value" @change="turn"></mt-switch>
        </div>
      </div>
    </div>
    <div class="desc-section">
      <p class="desc-text">开启通知后不会每笔到账通知，在每周系统将把累计一定金额的到账通知通过短信推送到亲情账户。</p>
    </div>
    <div class="list-section">
      <div class="list-title">当前绑定的账号</div>
      <div class="list-box" v-for="(item, index) in list">
        <div class="list-cell">
          <div class="cell-top">
            <p class="text">
              {{item.roleName}}
              <span class="rate">赠送比例 {{item.rate}}%</span>
            </p>
            <p class="text margin-top-10 phone">
              {{item.phone}}
              <span class="all">累计获赠<span class="amount">{{item.amount}}</span>保障金</span>
            </p>
          </div>
          <div class="line"></div>
          <div class="cell-bottom">
            <div class="bottom-btn" @click="changeRate(item.id)">修改比例</div>
            <div class="bottom-btn delete-btn" @click="deleteRate(item.id)">删除绑定</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { Switch } from 'mint-ui';
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'

export default {
  data() {
    return {
      value: false,
      list: [],
    }
  },
  components: {
    'mt-switch': Switch,
  },
  created() {
    _.alert('暂无获取是否开通到账通知接口')
    api.user.getFamilyAccoutNotice().then(() => {
      this.value = false;
    });
    api.user.getUserFamilyList().then((res) => {
    	console.log(res.data);
    	this.list = res.data;
    });
  },
  methods: {
    turn() {
      _.alert('暂无获取是否开通到账通知接口')
      console.log(this.value);
      api.user.getFamilyAccoutNotice({
        status: this.value
      }).then(() => {

      });
    },
    changeRate(id){
    	console.log('changeRate', id);
    	_.alert('跳转到修改比例页面')
    },
    deleteRate(id){
    	console.log('deleteRate', id);
    	_.alert('TODO 提示是否删除，缺少唯一删除标识')
    },
  }
}

</script>
<style scoped lang="scss">
.switch-section {
  margin-top: 20px;
  width: 100%;
  background: #FFF;
  /*no*/
  .switch-box {
    width: 690px;
    height: 88px;
    margin: 0 auto;
    position: relative;
    .switch-label {
      display: inline-block;
      float: left;
      width: 420px;
      height: 88px;
      line-height: 88px;
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
    }
    .switch-btn {
      display: inline-block;
      position: absolute;
      top: 13px;
      right: 0;
      width: 102px;
      height: 62px;
    }
  }
}

.desc-section {
  width: 690px;
  margin: 20px auto 0 auto;
  .desc-text {
    margin-top: 20px;
    width: 690px;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #818B8F;
    letter-spacing: -0.58px;
    line-height: 36px;
  }
}

.line {
  width: 690px;
  height: 0;
  border: 1px solid #E2E2E2;
  margin: 0 auto;
}

.list-section {
  width: 100%;
  margin-top: 50px;
  .list-title {
    font-family: PingFangSC-Semibold;
    font-size: 32px;
    color: #2E3141;
    letter-spacing: 0;
    text-align: center;
    line-height: 41.6px;
  }
  .list-box {
    margin-top: 20px;
    width: 100%;
    height: 232px;
    background: #FFF;
    .list-cell {
      width: 690px;
      height: 232px;
      margin: 0 auto;
      box-sizing: content-box;
      .cell-top {
        padding-top: 30px;
        padding-bottom: 28px;
        width: 100%;
        height: 84px;
        position: relative;
        .text {
          font-family: PingFangSC-Regular;
          font-size: 32px;
          color: #333333;
          letter-spacing: 0;
          line-height: 41.6px;
          text-align: left;
          &.margin-top-10 {
            margin-top: 10.4px;
          }
          &.phone {
            font-family: PingFangSC-Regular;
            font-size: 24px;
            color: #818B8F;
            letter-spacing: -0.58px;
            line-height: 31.2px;
          }
          .rate {
            position: absolute;
            top: 30px;
            right: 0;
            font-family: PingFangSC-Regular;
            font-size: 32px;
            color: #2E3141;
            letter-spacing: 0;
            text-align: right;
            line-height: 41.6px;
          }
          .all {
            position: absolute;
            bottom: 28px;
            right: 0;
            font-family: PingFangSC-Regular;
            font-size: 24px;
            color: #818B8F;
            letter-spacing: -0.58px;
            text-align: right;
            line-height: 31.2px;
            .amount {
              font-family: PingFangSC-Regular;
              font-size: 24px;
              color: #F05720;
              letter-spacing: -0.58px;
              text-align: right;
              line-height: 31.2px;
            }
          }
        }
      }
      .cell-bottom {
        width: 100%;
        height: 88px;
        box-sizing: border-box;
        padding-top: 19px;
        padding-bottom: 19px;
        .bottom-btn {
          display: inline-block;
          float: right;
          width: 160px;
          height: 50px;
          margin-left: 30px;
          border: 2px solid #F05720;
          color: #F05720;
          border-radius: 25px;
          text-align: center;
          line-height: 50px;
          box-sizing: border-box;
          &.delete-btn {
            color: #818B8F;
            border-color: #818B8F;
          }
        }
      }
    }
  }
}

</style>
