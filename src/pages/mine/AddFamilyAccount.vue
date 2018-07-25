<template>
  <div class="page">
    <div class="header">选择对方角色</div>
    <div class="box clearfix">
      <div class="role" v-for="(item, index) in roleList" :key="item.roleId">
        <div :class="['role-name', {'selected': item.selected}]" @click="setRole(index)">
          {{item.roleName}}
        </div>
      </div>
    </div>
    <div class="input-box margin-top-20">
      <div class="label">
        <p class="label-text">手机号</p>
      </div>
      <div class="value clearfix">
        <input type="text" class="input" placeholder="请输入要转赠的账号所绑定的手机号" oninput="if(value.length>11)value=value.slice(0, 11)" v-model="phone" onchange="if(value.length>11)value=value.slice(0, 11)" />
      </div>
      <div class="line-box">
        <div class="line"></div>
      </div>
    </div>
    <div class="input-box margin-top-20">
      <div class="label">
        <p class="label-text">转赠比例</p>
      </div>
      <div class="value clearfix">
        <input type="number" class="input rate-input" placeholder="请输入转赠比例" v-model.number="rate" />
        <div class="rate-label">%</div>
      </div>
      <div class="line-box">
        <div class="line"></div>
      </div>
    </div>
    <div class="err-box">
      <p class="err-text" v-show="!!resultMsg">{{resultMsg}}</p>
    </div>
    <div :class="['submit', {'canClick': phone.trim().length == 11 && rate > 0 && rate <= 100}]" @click="submit">确定</div>
  </div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
export default {
  data() {
    return {
      phone: '',
      rate: null,
      resultMsg: '',
      roleList: [{
        roleId: 1,
        roleName: '老公',
        selected: false,
      }, {
        roleId: 2,
        roleName: '老婆',
        selected: false,
      }, {
        roleId: 3,
        roleName: '爸爸',
        selected: false,
      }, {
        roleId: 4,
        roleName: '妈妈',
        selected: false,
      }, {
        roleId: 5,
        roleName: '公公',
        selected: false,
      }, {
        roleId: 6,
        roleName: '婆婆',
        selected: false,
      }, {
        roleId: 7,
        roleName: '岳父',
        selected: false,
      }, {
        roleId: 8,
        roleName: '岳母',
        selected: false,
      }, {
        roleId: 9,
        roleName: '儿子',
        selected: false,
      }, {
        roleId: 10,
        roleName: '女儿',
        selected: false,
      }]
    }
  },
  methods: {
    setRole(index) {
      let item = this.roleList[index];
      if (item.selected) {
        item.selected = false;
        this.$set(this.roleList, index, item);
      } else {
        this.roleList.forEach((obj) => {
          obj.selected = false;
        });
        item.selected = true;
        this.$set(this.roleList, index, item);
      }
    },
    submit() {
      let phone = this.phone.trim();
      let rate = this.rate;
      if (phone.length != 11) {
        _.alert('请输入完整的手机号');
        return;
      }
      let reg = /^(-?\d+)(\.\d{1,2})?$/;
      if (!reg.test(rate)) {
        _.alert('转赠金额需大于0，且格式错误，请检查 ');
        return;
      }
      if (rate < 0) {
        _.alert('比例不能小于0%，请检查');
        return;
      }
      if (rate > 100) {
        _.alert('比例不能大于100%，请检查');
        return;
      }
      api.user.saveUserFamily({
        phone,
        rate,
      }).then((res) => {
        _.alert('新增成功');
        // 为了防止下一个页面刷新数据会消失，使用 path query模式
        // this.$router.push({
        //   path: '/mine/giveSuccess',
        //   query: {
        //     ...res.data
        //   }
        // });
        this.$router.history.go(-1);
      }).catch();
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
  .header {
    margin: 53px auto 0 auto;
    width: 650px;
    height: 42px;
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #2E3141;
    letter-spacing: 0;
    line-height: 42px;
  }
  .box {
    width: 680px;
    margin: 30px auto 0 auto;
    .role {
      display: inline-block;
      float: left;
      width: 170px;
      height: 68px;
      margin-bottom: 30px;
      .role-name {
        border: 3px solid #818B8F;
        border-radius: 34px;
        width: 140px;
        height: 68px;
        font-family: PingFangSC-Semibold;
        font-size: 32px;
        color: #818B8F;
        letter-spacing: 0;
        text-align: center;
        line-height: 68px;
        &.selected {
          border-color: #F05720;
          background: #F05720;
          color: #fff;
        }
      }
    }
  }
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
    .rate-label {
      display: inline-block;
      width: 34px;
      height: 68px;
      position: absolute;
      top: 0;
      right: 50px;
      font-family: PingFangSC-Regular;
      font-size: 36px;
      color: #2E3141;
      letter-spacing: 0;
      line-height: 68px;
    }
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
      &.rate-input {
        max-width: 500px;
        padding-right: 50px;
      }
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
