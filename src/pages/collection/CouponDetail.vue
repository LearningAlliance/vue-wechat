<!-- 优惠套餐 -->
<template>
  <div class="page">
    <div class="coupon-img">
      <img :src="couponInfo.couponImg || ''" />
    </div>
    <div class="section-1">
      <div class="coupon-name">{{couponInfo.couponName || ''}}</div>
<!--       <div class="coupon-desc">少个优惠套餐简介字段 couponInfo.couponDesc用于套餐内容</div> -->
    </div>
<!--     <div class="line-box">
      <div class="line"></div>
    </div> -->
    <div class="section-2">
      <div class="header clearfix">
        <div class="tag clearfix">
          <i class="icon-tag"></i>
          <span class="tag-desc">随时退</span>
        </div>
        <div class="tag clearfix">
          <i class="icon-tag"></i>
          <span class="tag-desc">过期退</span>
        </div>
        <div class="tag clearfix" v-show="couponInfo.isPre == 0">
          <i class="icon-tag"></i>
          <span class="tag-desc">免预约</span>
        </div>
        <div class="count">销量 {{couponInfo.saleVolume || 0}}</div>
      </div>
      <div class="coupon-info">
        <div class="title">套餐内容</div>
        <div class="info-cell" v-if="couponInfo.couponDesc.length > 0" v-for="(item, index) in couponInfo.couponDesc" :key="index">
          <div class="info-name">{{item.name}}</div>
          <div class="info-price">￥{{item.price}}</div>
        </div>
        <div class="info-cell" v-if="couponInfo.couponDesc.length == 0">
          <div class="info-name">暂无</div>
          <!-- <div class="info-price">¥96</div> -->
        </div>
      </div>
    </div>
<!--     <div class="line-box">
      <div class="line"></div>
    </div>
    <div class="section-3">
      <div class="title">查看图文详情</div>
    </div> -->
    <div class="section-4">
      <div class="title">购买须知</div>
      <div class="sub-title">有效期</div>
      <div class="sub-desc">{{couponInfo.effDate && couponInfo.effDate.slice(0,10)}} 至 {{couponInfo.expDate && couponInfo.expDate.slice(0,10)}}(周末节假日通用)</div>
      <div class="sub-title">使用时间</div>
      <div class="sub-desc">{{couponInfo.openTime}}</div>
      <div class="sub-title">使用规则</div>
      <div class="sub-desc">
        <ul>
          <li>{{couponInfo.limitDesc}}</li>
          <!--          <li>如酒水果汁饮料等问题，请致电商家咨询，以商家反馈为准</li>
          <li>如部分菜品因时令或者其他不可抗的因素导致无法提供，店内将会用等价的菜品来替换，具体事宜请与店内协商</li>
          <li>提供免费WiFi</li>
          <li>停车位收费标准：详情咨询商家</li> -->
        </ul>
      </div>
    </div>
    <div class="section-5" v-show="list.length > 0">
      <div class="title">分店可用</div>
    </div>
    <div class="section-6" v-show="list.length > 0">
      <div class="box" v-for="(item, index) in list" :key="index">
        <div class="cell" @click="toShopDetail(item.shopId)">
          <p class="shopName clearfix">{{item.shopName}}</p>
          <span class="distance">{{item.distance | formatDistance}}</span>
        </div>
        <div class="cell cell-2" @click="toShopDetail(item.shopId)">
          <p class="address">{{item.shopAddress}}</p>
        </div>
        <div class="line"></div>
        <div class="tel" @click.stop="makePhone(item.shopTel)"></div>
        <div class="line-bottom"></div>
      </div>
    </div>
    <div class="section-3" @click="toBranch" v-show="list.length > 0">
      <div class="title">查看其它分店</div>
    </div>
    <div class="blank"></div>
    <div class="footer clearfix">
      <div class="cell clearfix">
        <div>
          <span class="price-1"><span class="currency">￥</span>{{couponInfo.buyPrice | formatPriceWithoutUnit}}</span>
          <span class="price-2"><span class="currency">￥</span>{{couponInfo.couponPrice | formatPriceWithoutUnit}}</span>
        </div>
        <div>
          <span class="price-3">返<span class="orange">{{extraInfo.rate || 0}}%</span>保障金</span>
        </div>
      </div>
      <div class="btn" @click="toBuy">购买</div>
    </div>
    <phone-card :visible="visible" :hide-phone-card="hidePhoneCard" :phone-list="phoneList"></phone-card>
  </div>
</template>
<script type="text/javascript">
import { mapGetters } from 'vuex'
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
import phoneCard from '@/components/phoneCard'
export default {
  data() {
    return {
      phoneList: [],
      visible: false,
      couponId: null,
      couponInfo: {
        couponDesc: [],
      },
      list: [],
      extraInfo: {},
      shopId: null,
    }
  },
  components: {
    'phone-card': phoneCard,
  },
  mounted() {
    let { couponId } = this.$route.query;
    this.couponId = couponId;
    this.getDetail(couponId);
    if (!!this.longitude && !!this.latitude) {
      this.$nextTick(() => {
        this.getShopByCoupon();
      });
    }
  },
  computed: {
    ...mapGetters([
      'longitude',
      'latitude',
    ]),
    getLocationOver() {
      return !!this.longitude && !!this.latitude;
    }
  },
  watch: {
    getLocationOver(val, oldVal) {
      if (val) {
        this.getShopByCoupon();
      }
    },
  },
  methods: {
    getShopByCoupon() {
      api.trade.getShopByCoupon({
        couponId: this.couponId,
        shopLon: this.longitude.toString(),
        shopLat: this.latitude.toString(),
      }).then((res) => {
        let item = res.data[0];
        this.list = [item];
        if(item.hasOwnProperty('shopId')){
          this.shopId = item.shopId;
          this.qryKetubbahAmount(item.shopId);
        }
      }).catch((err) => {

      });
    },
    qryKetubbahAmount(shopId){
      api.collection.qryKetubbahAmount({shopId,}).then((res) => {
        console.log(res);
        this.extraInfo = res.data;
      }).catch((err) => {});
    },
    toShopDetail(shopId) {
      this.$router.push({
        path: '/collection/shopDetail',
        query: {
          shopId,
        },
      });
    },
    getDetail(couponId) {
      api.collection.merCouponDetail({
        couponId,
      }).then((res) => {
        let obj = res.data[0];
        try{
          // obj.couponDesc = '[{"name": "xx","price": "68"},{"name": "xx","price": "80"},{"name": "xx","price": "90"}]';
          if(obj.couponDesc.length > 0){
            obj.couponDesc = JSON.parse(obj.couponDesc);
          }
        }catch(e){
          obj.couponDesc = [];
        }
        this.couponInfo = obj;
      }).catch((err) => {});
    },
    makePhone(tel) {
      this.visible = true;
    },
    hidePhoneCard(){
      this.visible = false;
    },
    toBranch() {
      this.$router.push({
        path: '/collection/branch',
        query: {
          couponId: this.couponId,
        }
      });
    },
    toBuy() {
      if (this.couponInfo.surplusNum == 0) {
        this.num = 0;
        _.alert('已售完');
        return;
      }
      this.$router.push({
        path: '/collection/saveCouponOrder',
        query: {
          merId: this.couponInfo.merId,
          couponId: this.couponId,
          shopId: this.shopId,
        }
      })
    },
  }
}

</script>
<style scoped lang="scss">
.page {
  width: 100%;
  height: 100%;
  min-height: 100%;
  background: #F8F8FC;
}

.footer {
  width: 100%;
  height: 120px;
  position: fixed;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  padding: 16px 30px;
  background: #FFF;
  .cell {
    display: inline-block;
    float: left;
    .price-3{
      display: inline-block;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #2E3141;
      letter-spacing: 0;
      text-align: center;
      line-height: 40px;
      .orange{
        color: #F05720;
      }
    }
    .price-2 {
      text-decoration: line-through;
      display: inline-block;
      // height: 88px;
      height: 48px;;
      font-family: PingFangSC-Regular;
      font-size: 36px;
      color: #C4CACD;
      letter-spacing: 0;
      text-align: center;
      // line-height: 88px;
      line-height: 48px;
      font-size: 36px;
      .currency {
        font-size: 28px;
      }
    }
    .price-1 {
      margin-right: 10px;
      display: inline-block; // float: left;
      // height: 88px;
      height: 48px;;
      font-family: PingFangSC-Semibold;
      font-size: 48px;
      color: #F05720;
      letter-spacing: 0;
      text-align: center;
      // line-height: 88px;
      line-height: 48px;
      .currency {
        font-size: 36px;
      }
    }
  }
  .btn {
    display: inline-block;
    float: right;
    width: 270px;
    height: 88px;
    background: #F05720;
    border-radius: 44px;
    font-family: PingFangSC-Semibold;
    font-size: 36px;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: center;
    line-height: 88px;
  }
}

.blank {
  width: 100%;
  height: 140px;
}

ul {
  width: 100%;
  box-sizing: border-box;
  padding-left: 45px;
  li {
    list-style: disc;
  }
}

.coupon-img {
  width: 750px;
  height: 380px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
  }
}

.line-box {
  width: 100%;
  height: 1px;
  /*no*/
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 30px;
  .line {
    width: 100%;
    height: 100%;
    background: #E2E2E2;
  }
}

.section-5 {
  margin-top: 20px;
  width: 100%;
  box-sizing: border-box;
  padding-top: 30px;
  padding-left: 30px;
  padding-right: 30px;
  background: #FFF;
  .title {
    font-family: PingFangSC-Medium;
    font-size: 32px;
    color: #2E3141;
    letter-spacing: 0;
    line-height: 41.6px; // padding-bottom: 24.4px;
  }
}

.section-6 {
  width: 100%;
  background: #FFF;
  .box {
    margin: 0 auto;
    width: 750px;
    height: 136.8px;
    box-sizing: border-box;
    padding: 24.4px 30px 30px 30px;
    position: relative;
    .line-bottom {
      position: absolute;
      bottom: 0;
      left: 30px;
      width: 690px;
      height: 1px;
      /*no*/
      background: #E2E2E2;
    }
    .cell {
      width: 589px;
      height: 36.4px;
      font-family: PingFangSC-Medium;
      font-size: 28px;
      color: #2E3141;
      letter-spacing: 0;
      line-height: 36.4px;
      position: relative;
      &.cell-2 {
        margin-top: 9.6px;
      }
      .shopName {
        display: inline-block;
        float: left; // width: 450px;
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
        float: right;
        margin-left: 20px;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #818B8F;
        letter-spacing: 0;
        line-height: 36.4px;
      }
      .address {
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #818B8F;
        letter-spacing: 0;
        line-height: 36.4px;
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .line {
      position: absolute;
      width: 1px;
      /*no*/
      height: 50px;
      background: #E2E2E2;
      top: 24.4px;
      right: 100px;
    }
    .tel {
      position: absolute;
      top: 24.4px;
      right: 30px;
      width: 40px;
      height: 40px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-image: url('../../assets/images/ic_store_phone.png');
    }
  }
}

.section-4 {
  width: 100%;
  box-sizing: border-box;
  padding: 30px;
  margin-top: 20px;
  background: #FFF;
  .title {
    font-family: PingFangSC-Medium;
    font-size: 32px;
    color: #2E3141;
    letter-spacing: 0;
    line-height: 41.6px;
  }
  .sub-title {
    margin-top: 24.4px;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #818B8F;
    letter-spacing: 0;
    line-height: 36.4px;
  }
  .sub-desc {
    margin-top: 10px;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #2E3141;
    letter-spacing: 0;
    line-height: 36.4px;
  }
}

.section-1 {
  width: 100%;
  box-sizing: border-box;
  padding: 30px;
  padding-bottom: 0;
  background: #FFF;
  .coupon-name {
    font-family: PingFangSC-Medium;
    font-size: 32px;
    color: #2E3141;
    letter-spacing: 0;
    line-height: 41.6px;
  }
  .coupon-desc {
    margin-top: 20.4px;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #818B8F;
    letter-spacing: 0;
    line-height: 36.4px;
  }
}

.section-2 {
  width: 100%;
  background: #FFF;
  box-sizing: border-box;
  padding-top: 30px;
  padding-left: 30px;
  padding-right: 30px;
  .header {
    width: 100%;
    height: 33px;
    position: relative;
    .tag {
      display: inline-block;
      float: left;
      height: 33px;
      margin-right: 31.9px;
      .icon-tag {
        float: left;
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 33px;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url('../../assets/images/img_success.png');
        margin-right: 5px;
      }
      .tag-desc {
        float: left;
        display: inline-block;
        height: 33px;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #00B59F;
        letter-spacing: 0;
        line-height: 33px;
      }
    }
    .count {
      display: inline-block;
      float: right;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #818B8F;
      letter-spacing: 0;
      text-align: right;
    }
  }
  .coupon-info {
    margin-top: 40px;
    width: 100%;
    padding-bottom: 30px;
    .title {
      font-family: PingFangSC-Medium;
      font-size: 28px;
      color: #2E3141;
      letter-spacing: 0;
      line-height: 36.4px;
    }
    .info-cell {
      margin-top: 29.6px;
      width: 100%;
      box-sizing: border-box;
      padding-right: 30%;
      position: relative;
      .info-name {
        width: 100%;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #2E3141;
        letter-spacing: 0;
        line-height: 36.4px;
      }
      .info-price {
        position: absolute;
        width: 30%;
        top: 0;
        right: 0;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        color: #2E3141;
        letter-spacing: 0;
        text-align: right;
        line-height: 36.4px;
      }
    }
  }
}

.section-3 {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding-left: 30px;
  padding-right: 30px;
  background: #FFF;
  height: 88px;
  .title {
    font-family: PingFangSC-Regular;
    font-size: 32px;
    color: #2E3141;
    letter-spacing: 0;
    line-height: 88px;
  }
  &::after {
    content: '';
    position: absolute;
    width: 32px;
    height: 32px;
    top: 28px;
    right: 30px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url('../../assets/images/ic_nextarrow.png');
  }
}

</style>
