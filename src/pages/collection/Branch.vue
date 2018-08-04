<!-- 分店 -->
<template>
  <div class="page">
    <div class="blank"></div>
    <div class="section">
      <div class="box" v-for="(item, index) in list">
        <div class="cell">
          <p class="shopName clearfix">{{item.shopName}}</p>
          <span class="distance">{{item.distance | formatDistance}}</span>
        </div>
        <div class="cell cell-2">
          <p class="address">{{item.shopAddress}}</p>
        </div>
        <div class="line"></div>
        <div class="tel" @click="makePhone(item.shopTel)"></div>
        <div class="line-bottom" v-show="list.length - 1 != index"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
export default {
  data() {
    return {
    	list: [],
    }
  },
  created() {
    this.getShopByCoupon();
  },
  methods: {
    getShopByCoupon() {
      api.trade.getShopByCoupon({
        couponId: '1',
        shopLon: '120.082565',
        shopLat: '30.200684',
      }).then((res) => {
        this.list = res.data;
      }).catch((err) => {

      });
    },
    makePhone(tel){
    	window.location.href = `tel:${tel}`;
    },
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  min-height: 100%;
  background: #f8f8fc;
  box-sizing: border-box;
  overflow: hidden;
}

.blank {
  width: 100%;
  height: 20px;
}

.section {
  width: 100%;
  background: #fff;
  .box {
    margin: 0 auto;
    width: 750px;
    height: 157px;
    box-sizing: border-box;
    padding: 30px;
    position: relative;
    .line-bottom{
    	position: absolute;
    	bottom: 0;
    	left: 30px;
    	width: 690px;
    	height: 1px;/*no*/
    	background: #E2E2E2;
    }
    .cell {
      width: 589px;
      height: 36.4px;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #818B8F;
      letter-spacing: 0;
      line-height: 36.4px;
      position: relative;
      &.cell-2 {
        margin-top: 19.4px;
      }
      .shopName {
        display: inline-block;
        float: left;
        // width: 450px;
        max-width: 450px;
        font-family: PingFangSC-Medium;
        font-size: 32px;
        color: #2E3141;
        letter-spacing: 0;
        line-height: 36.4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .distance {
        display: inline-block;
        float: left;
        margin-left: 20px;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #818B8F;
        letter-spacing: 0;
        line-height: 36.4px;
      }
      .address {
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #818B8F;
        letter-spacing: 0;
        line-height: 36.4px;
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .line{
    	position: absolute;
    	width: 1px; /*no*/
    	height: 50px;
    	background: #E2E2E2;
    	top: 54px;
    	right: 100px;
    }
    .tel{
    	position: absolute;
    	top: 59px;
    	right: 30px;
    	width: 40px;
    	height: 40px;
    	background-size: 100% 100%;
    	background-repeat: no-repeat;
    	background-image: url('../../assets/images/ic_store_phone.png');
    }
  }
}

</style>
