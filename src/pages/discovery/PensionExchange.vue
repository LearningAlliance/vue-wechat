<!-- 兑换商城-保障金兑养老金 -->
<template>
  <div class="page">
    <div class="section">
      <div class="box">
        <div :class="['cell', {'selected': item.selected}]" v-for="(item, index) in list" @click="selectCell(index)">
          <p class="text-1" v-show="item.safeguard">{{item.safeguard}}保障金</p>
          <p class="text-2" v-show="item.credits">兑换{{item.credits}}养老金</p>
          <p class="text-3" v-show="!item.safeguard && !item.credits">其他金额</p>
        </div>
      </div>
      <div class="input-box clearfix">
        <input type="text" :disabled="!canEdit" class="input" placeholder="请输入你要兑换保障金金额" v-model.number="value" />
        <div :class="['submit', {'disable': value <= 0 || !value}]" @click="submit">提交</div>
      </div>
    </div>
    <div class="readMe">
      <p>说明：</p>
      <p>1.保障金兑换成养老金后，将无法再兑换回保障金，请谨慎操作；</p>
      <p>2.当前兑换比例为 1保障金=1养老金；</p>
      <p>3.兑换养老金，最少20元起兑；</p>
    </div>
    <div class="footer clearfix">
      <div class="footer-desc">兑换{{value * 1}}养老金</div>
      <div class="confirm" @click="confirm">确定兑换</div>
    </div>
  </div>
</template>
<script type="text/javascript">
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
export default {
  data() {
    return {
      list: [{
          safeguard: 20,
          credits: 20,
          selected: false,
          canEdit: false,
        },
        {
          safeguard: 50,
          credits: 50,
          selected: false,
          canEdit: false,
        },
        {
          safeguard: 100,
          credits: 100,
          selected: false,
          canEdit: false,
        },
        {
          safeguard: 200,
          credits: 200,
          selected: false,
          canEdit: false,
        },
        {
          safeguard: null,
          credits: null,
          selected: false,
          canEdit: true,
        },
      ],
      canEdit: false,
      value: null,
    }
  },
  methods: {
    selectCell(index) {
      let item = this.list[index];
      if (item.selected) {
        item.selected = false;
        this.canEdit = false;
        this.value = null;
        this.$set(this.list, index, item);
      } else {
        this.list.forEach((obj) => {
          obj.selected = false;
        });
        item.selected = true;
        this.$set(this.list, index, item);
        this.canEdit = item.canEdit;
        this.value = item.safeguard;
      }
    },
    submit() {
      let amount = this.value;
      let reg = /^(-?\d+)(\.\d{1,2})?$/;
      if (!reg.test(amount)) {
        _.alert('兑换金额需大于0，且格式正确 ，请检查 ');
        return;
      }
      if (amount < 0) {
        _.alert('兑换金额需大于0，请检查 ');
        return;
      }
    },
    confirm() {
      _.alert('确定兑换');
    },
  }
}

</script>
<style scoped lang="scss">
.page {
  padding-top: 20px;
  width: 100%;
  height: 100%;
  min-height: 100%;
  box-sizing: border-box;
  .section {
    width: 100%;
    height: 448px;
    background: #FFF;
    .box {
      width: 750px;
      height: 300px;
      margin: 0 auto;
      .cell {
        width: 210px;
        height: 120px;
        text-align: center;
        display: inline-block;
        float: left;
        margin-top: 30px;
        margin-left: 30px;
        box-sizing: border-box;
        border: 1px solid #C4CACD;
        /*no*/
        border-radius: 12px;
        &.selected {
          border-color: #F05720;
          background: #F05720;
          color: #fff;
          .text-1,
          .text-2,
          .text-3 {
            color: #fff;
          }
        }
        .text-1 {
          margin-top: 18px;
          font-family: PingFangSC-Regular;
          font-size: 32px;
          color: #2E3141;
          letter-spacing: 0;
          text-align: center;
          line-height: 41.6px;
        }
        .text-2 {
          margin-top: 10.4px;
          font-family: PingFangSC-Regular;
          font-size: 28px;
          color: #818B8F;
          letter-spacing: 0;
          text-align: center;
          line-height: 36.4px;
        }
        .text-3 {
          font-family: PingFangSC-Regular;
          font-size: 32px;
          color: #2E3141;
          letter-spacing: 0;
          text-align: center;
          line-height: 114px;
        }
      }
    }
    .input-box {
      width: 690px;
      height: 88px;
      margin: 30px auto 0 auto;
      .input {
        display: inline-block;
        float: left;
        width: 470px;
        height: 88px;
        padding-left: 20px;
        padding-right: 20px;
        box-sizing: border-box;
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #2E3141;
        letter-spacing: 0;
        line-height: 88px;
        border: 1px solid #C4CACD;
        /*no*/
        border-radius: 12px;
      }
      .submit {
        margin-top: 10px;
        display: inline-block;
        float: right;
        width: 180px;
        height: 68px;
        font-family: PingFangSC-Semibold;
        font-size: 32px;
        letter-spacing: 0;
        text-align: center;
        line-height: 68px;
        color: #fff;
        background: #F05720;
        border-radius: 34px;
        &.disable {
          background: #E2E2E2;
          color: #fff;
        }
      }
    }
  }
  .readMe {
    margin: 30px auto 0 auto;
    width: 690px;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #818B8F;
    letter-spacing: 0;
    line-height: 42px;
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 120px;
    background: #FFF;
    .footer-desc {
      display: inline-block;
      float: left;
      margin-left: 30px;
      margin-top: 16px;
      width: 392px;
      height: 88px;
      font-family: PingFangSC-Medium;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
      line-height: 88px;
    }
    .confirm {
      display: inline-block;
      float: right;
      width: 270px;
      height: 88px;
      font-family: PingFangSC-Semibold;
      font-size: 36px;
      color: #FFFFFF;
      letter-spacing: 0;
      text-align: center;
      line-height: 88px;
      margin-top: 16px;
      margin-right: 30px;
      background: #F05720;
      border-radius: 44px;
      color: #FFF;
    }
  }
}

input[disabled] {
  background: #f8f8fc;
}

</style>
