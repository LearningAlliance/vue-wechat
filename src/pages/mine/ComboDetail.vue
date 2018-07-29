<!-- 个人中心-优惠套餐-详情页面 -->
<template>
  <div class="page">
    <order-detail :my-order="order" :coupons="coupons" :my-order-no="orderNo" :create-date="createDate" :order-detail="orderDetail"></order-detail>
  </div>
</template>
<script type="text/javascript">
import orderDetail from '@/components/comboDetail'
import api from '@/fetch/api.js'
import * as _ from '@/util/tool.js'
export default {
  data() {
    return {
      orderNo: null,
      createDate: null,
      order: {
        coupons: null,
        orderDetail: null,
      },
      coupons: [],
      orderDetail: null,
    }
  },
  components: {
    'order-detail': orderDetail,
  },
  created() {
    this.orderNo = this.$route.query.orderNo;
    this.createDate = this.$route.query.createDate;
    this.getOrderDetail();
  },
  methods: {
    getOrderDetail() {
      api.trade.getOrderDetail({
        orderNo: this.orderNo,
        createDate: this.createDate,
      }).then((res) => {
        let item = res.data[0];
    //     item = {
    //   "orderState": 1,
    //   "orderSource": 3,
    //   "orderType": 2,
    //   "merId": 1,
    //   "realAmount": 6800,
    //   "discountAmount": 0,
    //   "amount": 6800,
    //   "coupons": [
    //     {
    //       "couponName": "优惠套餐",
    //       "couponType": 3,
    //       "state": 1,
    //       "couponPrice": 40,
    //       "merId": 1,
    //       "expDate": "2030-07-18 00:00:00",
    //       "effDate": "2018-07-18 00:00:00",
    //       "couponCode": "CHECK12314141",
    //       "couponRule": "使用规则呀",
    //       "couponId": 1,
    //       "configId": 1,
    //       "couponLimit": 50,
    //       "orderNo": "56565dbfd",
    //       "stateDate": "2018-07-18 13:16:57",
    //       "shopId": 1,
    //       "userId": 1,
    //       "activityType": 0,
    //       "createDate": "2018-07-18 13:16:54"
    //     },
    //     {
    //       "couponName": "优惠套餐",
    //       "couponType": 3,
    //       "state": 1,
    //       "couponPrice": 40,
    //       "merId": 1,
    //       "expDate": "2030-07-18 00:00:00",
    //       "effDate": "2018-07-18 00:00:00",
    //       "couponCode": "CHECK12314141",
    //       "couponRule": "使用规则呀",
    //       "couponId": 1,
    //       "configId": 1,
    //       "couponLimit": 50,
    //       "orderNo": "56565dbfd",
    //       "stateDate": "2018-07-18 13:16:57",
    //       "shopId": 1,
    //       "userId": 1,
    //       "activityType": 0,
    //       "createDate": "2018-07-18 13:16:54"
    //     }
    //   ],
    //   "stateDate": "2018-07-17 19:25:49",
    //   "orderNo": "56565dbfd",
    //   "orderDetail": {
    //     "amount": 96,
    //     "orderNo": "56565dbfd",
    //     "stateDate": "2018-07-19 14:42:43",
    //     "buyNum": 2,
    //     "state": 1,
    //     "createDate": "2018-07-19 14:42:45",
    //     "productName": "口味鸡超级套餐",
    //     "productPrice": 48,
    //     "detailId": 1
    //   },
    //   "userId": 1,
    //   "payDate": "2018-07-17 19:25:53",
    //   "createDate": "2018-07-17 19:25:35",
    //   "productName": "希创优惠劵",
    //   "orderId": 2,
    //   "payMethod": 5,
    //   "cashPrice": 1,
    //   "activityPrice": 1,
    //   "shopName": "",
    //   "shopLogo": ""
    // };
        this.order = item;
        this.coupons = item.coupons || [];
        this.orderDetail = item.orderDetail || {};
      }).catch((err) => {

      });
    },
  }
}

</script>
<style scoped lang="scss">


</style>
