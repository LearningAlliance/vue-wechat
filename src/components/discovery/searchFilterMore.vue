<template>
  <div class="box">
    <div class="section clearfix">
      <div class="blank"></div>
      <div class="list-1">
        <div class="title">优惠活动</div>
        <div class="type-box clearfix">
          <div class="type" v-for="(item, index) in types" @click="changeType(index)">
            <p :class="['type-text', {'on': item.select}]">{{item.name}}</p>
          </div>
        </div>
      </div>
      <div class="blank"></div>
      <div class="line"></div>
      <div class="list-2">
        <div class="title">人均价格</div>
        <div class="type-box clearfix">
          <div class="type" v-for="(item, index) in prices" @click="changePrice(index)">
            <p :class="['type-text', {'on': item.select}]">{{item.name}}</p>
          </div>
        </div>
      </div>
      <div class="blank-2"></div>
      <div class="btns">
        <div class="btn btn-left" @click="reset">重置</div>
        <div class="btn btn-right" @click="confirm">确定</div>
      </div>
    </div>
    <div class="close-btn" @click="closeModal"></div>
  </div>
</template>
<script type="text/javascript">
export default {
  props: {
    closeModal: {
      type: Function,
    },
    changeSearch: {
      type: Function,
    },
  },
  // 1买单满减2买单满送3优惠套餐4VIP同享5收藏送券6推荐奖励7惊喜彩蛋8返保障金
  // 1：50以下2:50-100,3:101-300,4:300以上
  data() {
    return {
      types: [
        { name: '买单满减', value: '1', select: false, },
        { name: '买单满送', value: '2', select: false, },
        { name: '优惠套餐', value: '3', select: false, },
        { name: 'VIP同享', value: '4', select: false, },
        { name: '收藏送券', value: '5', select: false, },
        { name: '推荐奖励', value: '6', select: false, },
        { name: '惊喜彩蛋8', value: '7', select: false, },
        { name: '返保障金', value: '8', select: false, },
      ],
      prices: [
        { name: '50以下', value: '1', select: false, },
        { name: '50-100', value: '2', select: false, },
        { name: '101-300', value: '3', select: false, },
        { name: '400以上', value: '4', select: false, },
      ]
    }
  },
  methods: {
    changeType(index) {
      this.types[index].select = !this.types[index].select;
    },
    changePrice(index) {
      this.prices[index].select = !this.prices[index].select
    },
    reset() {
      this.types.forEach((obj) => {
        obj.select = false;
      });
      this.prices.forEach((obj) => {
        obj.select = false;
      });
      this.changeSearch(4, {
        type: '',
        price: '',
      });
      this.closeModal();
    },
    confirm() {
      var type = [],
        price = [];
      this.types.forEach((obj) => {
        if (obj.select) {
          type.push(obj.value);
        }
      });
      this.prices.forEach((obj) => {
        if (obj.select) {
          price.push(obj.value);
        }
      });
      this.changeSearch(4, {
        type: type.join(','),
        price: price.join(','),
      });
      this.closeModal();
    },
  }
}

</script>
<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  position: fixed;
  box-sizing: border-box;
  padding-top: 88px;
  padding-bottom: 200px;
  z-index: 998;
  overflow: hidden;
}

.blank-2 {
  width: 100%;
  height: 40px;
}

.btns {
  width: 570px;
  height: 104px;
  margin: 0 auto;
  .btn {
    width: 260px;
    border: 3px solid #818B8F;
    height: 68px;
    border-radius: 34px;
    display: inline-block;
    font-family: PingFangSC-Semibold;
    font-size: 32px;
    color: #818B8F;
    letter-spacing: 0;
    text-align: center;
    line-height: 68px;
    &.btn-left {
      float: left;
      color: #818B8F;
      background: #FFF;
      border-color: #818B8F;
    }
    &.btn-right {
      float: right;
      color: #FFF;
      background: #F05720;
      border-color: #F05720;
    }
  }
}

.blank {
  width: 100%;
  height: 10px;
}

.line {
  width: 100%;
  height: 1px;
  /*no*/
  background: #D8D8D8;
}

.type-box {
  width: 100%;
  .type {
    width: 25%;
    display: inline-block;
    float: left;
    .type-text {
      margin: 0 auto;
      width: 160px;
      height: 68px;
      border: 1px solid #E2E2E2;
      /*no*/
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #2E3141;
      letter-spacing: 0;
      text-align: center;
      line-height: 68px;
      margin-bottom: 20px;
      border-radius: 34px;
      &.on {
        color: #F05720;
        border-color: #F05720;
      }
    }
  }
}

.title {
  width: 100%;
  height: 77px;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #2E3141;
  line-height: 77px;
}

.section {
  width: 100%; // height: 504px;
  background: #FFF;
  box-sizing: border-box;
  overflow: hidden;
  padding-left: 30px;
  padding-right: 30px;
  .cell {
    height: 100px;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #2E3141;
    line-height: 100px;
    border-bottom: 1px solid #E2E2E2;
    /*no*/
    &.on {
      color: #F05720;
    }
    &.no-border {
      border: none;
    }
  }
}

.close-btn {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}

</style>
