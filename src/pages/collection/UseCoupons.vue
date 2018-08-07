<template>
  <div class="page">
    <div v-if="useType == 'code'">
      <div class="section margin-top-20" @click="changeClick('no')">
        <div class="section-cell clearfix">
          <div class="cell-left">
            <span class="label">不使用代金券</span>
          </div>
          <div class="cell-right">
            <div class="icon-right-box">
              <i :class="['icon-right', {'selected': useType == 'no'}]"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="section margin-top-20" @click="changeClick('use')">
        <div class="section-cell line clearfix">
          <div class="cell-left">
            <span class="label">选择代金券</span>
          </div>
          <div class="cell-right">
            <div class="icon-right-box">
              <i :class="['icon-right', {'selected': useType == 'use'}]"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="section" @click="changeClick('code')">
        <div class="section-cell line clearfix">
          <div class="cell-left">
            <span class="label">使用代金券串码核销</span>
          </div>
          <div class="cell-right">
            <div class="icon-right-box">
              <i :class="['icon-right', {'selected': useType == 'code'}]"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="section-cell clearfix">
          <input type="text" class="code-input" placeholder="请输入券码数字" />
        </div>
      </div>
      <div class="error-text" v-show="resultMsg">{{resultMsg}}</div>
    </div>
    <div v-else>
      <div class="section margin-top-20">
        <div class="section-cell line clearfix" @click="changeClick('code')">
          <div class="cell-left">
            <span class="label">使用代金券串码核销</span>
          </div>
          <div class="cell-right">
            <div class="icon-right-box">
              <i :class="['icon-right', {'selected': useType == 'code'}]"></i>
            </div>
          </div>
        </div>
        <div class="section-cell line clearfix" @click="changeClick('no')">
          <div class="cell-left">
            <span class="label">不使用代金券</span>
          </div>
          <div class="cell-right">
            <div class="icon-right-box">
              <i :class="['icon-right', {'selected': useType == 'no'}]"></i>
            </div>
          </div>
        </div>
        <div class="section-cell clearfix" @click="changeClick('use')">
          <div class="cell-left">
            <span class="label">选择代金券</span>
          </div>
          <div class="cell-right">
            <div class="icon-right-box">
              <i :class="['icon-right', {'selected': useType == 'use'}]"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="box clearfix" v-for="(item, index) in voucherList" :key="'valid' + index" @click="selectCoupon(index)">
          <div :class="['icon-select', {'selected': selectedIndex == index}]"></div>
          <div class="box-content clearfix">
            <div class="box-left">
              <div class="box-coupon-price"><span class="box-coupon-currency">￥</span>{{item.couponPrice/100}}</div>
              <div class="box-coupon-limit" v-show="item.couponLimit">满{{item.couponLimit/100}}可用</div>
            </div>
            <div class="box-right">
              <div class="box-coupon-name">{{item.couponName}}</div>
              <div class="box-exp-date" v-show="item.expDate">有效期至：{{item.expDate.slice(0, 10)}}</div>
            </div>
          </div>
          <div class="box-footer">
            {{item.couponRule}}
          </div>
        </div>
        <div class="invalidVoucherTitle">不可使用优惠券</div>
        <div class="box invalid clearfix" v-for="(item, index) in invalidVoucherList" :key="'invalid' + index">
          <div class="box-content clearfix">
            <div class="box-left">
              <div class="box-coupon-price"><span class="box-coupon-currency">￥</span>{{item.couponPrice/100}}</div>
              <div class="box-coupon-limit" v-show="item.couponLimit">满{{item.couponLimit/100}}可用</div>
            </div>
            <div class="box-right">
              <div class="box-coupon-name">{{item.couponName}}</div>
              <div class="box-exp-date" v-show="item.expDate">有效期至：{{item.expDate.slice(0, 10)}}</div>
            </div>
          </div>
          <div class="box-footer">
            {{item.couponRule}}
          </div>
        </div>
      </div>
      <div class="height-140"></div>
    </div>
    <div class="confirm">
      <div class="confirm-btn" @click="confirm">确定使用</div>
    </div>
  </div>
</template>
<script type="text/javascript">
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
export default {
  data() {
    return {
      useType: 'code', // no 不使用代金券， use 选择代金券,  code  使用代金券串码核销
      invalidVoucherList: [],
      voucherList: [],
      selectedIndex: -1,
      resultMsg: '', // 错误提示
    }
  },
  created() {
    this.getVoucher();
    this.getInvalidVoucher();
  },
  methods: {
    changeClick(type) {
      this.useType = type;
    },
    getVoucher() {
      api.user.getVoucher({ pageNum: 1, pageRow: 1000 }).then((res) => {
        this.voucherList = res.data;
      }).catch((err) => {
        console.log(err);
      });
    },
    getInvalidVoucher() {
      api.user.getInvalidVoucher({ pageNum: 1, pageRow: 1000 }).then((res) => {
        this.invalidVoucherList = res.data;
      }).catch((err) => {
        console.log(err);
      });
    },
    selectCoupon(index) {
      if (this.selectedIndex == index) {
        this.selectedIndex = -1;
      } else {
        this.selectedIndex = index;
      }
    },
    confirm() {
      _.alert('提交TODO');
      // 错误消息判断
      // 调用接口
      // 查询代金券核销码校验
      let res = {
        "resultMsg": "Successful",
        "data": {
          "id": 2
        },
        "resultCode": "0"
      };
      if (res.resultCode == 0){
      	this.resultMsg = '';
      }else{
      	this.resultMsg = res.resultMsg;
      }
    }
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  background: #f8f8fc;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: scroll;
}

.margin-top-20 {
  margin-top: 20px;
}

.height-140 {
  width: 100%;
  height: 140px;
}

.error-text {
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #D93312;
  letter-spacing: 0;
  line-height: 36.4px;
  width: 690px;
  margin: 20px auto;
}

.confirm {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 120px;
  background: #FFF;
  .confirm-btn {
    width: 570px;
    height: 88px;
    background: #F05720;
    border-radius: 44px;
    font-family: PingFangSC-Semibold;
    font-size: 36px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    line-height: 88px;
    margin: 16px auto;
  }
}

.section {
  width: 100%;
  padding-left: 30px;
  padding-right: 30px;
  box-sizing: border-box;
  background: #FFF;
  .section-cell {
    width: 100%;
    box-sizing: border-box;
    height: 88px;
    position: relative;
    &.line {
      border-bottom: 1px solid #E2E2E2;
      /*no*/
    }
    .code-input {
      width: 100%;
      height: 88px;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #2E3141;
      letter-spacing: 0;
      line-height: 88px;
    }
    .cell-left {
      display: inline-block;
      float: left;
      .label {
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #2E3141;
        letter-spacing: 0;
        line-height: 88px;
      }
    }
    .cell-right {
      display: inline-block;
      float: right;
      .icon-right-box {
        display: inline-block;
        float: right;
        width: 40px;
        height: 88px;
        position: relative;
        .icon-right {
          position: absolute;
          width: 40px;
          height: 40px;
          top: 50%;
          left: 50%;
          margin-left: -20px;
          margin-top: -20px;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-image: url('../../assets/images/ic_select_grey.png');
          &.selected {
            background-image: url('../../assets/images/ic_select.png');
          }
        }
      }
    }
  }
}

.invalidVoucherTitle {
  margin-top: 30px;
  font-family: PingFangSC-Regular;
  font-size: 32px;
  color: #2E3141;
  text-align: center;
  line-height: 41.6px;
}

.list {
  .box {
    width: 690px;
    height: 234px;
    margin: 30px auto 0 auto;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../assets/images/ic_voucher_bg.png');
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    &.invalid {
      background-image: url('../../assets/images/ic_voucher_invalid_bg.png');
    }
    .icon-select {
      position: absolute;
      top: 53px;
      right: 32px;
      width: 35px;
      height: 35px;
      display: block;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url('../../assets/images/ic_select_grey.png');
      &.selected {
        background-image: url('../../assets/images/ic_select.png');
      }
    }
    .box-content {
      width: 100%;
      height: 174px;
      box-sizing: border-box;
      padding-top: 40px;
      padding-bottom: 40px;
      .box-left {
        display: inline-block;
        float: left;
        width: 213px;
        height: 100%;
        text-align: center;
        .box-coupon-price {
          font-family: PingFangSC-Medium;
          font-size: 48px;
          color: #F05720;
          letter-spacing: 0;
          text-align: center;
          line-height: 62.4px;
          .box-coupon-currency {
            font-family: PingFangSC-Regular;
            font-size: 32px;
            color: #F05720;
            letter-spacing: 0;
            text-align: center;
            line-height: 62.4px;
          }
          .box-coupon-limit {
            font-family: PingFangSC-Regular;
            font-size: 24px;
            color: #2E3141;
            letter-spacing: 0;
            text-align: center;
            line-height: 31.2px;
          }
        }
      }
      .box-right {
        display: inline-block;
        float: left;
        height: 100%;
        width: 400px;
        .box-coupon-name {
          font-family: PingFangSC-Medium;
          font-size: 32px;
          color: #2E3141;
          letter-spacing: 0;
          line-height: 41.6px;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .box-exp-date {
          margin-top: 20.4px;
          font-family: PingFangSC-Regular;
          font-size: 24px;
          color: #818B8F;
          letter-spacing: -0.58px;
          line-height: 31.2px;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .box-footer {
      width: 100%;
      height: 60px;
      box-sizing: border-box;
      padding: 14px 40px;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #818B8F;
      letter-spacing: 0;
      line-height: 31.2px;
      text-align: left;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}

</style>
