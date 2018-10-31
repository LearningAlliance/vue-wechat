<template>
  <div class="page">
    <div class="card">
      <div class="height-10"></div>
      <div :class="['vip-level-logo', {'level-0': vipLevel == 0, 'level-1': vipLevel == 1, 'level-2': vipLevel == 2, 'level-3': vipLevel == 3, 'level-4': vipLevel == 4, 'level-5': vipLevel == 5, }]"></div>
      <div class="vip-score">经验值 {{Number(score)}}/{{totalScore || 0}}</div>
      <div class="vip-process-box">
        <div class="process-left">{{nowLevel.levelName}}</div>
        <div ref="box" class="process">
          <div ref="process" class="process-inner"></div>
        </div>
        <div class="process-right">{{nextLevel.levelName}}</div>
      </div>
      <div class="card-bottom clearfix">
        <div class="card-box">
          <div class="card-logo logo-1"></div>
          <div class="card-box-inner">
            <div class="box-inner-title">生日送积分</div>
            <div class="box-inner-desc">生日当天领{{nowLevel.integral}}积分</div>
          </div>
        </div>
        <div class="card-box">
          <div class="card-logo logo-2"></div>
          <div class="card-box-inner">
            <div class="box-inner-title">积分获得{{nowLevel.levelRate || 0}}倍</div>
            <div class="box-inner-desc">获得积分多{{(Number(nowLevel.levelRate || 0) * 100).toFixed(0)}}%</div>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <div class="section-title">如何获得经验值升级</div>
      <div class="section-desc">
        获得1元保障金将对应获得1经验值
        <br/> 获得1积分将对应获得1经验值
        <br/> 经验值只进行累计，不会随着保障金和积分的使用而减少，经验值达标后将自动完成升级
      </div>
    </div>
    <div class="section">
      <div class="section-title">会员等级与权益</div>
      <div class="list">
        <div :class="['cell', {'no-bottom': allLevel.length - 1 == index}]" v-for="(item, index) in allLevel" :key="index">
          <div class="cell-left">{{item.levelName}}</div>
          <div class="cell-right">
            <div class="cell-top">所需经验值{{item.upgradeRule}}</div>
            <div class="cell-bottom">{{item.levelDesc}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      // 'vipLevel',
      // 'vipScore',
      // 'vipName',
    ])
  },
  data() {
    return {
      vipLevel: 0,
      score: 0,
      totalScore: 70000,
      // dicList: [{
      //   left: '初心',
      //   top: '所需经验值0',
      //   bottom: '生日积分送100',
      // }, {
      //   left: '青铜',
      //   top: '所需经验值1000',
      //   bottom: '生日积分送100  积分获得1.2倍特权',
      // }, {
      //   left: '白银',
      //   top: '所需经验值2000',
      //   bottom: '生日积分送100  积分获得1.4倍特权',
      // }, {
      //   left: '黄金',
      //   top: '所需经验值3000',
      //   bottom: '生日积分送100  积分获得1.5倍特权',
      // }, {
      //   left: '铂金',
      //   top: '所需经验值4000',
      //   bottom: '生日积分送100  积分获得1.6倍特权',
      // }, {
      //   left: '钻石',
      //   top: '所需经验值4000',
      //   bottom: '生日积分送100  积分获得1.6倍特权',
      // }, ],
      allLevel: {},
      nextLevel: {},
      nowLevel: {},
    }
  },
  mounted() {
    // TODO
    this.getData();
    this.getAccountCredits();
  },
  methods: {
    getAccountCredits() {
        api.user.getAccountCredits().then((res) => {
          let item = res.data[0];
          this.score = item.amount || 0;
          this.setProcess();
        }).catch((err) => {});
    },
    getData() {
        api.user.userLevel({}).then((res) => {
          let {
            allLevel = {},
              nextLevel = {},
              nowLevel = {},
          } = res.data[0];
          this.allLevel = allLevel;
          this.nextLevel = nextLevel;
          this.nowLevel = nowLevel;
          this.vipLevel = this.nowLevel.levelId;
          this.totalScore = nowLevel.upgradeRule;
          this.getAccountCredits();
        }).catch((err) => {});
    },
    setProcess() {
      let width = Number(this.score) / Number(this.totalScore) * this.$refs.box.clientWidth;
      this.$refs.process.style.width = width + 'px';
    }
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  background: #F6F6FA;
}

.section {
  margin-top: 20px;
  width: 100%;
  box-sizing: border-box;
  padding: 30px;
  background: #FFF;
  .list {
    margin-top: 28px;
    .cell {
      width: 100%;
      box-sizing: border-box;
      padding-left: 140px;
      margin-bottom: 42px;
      position: relative;
      &.no-bottom {
        margin-bottom: 0;
      }
      .cell-left {
        position: absolute;
        top: 0;
        left: 0;
        font-family: PingFangSC-Semibold;
        font-size: 32px;
        color: #F05720;
        letter-spacing: 0;
        line-height: 42px;
      }
      .cell-right {
        width: 100%;
        height: 100%;
        .cell-top {
          font-family: PingFangSC-Regular;
          font-size: 28px;
          color: #330000;
          letter-spacing: 0;
          line-height: 42px;
        }
        .cell-bottom {
          font-family: PingFangSC-Regular;
          font-size: 28px;
          color: #330000;
          letter-spacing: 0;
          line-height: 42px;
        }
      }
    }
  }
  .section-title {
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #2E3141;
    letter-spacing: 0;
    line-height: 41.6px;
  }
  .section-desc {
    margin-top: 30px;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #818B8F;
    letter-spacing: 0;
    line-height: 42px;
  }
}

.card {
  margin: 0 auto;
  width: 750px;
  height: 508px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url('../../assets/images/bg_member_top.png');
  position: relative;
  .card-bottom {
    margin-top: 51px;
    width: 100%;
    height: 80px;
    box-sizing: border-box;
    padding-left: 30px;
    padding-right: 30px;
    .card-box {
      width: 50%;
      height: 100%;
      display: inline-block;
      float: left;
      box-sizing: border-box;
      padding-left: 100px;
      position: relative;
      .card-box-inner {
        width: 100%;
        height: 100%;
        .box-inner-title {
          font-family: PingFangSC-Regular;
          font-size: 28px;
          color: #FFFFFF;
          letter-spacing: 0;
          line-height: 36.4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .box-inner-desc {
          margin-top: 11px;
          font-family: PingFangSC-Regular;
          font-size: 24px;
          color: #C4CACD;
          letter-spacing: 0;
          line-height: 31.2px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .card-logo {
        position: absolute;
        top: 0;
        left: 0;
        width: 80px;
        height: 80px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        &.logo-1 {
          background-image: url('../../assets/images/ic_member_birthday.png');
        }
        &.logo-2 {
          background-image: url('../../assets/images/ic_member_coin.png');
        }
      }
    }
  }
  .vip-process-box {
    position: relative;
    width: 100%;
    height: 34px;
    box-sizing: border-box;
    padding-left: 100px;
    padding-right: 100px;
    .process {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -8px;
      margin-left: -275px;
      width: 550px;
      height: 16px;
      background: #818B8F;
      border-radius: 8px;
      overflow: hidden;
      .process-inner {
        width: 0;
        height: 100%;
        background: #FFF;
        transition: all 0.3s ease;
        -webkit-transition: all 0.3s ease;
        -moz-transition: all 0.3s ease;
        -o-transition: all 0.3s ease;
      }
    }
    .process-left,
    .process-right {
      position: absolute;
      display: inline-block;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #C4CACD;
      letter-spacing: 0;
      line-height: 36.4px;
    }
    .process-left {
      top: 0;
      left: 34px;
    }
    .process-right {
      top: 0;
      right: 34px;
    }
  }
  .vip-score {
    margin-top: 10px;
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #C4CACD;
    letter-spacing: 0;
    text-align: center;
    line-height: 41.6px;
    box-sizing: border-box;
    padding-left: 100px;
    padding-right: 100px;
    position: relative;
  }
  .height-10 {
    height: 10px;
  }
  .vip-level-logo {
    margin: 0 auto;
    width: 284px;
    height: 250px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../assets/images/img_member_heart.png');
    &.level-0 {
      background-image: url('../../assets/images/img_member_heart.png');
    }
    &.level-1 {
      background-image: url('../../assets/images/img_member_bronze.png');
    }
    &.level-2 {
      background-image: url('../../assets/images/img_member_silver.png');
    }
    &.level-3 {
      background-image: url('../../assets/images/img_member_gold.png');
    }
    &.level-4 {
      background-image: url('../../assets/images/img_member_platinum.png');
    }
    &.level-5 {
      background-image: url('../../assets/images/img_member_diamond.png');
    }
  }
}

</style>
