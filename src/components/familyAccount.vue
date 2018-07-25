<template>
  <div class="section">
    <div class="header">
      <p class="title">亲情账户 </p>
      <span class="icon-label" @click="toManage">管理</span>
      <span class="icon-right"></span>
    </div>
    <div class="body">
      <p class="desc">每笔消费获得的部分保障金到账亲人账户
        <br/>多一份你的关心</p>
      <div class="record-btn" @click="toList">亲情记录</div>
      <div class="box clearfix">
        <div class="cell" v-for="(item, index) in userFamilyRateList">
          <div class="person">{{item.name}}</div>
          <div class="userName">张三</div>
          <div class="amount">转赠{{item.rate}}%</div>
        </div>
        <div class="cell" @click="add">
          <div class="person add-box">
          	<div class="add"></div>
          </div>
          <div class="userName"></div>
          <div class="amount"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex'
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
export default {
  data() {
    return {}
  },
  created() {
    api.user.getUserFamilyRateList().then((res) => {
      console.log(res);
      this.list = res.data;
      this.setUserFamilyRateList(res.data);
    })
  },
  computed: {
    ...mapGetters([
      'userFamilyRateList',
    ])
  },
  methods: {
    ...mapActions({ setUserFamilyRateList: 'setUserFamilyRateList' }),
    toManage() {
      this.$router.push('/mine/editFamilyAccount');
    },
    add(){
      this.$router.push('/mine/addFamilyAccount');
    },
    toList(){
      _.alert('没有相关逻辑啊。。。')
    },
  }
}

</script>
<style scoped lang="scss">
.section {
  width: 100%;
  background: #fff;
  .header {
    width: 690px;
    height: 88px;
    margin: 0 auto;
    border-bottom: 1px solid #E2E2E2;
    position: relative;
    /*no*/
    .title {
      font-family: PingFangSC-Semibold;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
      text-align: center;
      line-height: 88px;
    }
    .icon-label {
      display: block;
      position: absolute;
      width: 147px;
      height: 88px;
      top: 0;
      right: 60px;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #818B8F;
      letter-spacing: 0;
      text-align: right;
      line-height: 88px;
    }
    .icon-right {
      display: block;
      position: absolute;
      width: 50px;
      height: 50px;
      top: 50%;
      right: 0;
      margin-top: -25px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url('../assets/images/ic_nextarrow.png');
    }
  }
  .body {
    margin: 30.4px auto 0 auto;
    width: 628px;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #818B8F;
    letter-spacing: 0;
    text-align: center;
    line-height: 42px;
    .record-btn {
      margin: 30.6px auto 0 auto;
      width: 240px;
      height: 68px;
      border: 2px solid #C4CACD;
      border-radius: 34px;
      font-family: PingFangSC-Regular;
      font-size: 32px;
      color: #2E3141;
      letter-spacing: 0;
      text-align: center;
      line-height: 68px;
    }
    .box {
      margin-top: 60px;
      width: 660px;
      .cell {
        display: inline-block;
        float: left;
        width: 220px;
        height: 263.4px;
        box-sizing: border-box;
        text-align: center;
        padding-bottom: 30px;
        .person {
          display: inline-block;
          width: 120px;
          height: 120px;
          box-sizing: border-box;
          background: #FFE3D5;
          border-radius: 120px;
          border: 6px solid #F05720;
          font-family: PingFangSC-Semibold;
          font-size: 32px;
          color: #F05720;
          letter-spacing: 0;
          text-align: center;
          line-height: 108px;
          position: relative;
          &.add-box{
            background: #F7F7FB;
            border-color: #C4CACD;
          }
          .add{
          	position: absolute;
          	top: 50%;
          	left: 50%;
          	margin-top: -18px;
          	margin-left: -18px;
          	width: 36px;
          	height: 36px;
          	background-size: 100% 100%;
          	background-repeat: no-repeat;
          	background-image: url('../assets/images/icon_add.png');
          }
        }
        .userName {
          width: 100%;
          margin-top: 30px;
          height: 36.4px;
        }
        .amount {
          width: 100%;
          margin-top: 10.6px;
          height: 36.4px;
          font-family: PingFangSC-Regular;
          font-size: 28px;
          color: #2E3141;
          letter-spacing: 0;
          text-align: center;
          line-height: 36.4px;
        }
      }
    }
  }
}

</style>
