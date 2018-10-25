<!-- 个人中心-我的买单-详情页面 -->
<template>
  <div class="page">
    <order-detail :my-order="order" :coupons="coupons" :my-order-no="orderNo" :create-date="createDate" :order-detail="orderDetail" :refresh="getOrderDetail"></order-detail>
  </div>
</template>
<script type="text/javascript">
import orderDetail from '@/components/orderDetail'
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
