<template>
  <div class="page">
    <div class="pic"></div>
    <div class="sub-title">开始创建彩蛋</div>
    <div class="section">
      <div class="section-title">彩蛋位置</div>
      <div class="section-desc shop-name">{{shopInfo.shopName}}</div>
      <div class="sectio-title-2">选择您的留言形式</div>
      <div class="zone-type-box clearfix">
        <div class="zone-type" v-for="(item, index) in zoneTypes">
          <div :class="['zone-type-text', {'on': item.select}]" @click="changeZoneType(index)">{{item.name}}</div>
        </div>
      </div>
      <div class="line margin-top-60"></div>
      <div class="cell clearfix" @click="changePut">
        <div class="cell-label">是否需要放入</div>
        <div :class="['icon-put', {'yes': whetherPut}]"></div>
      </div>
      <div class="line" v-show="whetherPut"></div>
      <div class="re-type-box clearfix" v-show="whetherPut">
        <div class="re-type" v-for="(item, index) in reTypes">
          <div :class="['re-type-text', {'on': item.select}]" @click="changeReType(index)">{{item.name}}</div>
        </div>
      </div>
      <div class="line"></div>
      <div class="cell clearfix">
        <div class="cell-label">有效时间</div>
        <div class="num-box clearfix">
          <div class="icon-num-box" @click="add">
            <div class="icon-num icon-add"></div>
          </div>
          <div class="expDate">{{expDate}}天</div>
          <div class="icon-num-box" @click="minus">
            <div class="icon-num icon-minus"></div>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="cell" @click="createPw">
        <div class="cell-label">是否创建口令</div>
        <div class="cell-right">
          <div class="cell-right-text">{{eggInfo.pw || '未创建'}}</div>
        </div>
      </div>
      <div class="line"></div>
      <div :class="['submit-btn', {'on': canSubmit}]" @click="next">下一步</div>
      <div class="blank"></div>
    </div>
  </div>
</template>
<script type="text/javascript">
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['eggInfo']),
  },
  data() {
    return {
      shopId: null,
      shopInfo: {},
      zoneTypes: [
        { name: '图文', value: '1', select: true },
        { name: '语音', value: '2', select: false },
        { name: '视频', value: '3', select: false },
      ],
      reTypes: [
        { name: '碎片', value: '2', select: true },
        { name: '微信红包', value: '4', select: false },
        { name: '套餐券', value: '1', select: false },
      ],
      zoneType: '1',
      reType: '2',
      whetherPut: true, // 是否放入
      expDate: 1,
      canSubmit: true,
    }
  },
  mounted() {
    let { shopId } = this.$route.query;
    this.shopId = shopId;
    if(!shopId){
      return;
    }
    this.getShopDetail();
    // this.updateEggInfoByKey({'amount': 100});
  },
  methods: {
    ...mapActions({
      clearEggINfo: 'clearEggINfo',
      updateEggInfoByKey: 'updateEggInfoByKey',
    }),
    // 查询商家详情
    getShopDetail() {
      api.collection.merShop({
        shopId: this.shopId,
      }).then((res) => {
        this.shopInfo = res.data[0];
      }).catch((err) => {});
    },
    changeZoneType(index) {
      if (this.zoneTypes[index].select) {
        return;
      }
      this.zoneTypes.forEach((obj) => {
        obj.select = false;
      })
      this.zoneTypes[index].select = true;
      this.zoneType = this.zoneTypes[index].value;
    },
    changePut() {
      this.whetherPut = !this.whetherPut;
    },
    changeReType(index) {
      if (this.reTypes[index].select) {
        return;
      }
      this.reTypes.forEach((obj) => {
        obj.select = false;
      })
      this.reTypes[index].select = true;
      this.reType = this.reTypes[index].value;
    },
    add() {
      if (this.expDate == 7) {
        _.alert('不能更多了~');
        return;
      }
      this.expDate++;
    },
    minus() {
      if (this.expDate == 1) {
        _.alert('不能更少了~');
        return;
      }
      this.expDate--;
    },
    createPw() {
      this.$router.push({
        path: '/collection/createPw',
      });
    },
    next() {
      let payload = {
        shopId: this.shopId,
        zoneType: this.zoneType,
        expDate: this.expDate,
      }
      if (this.whetherPut) {
        payload.reType = this.reType;
      } else {
        payload.reType = null;
      }
      this.updateEggInfoByKey(payload);
      this.$router.push({
        path: '/collection/putEggStep1',
      });
    }
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%; // height: 100%;
  min-height: 100%;
  background: #FFF;
  margin: 0;
  padding: 0;
}

.submit-btn {
  margin: 0 auto;
  margin-top: 78px;
  width: 570px;
  height: 88px;
  background: #E2E2E2;
  border-radius: 44px;
  font-family: PingFangSC-Semibold;
  font-size: 36px;
  color: #FFFFFF;
  letter-spacing: 0;
  text-align: center;
  line-height: 88px;
  &.on {
    background: #F05720;
    color: #FFF;
  }
}

.cell {
  width: 100%;
  height: 110px;
  position: relative;
  .cell-right {
    width: 50%;
    height: 110px;
    display: inline-block;
    float: left;
    font-family: PingFangSC-Regular;
    font-size: 36px;
    color: #F05720;
    letter-spacing: 0;
    line-height: 110px;
    text-align: right;
    position: relative;
    box-sizing: border-box;
    padding-right: 60px;
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      top: 50%;
      margin-top: -25px;
      right: 0;
      width: 50px;
      height: 50px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url('../../assets/images/ic_back_right@2x.png');
    }
  }
  .num-box {
    width: 50%;
    display: inline-block;
    float: left;
    text-align: right;
    font-family: PingFangSC-Regular;
    font-size: 36px;
    color: #2E3141;
    letter-spacing: 0;
    line-height: 110px;
    .expDate {
      display: inline-block;
      float: right;
      height: 110px;
      margin-left: 33px;
      margin-right: 33px;
    }
    .icon-num-box {
      display: inline-block;
      float: right;
      width: 44px;
      height: 110px;
      position: relative;
      .icon-num {
        position: absolute;
        top: 50%;
        left: 0;
        margin-top: -22px;
        display: inline-block;
        float: right;
        width: 44px;
        height: 44px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        &.icon-add {
          background-image: url('../../assets/images/ic_plus.png');
        }
        &.icon-minus {
          background-image: url('../../assets/images/ic_minus.png');
        }
      }
    }
  }
  .cell-label {
    width: 50%;
    display: inline-block;
    float: left;
    font-family: PingFangSC-Regular;
    font-size: 36px;
    color: #2E3141;
    letter-spacing: 0;
    line-height: 110px;
  }
  .icon-put {
    position: absolute;
    top: 50%;
    margin-top: -20px;
    right: 0;
    width: 40px;
    height: 40px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../assets/images/ic_select_grey.png');
    &.yes {
      background-image: url('../../assets/images/ic_select.png');
    }
  }
}

.blank {
  width: 100%;
  height: 76px;
}

.margin-top-60 {
  margin-top: 60px;
}

.line {
  width: 100%;
  height: 1px;
  /*no*/
  background: #E2E2E2;
}

.section {
  width: 100%;
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 79px;
  .re-type-box {
    width: 100%;
    height: 128px;
    box-sizing: border-box;
    padding-top: 30px;
    .re-type {
      display: inline-block;
      float: left;
      width: 33%;
      height: 68px;
      text-align: center;
      .re-type-text {
        height: 68px;
        padding-left: 29px;
        padding-right: 29px;
        display: inline-block;
        box-sizing: border-box;
        border: 1px solid #818B8F;
        /*no*/
        border-radius: 34px;
        font-family: PingFangSC-Semibold;
        font-size: 32px;
        color: #818B8F;
        letter-spacing: 0;
        text-align: center;
        line-height: 66px;
        &.on {
          background: #F05720;
          border-color: #F05720;
          color: #FFF;
        }
      }
    }
  }
  .zone-type-box {
    margin-top: 52px;
    width: 100%;
    height: 68px;
    .zone-type {
      display: inline-block;
      float: left;
      width: 33%;
      height: 68px;
      text-align: center;
      .zone-type-text {
        height: 68px;
        padding-left: 29px;
        padding-right: 29px;
        display: inline-block;
        box-sizing: border-box;
        border: 1px solid #818B8F;
        /*no*/
        border-radius: 34px;
        font-family: PingFangSC-Semibold;
        font-size: 32px;
        color: #818B8F;
        letter-spacing: 0;
        text-align: center;
        line-height: 66px;
        &.on {
          background: #F05720;
          border-color: #F05720;
          color: #FFF;
        }
      }
    }
  }
  .sectio-title-2 {
    margin-top: 59px;
    font-family: PingFangSC-Regular;
    font-size: 36px;
    color: #2E3141;
    letter-spacing: 0;
    line-height: 41.6px;
  }
  .section-title {
    font-family: PingFangSC-Regular;
    font-size: 36px;
    color: #2E3141;
    letter-spacing: 0;
    line-height: 41.6px;
  }
  .section-desc {
    margin-top: 30px;
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #2E3141;
    letter-spacing: 0;
    line-height: 41.6px;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    &.shop-name {
      padding-left: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &.shop-name::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 40px;
      height: 40px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url('../../assets/images/ic_location.png');
    }
  }
}

.pic {
  margin: 0 auto;
  width: 750px;
  height: 569px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url('../../assets/images/img_duegg.png');
}

.sub-title {
  width: 100%;
  box-sizing: border-box;
  padding-left: 50px;
  padding-right: 50px;
  margin-top: 60px;
  font-family: PingFangSC-Medium;
  font-size: 48px;
  color: #2E3141;
  letter-spacing: 0;
  line-height: 62.4px;
}

</style>
